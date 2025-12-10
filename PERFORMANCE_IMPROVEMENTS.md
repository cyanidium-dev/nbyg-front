# Performance Improvements - Action Plan

Based on Lighthouse Report and Bundle Analysis

## 📊 Current Performance Issues

- **Performance Score**: 59/100 (Target: 90+)
- **JavaScript Execution**: 4.0s (Target: < 2.0s)
- **Main-Thread Work**: 8.0s (Target: < 3.0s)
- **LCP**: 4.4s (Target: < 2.5s)
- **TTI**: 7.5s (Target: < 3.8s)

## 🎯 Priority Fixes

### 1. 🔴 CRITICAL: Lazy Load Offscreen Images (162 KiB savings)

**Issue**: Gallery images (gallery-1.webp through gallery-5.webp) are loading
immediately but not visible above the fold.

**Files to Fix**:

- `src/components/homePage/hero/HeroGallery.tsx`
- `src/components/homePage/hero/HeroGallerySlider.tsx`

**Current Problem**:

```tsx
// HeroGallerySlider.tsx - All images have priority
<Image
  src={image}
  priority // ❌ All 5 images marked as priority
  fetchPriority="high"
/>
```

**Fix**:

```tsx
// HeroGallerySlider.tsx
{
  images.map((image, index) => (
    <SwiperSlide key={index}>
      <Image
        src={image}
        alt={`Hero Gallery ${index + 1}`}
        fill
        className="object-cover"
        sizes="100vw"
        priority={index === 0} // ✅ Only first image priority (others lazy load by default)
        // Note: loading="lazy" is default, so only first image needs priority
        fetchPriority={index === 0 ? "high" : "low"}
      />
    </SwiperSlide>
  ));
}
```

**Also fix HeroGallery.tsx**:

```tsx
// HeroGallery.tsx - Keep loader as priority, but don't preload all gallery images
<Image
  src="/images/homePage/hero/gallery-loader.webp"
  alt="Hero Gallery Loader"
  fill
  className="object-cover hero-gallery-static-image transition-opacity duration-700 ease-in-out z-1"
  priority // ✅ Keep this as priority (above fold)
  sizes="100vw"
  fetchPriority="high"
/>
```

**Expected Savings**: 162 KiB (130+ KB from gallery images)

---

### 2. 🔴 CRITICAL: Add `sizes` Prop to Gallery Images (98 KiB savings)

**Issue**: Images don't have proper `sizes` prop, causing oversized images to
load.

**Files to Fix**:

- `src/components/shared/sections/gallerySection/GallerySlider.tsx`
- `src/components/shared/sections/gallerySection/GalleryModal.tsx`

**Current Problem**:

```tsx
// GallerySlider.tsx - Missing sizes prop
<Image
  src={...}
  fill
  className="object-cover rounded-[14px]"
  // ❌ No sizes prop
/>
```

**Fix**:

```tsx
// GallerySlider.tsx
<Image
  src={...}
  alt={...}
  fill
  className="object-cover rounded-[14px]"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"  // ✅ Add sizes (see SIZES_PROP_EXPLAINED.md for calculation)
  // Note: loading="lazy" is default in Next.js Image, so not needed
/>
```

**Also fix GalleryModal.tsx**:

```tsx
// GalleryModal.tsx
<Image
  src={...}
  alt={...}
  fill
  className="object-contain"
  sizes="(max-width: 768px) 100vw, 80vw"  // ✅ Add sizes (CRITICAL)
  // Note: loading="lazy" is default in Next.js Image, so not needed
/>
```

**Important Note**: Next.js Image component lazy loads by default! You only need
to:

- Use `priority` prop for above-the-fold images (loads immediately)
- Use `loading="eager"` explicitly if you want immediate loading
- **The `sizes` prop is the critical fix here** - it tells the browser which
  image size to load

**Expected Savings**: 98 KiB

---

### 3. 🔴 HIGH: Reduce Unused JavaScript (164 KiB savings)

**Issue**: 6 JavaScript chunks contain unused code totaling 164 KiB.

**Strategy**: Dynamic imports for heavy components

**Files to Optimize**:

#### A. Lazy Load Swiper Components

**File**: `src/components/shared/swiper/SwiperWrapper.tsx`

**Current**: Swiper is imported directly

```tsx
import { Swiper, SwiperSlide } from "swiper/react"; // ❌ Loads entire Swiper
```

**Fix**: Create a lazy wrapper

```tsx
// Create: src/components/shared/swiper/SwiperWrapper.lazy.tsx
import dynamic from "next/dynamic";

const SwiperWrapper = dynamic(() => import("./SwiperWrapper"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200/10 rounded-lg h-full w-full" />
  ),
  ssr: false, // Swiper doesn't need SSR
});

export default SwiperWrapper;
```

**Then update imports**:

```tsx
// In components using SwiperWrapper
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper.lazy";
```

#### B. Lazy Load Formik Forms

**Files**: Calculator components

- `src/components/calculatorTagPage/TagCalculator.tsx` (used in
  `/calculator-tag`)
- `src/components/calculatorTerrasserPage/TerraceCalculator.tsx` (used in
  `/calculator-terrasser`)

**Note**: These components are NOT used on the main page, so lazy loading them
only affects the calculator pages, not the homepage performance.

**Fix**:

```tsx
// In src/app/calculator-tag/page.tsx
import dynamic from "next/dynamic";

const TagCalculator = dynamic(
  () => import("@/components/calculatorTagPage/TagCalculator"),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: true, // Keep SSR for SEO
  }
);
```

```tsx
// In src/app/calculator-terrasser/page.tsx
import dynamic from "next/dynamic";

const TerraceCalculator = dynamic(
  () => import("@/components/calculatorTerrasserPage/TerraceCalculator"),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: true, // Keep SSR for SEO
  }
);
```

#### C. Lazy Load React Select

**Where used**: Only in `DropdownInput.tsx` (part of TagCalculator)

**Note**: React Select is ONLY used in the calculator pages, NOT on the main
page. Lazy loading it only affects `/calculator-tag` page performance.

**Fix**:

```tsx
// In src/components/calculatorTagPage/DropdownInput.tsx
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
```

#### D. Lazy Load Below-the-Fold Main Page Components

**Current State**: Most Swiper components are already lazy loaded ✅

**Additional Opportunities**: Lazy load wrapper components that are below the
fold

**Files to Optimize**: `src/app/page.tsx`

**Components to Lazy Load**:

1. **Gallery** - Below the fold, wrapper component (GallerySlider already lazy)
2. **Reviews** - Near bottom, wrapper component (ReviewsBlock already lazy)
3. **BottomCTA** - At bottom, uses motion/react-client

**Fix**:

```tsx
// src/app/page.tsx
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("@/components/homePage/gallery/Gallery"), {
  loading: () => <SectionLoader />,
  ssr: true, // Keep SSR for SEO
});

const Reviews = dynamic(() => import("@/components/homePage/reviews/Reviews"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const BottomCTA = dynamic(
  () => import("@/components/homePage/bottomCTA/BottomCTA"),
  {
    loading: () => <SectionLoader />,
    ssr: true,
  }
);

// Then use them in JSX with Suspense
<Suspense fallback={<SectionLoader />}>
  <Gallery />
</Suspense>;
```

**Note**: Keep `AboutUs` and `WhyUs` loaded (early in page, good for SEO). See
`LAZY_LOADING_ANALYSIS.md` for full analysis.

**Expected Savings**: 164 KiB (from unused code elimination) + ~60-80 KB (from
lazy loading below-the-fold components)

---

### 4. 🟡 MEDIUM: Optimize Framer Motion Usage

**Issue**: Framer Motion is large (101.36 KB parsed). You're already using
`motion/react-client` which is good, but can optimize further.

**Current**: Using `motion/react-client` ✅ (already optimized)

**Additional Optimizations**:

#### A. Reduce Animation Complexity

```tsx
// Use simpler animations
const fadeInAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }, // ✅ Shorter duration
  },
};

// Instead of complex transforms
// ❌ Avoid: transform: scale, rotate, translateX, translateY all together
```

#### B. Use CSS for Simple Animations

```tsx
// For simple fade-ins, use CSS instead
// ✅ CSS animation is lighter than Framer Motion
<div className="animate-fade-in" />
```

**File**: `src/utils/animationVariants.ts`

- Review and simplify complex animations
- Use CSS animations where possible

---

### 5. 🟡 MEDIUM: Eliminate Render-Blocking Resources

**Issue**: 1 render-blocking resource detected.

**Check**: `src/app/layout.tsx`

**Fix**: Inline critical CSS or defer non-critical styles

```tsx
// If using external CSS, consider:
// 1. Inline critical CSS in <head>
// 2. Defer non-critical CSS
<link
  rel="stylesheet"
  href="/styles/non-critical.css"
  media="print"
  onLoad="this.media='all'"
/>
```

---

### 6. 🟢 LOW: Remove Legacy JavaScript (14 KiB savings)

**Issue**: 2 bundles contain legacy JavaScript.

**Fix**: Update dependencies and remove polyfills

```bash
# Check for outdated packages
npm outdated

# Update if safe
npm update
```

---

## 📋 Implementation Checklist

### Immediate (Do First)

- [x] Fix HeroGallery images - remove `priority` from gallery-2 through
      gallery-5 ✅
- [ ] Add `sizes` prop to GallerySlider images (CRITICAL - still needed!)
- [ ] Add `sizes` prop to GalleryModal images (CRITICAL - still needed!)
- [x] Note: `loading="lazy"` is default in Next.js Image - no need to add it ✅

### Short Term (This Week)

- [x] Lazy load Gallery, Reviews, and BottomCTA components ✅
- [ ] Create lazy wrapper for SwiperWrapper
- [ ] Lazy load calculator components (only affects `/calculator-tag` and
      `/calculator-terrasser` pages, NOT main page)
- [ ] Lazy load React Select (only affects `/calculator-tag` page, NOT main
      page)
- [ ] Review and simplify Framer Motion animations

### Medium Term (This Month)

- [ ] Optimize render-blocking resources
- [ ] Update dependencies to remove legacy JS
- [ ] Add canonical tags (SEO fix)
- [ ] Fix console errors

---

## 🎯 Expected Results

After implementing all fixes:

| Metric               | Current | Target | Expected                         |
| -------------------- | ------- | ------ | -------------------------------- |
| Performance Score    | 59      | 90+    | **75-85**                        |
| JavaScript Execution | 4.0s    | < 2.0s | **2.5-3.0s**                     |
| Main-Thread Work     | 8.0s    | < 3.0s | **4.0-5.0s**                     |
| LCP                  | 4.4s    | < 2.5s | **2.8-3.2s**                     |
| TTI                  | 7.5s    | < 3.8s | **4.5-5.5s**                     |
| Bundle Size          | -       | -      | **-164 KB** (unused JS)          |
| Image Savings        | -       | -      | **-260 KB** (offscreen + sizing) |

**Total Savings: ~424 KB** 🚀

---

## 🔍 How to Verify

After each fix:

```bash
# 1. Build
npm run build

# 2. Start production server
npm run start

# 3. Run Lighthouse
npm run perf:lighthouse

# 4. Compare metrics
```

---

## 📝 Code Examples

### Example 1: Optimized Hero Gallery

```tsx
// src/components/homePage/hero/HeroGallerySlider.tsx
{
  images.map((image, index) => (
    <SwiperSlide key={index}>
      <Image
        src={image}
        alt={`Hero Gallery ${index + 1}`}
        fill
        className="object-cover"
        sizes="100vw"
        priority={index === 0} // ✅ Only first image (others lazy load by default)
        fetchPriority={index === 0 ? "high" : "low"}
        onLoad={() => handleImageLoad(index)}
      />
    </SwiperSlide>
  ));
}
```

### Example 2: Optimized Gallery Slider

```tsx
// src/components/shared/sections/gallerySection/GallerySlider.tsx
<Image
  src={...}
  alt={...}
  fill
  className="object-cover rounded-[14px]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"  // ✅ CRITICAL
  // loading="lazy" is default - not needed
/>
```

### Example 3: Lazy Loaded Swiper

```tsx
// src/components/shared/swiper/SwiperWrapper.lazy.tsx
import dynamic from "next/dynamic";

const SwiperWrapper = dynamic(() => import("./SwiperWrapper"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200/10 rounded-lg h-full w-full" />
  ),
  ssr: false,
});

export default SwiperWrapper;
```

---

## 🚀 Quick Wins Summary

1. **Lazy load hero gallery images 2-5** → 130+ KB saved
2. **Add sizes prop to gallery images** → 98 KB saved
3. **Lazy load Swiper components** → Part of 164 KB unused JS savings
4. **Lazy load calculator forms** → Part of 164 KB unused JS savings

**Start with these 4 fixes for immediate impact!**

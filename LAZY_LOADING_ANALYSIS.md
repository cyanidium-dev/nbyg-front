# Lazy Loading Analysis - Main Page Components

## Current State

### ✅ Already Lazy Loaded

1. **TextRevealCardsSliderSection** - Uses Swiper, already lazy via `.lazy.tsx`
2. **BeforeAfterSection** - Uses Swiper, already lazy via `.lazy.tsx`
3. **ReviewsBlock** - Uses Swiper, already lazy inside Reviews component
4. **GallerySlider** - Uses Swiper, already lazy inside Gallery component
5. **HeroGallerySlider** - Uses Swiper, already lazy inside HeroGalleryClient

### ❌ Not Lazy Loaded (Opportunities)

Components directly imported in `src/app/page.tsx`:

1. **Hero** - Above the fold, should NOT be lazy loaded ✅
2. **AboutUs** - Below the fold, CAN be lazy loaded
3. **WhyUs** - Below the fold, CAN be lazy loaded
4. **Gallery** - Below the fold, CAN be lazy loaded (wrapper, GallerySlider
   already lazy)
5. **BottomCTA** - Below the fold, CAN be lazy loaded
6. **FaqSection** - Below the fold, CAN be lazy loaded
7. **Reviews** - Below the fold, CAN be lazy loaded (wrapper, ReviewsBlock
   already lazy)

## Recommended Lazy Loading Strategy

### High Priority (Below the Fold, Heavy Dependencies)

#### 1. **Reviews Component** 🔴

- **Why**: Wrapper component, ReviewsBlock already lazy
- **Impact**: Medium - reduces initial bundle
- **Dependencies**: Uses motion/react-client, Images
- **Position**: Near bottom of page

#### 2. **Gallery Component** 🔴

- **Why**: Wrapper component, GallerySlider already lazy
- **Impact**: Medium - reduces initial bundle
- **Dependencies**: Uses motion/react-client, Images
- **Position**: Below the fold

#### 3. **BottomCTA Component** 🟡

- **Why**: Below the fold, uses motion/react-client
- **Impact**: Low-Medium - reduces initial bundle
- **Dependencies**: motion/react-client, Images
- **Position**: Near bottom of page

#### 4. **FaqSection Component** 🟡

- **Why**: Below the fold, uses motion/react-client
- **Impact**: Low-Medium - reduces initial bundle
- **Dependencies**: motion/react-client
- **Position**: Near bottom of page

#### 5. **WhyUs Component** 🟡

- **Why**: Below the fold, uses motion/react-client
- **Impact**: Low-Medium - reduces initial bundle
- **Dependencies**: motion/react-client, Images
- **Position**: Mid-page, below the fold

#### 6. **AboutUs Component** 🟢

- **Why**: Below the fold but early in page
- **Impact**: Low - consider keeping for SEO
- **Dependencies**: motion/react-client, Images
- **Position**: Early below the fold

## Implementation Plan

### Option 1: Lazy Load All Below-the-Fold Components

```tsx
// src/app/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/homePage/hero/Hero";
import SectionLoader from "@/components/shared/loader/SectionLoader";
import Container from "@/components/shared/container/Container";
import { faq } from "@/components/homePage/faq/Faq";
import { services } from "@/components/homePage/services/services";
import { BEFORE_AFTER_IMAGES } from "@/components/homePage/beforeAfter/beforeAfter";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection.lazy";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection.lazy";

// Lazy load below-the-fold components
const AboutUs = dynamic(() => import("@/components/homePage/aboutUs/AboutUs"), {
  loading: () => <SectionLoader />,
  ssr: true, // Keep SSR for SEO
});

const WhyUs = dynamic(() => import("@/components/homePage/whyUs/WhyUs"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

const Gallery = dynamic(() => import("@/components/homePage/gallery/Gallery"), {
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

const FaqSection = dynamic(
  () => import("@/components/shared/sections/faqSection/FaqSection"),
  {
    loading: () => <SectionLoader />,
    ssr: true,
  }
);

const Reviews = dynamic(() => import("@/components/homePage/reviews/Reviews"), {
  loading: () => <SectionLoader />,
  ssr: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TextRevealCardsSliderSection
          _type="textReavealCardsSliderSection"
          type="textReavealCardsSliderSection"
          title={`Vores\ntjenester`}
          cards={services}
          linkButtonText="Gå til servicesiden"
          linkButtonLink="/byggeydelser"
        />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BeforeAfterSection
          _type="beforeAfterSection"
          type="beforeAfterSection"
          items={BEFORE_AFTER_IMAGES}
          uniqueKey="home-before-after"
        />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BottomCTA />
      </Suspense>
      <Container>
        <Suspense fallback={<SectionLoader />}>
          <FaqSection
            _type="faqSection"
            type="faqSection"
            description="Har du nogen spørgsmål?"
            items={faq}
            uniqueKey="home-faq"
          />
        </Suspense>
      </Container>
      <Suspense fallback={<SectionLoader />}>
        <Reviews />
      </Suspense>
    </>
  );
}
```

### Option 2: Conservative Approach (Recommended)

Only lazy load components that are clearly below the fold and have heavy
dependencies:

```tsx
// Lazy load only the heaviest below-the-fold components
const Gallery = dynamic(() => import("@/components/homePage/gallery/Gallery"), {
  loading: () => <SectionLoader />,
  ssr: true,
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
```

## Expected Impact

### Bundle Size Reduction

- **Reviews**: ~20-30 KB (motion + images)
- **Gallery**: ~25-35 KB (motion + images)
- **BottomCTA**: ~15-20 KB (motion + images)
- **FaqSection**: ~10-15 KB (motion)
- **WhyUs**: ~20-25 KB (motion + images)
- **AboutUs**: ~15-20 KB (motion + images)

**Total potential savings: ~105-145 KB** (gzipped: ~35-50 KB)

### Performance Impact

- **Initial JavaScript**: -105-145 KB
- **Time to Interactive**: -200-400ms
- **First Contentful Paint**: Minimal impact (these are below the fold)
- **Largest Contentful Paint**: Minimal impact

## ✅ Implementation Status

**Created lazy wrapper files:**

- `src/components/homePage/gallery/Gallery.lazy.tsx` ✅
- `src/components/homePage/reviews/Reviews.lazy.tsx` ✅
- `src/components/homePage/bottomCTA/BottomCTA.lazy.tsx` ✅

**Updated `src/app/page.tsx`:**

- Changed imports to use `.lazy` versions ✅
- Wrapped components in `<Suspense>` with `<SectionLoader />` fallback ✅
- All components use `ssr: true` to maintain SEO benefits ✅

**Build Status:** ✅ Successful - All pages build correctly

## Recommendation

**Use Option 2 (Conservative Approach)** - ✅ **IMPLEMENTED**:

1. Lazy load **Gallery** (heavy, far below fold) ✅ **IMPLEMENTED**
2. Lazy load **Reviews** (heavy, at bottom) ✅ **IMPLEMENTED**
3. Lazy load **BottomCTA** (at bottom) ✅ **IMPLEMENTED**

**Keep loaded:**

- **AboutUs** - Early in page, good for SEO
- **WhyUs** - Mid-page, visible early
- **FaqSection** - Lightweight, good for SEO

This balances performance gains with SEO and user experience.

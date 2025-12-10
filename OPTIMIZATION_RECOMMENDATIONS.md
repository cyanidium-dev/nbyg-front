# Specific Optimization Recommendations

Based on your codebase analysis, here are specific optimizations you should
implement:

## 🔴 High Priority

### 1. Optimize Sanity Data Fetching

**Current Issue**: Client-side fetches go through API route, which adds latency.

**File**: `src/utils/fetchSanityData.ts`

**Recommendation**: Use Next.js `fetch` with caching for server components:

```typescript
// For server components, use direct fetch with caching
export const fetchSanityDataServer = async <T = unknown>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate: number = 60
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SANITY_API_URL}?query=${encodeURIComponent(query)}`,
    {
      next: { revalidate },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
```

### 2. Add Bundle Analyzer Configuration

**File**: `next.config.ts`

**Add**:

```typescript
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // ... existing config
};

export default withBundleAnalyzer(nextConfig);
```

### 3. Optimize Third-Party Script Loading

**File**: `src/app/layout.tsx`

**Current**: CookieYes loads with `afterInteractive` **Recommendation**: Change
to `lazyOnload` or load conditionally:

```typescript
<Script
  id="cookieyes"
  strategy="lazyOnload" // Loads after page is interactive
  src="https://cdn-cookieyes.com/client_data/17e4795a8aff15e288f360abc85aef25/script.js"
/>
```

### 4. Add Image Optimization

**Check all Image components** for:

- `priority` prop only on above-the-fold images
- `sizes` prop for responsive images
- Proper width/height to prevent layout shift

**Example**:

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // Only for hero images
  sizes="100vw"
  quality={85} // Reduce if file size is large
/>
```

## 🟡 Medium Priority

### 5. Implement React Query or SWR for Client-Side Caching

**Benefit**: Reduces redundant API calls, improves perceived performance

**Install**:

```bash
npm install @tanstack/react-query
```

**Usage**:

```typescript
// src/lib/react-query.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export { QueryClientProvider, queryClient };
```

### 6. Optimize Framer Motion Usage

**Current**: Using Framer Motion for animations

**Recommendations**:

- Use `will-change` CSS property for animated elements
- Reduce animation complexity on mobile
- Use `transform` and `opacity` only (GPU-accelerated)
- Consider `prefers-reduced-motion` for accessibility

**Example**:

```tsx
const motionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
```

### 7. Lazy Load Heavy Components

**Components to consider lazy loading**:

- Swiper carousels
- Form components (Formik)
- React Select
- Calculator components

**Example**:

```tsx
import dynamic from "next/dynamic";

const TagCalculator = dynamic(() => import("./TagCalculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: true, // Keep true if needed for SEO
});
```

### 8. Optimize Font Loading

**File**: `src/app/layout.tsx`

**Current**: Good setup ✅

**Additional optimization**:

```typescript
const geistSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true, // Add this
});
```

### 9. Add API Route Caching

**File**: `src/app/api/sanity/route.ts` (if exists)

**Add caching headers**:

```typescript
export async function POST(request: Request) {
  // ... existing code

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
```

### 10. Optimize CSS

**Check**: Ensure Tailwind is purging unused styles

**File**: `tailwind.config.js` (if exists)

**Verify**:

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // ... rest of config
};
```

## 🟢 Low Priority (Nice to Have)

### 11. Add Service Worker for Offline Support

**Benefit**: Better caching, offline functionality

**Consider**: Using `next-pwa` package

### 12. Implement Request Deduplication

**For client-side fetches**: Use React Query or implement custom deduplication

### 13. Add Resource Hints

**File**: `src/app/layout.tsx`

```tsx
<head>
  <link rel="preconnect" href="https://cdn.sanity.io" />
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />
  <link rel="preconnect" href="https://cdn-cookieyes.com" />
</head>
```

### 14. Optimize Metadata Generation

**Ensure**: All pages have unique, optimized metadata

**Check**: `src/utils/getDefaultMetadata.ts`

### 15. Add Performance Monitoring

**Install Web Vitals**:

```bash
npm install web-vitals
```

**Create component**: `src/components/shared/WebVitals.tsx`

```tsx
"use client";
import { useEffect } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    }
  }, []);

  return null;
}
```

## 📋 Implementation Order

1. ✅ Bundle analyzer setup (5 min)
2. ✅ Run initial performance audit (10 min)
3. ✅ Optimize third-party scripts (5 min)
4. ✅ Add image optimization props (30 min)
5. ✅ Optimize Sanity data fetching (1 hour)
6. ✅ Implement React Query (2 hours)
7. ✅ Lazy load heavy components (1 hour)
8. ✅ Optimize animations (1 hour)
9. ✅ Add Web Vitals monitoring (30 min)
10. ✅ Re-audit and compare (15 min)

## 🎯 Expected Improvements

After implementing these optimizations:

- **Lighthouse Performance**: +10-20 points
- **First Contentful Paint**: -200-500ms
- **Largest Contentful Paint**: -300-800ms
- **Total Blocking Time**: -100-300ms
- **Bundle Size**: -20-30% reduction
- **Time to Interactive**: -500-1000ms

## 🔍 How to Measure Impact

1. **Before**: Run `npm run perf:build` and save report
2. **After each optimization**: Re-run and compare
3. **Track metrics**: Use Lighthouse CI in your CI/CD pipeline
4. **Monitor production**: Set up Web Vitals tracking

## 📝 Notes

- Test on real devices, not just desktop
- Use throttled network conditions
- Test on different browsers
- Monitor Core Web Vitals in production
- Set up alerts for performance regressions

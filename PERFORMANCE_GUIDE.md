# Performance Testing & Optimization Guide

This guide covers how to test and optimize the performance of your Next.js application.

## 🧪 Performance Testing

### 1. Built-in Next.js Analytics

Next.js provides built-in performance analytics. Run:

```bash
npm run build
```

This will show you:
- Route sizes
- First Load JS sizes
- Bundle analysis

### 2. Bundle Analysis

Analyze your bundle size to identify large dependencies:

```bash
npm run analyze
```

This opens an interactive visualization showing:
- Which packages are taking up space
- Code splitting effectiveness
- Opportunities for optimization

### 3. Lighthouse Testing

Lighthouse provides comprehensive performance metrics:

#### Quick Test (Local)
```bash
# Start your production build
npm run build
npm run start

# In another terminal, run Lighthouse
npm run perf:lighthouse
```

#### Automated Test
```bash
npm run perf:build
```

This will:
1. Build your app
2. Start the production server
3. Run Lighthouse
4. Generate a report

### 4. Web Vitals Monitoring

Add to your app for real user monitoring:

```typescript
// src/app/layout.tsx or a separate component
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric);
}

export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

### 5. Chrome DevTools Performance Tab

1. Open Chrome DevTools (F12)
2. Go to "Performance" tab
3. Click record
4. Interact with your app
5. Stop recording
6. Analyze:
   - Main thread activity
   - JavaScript execution time
   - Layout shifts
   - Paint times

### 6. Network Throttling

Test on slow connections:
1. Open Chrome DevTools
2. Network tab → Throttling dropdown
3. Select "Slow 3G" or "Fast 3G"
4. Reload and test

## 📊 Key Metrics to Monitor

### Core Web Vitals

1. **LCP (Largest Contentful Paint)** - Should be < 2.5s
   - Time to render the largest content element

2. **FID (First Input Delay)** - Should be < 100ms
   - Time from first user interaction to browser response

3. **CLS (Cumulative Layout Shift)** - Should be < 0.1
   - Visual stability measure

4. **FCP (First Contentful Paint)** - Should be < 1.8s
   - Time to first content render

5. **TTFB (Time to First Byte)** - Should be < 600ms
   - Server response time

## 🚀 Optimization Checklist

### ✅ Already Implemented

- [x] Next.js Image optimization
- [x] Font optimization with `display: swap`
- [x] Code splitting with Suspense
- [x] Package import optimization for large libraries
- [x] ISR (Incremental Static Regeneration) with `revalidate: 60`

### 🔧 Recommended Optimizations

#### 1. Image Optimization

**Current Status**: Using Next.js Image component ✅

**Additional improvements**:
- Ensure all images use `priority` only for above-the-fold images
- Use `loading="lazy"` for below-the-fold images (default)
- Consider using WebP format for all images
- Add `sizes` prop for responsive images

```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold} // Only for hero images
/>
```

#### 2. Font Optimization

**Current Status**: Good font setup ✅

**Additional improvements**:
- Consider subsetting fonts to only include needed characters
- Preload critical fonts in layout.tsx

#### 3. JavaScript Bundle Size

**Actions needed**:
- Run `npm run analyze` to identify large dependencies
- Consider dynamic imports for heavy components
- Lazy load non-critical libraries

Example:
```tsx
// Instead of:
import HeavyComponent from './HeavyComponent';

// Use:
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // If not needed for SEO
});
```

#### 4. Sanity Data Fetching

**Current Status**: Using API route for client-side fetches

**Optimizations**:
- Add request deduplication
- Implement proper caching headers
- Consider using React Query or SWR for client-side caching
- Use Next.js `fetch` with caching for server components

#### 5. Third-Party Scripts

**Current Issue**: CookieYes script loads on every page

**Optimization**:
```tsx
// Consider loading only after user interaction or with lower priority
<Script
  id="cookieyes"
  strategy="lazyOnload" // Instead of afterInteractive
  src="..."
/>
```

#### 6. CSS Optimization

**Actions needed**:
- Ensure Tailwind CSS is purging unused styles
- Consider critical CSS extraction for above-the-fold content
- Minimize CSS-in-JS runtime overhead

#### 7. API Route Optimization

**Actions needed**:
- Add response caching
- Implement rate limiting
- Add request validation
- Consider edge runtime for better performance

#### 8. Component Optimization

**Actions needed**:
- Memoize expensive calculations
- Use `React.memo` for components that re-render frequently
- Optimize Framer Motion animations (reduce complexity)
- Lazy load Swiper components

#### 9. Metadata and SEO

**Current Status**: Good metadata setup ✅

**Additional improvements**:
- Add structured data (JSON-LD)
- Optimize Open Graph images
- Ensure all pages have unique metadata

#### 10. Caching Strategy

**Actions needed**:
- Implement proper cache headers
- Use Next.js `unstable_cache` for expensive computations
- Consider CDN caching for static assets
- Add service worker for offline support (optional)

## 🔍 Performance Audit Process

1. **Baseline Measurement**
   ```bash
   npm run perf:build
   ```
   Save the initial Lighthouse report

2. **Identify Issues**
   - Review Lighthouse report
   - Check bundle analyzer output
   - Review Chrome DevTools performance tab

3. **Prioritize Fixes**
   - Focus on Core Web Vitals first
   - Address largest bundle sizes
   - Fix render-blocking resources

4. **Implement Optimizations**
   - Make changes incrementally
   - Test after each change

5. **Re-measure**
   ```bash
   npm run perf:build
   ```
   Compare with baseline

6. **Monitor in Production**
   - Set up Web Vitals monitoring
   - Track real user metrics
   - Set up alerts for performance regressions

## 📈 Target Performance Scores

Aim for these Lighthouse scores:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🛠️ Tools & Resources

- **Lighthouse**: Built-in Chrome tool
- **WebPageTest**: https://www.webpagetest.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Bundle Analyzer**: `npm run analyze`
- **Chrome DevTools**: Performance and Network tabs
- **Next.js Analytics**: Built-in performance monitoring

## 📝 Quick Performance Checklist

Before deploying:

- [ ] Run `npm run build` and check bundle sizes
- [ ] Run `npm run analyze` and review large dependencies
- [ ] Test with Lighthouse (score > 90)
- [ ] Test on slow 3G connection
- [ ] Verify all images are optimized
- [ ] Check that fonts are properly loaded
- [ ] Ensure no render-blocking resources
- [ ] Verify Core Web Vitals are within targets
- [ ] Test on mobile devices
- [ ] Check API response times

## 🚨 Common Performance Issues

1. **Large JavaScript bundles**
   - Solution: Code splitting, dynamic imports

2. **Unoptimized images**
   - Solution: Use Next.js Image, WebP format, proper sizing

3. **Render-blocking CSS/JS**
   - Solution: Defer non-critical resources

4. **Excessive re-renders**
   - Solution: React.memo, useMemo, useCallback

5. **Large third-party scripts**
   - Solution: Lazy load, use lighter alternatives

6. **Inefficient data fetching**
   - Solution: Caching, request deduplication, ISR

7. **Unused CSS/JS**
   - Solution: Tree shaking, code splitting

## 📚 Additional Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)


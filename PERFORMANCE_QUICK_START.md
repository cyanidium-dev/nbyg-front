# Performance Testing Quick Start

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run Your First Performance Audit

```bash
# Build and analyze bundle
npm run analyze

# For Lighthouse test:
# 1. Build and start production server
npm run build
npm run start

# 2. In another terminal, run Lighthouse
npm run perf:lighthouse
```

### Step 3: Review Results

- **Bundle Analyzer**: Opens automatically in browser showing bundle sizes
- **Lighthouse Report**: Saved as `lighthouse-report.html` in project root

## 📊 Understanding Your Results

### Bundle Analyzer

- **Red/Yellow sections**: Large packages that need optimization
- **Look for**: Duplicate dependencies, large libraries, unused code

### Lighthouse Report

- **Performance Score**: Aim for 90+
- **Core Web Vitals**:
  - LCP < 2.5s ✅
  - FID < 100ms ✅
  - CLS < 0.1 ✅

## 🎯 Quick Wins (Start Here)

1. **Check Bundle Size**

   ```bash
   npm run analyze
   ```

   Look for packages > 100KB

2. **Test Performance**

   ```bash
   npm run build
   npm run start
   # Open http://localhost:3000 in Chrome
   # Run Lighthouse from DevTools
   ```

3. **Review Images**
   - Ensure all use Next.js `Image` component
   - Add `priority` only to hero images
   - Add `sizes` prop for responsive images

4. **Check Third-Party Scripts**
   - Review `src/app/layout.tsx`
   - Consider lazy loading non-critical scripts

## 📈 Next Steps

1. Read `PERFORMANCE_GUIDE.md` for comprehensive testing
2. Review `OPTIMIZATION_RECOMMENDATIONS.md` for specific fixes
3. Implement optimizations one at a time
4. Re-test after each change

## 🔧 Common Commands

```bash
# Analyze bundle size
npm run analyze

# Build production bundle
npm run build

# Test with Lighthouse
npm run perf:lighthouse

# Full performance test
npm run perf:build
```

## 💡 Pro Tips

- Test on **mobile devices** or use Chrome DevTools device emulation
- Use **throttled network** (Slow 3G) to see real-world performance
- Compare **before and after** each optimization
- Focus on **Core Web Vitals** first - they impact SEO

## 🆘 Need Help?

- Check `PERFORMANCE_GUIDE.md` for detailed explanations
- Review `OPTIMIZATION_RECOMMENDATIONS.md` for specific fixes
- Use Chrome DevTools Performance tab for deep analysis

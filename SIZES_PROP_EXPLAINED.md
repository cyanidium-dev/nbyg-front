# How to Determine the `sizes` Prop Value

## Understanding the `sizes` Attribute

The `sizes` attribute tells the browser **how much space the image will take
up** in the viewport, so it can load the appropriately sized image.

## The Problem with My Initial Guess

I suggested: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`

This was a **generic guess** based on common patterns, but it doesn't match your
actual layout!

## Your Actual Layout

Looking at `GallerySlider.tsx`:

1. **It's a coverflow slider** with `slidesPerView: "auto"`
2. **Slides are scaled** (0.9-0.94 scale factor)
3. **Slides are centered** with coverflow effect
4. **The visible width is complex** - depends on scaling, stretching, and
   viewport

## How to Calculate the Correct `sizes` Value

### Method 1: Measure the Actual Visible Width

1. **Open your site in browser DevTools**
2. **Inspect a gallery slide image**
3. **Check the computed width** at different viewport sizes:
   - Mobile (375px viewport): What's the actual image width?
   - Tablet (768px viewport): What's the actual image width?
   - Desktop (1024px+ viewport): What's the actual image width?

### Method 2: Calculate Based on Container

For a coverflow slider, the visible slide width is approximately:

```
Visible width = (Viewport width × scale factor) - (stretch / 2)
```

But this is complex. A simpler approach:

### Method 3: Use a Safe Estimate

For a **coverflow slider** where slides are scaled and centered:

```tsx
// Conservative estimate - ensures we don't load oversized images
sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 60vw";
```

**Why these values?**

- Mobile: Slides take ~90% of viewport (accounting for scaling)
- Tablet: Slides take ~70% of viewport
- Desktop: Slides take ~60% of viewport (more space for other content)

### Method 4: Measure in Browser (Most Accurate)

1. Open your site
2. Open DevTools → Console
3. Run this to measure actual image width:

```javascript
// Measure gallery slide width at different viewport sizes
const measureSlide = () => {
  const slide = document.querySelector(".gallery-slider .swiper-slide");
  if (slide) {
    const rect = slide.getBoundingClientRect();
    console.log(
      `Viewport: ${window.innerWidth}px, Slide width: ${rect.width}px`
    );
  }
};

// Resize window and call measureSlide() at different sizes
measureSlide();
```

Then use those measurements to create accurate `sizes`:

```tsx
// Example based on measurements
sizes = "(max-width: 640px) 340px, (max-width: 1024px) 500px, 600px";
```

## For Your Gallery Slider Specifically

Since it's a **coverflow slider with auto slides**, I'd recommend:

```tsx
// Option 1: Viewport-based (safer, works for all screen sizes)
sizes = "(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 55vw";

// Option 2: Fixed pixel values (more precise, but less flexible)
// Measure first, then use:
sizes = "(max-width: 640px) 320px, (max-width: 1024px) 480px, 560px";
```

## How to Verify

After setting `sizes`, check in DevTools:

1. **Network tab** → Filter by "Img"
2. **Reload page**
3. **Check image URLs** - they should have `?w=XXX` parameter
4. **Verify** the `w` value matches your expected sizes

Example:

- At 375px viewport: Should load `?w=320` (85% of 375px ≈ 320px)
- At 768px viewport: Should load `?w=500` (65% of 768px ≈ 500px)
- At 1920px viewport: Should load `?w=1056` (55% of 1920px ≈ 1056px)

## Best Practice

**For coverflow/carousel sliders**, use a conservative estimate that accounts
for:

- Scaling effects
- Spacing between slides
- Container padding

**Recommended starting point:**

```tsx
sizes = "(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 55vw";
```

Then **measure and refine** based on actual usage!

## Quick Reference

| Layout Type      | Recommended `sizes`                                       |
| ---------------- | --------------------------------------------------------- |
| Full-width hero  | `100vw`                                                   |
| Grid (2 columns) | `(max-width: 768px) 100vw, 50vw`                          |
| Grid (3 columns) | `(max-width: 768px) 100vw, 33vw`                          |
| Coverflow slider | `(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 55vw` |
| Modal/lightbox   | `(max-width: 768px) 100vw, 80vw`                          |

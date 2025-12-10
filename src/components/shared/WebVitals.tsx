"use client";

import { useEffect } from "react";

/**
 * Web Vitals monitoring component
 * Logs Core Web Vitals metrics to console
 * Replace console.log with your analytics service
 */
export function WebVitals() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import web-vitals to reduce bundle size
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToAnalytics = (metric: {
        name: string;
        value: number;
        id: string;
        delta: number;
        rating: string;
      }) => {
        // TODO: Replace with your analytics service
        // Example: Google Analytics, Vercel Analytics, etc.
        console.log("Web Vital:", {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          rating: metric.rating,
        });

        // Example: Send to Google Analytics
        // if (typeof window.gtag !== 'undefined') {
        //   window.gtag('event', metric.name, {
        //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        //     event_label: metric.id,
        //     non_interaction: true,
        //   });
        // }
      };

      onCLS(sendToAnalytics);
      onINP(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    });
  }, []);

  return null;
}

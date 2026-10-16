# Web Performance

Extends [shared performance](../common/performance.md).

## Selected budgets
Set budgets for the actual audience, devices, network and browser/webview. Upstream starting examples below are not universal release gates or claims about current external standards:
- LCP below 2.5s, INP below 200ms, CLS below 0.1.
- Lab examples: FCP below 1.5s and TBT below 200ms.
- Gzipped JS/CSS examples: landing 150/30 KB, app 300/50 KB, microsite 80/15 KB.
Record baseline, measurement conditions, selected thresholds and regressions. Local desktop surfaces may need different startup/interaction/memory goals.

## Loading
Reduce blocking work, defer noncritical code and dynamically import heavy optional modules where supported. Preload only proven critical resources; do not add an animation library to match an example.

## Images and fonts
Reserve image dimensions/aspect ratio. Prioritize the actual LCP image, lazy-load appropriate offscreen assets and use efficient compatible formats. Avoid oversized assets and unnecessary font families/weights; subset/preload selectively with a supported font-display strategy.

## Animation and checks
Prefer cheap properties and CSS for simple transitions, requestAnimationFrame where appropriate, narrow will-change and low-churn scroll handling. Honor reduced motion and measure expensive clipping/filter effects. Inspect shifts, blocking resources, sizing and third-party scripts. Distinguish lab from real-user evidence.

Use [performance optimization](../../skills/engineering/performance-optimization/SKILL.md).

# Harbor Family Planner App Icon

Status: **brand assets ready; runtime integration pending app migration**

## Included assets

```text
public/favicon.svg
public/icons/harbor-app-icon.svg
public/site.webmanifest
```

The mark combines Harbor's three main ideas:

- a home for family life
- an anchor for stability
- sunrise and water for the Harbor identity

## Add to the application head

When the Harbor Family Planner runtime is migrated into this repository, add these tags to the application's HTML head or framework metadata:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="apple-touch-icon" href="/icons/harbor-app-icon-180.png" />
<meta name="theme-color" content="#123F4E" />
<meta name="application-name" content="Harbor Family Planner" />
<meta name="apple-mobile-web-app-title" content="Harbor" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

## Required raster exports before launch

Export the master SVG without changing its canvas or composition:

```text
public/icons/harbor-app-icon-180.png   180 x 180   iPhone and iPad home screen
public/icons/harbor-app-icon-192.png   192 x 192   Android install icon
public/icons/harbor-app-icon-512.png   512 x 512   Android splash and install icon
```

After those PNGs exist, expand `public/site.webmanifest` with the 192 and 512 entries. Keep the SVG entry as the scalable fallback and maskable icon.

## Framework notes

- **Vite / plain HTML:** add the tags to `index.html`.
- **Next.js App Router:** add the manifest, icons, theme color, and Apple web-app settings through `app/metadata` or the root layout metadata export.
- **React frameworks with a public directory:** preserve the paths exactly as written above.

## Acceptance check

1. Browser tab displays the Harbor favicon.
2. Bookmark displays the Harbor mark.
3. Android install prompt uses the Harbor icon and opens standalone.
4. iPhone **Add to Home Screen** uses the 180 px PNG rather than a page screenshot.
5. The icon remains centered and readable inside circular, rounded-square, and maskable crops.

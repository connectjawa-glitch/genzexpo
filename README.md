# genzexpo

Public website for **Erode Genz Agri Expo 2027**: six languages, animated 3D and flat hall maps, 193 stall details, event programme, mobile layouts and WhatsApp enquiries.

The frontend lives in `dist/`. The admin portal and booking backend are maintained separately in [connectjawa-glitch/genzexpoadmin](https://github.com/connectjawa-glitch/genzexpoadmin).

## Preview the website

From this repository run:

```sh
python -m http.server 8000 --directory dist
```

Open <http://localhost:8000>. Use an HTTP server; opening index.html directly may block JavaScript modules. No frontend dependency installation is required for this static preview.

## Deploy the public website on Vercel

Import this repository and use these project settings:

| Setting | Value |
| --- | --- |
| Root Directory | Repository root (`.`); do not set it to `dist` |
| Framework Preset | Other |
| Build Command | Empty / no build |
| Install Command | Empty / skip install |
| Output Directory | `dist` |

The root `vercel.json` sets the static output and skips build/install. If an older deployment shows404, check the Root Directory setting, save it and redeploy the latest `main` commit. There is no index.html at the repository root; the homepage is dist/index.html.

On Vercel, fixed rewrites forward the public `/api/bookings` feed and project ZIP downloads to the existing live backend. No admin login or write endpoint is proxied. Keep using the existing secure [admin portal](https://erode-genz-agri-expo-2027.surprisingiris2.chatgpt.site/admin). This configuration hosts the public frontend on Vercel; it does not migrate the Cloudflare Worker/D1 backend.

## Booking updates and the full build

The public map reads `/api/bookings` on the same origin. A static-only preview works, but shows an unavailable booking-update indicator until the backend is connected. The component ZIP-download routes also require the combined Worker backend.

These repositories are components of one application, not separate deployable booking systems. Follow the admin repository's combined-build instructions to merge the public `dist/` files and `README-WEBSITE.md` into its working copy, then build and publish the complete app.

Shared stall data, event logo, favicon and release metadata are deliberately identical in both repositories. Preserve the admin-specific files when merging.

See `PROJECT-NOTES.md`, `README-WEBSITE.md` and `dist/records/` for source annotations, artwork attribution, verification history and unresolved brochure details. Reconstructed logos and artwork remain explicitly identified. Credentials, sessions and live booking data are not included.

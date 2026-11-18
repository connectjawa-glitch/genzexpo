# Public expo website

This ZIP contains the public HTML, six-language content, 3D/flat hall renderers, mobile styles, WhatsApp enquiry flow, logos/artwork, vendor license and source notes. Admin screens and the booking backend are in the separate admin ZIP.

For a static preview, serve the dist folder with an HTTP static server rather than opening index.html directly. For example, run `python -m http.server 8000 --directory dist` and open http://localhost:8000. Live booking tags require the same-origin booking backend; a static-only preview shows an unavailable booking-update indicator.

To restore the full deployable project, extract this ZIP and the admin ZIP into the same parent directory, merging the common erode-genz-expo folder. Shared data/logo files are intentionally identical in both ZIPs. See README-ADMIN.md and README.md for build and Worker/D1 setup.

Source notes identify reconstructed logos/artwork and unresolved brochure details. Passwords and live database contents are excluded from both downloads.

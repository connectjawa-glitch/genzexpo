# Verification record — completed hall revision

## Source and geometry
- 193 unique, non-overlapping stalls; all six tariff counts and both halls’ source map-color totals reconcile.
- 190 content/control keys have all six language versions. All authored JavaScript modules pass syntax checks.
- Nineteen source-directed lanes clear every stall and marked stair/lift/toilet/LED/experience-zone block, with a clearance margin. Sampled positions stay inside the schematic hall footprint.
- Fourteen key arrow directions are asserted against the re-supplied plans. All three mapped entry/exit openings remain free of perimeter rails.
- Facility and booth rectangles do not overlap. The first-floor approach is a passage. The small staircase above Hall1’s toilet is represented as a blocked facility.
- Raised number picking is checked independently of underlying floor geometry for shallow viewing angles.

## Hosted browser checks
- Public site opened in the Cloud browser. The browser has no WebGL context, and the compatible orthographic 3D renderer initialized successfully.
- Hall switching, 3D/flat-view selection continuity, quick picks, direct 3D canvas picking (stall66), previous/next selection, focus and zoom were exercised.
- Hall2 stall173 correctly displays Star Gold, INR50,000 and20×20. Searching149 displays the explicit198/149 source discrepancy. Silver filtering returns52 stalls. Global search jumps across halls only on Enter or the search arrow.
- Aisle tour chapter progress, pause/resume, direction visibility and reset were exercised.
- All six language switches preserved selected stall14. Enquiry dialog contained the selected hall/stall/tier/price/dimensions, and was closed without calling or submitting a reservation.
- A388-CSS-pixel viewport was checked by resizing the browser window and adjusting browser zoom. Tamil layout had no horizontal overflow. Browser zoom and desktop window size were then restored. This was a width/responsiveness check, not a physical touch-device test.
- Spatial keyboard selection moved14→13 in the source-plan direction.
- Expanded detail and scene panels have equal height and independent detail scrolling; the toolbar remains in place. The selected-stall callout does not cover its selected tile after resizing.
- App-origin console errors were absent during the hosted checks. Browser-extension metadata warnings are unrelated.
- Review images: hall1-3d-preview.jpg and hall2-preview.jpg.

## Remaining source limits
- The hardware-WebGL rendering branch was not visually exercised because the Cloud browser disables WebGL. The compatible3D branch was reviewed.
- Maps remain schematic reference interpretations, not surveyed or certified egress plans. Printed circulation arrows are illustrated; the camera tour transitions overhead between lane chapters, not along invented return routes.
- Original logo/poster binaries and QR destination are still missing. Logos are explicitly labelled recreations.
- Translations have not received native-speaker approval.

## Selection, floor and motion revision — 17 November 2026
- Stall clicks now animate a bounded local focus in both renderers and the flat plan. Absolute framing prevents repeated clicks from multiplying the zoom. Rapid selections cancel the previous plan transition.
- Removed the overlapping standalone WebGL floor. The extrusion has a single cream floor cap and brown side faces, eliminating the duplicate surfaces responsible for triangular depth fighting. Numeric labels use a stable overlay layer.
- Both 3D renderers use shared one-way pedestrian/arrow progress, evenly spaced walkers, entrance/exit fades and forward walking gait. The reference geometry and lane directions are unchanged.
- Compatible 3D numbers are painted after every booth floor, with the selected number last. Popup placement uses the selected tile bounds. Selection no longer rebuilds directory buttons or stacks detail-card animations.
- The details card uses a responsive grid on narrow screens; numeric search uses a 16px input to avoid automatic mobile browser zoom.
- `node verify-view.mjs` exercises actual Three.js CPU geometry/animation, all 193 focused frames, one floor cap without duplicate faces, camera retarget/reset, all 19 directed paths, label ordering, popup clearance and resource disposal on hall changes. It does not substitute for hardware WebGL visual inspection.

### Hosted checks for this revision
- Live 3D selections65 and173 focused their local floor area while keeping the updated information panel readable. The compatible renderer was used because this Cloud browser cannot create hardware WebGL contexts.
- Rapid flat-plan selection14→119 settled on119. Repeated focus produced the identical viewBox (58.095238×57.142857 for Hall1), confirming an absolute2.1× scale rather than compounded zoom.
- Selected labels and callouts stayed clear in the focused views. Hall2 stall173 showed Star Gold, INR50,000 and20×20.
- All six language layouts were checked at393CSS pixels: no document horizontal overflow and no overlap between stall identification and price. Numeric search remained16px. Browser zoom was restored to100%, language to English. This was a width check, not a physical touch-device test.
- No application-origin console errors were observed; logged errors belonged to the browser extension. The local preview relay remained unavailable, so QA used the published Site. Hardware WebGL visual verification remains unperformed; its actual geometry and animation code passed CPU regression checks.
- The existing Hall1 preview was refreshed to show the current focused3D selection.

## Rotation stability revision — 17 November 2026
- WebGL arrows are now allocated per lane length with unique evenly spaced offsets. The old fixed54-arrow allocation placed six exactly coincident arrows on Hall1’s4.5-unit connector. Fading arrows no longer write to the depth buffer.
- The selected outline is a steady overlay with depth testing/writing disabled. Low stall plates no longer cast floor-intersecting shadows, and filtered transparent plates do not write depth.
- OrbitControls receives elapsed delta time. Pointer tracking distinguishes a click from a drag that returns to its start, multitouch/pinch and pointer cancellation, preventing unintended selection zooms after rotation gestures.
- The compatible renderer uses a rotation-independent fit scale, the correct visible side faces in every quadrant, depth-sorted walkers and shortest-path yaw interpolation. Focus retains the current viewing angle.
- Popup placement has above/below hysteresis and hides rather than covering a tile when neither side has clearance.
- The complete local JavaScript/CSS/import-map dependency graph receives one deterministic release version. The prepare/verify scripts check every local code reference and the content fingerprint; repeated preparation changes no files.
- Regression checks cover full-turn scale, four side-face quadrants, people/geometry depth order, unique arrow offsets, overlay depth flags, frame delta, all193 focused stalls, drag-return/multitouch/cancel selection guards and release coherence.
- Local preview relay remains unavailable. Hardware WebGL visual verification remains pending; geometry and animation assertions run against the actual Three.js scene methods.

### Hosted rotation checks for this release
- Opened the fresh `?v=af9911038113e42e#halls` page and verified its DOM release metadata matches the prepared graph. The compatible3D renderer initialized; no application-origin console errors were observed.
- Exercised auto-rotation in Hall1 and manual rotation in Hall2. Hall2 stall173 remained selected after dragging. Stall58 selection after rotation zoomed to its local area while retaining the view direction and readable price panel.
- The current rotated Hall1/stall58 frame replaces the previous Hall1 preview. Source color/tariff records and all printed circulation lanes are unchanged. Hardware WebGL visuals remain untested in this browser; its duplicate-arrow, overlay-depth, delta-time, gesture and focus regressions passed in the actual Three.js code.

## WhatsApp enquiry revision —18November2026
- Added selected-stall and contact WhatsApp entry points for+917305749636. Existing phone-call links remain available.
- The form snapshots hall/stall/tier/dimensions/brochure price and source caveats, adds visitor name/mobile plus optional business/message and an explicit Asia/Kolkata draft-prepared timestamp. General enquiries work without a selected stall.
- All sixteen new interface/draft/validation keys have six language versions. Changing language updates the draft without rebuilding visitor inputs.
- A native UTF-8 GET form submits only the reviewed readonly `text` field to wa.me in a separate tab after visitor action; the visitor must send the message in WhatsApp. No reservation, automatic message sending or server-side visitor storage was added.
- `verify-whatsapp.mjs` checks193stalls×six languages, exact recipient, source caveats, visitor text/Unicode/URL encoding, general enquiries, IST midnight rollover and phone validation.

### Hosted WhatsApp checks
- Selected Hall1/stall65 and Hall2/stall173 produced their respective price/tier/size in the draft; changing stalls retained fictional visitor fields. General enquiry removed stall-specific details.
- Tamil switching updated the draft and labels while preserving visitor inputs. Live preview included the explicit IST preparation timestamp.
- Invalid short phone input was blocked and focused by the native form. Valid fictional input passed field validity checks. The only named successful form field is text, with a UTF-8 GET target of https://wa.me/917305749636 in a new tab.
- Checked the narrow393-CSS-pixel layout: no horizontal page overflow, dialog within the viewport and16px visitor inputs. Browser zoom was restored to100%, language to English and fictional fields cleared. This was a width check, not a physical device test.
- Saved whatsapp-enquiry-preview.png with clearly fictional sample details. No test draft was submitted to WhatsApp and no message was sent. WhatsApp app handoff/send remains a visitor action.

## Shared booking admin revision —18November2026
- Added a separate /admin password login and all193-stall management view. Admins can add/remove Booked tags, search across both halls, filter tags and review source caveats. Initial booking state has no invented reservations.
- A Worker/D1 backend stores status across devices and deployments. The password hash is a runtime secret; random sessions are stored as hashes, expire after8hours and are revoked on logout or password-hash rotation. Exact-origin writes, bounded JSON, prepared SQL and atomic login throttling protect admin endpoints. Revision checks reject stale writes.
- Public tags are separate from the brochure category colours and appear in the directory, detail, pin and all map renderers.20-second visible polling and focus refresh preserve selection/camera. Stale/offline states retain last-known tags and unmarked stalls carry no availability promise.
- Actual SQLite/Worker API tests cover migrations, login failures, cookie flags, authorization, cross-origin attacks, body limits, logout/expiry/rotation, throttling, booked/unmarked edits, first-write and later conflicts, payload guards and public data minimisation. Booking-client tests cover polling, visibility/focus, stale recovery, unknown/false states, renderer continuity and category colours.

### Hosted admin checks and response repair
- Sites accepted the D1 binding as the string DB and provisioned all three generated tables. Hosted /api/bookings returned200 with an empty booking list; anonymous admin session access returned401. No booked stalls have been invented.
- Fixed a hosting compatibility defect: stored compressed assets are decompressed inside the Worker before returning bytes. The hosted admin form and complete public page now render normally. Artifact tests enforce decoded response bytes independently of transport encoding.
- Hosted browser checked the password-protected admin login page, public3D selection65 and synced booking status in English/Tamil. The existing hall selection/price and WhatsApp action remain visible.
- Live signed-in editing was not exercised: browser policy requires secure user credential entry. The actual admin client mocked-API test and SQLite/backend tests cover login/session, saves/removal, conflicts and expiry. A separate Python HTTP check was rejected by hosting before credentials were transmitted; it was not retried or disguised.
- New admin password is issued in a private workspace access file, outside the repository, published assets and source backup.
- Saved admin-login-preview.jpg after verifying the final SVG icons and protected sign-in page. Private credentials are not present in the image.

## Mobile UI revision —18November2026
- Added mobile/tablet presentation overrides for the admin portal:44px touch targets,16px form controls, larger labels, stacked filters, adaptive three/two-column stall grids and compact readable details. Narrow-screen stall selection scrolls the details from the top and dismisses the numeric search keyboard after a successful jump.
- Public phone styles fix the late logo-width override, enlarge map/menu/search targets, wrap the three hall toolbar controls, keep all enquiry inputs/draft/selects at16px, and allow translated WhatsApp recipient labels to wrap. Authentication, booking APIs, stored tags, hall geometry and brochure content are unchanged.
- Actual admin client mocked-API checks continue to pass. Browser review uses a resized/zoomed Chromium viewport because DevTools device emulation is blocked by the managed browser; no policy was changed.
- Hosted width checks at322px,389px and429px found no horizontal overflow on the admin login page. Password text remains16px and submit/show targets meet44px. Public Malayalam header controls do not overlap at322px; map controls are44px and the enquiry dialog fits without horizontal overflow, with a16px draft.
- A high-specificity legacy non-English toolbar rule was identified in the hosted check and overridden in the final mobile stylesheet. Review image: mobile-admin-preview.jpg, captured from the native narrow browser window. These checks do not substitute for a physical phone test or signed-in admin layout review.

## Split project downloads —18November2026
- Added fixed download routes for admin and public website component ZIPs. Both retain the common erode-genz-expo folder and include component-specific setup notes; extracting both together restores all source files.
- The Worker copies the original compressed ZIP members into each download, avoiding duplicate large archive payloads. Original full-project download remains available.
- Verification inflates every member, checks CRCs, compares exact bytes against the full source ZIP, proves complete combined membership and validates required admin/public/shared dependencies. GET, HEAD, ETag304, attachment names and unsupported-method handling pass. Secrets, live data and nested/generated bundles are excluded.

# Specification

## Summary
**Goal:** Implement QR-based fire extinguisher service certificate management with secure public verification pages and admin PDF downloads.

**Planned changes:**
- Add backend certificate data model plus CRUD APIs for all specified certificate fields, including backend-generated certificate numbers and optional fields.
- Implement admin-only authorization (Internet Identity principals) for creating/editing/listing certificates, while keeping a public read-only verification lookup.
- Generate a unique non-guessable public verification token per certificate and expose a public lookup API keyed by that token.
- Add a public route `/certificate/$token` to render certificate details, compute validity (Valid/Expired), and show the specified expired warning text.
- Add a protected admin UI to create, edit, and list certificates, and show generated certificate number + verification token/URL after saving.
- Render QR codes in the admin view and public verification page, encoding the canonical verification URL.
- Add admin “Download PDF” for an A4 print-ready certificate including all details, QR code, and existing logo asset.
- Persist certificate records in upgrade-safe stable storage and apply a safe migration that preserves any existing stored data (e.g., contact inquiries).

**User-visible outcome:** Admins can log in to create/edit/list service certificates, view a generated QR verification link, and download a print-ready A4 PDF; the public can scan the QR code (or visit `/certificate/<token>`) to verify certificate details and see whether it is valid or expired.

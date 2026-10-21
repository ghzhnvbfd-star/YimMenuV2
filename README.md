# YimHub Modern

Modern, responsive German/English community hub based on the feature list and reference link.

## Included
- Responsive dark UI with lime accent and mobile navigation
- German / English language switch
- Four component cards with the supplied project links
- Status labels: Operational, Maintenance, Degraded, Unknown
- News and announcements section
- Newsletter signup form
- Admin login and dashboard to edit component status/description/link and create/edit/delete news
- Supabase persistence and row-level security policies
- Sample data so the UI can be previewed without a backend

## Run locally
1. Install Node.js 18+.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key (optional for UI preview).
4. Run `npm run dev`.

Without Supabase the public site displays sample content. A local-only admin login is included for private preview; component/news changes and newsletter signups are stored in the current browser only. They are not shared with visitors or other devices.

## Enable the backend
1. Create a Supabase project.
2. Paste `supabase/schema.sql` into the Supabase SQL Editor and run it.
3. In Supabase project settings, copy the Project URL and anon/public key to `.env`.
4. In Supabase Authentication, create your admin account. Do not expose a service-role key in frontend code.
5. For a production setup, restrict admin writes to a dedicated admin role rather than every authenticated user. This starter schema allows authenticated users to manage content, so only create trusted accounts and tighten policies before public launch.
6. Configure email confirmation / SMTP for production newsletter workflows. The current form stores email addresses; it does not yet send campaign emails or implement unsubscribe links.
7. Deploy to Vercel, Netlify, or another static host and add the environment variables.

## Important production notes
- Component status is manually maintained, not a real uptime monitor. The UI says so.
- Add CAPTCHA / rate limiting and double opt-in for public newsletter subscriptions.
- Add a dedicated admin-role table or claims-based policies before allowing public registration.
- Use HTTPS and configure your privacy policy / data retention for newsletter emails.
- The provided external links are displayed as submitted; confirm project policies and terms before publishing.


## Local-only admin mode warning
The requested admin credentials are configured in `src/main.jsx` for local preview convenience. **Do not deploy this credential-in-browser setup publicly**: anyone can inspect frontend JavaScript and discover the credentials. For a public site, connect Supabase or implement server-side authentication and admin authorization. The local mode saves changes in browser localStorage only; it is not a shared online CMS.

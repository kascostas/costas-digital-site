# Deploy physiostavros.com on Cloudflare Pages

## What to deploy
Use this folder as project root:
- `site/physiostavros`

Build command:
- none

Output directory:
- `/`

## Steps
1. Go to Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Upload assets.
2. Upload the `site/physiostavros` folder contents.
3. Set custom domain:
   - `physiostavros.com`
   - `www.physiostavros.com`
4. In DNS, ensure:
   - `physiostavros.com` is connected to Pages (Cloudflare auto-adds records)
   - `www` CNAME points to the Pages hostname.
5. SSL/TLS -> set mode to `Full`.
6. Confirm HTTPS works on:
   - `https://physiostavros.com`
   - `https://www.physiostavros.com`

## Post-deploy checks
- Home page loads
- Call button opens phone dialer
- WhatsApp button opens `wa.me/35799536252`
- Google Maps link opens clinic address
- Mobile layout works

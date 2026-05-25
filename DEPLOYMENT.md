# cPanel Deployment Guide - Customer Satisfaction Survey

This app has a React frontend + Node.js + MySQL backend.

## 1. Prepare Database in cPanel
1. Log into cPanel → MySQL Databases
2. Create database: `simi_customer_survey` (or use the one you have)
3. Create user: `simi_simi` + strong password
4. Add user to the database with ALL PRIVILEGES
5. Note the exact DB name, user, password (cPanel often prefixes, e.g. `youruser_simi_customer_survey`)

## 2. Update server/.env (IMPORTANT)
Edit `server/.env` on your local machine before uploading:
- Set strong `JWT_SECRET`
- Set `DB_USER`, `DB_PASS`, `DB_NAME` exactly as in cPanel
- `DB_HOST=localhost` (usually works on cPanel)
- Update email credentials if you want verification emails to work
- Set `CORS_ORIGIN=https://your-frontend-domain.com` after you know the URL (or keep * for testing)

## 3. Build React Frontend for Production
In project root (replace the backend port/URL with whatever cPanel assigns to your Node app):
```bash
# Example if backend runs on the same domain with a port:
REACT_APP_API_URL=https://anket.kombosotomotiv.com:30090 npm run build

# Or if you create a separate subdomain for the API (recommended):
# REACT_APP_API_URL=https://api.kombosotomotiv.com npm run build
```
- This creates a `build/` folder with static files.
- For cPanel subfolder deployments, adjust the homepage in package.json if needed.

## 4. Upload Files to cPanel
Recommended structure:
- Frontend (static): Upload contents of `build/` → `public_html/` (or a subfolder like `survey/`)
- Backend: Upload the entire `server/` folder to a private location, e.g.:
  - `/home/yourcpaneluser/survey-backend/`

Do **NOT** put backend files in public_html.

## 5. Setup Node.js Application in cPanel
1. Go to cPanel → "Setup Node.js App" (or "Node.js" under Software)
2. Create Application:
   - **Application root**: `survey-backend` (the folder containing server.js)
   - **Application URL**: Choose domain or create a subdomain (e.g. api.yourdomain.com) — recommended
   - **Application startup file**: `server.js`  (note: it's server/server.js → you may need to adjust or move server.js to the root of the Node app folder)
   - **Environment**: Production
3. Add Environment Variables (or upload the .env file and let Node read it):
   - All keys from your `server/.env`
4. Run `npm install` via the cPanel interface or SSH.
5. Start / Restart the app.

**Tip**: Many hosts require the `server.js` to be directly in the Application root. You can copy `server/server.js` + `package.json` + `node_modules` up one level, or change the startup file path.

## 6. Import Database Schema (if auto-init fails)
Use phpMyAdmin in cPanel:
- Select your database
- Import `database/setup.sql`

The server also auto-creates tables on first start (after the fix).

## 7. Set Frontend API URL
When building the React app, always pass the backend URL:
```bash
# For anket.kombosotomotiv.com frontend:
REACT_APP_API_URL=https://anket.kombosotomotiv.com:30090 npm run build
```
(Replace :30090 with the actual port or subdomain cPanel gives your Node.js app.)

Recommended: Create a subdomain like api.kombosotomotiv.com for the backend in cPanel for cleaner URLs.

## 8. Final Security Steps
- Change the default admin password in the users table
- Set `CORS_ORIGIN=https://anket.kombosotomotiv.com` in server/.env (no trailing slash)
- Use HTTPS everywhere
- Consider moving secrets out of .env into cPanel environment variables UI if available

## Common Issues
- "CORS error": Update `CORS_ORIGIN` and rebuild frontend with correct `REACT_APP_API_URL`
- Port conflict: cPanel controls the port via the Node app manager. Remove hard-coded PORT or let it override.
- Email not sending: Use cPanel's SMTP (localhost:25) or proper app password for Gmail.
- Tables missing columns: The server now creates the full schema on startup.

After deployment, update the admin credentials and test login/signup flow.

Need help with a specific step? Provide the exact error or your domain details.

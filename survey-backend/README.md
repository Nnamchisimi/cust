# Survey Backend - Ready for cPanel Phusion Passenger

This folder is pre-packaged for easy upload to cPanel Application Manager (Phusion Passenger).

## Files included
- server.js       → The Node.js backend
- package.json    → Dependencies
- .env            → Your production environment variables (edit before upload if needed)

## Upload Instructions

1. Upload this entire `survey-backend` folder to your home directory (not inside public_html).

2. In cPanel → Application Manager:
   - Application Name: Survey Backend
   - Deployment Domain: anket.kombosotomotiv.com   OR   api.anket.kombosotomotiv.com (recommended)
   - Application Path: survey-backend
   - Deployment Environment: Production

3. After registering:
   - Click the app → Run `npm install` (or use SSH: cd survey-backend && npm install)
   - Start the application

4. Note the URL that cPanel gives you (this is your BACKEND URL).

5. Use that backend URL when building the React frontend:
   ```bash
   REACT_APP_API_URL=https://your-backend-url npm run build
   ```

## Important
- The .env file already contains your DB credentials and CORS settings for anket.kombosotomotiv.com.
- Make sure JWT_SECRET is strong before uploading.
- After first start, the tables and default admin will be created automatically.

You can now zip this folder and upload it, or upload the files directly via File Manager.

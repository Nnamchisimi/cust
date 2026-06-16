# Production deployment configuration

## Files to upload to cPanel

### Frontend (React Build)
Upload the entire `build/` folder contents to your `public_html` or subdomain folder.

### Backend (Node.js API)
Upload the `survey-backend/` folder to a subdirectory (e.g., `api/`).

## Environment Setup

### Option 1: cPanel Environment Variables
Set these in cPanel's "Environment Variables" section:

```
PORT=30090
JWT_SECRET=your-secure-random-string-here
NODE_ENV=production
DB_HOST=localhost
DB_USER=your_cpanel_db_user
DB_PASS=your_cpanel_db_password
DB_NAME=your_cpanel_db_name
DB_PORT=3306
```

### Option 2: .env file in survey-backend folder
Create a `.env` file with the above values.

## cPanel Node.js Application Setup

1. Login to cPanel
2. Go to "Node.js Applications"
3. Click "Create Application"
4. Configure:
   - **Application Root**: `/home/yourusername/api` (or your path)
   - **Application Startup File**: `server.js`
   - **Environment**: Production
   - **Port**: 30090 (or any available port)
5. Click "Create Application"

## Database Setup

1. In cPanel, go to "MySQL Databases"
2. Create a new database (e.g., `yourusername_survey`)
3. Create a new database user
4. Add user to database with ALL privileges
5. Import the schema from `database/setup.sql`

## Final Steps

1. Start the Node.js application from cPanel
2. Test the API: `https://yourdomain.com/api/responses`
3. Deploy React build to public_html
4. Test the full application
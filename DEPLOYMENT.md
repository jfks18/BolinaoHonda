# Render.com Deployment Guide

## Overview

This guide will help you deploy the Honda Bolinao Service Management System to Render.com. The application consists of:
- **Frontend**: Next.js application (port 3000)
- **Backend**: Express.js API server (port 5000)
- **Database**: MySQL database

## Pre-Deployment Checklist

✅ Application builds successfully
- `npm run build` (Next.js frontend)
- `npm run build:server` (Express.js backend)

✅ Configuration files ready
- `render.yaml` - Infrastructure as code
- `.env.example` - Environment variable template
- `tsconfig.server.json` - Server TypeScript config

✅ Code improvements
- Fonts loaded via CDN to avoid build issues
- Standalone output mode enabled for Next.js
- Environment variable support for both dev and production

## Deployment Options

### Option A: Blueprint Deployment (Easiest)

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Blueprint on Render**
   - Visit https://dashboard.render.com/
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Select the repository containing this code
   - Render will detect `render.yaml` automatically

3. **Configure Environment Variables**
   
   After blueprint creates the services, add these environment variables to each service:
   
   **For bolinaohonda-api service:**
   ```
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=<your-web-service-url>
   DB_HOST=<mysql-host-from-render>
   DB_PORT=3306
   DB_USER=<mysql-user-from-render>
   DB_PASSWORD=<mysql-password-from-render>
   DB_NAME=bolinaohonda
   ```
   
   **For bolinaohonda-web service:**
   ```
   NODE_ENV=production
   PORT=3000
   CLIENT_URL=<your-web-service-url>
   ```

4. **Deploy**
   - Click "Apply" to create all services
   - Wait for builds to complete
   - Access your application!

### Option B: Manual Deployment

#### Step 1: Create MySQL Database

1. Go to Render Dashboard → "New" → "MySQL"
2. Settings:
   - Name: `bolinaohonda-db`
   - Database: `bolinaohonda`
   - User: (will be auto-generated)
   - Region: Choose closest to you
   - Plan: Free (or paid for better performance)
3. Click "Create Database"
4. **Save the connection details** - you'll need them later

#### Step 2: Deploy API Server

1. Go to Render Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Settings:
   - Name: `bolinaohonda-api`
   - Runtime: Node
   - Build Command: `npm install && npm run build:server`
   - Start Command: `npm run start:server`
   - Plan: Free (or paid)
4. Add environment variables (see list above)
5. Click "Create Web Service"

#### Step 3: Deploy Frontend

1. Go to Render Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Settings:
   - Name: `bolinaohonda-web`
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Free (or paid)
4. Add environment variables
5. Click "Create Web Service"

#### Step 4: Update CORS Settings

1. After the web service is deployed, copy its URL
2. Go to the API service settings
3. Update the `CLIENT_URL` environment variable with the web service URL
4. Save and redeploy

## Environment Variables Reference

### Required for API Service

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL for CORS | `https://your-app.onrender.com` |
| `DB_HOST` | MySQL host | `dpg-xxxxx.oregon-postgres.render.com` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | Database user | `bolinaohonda` |
| `DB_PASSWORD` | Database password | `<secret>` |
| `DB_NAME` | Database name | `bolinaohonda` |

### Required for Web Service

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3000` |
| `CLIENT_URL` | Frontend URL | `https://your-app.onrender.com` |

## Post-Deployment

### 1. Verify Deployment

**Check API Health:**
```bash
curl https://bolinaohonda-api.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Honda Bolinao Server is running",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "environment": "production"
}
```

**Check Frontend:**
Visit `https://bolinaohonda-web.onrender.com` in your browser

### 2. Monitor Logs

- Go to each service in Render Dashboard
- Click "Logs" tab
- Verify no errors
- Look for success messages:
  - ✅ Connected to MySQL database
  - ✅ Database tables initialized successfully
  - 🗄️ Database ready for operations

### 3. Database Verification

The application automatically creates these tables on first connection:
- `customers`
- `vehicles`
- `services`
- `appointments`

Check the API logs to confirm table creation was successful.

## Troubleshooting

### Build Fails

**Issue**: npm install fails
- **Solution**: Check Node version in Render settings (should be 18+)

**Issue**: TypeScript compilation errors
- **Solution**: Ensure all dependencies are in `package.json`

### Database Connection Fails

**Issue**: Cannot connect to database
- **Solution**: Verify all DB environment variables are correct
- **Solution**: Check database is running in Render dashboard
- **Solution**: Ensure internal connection URL is used (not external)

### CORS Errors

**Issue**: Frontend can't reach API
- **Solution**: Update `CLIENT_URL` in API service to match frontend URL
- **Solution**: Redeploy API service after changing environment variables

### Free Tier Spin Down

**Issue**: First request takes 30-60 seconds
- **Solution**: This is expected on free tier
- **Solution**: Upgrade to paid plan for always-on services
- **Solution**: Use a service like UptimeRobot to ping your app periodically

## Monitoring & Maintenance

### Health Checks

Render automatically monitors:
- API: `/health` endpoint
- Web: `/` endpoint (home page)

### Logs

Access logs from Render Dashboard:
- Real-time logs for debugging
- Historical logs available
- Filter by severity

### Updates

To deploy updates:
1. Push code to GitHub
2. Render auto-deploys from main branch
3. Or manually trigger deploy in dashboard

## Performance Optimization

### Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month of compute time
- Shared resources

### Recommendations

1. **Enable Auto-Deploy**: Automatic deployments on git push
2. **Use Health Checks**: Configure in Render to keep services warm
3. **Database Indexing**: Add indexes for frequently queried fields
4. **Connection Pooling**: Already configured in the app
5. **Upgrade to Paid**: For production use, consider paid plans

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Database Credentials**: Use strong passwords
3. **CORS**: Only allow specific origins
4. **HTTPS**: Render provides free SSL certificates
5. **Database Backups**: Enable in database settings

## Cost Estimates

### Free Tier
- 2 Web Services: Free (with spin-down)
- 1 MySQL Database: Free (90 days, then $7/month)
- SSL Certificates: Free
- **Total**: $0-7/month

### Starter Plan
- 2 Web Services: $7/month each
- 1 MySQL Database: $7/month
- **Total**: $21/month

## Support

If you encounter issues:

1. Check Render Status Page: https://status.render.com
2. Review Render Docs: https://render.com/docs
3. Check application logs in Render Dashboard
4. Verify environment variables are set correctly
5. Test database connectivity

## Next Steps

After successful deployment:

1. Set up custom domain (optional)
2. Configure automated backups
3. Set up monitoring/alerting
4. Review and optimize performance
5. Plan for scaling if needed

---

**Deployment Status**: ✅ Ready for Render.com
**Last Updated**: October 2025

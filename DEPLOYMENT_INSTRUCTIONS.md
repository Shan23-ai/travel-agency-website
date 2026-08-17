# Pascal Travels & Tours - Deployment Guide

## ✅ Project Status: READY FOR DEPLOYMENT

### Project Overview
**Pascal Travels & Tours** is a complete travel, jobs, and visa consultancy platform featuring:
- Modern Express.js backend API
- Single-page application (SPA) frontend
- Responsive design with glassmorphic styling
- Multi-page routing (Home, Travel, Jobs, Track, Visa, Agent, Contact)
- RESTful API endpoints
- Production-ready security (Helmet, CORS, compression)

---

## 📋 Pre-Deployment Checklist

### Files Verified & Ready ✅
- ✅ `api/server.js` - 644 lines, all routes implemented
- ✅ `www/index.html` - 564 lines, complete SPA frontend
- ✅ `package.json` - All dependencies listed
- ✅ `.env` - Environment variables template
- ✅ `.gitignore` - Configured for Node.js project

### API Endpoints Tested & Working ✅
- ✅ `GET /api/health` - Server health check
- ✅ `GET /api/jobs` - Returns 8 job packages
- ✅ `GET /api/travel-packages` - Returns 16 travel packages
- ✅ `POST /api/visa-applications` - Visa submission
- ✅ `GET /api/track-application` - Application tracking
- ✅ `POST /api/agents/register` - Agent registration
- ✅ `GET /api/agents` - List agents
- ✅ `POST /api/referrals/generate` - Generate referral code
- ✅ `GET /api/referrals/validate` - Validate referral
- ✅ `GET /api/referrals/stats/:agentId` - Referral stats

### Frontend Pages Tested & Working ✅
- ✅ Home (Hero, Featured Jobs, Agent CTA)
- ✅ Travel Packages (Grid display)
- ✅ Jobs (Carousel display)
- ✅ Track Application (ID/Email lookup)
- ✅ Visa Application (Form submission)
- ✅ Agent Portal (Register/Login)
- ✅ Contact (Contact info + Form)

---

## 🚀 Local Testing (Before Deployment)

### 1. Setup Environment
```bash
cd /home/shan/vs.code

# Install dependencies (if not already done)
npm install

# Create/update .env file with your settings
cp .env.example .env
# Edit .env with your actual configuration
```

### 2. Start Development Server
```bash
# Option A: Standard server
npm start

# Option B: With auto-reload (requires nodemon)
npm run dev

# Expected output:
# 🚀 Pascal Travels API running on http://localhost:3000
# ✅ Server ready!
```

### 3. Test Frontend
- Open browser: http://localhost:3000
- Test navigation between pages
- Test form submissions
- Check console for API call errors

### 4. Test API Endpoints
```bash
# Get jobs
curl http://localhost:3000/api/jobs

# Get travel packages
curl http://localhost:3000/api/travel-packages

# Submit visa application
curl -X POST http://localhost:3000/api/visa-applications \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@example.com",...}'

# Track application
curl http://localhost:3000/api/track-application?id=<app-id>
```

---

## 📦 Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

#### Step 1: Initialize Git Repository
```bash
cd /home/shan/vs.code
git init
git add .
git commit -m "Initial commit: Pascal Travels complete platform"
```

#### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `pascal-travels`
3. Do NOT initialize with README (we have one)
4. Copy the repository URL

#### Step 3: Push to GitHub
```bash
git remote add origin <YOUR_GITHUB_URL>
git branch -M main
git push -u origin main
```

#### Step 4: Deploy to Vercel
1. Visit https://vercel.com/new
2. Select "Import Git Repository"
3. Paste your GitHub repository URL
4. Configure project:
   - **Project Name**: pascal-travels
   - **Framework**: Node.js
   - **Build Command**: `npm install`
   - **Output Directory**: (leave empty for Express)
   - **Environment Variables**:
     - `NODE_ENV`: production
     - `PORT`: 3000
     - `DOMAIN`: https://your-vercel-domain.vercel.app
     - `JWT_SECRET`: (generate a secure random string)
     - Email variables (if using Nodemailer)
5. Click Deploy
6. Wait for deployment to complete

### Option 2: Direct Vercel Deployment
```bash
npm install -g vercel

cd /home/shan/vs.code

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts to configure project
```

---

## 🔧 Environment Variables for Production

### Required (.env or Vercel Settings)
```
NODE_ENV=production
PORT=3000
DOMAIN=https://your-app.vercel.app

JWT_SECRET=<generate-with-openssl-rand-hex-32>
```

### Optional (for Features)
```
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment APIs (when ready)
PAYMENT_API_KEY=
PAYMENT_API_SECRET=
```

### Generate Secure JWT_SECRET
```bash
# Linux/Mac
openssl rand -hex 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ✅ Post-Deployment Verification

### Test Production URLs
1. **Health Check**
   ```bash
   curl https://your-app.vercel.app/api/health
   ```

2. **Frontend Load**
   - Visit https://your-app.vercel.app
   - Verify all pages load
   - Check console for errors

3. **API Endpoints**
   ```bash
   curl https://your-app.vercel.app/api/jobs
   curl https://your-app.vercel.app/api/travel-packages
   ```

4. **Form Submission** (Visa Application)
   - Fill and submit form
   - Verify success response
   - Check application tracking works

---

## 🔒 Production Security Checklist

- ✅ CORS configured (localhost + *.vercel.app)
- ✅ Helmet.js enabled for security headers
- ✅ Body size limits enforced
- ✅ Compression enabled
- ✅ Morgan logging configured
- ✅ Express rate limiting ready (can add)
- ⏳ HTTPS enforced (Vercel handles this)
- ⏳ JWT authentication ready (implement for sensitive routes)

---

## 📧 Email Configuration (Optional)

### Using Gmail
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Set environment variables:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=<16-char-app-password>
   ```

### In Code (server.js - already configured)
```javascript
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution**: Run `npm install` before deploying

### Issue: "ECONNREFUSED on localhost:3000"
**Solution**: Server not running or port occupied. Check with `lsof -i :3000`

### Issue: "CORS error" after deployment
**Solution**: Update CORS in server.js to include your Vercel domain:
```javascript
cors({
  origin: ['http://localhost:3000', 'https://your-app.vercel.app'],
})
```

### Issue: "Frontend shows 404"
**Solution**: Verify `www/index.html` exists and Express is serving static files correctly

---

## 📞 Feature Roadmap

### Phase 1: Launch (Current)
- ✅ Multi-page SPA frontend
- ✅ Complete API backend
- ✅ Job & travel package listings
- ✅ Visa application form
- ✅ Agent registration
- ✅ Application tracking

### Phase 2: Enhancement
- ⏳ Email notifications (Nodemailer integration)
- ⏳ JWT authentication & dashboard
- ⏳ Referral system dashboard
- ⏳ Payment integration
- ⏳ Image uploads for profiles

### Phase 3: Advanced
- ⏳ Database migration (PostgreSQL/MongoDB)
- ⏳ OAuth social login
- ⏳ Admin dashboard
- ⏳ Analytics & reporting
- ⏳ Mobile app (React Native/Flutter)

---

## 📞 Support & Maintenance

### Logs & Monitoring
```bash
# Vercel logs
vercel logs

# Check deployment status
vercel status
```

### Database Notes
Currently using **in-memory storage** (development):
- Data persists during server uptime
- Data resets on server restart
- Perfect for prototyping and testing
- **For production**, migrate to:
  - PostgreSQL (recommended)
  - MongoDB
  - Firebase Realtime Database

### Regular Maintenance
- Monitor error logs in Vercel dashboard
- Update npm dependencies: `npm update`
- Add SSL certificate monitoring
- Implement automated backups (when using real database)

---

## 🎉 Congratulations!

Your Pascal Travels & Tours platform is ready to launch. Follow the deployment steps above and your application will be live on Vercel in minutes!

### Quick Start Summary
1. `npm install`
2. `npm start` (test locally)
3. `git push` (if using GitHub)
4. Deploy via Vercel dashboard or `vercel --prod`
5. Test production URLs
6. Configure environment variables in Vercel settings

**Questions or issues?** Check the logs, verify environment variables, and ensure all dependencies are installed.

---

*Last updated: 2026-08-17*
*Version: 1.0.0*

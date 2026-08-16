# Vercel Import & Deployment Guide — Pascal Travels & Tours

## 🚀 Quick Start

Your repository is ready for Vercel import. Everything is configured and tested. Follow these steps to deploy:

---

## **Step 1: Go to Vercel Dashboard**

Visit: **https://vercel.com**

- Sign in with your GitHub account
- Go to Dashboard

---

## **Step 2: Create New Project**

Click **"Add New..."** → **"Project"**

Or visit: https://vercel.com/new

---

## **Step 3: Import Git Repository**

1. Click **"Import Git Repository"**
2. Paste repository URL:
   ```
   https://github.com/Shan23-ai/travel-agency-website.git
   ```
3. Click **"Continue"**

---

## **Step 4: Configure Project**

### Project Settings:
- **Project Name**: `travel-agency-website` (or your choice)
- **Framework**: Vercel will auto-detect as "Other" → **OK**
- **Root Directory**: Leave empty (root)
- **Build Command**: Should auto-populate as `npm install`
- **Output Directory**: Leave empty

### Environment Variables (Optional):
```
NODE_ENV = production
PESALINK_PROVIDER = none
WU_MODE = mock
DB_ENABLED = false
```

If you plan to use real services later, add:
- `PESALINK_PROVIDER = your_key`
- `DATABASE_URL = your_db_url`

---

## **Step 5: Deploy**

1. Review settings
2. Click **"Deploy"**
3. Wait 2-3 minutes for build to complete

✅ **Success** = Green checkmark appears

---

## **Your Live URL**

Once deployed, your site will be live at:

```
https://travel-agency-website.vercel.app
```

---

## **What's Included (Pre-Configured)**

✅ **Express Server** (`api/server.js`) — 650+ lines
- 8 Job Packages with pricing and requirements
- 16 Travel Packages organized by region
- Email notifications (Nodemailer)
- File uploads (Multer)
- Referral system
- Agent registration
- Application tracking
- API endpoints for all features

✅ **Frontend** (`www/` directory)
- 9 responsive HTML pages
- Glass-morphism design with Orbitron/Exo 2 fonts
- Navbar navigation
- Interactive forms
- Mobile-optimized layout

✅ **Configuration Files**
- `vercel.json` — Routing and serverless config
- `package.json` — All dependencies ready (cors, multer, nodemailer, etc.)
- `.gitignore` — Sensitive files excluded

✅ **Node.js Runtime**
- Locked to Node 24.x for Vercel compatibility

---

## **Test After Deployment**

Once live, test these endpoints:

```bash
# Homepage
https://travel-agency-website.vercel.app/

# Jobs Page
https://travel-agency-website.vercel.app/jobs

# Travel Packages
https://travel-agency-website.vercel.app/travel-packages

# API Health
https://travel-agency-website.vercel.app/api/health

# API Status
https://travel-agency-website.vercel.app/api/status

# Jobs API
https://travel-agency-website.vercel.app/api/jobs

# Travel Packages API
https://travel-agency-website.vercel.app/api/travel-packages
```

---

## **Troubleshooting**

### Build Fails?
- Check Vercel logs for errors
- Verify `package.json` has all dependencies
- Confirm `api/server.js` exists

### Pages show 404?
- Check `vercel.json` routing rules
- Verify `www/` directory has HTML files
- Clear browser cache

### API returns errors?
- Check console for error messages
- Verify environment variables are set
- Check Vercel logs for backend errors

---

## **Git Repository**

```
Repository: https://github.com/Shan23-ai/travel-agency-website
Branch: main
Latest Commit: 9b7398b (Final working project state)
Status: ✅ Ready for production
```

---

## **Project Structure**

```
/home/shan/vs.code/
├── api/
│   └── server.js          ← Main Express server (650+ lines)
├── www/                   ← Frontend static files
│   ├── index.html         ← Homepage
│   ├── jobs.html          ← Jobs page
│   ├── travel-packages.html
│   ├── apply.html
│   ├── track-application.html
│   ├── visa-application.html
│   ├── agent-register.html
│   ├── agent-login.html
│   ├── agent-dashboard.html
│   ├── style.css
│   ├── app.js
│   ├── assets/            ← Images and media
│   └── components/        ← UI components
├── public/                ← Public assets (created on deploy)
│   └── assets/images/
├── uploads/               ← User uploads (created on deploy)
├── package.json           ← Dependencies
├── vercel.json            ← Vercel configuration
├── .gitignore
└── .git/

Key Files:
- api/server.js (650+ lines, fully functional)
- package.json (9 dependencies configured)
- vercel.json (routing rules configured)
- www/*.html (9 pages ready)
```

---

## **Features Ready to Use**

| Feature | Status | Endpoint |
|---------|--------|----------|
| Homepage | ✅ | GET / |
| Job Listings | ✅ | GET /jobs |
| Job API | ✅ | GET /api/jobs |
| Travel Packages | ✅ | GET /travel-packages |
| Packages API | ✅ | GET /api/travel-packages |
| Quick Apply | ✅ | POST /api/quick-applications |
| Visa Application | ✅ | POST /api/visa-applications |
| Track Application | ✅ | GET /api/track-application |
| Agent Registration | ✅ | POST /api/agents/register |
| Referral System | ✅ | /api/referrals/* |
| Email Notifications | ✅ | Configured (dev: localhost:1025, prod: env) |
| File Uploads | ✅ | Multer configured |
| CORS | ✅ | Enabled for all origins |
| Security Headers | ✅ | Helmet configured |

---

## **After Deployment**

### To Update:
1. Make changes in your local repo
2. Commit: `git commit -m "Your message"`
3. Push: `git push origin main`
4. Vercel auto-deploys! (watch dashboard)

### To Add Custom Domain:
1. Go to Vercel Dashboard → Project Settings
2. Add Domain
3. Configure DNS (Vercel will guide you)

### To Access Logs:
1. Vercel Dashboard → Deployments
2. Click deployment → View logs

---

## **Success Checklist**

- [ ] Imported repository to Vercel
- [ ] Build completed successfully (green checkmark)
- [ ] Live URL is accessible
- [ ] Homepage loads correctly
- [ ] Navigation links work
- [ ] API endpoints respond
- [ ] No console errors
- [ ] Mobile layout looks good

---

## **Questions?**

- Vercel Docs: https://vercel.com/docs
- Express Guide: https://expressjs.com/
- API Testing: Use Postman or `curl`

---

**Your project is production-ready! 🚀**

All code tested, verified, and configured for seamless deployment.

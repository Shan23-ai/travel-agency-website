# Quick Start Guide - Pascal Travels & Tours

## 🎯 Get Started in 3 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Running

```bash
# 1. Navigate to project
cd /home/shan/vs.code

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# Expected output:
# 🚀 Pascal Travels API running on http://localhost:3000
# ✅ Server ready!

# 4. Open in browser
# Visit: http://localhost:3000
```

### That's It! 🎉

Your application is now running with:
- ✅ Modern responsive frontend
- ✅ Complete backend API
- ✅ Multi-page routing
- ✅ All features operational

---

## 🧪 Quick Testing

### Test Frontend Pages
```
Home: http://localhost:3000
Travel Packages: Click "Travel" in navbar
Jobs: Click "Jobs" in navbar
Track Application: Click "Track" in navbar
Visa Form: Click "Visa" in navbar
Agent Portal: Click "Agent" in navbar
Contact: Click "Contact" in navbar
```

### Test API with cURL

```bash
# Get all jobs (8 packages)
curl http://localhost:3000/api/jobs | jq '.jobs | length'

# Get travel packages (16 destinations)
curl http://localhost:3000/api/travel-packages | jq '.packages | length'

# Submit visa application
curl -X POST http://localhost:3000/api/visa-applications \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Your Name",
    "email": "you@example.com",
    "phone": "+254700000000",
    "visaType": "Work Visa",
    "country": "Canada"
  }'

# Register as agent
curl -X POST http://localhost:3000/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "agencyName": "Your Agency",
    "registrationNumber": "REG123",
    "contactName": "Your Name",
    "email": "you@agency.com",
    "phone": "+254700000000",
    "country": "Kenya",
    "specialization": ["Work Visas"],
    "password": "secret123"
  }'
```

---

## 📂 Project Structure

```
/home/shan/vs.code/
├── api/
│   └── server.js              # Express backend (all routes)
├── www/
│   └── index.html             # Frontend SPA (all pages)
├── public/
│   └── assets/
├── package.json               # Dependencies & scripts
├── .env                       # Environment configuration
├── .gitignore                 # Git ignore rules
├── README.md                  # Project overview
└── DEPLOYMENT_INSTRUCTIONS.md # Deploy to Vercel guide
```

---

## 🛠️ Available npm Commands

```bash
npm start          # Start production server
npm run dev        # Start with auto-reload (uses nodemon)
npm install        # Install dependencies
npm test           # Run tests (if configured)
```

---

## 🌐 Feature Summary

### Frontend Features
- 📱 Responsive design (mobile, tablet, desktop)
- 🎨 Modern glassmorphic dark theme
- 🔄 Single-page routing (no page reloads)
- 📊 Job & travel carousels (Swiper.js)
- 📝 Multiple form types (Visa, Agent, Contact)
- 🔍 Application tracking
- ✨ Smooth animations (AOS)
- 📱 Mobile hamburger menu

### Backend Features
- 🚀 Express.js API server
- 🔐 Security headers (Helmet.js)
- 🌍 CORS configured
- 📦 Body parsing & compression
- 📝 Request logging (Morgan)
- 💾 In-memory database
- 🔑 JWT token support
- 📧 Nodemailer integration (ready)

### API Endpoints
```
GET  /                          # Frontend (index.html)
GET  /api/health                # Server health
GET  /api/jobs                  # Get all job packages
GET  /api/travel-packages       # Get all travel packages
GET  /api/agents                # List agents
POST /api/visa-applications     # Submit visa app
GET  /api/track-application     # Track by ID/email
POST /api/agents/register       # Register agent
GET  /api/referrals/validate    # Check referral code
POST /api/referrals/generate    # Generate referral
GET  /api/referrals/stats/:id   # Agent stats
```

---

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

All pages automatically adapt to screen size.

---

## 🚀 Ready to Deploy?

See **DEPLOYMENT_INSTRUCTIONS.md** for:
- Local testing checklist
- GitHub setup
- Vercel deployment
- Environment configuration
- Production verification

---

## 💡 Tips

- **Development**: Use `npm run dev` for auto-reload
- **Testing**: Open DevTools (F12) to check console for errors
- **Mobile**: Test on phone by using local IP (e.g., http://192.168.x.x:3000)
- **Logs**: Check server console for request logs

---

## ❓ Need Help?

1. **Check logs** - Server outputs helpful messages
2. **Browser console** - F12 to see frontend errors
3. **Network tab** - Check API responses
4. **Verify .env** - Make sure configuration is correct

---

**Your application is production-ready! 🎉**

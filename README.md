# 🌍 Pascal Travels & Tours

> **Your Dream Job Abroad Starts Here** — Premium travel, visa, and recruitment platform

A modern, production-ready platform built with **Express.js** backend and **vanilla JavaScript** frontend featuring glassmorphic design, responsive mobile UI, and complete RESTful API.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.19+-blue.svg)](https://expressjs.com)

---

## ✨ Key Features

### 🏠 Frontend (SPA - Single Page Application)
- ✅ **7 responsive pages**: Home, Travel, Jobs, Track, Visa, Agent, Contact
- ✅ **Modern design**: Glassmorphic dark theme with gradient accents
- ✅ **Mobile-first**: Fully responsive (mobile, tablet, desktop)
- ✅ **Auto-routing**: No page reloads, smooth transitions
- ✅ **Live carousels**: Swiper.js for jobs and travel packages
- ✅ **Form handling**: Visa apps, agent registration, contact messages
- ✅ **Toast notifications**: Auto-dismissing feedback messages
- ✅ **Hamburger menu**: Mobile navigation

### 🚀 Backend API (Express.js)
- ✅ **10+ endpoints**: Fully functional RESTful API
- ✅ **Job packages**: 8 international opportunities (Canada, Dubai, Qatar, etc.)
- ✅ **Travel packages**: 16 destinations across East Africa
- ✅ **Visa applications**: Submission & tracking system
- ✅ **Agent portal**: Registration, login, stats tracking
- ✅ **Referral system**: Generate & validate referral codes
- ✅ **Security**: Helmet.js, CORS, compression, rate-limiting ready
- ✅ **Production-ready**: Error handling, logging (Morgan), environment config

### 💼 Job Opportunities
8 premium international job packages:
- 🇨🇦 **Canada** - Construction Worker, Driver
- 🇦🇪 **Dubai** - Software Engineer, Nurse
- 🇶🇦 **Qatar** - Construction Worker
- 🇬🇧 **UK** - Nurse
- 🇦🇺 **Australia** - Construction Worker
- 🇦🇪 **UAE** - Teacher

### 🧳 Travel Experiences
16 curated travel packages including:
- Nairobi City Tours
- Maasai Mara Safari
- Mount Kilimanjaro
- Zanzibar Beach Resorts
- Mombasa Coastal Getaway
- And many more...

### 👥 Agent System
- 📋 Easy registration with document upload
- 💰 Referral commission tracking ($38 per placement)
- 📊 Dashboard with statistics
- 🎯 Specialization options (Work, Study, Travel, Local)

### 📧 Visa Services
- Online application submission
- Multi-visa type support
- Application tracking by ID/email
- Status updates (RECEIVED, PROCESSING, APPROVED, REJECTED)

---

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Backend** | Express.js | 4.19+ |
| **Runtime** | Node.js | 18+ |
| **Frontend** | Vanilla JS + HTML5 + CSS3 | Latest |
| **Security** | Helmet.js, CORS | Latest |
| **UI Library** | Swiper.js, AOS | v11 |
| **Database** | In-memory (dev) / PostgreSQL (prod) | - |
| **Deployment** | Vercel | Ready |

---

## 📦 Installation

### Quick Start (3 minutes)
```bash
# 1. Clone or download project
cd /home/shan/vs.code

# 2. Install dependencies
npm install

# 3. Start server
npm start

# 4. Open in browser
# Visit: http://localhost:3000
```

### Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env
```

---

## 🚀 Running the Application

### Development Mode
```bash
# With auto-reload
npm run dev

# Or standard mode
npm start
```

### Testing API Endpoints
```bash
# Get all jobs
curl http://localhost:3000/api/jobs | jq

# Get travel packages
curl http://localhost:3000/api/travel-packages | jq

# Submit visa application
curl -X POST http://localhost:3000/api/visa-applications \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+254700000000",
    "visaType": "Work Visa",
    "country": "Canada"
  }'
```

---

## 📂 Project Structure

```
pascal-travels/
├── api/
│   └── server.js              # Express backend (644 lines)
│                              # ✅ All routes implemented
├── www/
│   ├── index.html             # Frontend SPA (564 lines)
│   │                         # ✅ All pages & routing
│   ├── style.css              # Legacy CSS (now embedded)
│   └── assets/
├── public/
│   └── assets/images/
├── uploads/                   # User uploads directory
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
├── QUICK_START.md            # 3-minute setup guide
├── DEPLOYMENT_INSTRUCTIONS.md # Vercel deployment guide
└── docker-compose.yml         # Docker configuration

```

---

## 🔌 API Endpoints

### Public Endpoints
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/` | Frontend SPA | ✅ |
| `GET` | `/api/health` | Server health check | ✅ |
| `GET` | `/api/jobs` | List job packages (8) | ✅ |
| `GET` | `/api/travel-packages` | List travel packages (16) | ✅ |
| `GET` | `/api/agents` | List registered agents | ✅ |

### Form Submission
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `POST` | `/api/visa-applications` | Submit visa application | ✅ |
| `POST` | `/api/agents/register` | Register as agent | ✅ |

### Tracking & Referrals
| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/api/track-application?id=<id>` | Track application | ✅ |
| `POST` | `/api/referrals/generate` | Generate referral code | ✅ |
| `GET` | `/api/referrals/validate?code=<code>` | Validate referral | ✅ |
| `GET` | `/api/referrals/stats/:agentId` | Agent statistics | ✅ |

---

## 🎨 Design Features

### Glassmorphic Dark Theme
- **Primary Colors**: Navy (#1a1a2e), Pink (#e9456f), Gold (#f39c12)
- **Effects**: Blur, transparency, gradient text
- **Fonts**: Exo 2 (body), Orbitron (headings)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### UI Components
- Fixed navbar with logo and menu
- Hero section with CTAs
- Job & travel carousels (Swiper)
- Responsive card grids
- Form components with validation
- Toast notification system
- Mobile hamburger menu

---

## 🔐 Security Features

- ✅ **Helmet.js** — Security headers protection
- ✅ **CORS** — Configured for localhost & *.vercel.app
- ✅ **JWT** — Token support ready to implement
- ✅ **Body Limits** — Request size validation
- ✅ **Compression** — Gzip enabled
- ✅ **Environment Variables** — Sensitive config protection

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | Get running in 3 minutes |
| [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) | Deploy to Vercel |
| [API_DOCS.md](API_DOCS.md) | Full API reference (if exists) |

---

## 🚢 Deployment

### One-Click Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <github-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit https://vercel.com/new
   - Import GitHub repository
   - Configure environment variables
   - Click Deploy

3. **Your app is live!** 🎉

See [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) for detailed steps.

---

## 🗂️ Database

### Current (Development)
- **In-memory storage** — Perfect for prototyping
- Data persists during server uptime
- Resets on server restart

### Future (Production)
- PostgreSQL (recommended)
- MongoDB
- Firebase Realtime Database

---

## 📋 Feature Roadmap

### ✅ Phase 1: Launch (Complete)
- [x] Frontend SPA with 7 pages
- [x] Express.js backend
- [x] Job listings (8 packages)
- [x] Travel packages (16 destinations)
- [x] Visa application system
- [x] Agent portal
- [x] Application tracking
- [x] Referral system
- [x] Production-ready code

### ⏳ Phase 2: Enhancement
- [ ] Email notifications (Nodemailer)
- [ ] JWT authentication
- [ ] Agent dashboard
- [ ] Referral earnings tracker
- [ ] Payment integration

### ⏳ Phase 3: Advanced
- [ ] Real database (PostgreSQL)
- [ ] User profiles & authentication
- [ ] Admin dashboard
- [ ] Analytics & reporting
- [ ] OAuth social login
- [ ] Mobile app

---

## 🧪 Testing

### Local Testing
```bash
# Start server
npm start

# In another terminal, test API
curl http://localhost:3000/api/jobs

# Open browser
open http://localhost:3000
```

### Manual Testing Checklist
- [ ] All 7 pages load correctly
- [ ] Navigation between pages works
- [ ] Job carousel loads 8 packages
- [ ] Travel grid loads 16 packages
- [ ] Visa form submits successfully
- [ ] Agent registration works
- [ ] Application tracking finds submitted apps
- [ ] Forms show success toast messages

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | Kill process: `lsof -i :3000 \| grep LISTEN \| awk '{print $2}' \| xargs kill` |
| Module not found | Run `npm install` again |
| CORS errors | Check CORS origin in server.js |
| Frontend 404 | Verify `www/index.html` exists |
| API errors | Check browser console (F12) for details |

---

## 📧 Contact

**Support Email**: info@pascaltravels.com  
**WhatsApp**: +254 722 000 000

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

Built by **Shan** — 2026

---

## 🎯 Quick Links

- 🚀 [Quick Start Guide](QUICK_START.md)
- 📖 [Deployment Guide](DEPLOYMENT_INSTRUCTIONS.md)
- 🔗 [GitHub Repository](https://github.com/yourusername/pascal-travels)
- 🌐 [Live Demo](https://pascal-travels.vercel.app)

---

## ⭐ Show Your Support

If you find this project useful, please give it a star! ⭐

---

**Ready to launch? See [QUICK_START.md](QUICK_START.md) for 3-minute setup instructions!**
- **Logging**: Morgan
- **Containerization**: Docker, Docker Compose
- **Mobile**: Capacitor (Android app support)

## Project Structure

```
pascal-travels/
├── www/                          # Static frontend
│   ├── index.html               # Homepage
│   ├── jobs.html                # Job listings
│   ├── visa-application.html    # Visa form
│   ├── apply.html               # Quick apply
│   ├── agent-register.html      # Agent onboarding
│   ├── agent-login.html         # Agent dashboard
│   ├── app.js                   # Main app logic
│   ├── style.css                # Global styles
│   └── server/                  # Express backend
│       ├── server.js            # Main server
│       ├── config.js            # Configuration
│       ├── store.js             # Data abstraction
│       └── routes/              # API endpoints
│           ├── jobs.js
│           ├── visa.js
│           ├── agents.js
│           ├── payments.js
│           ├── referrals.js
│           ├── webhooks.js
│           └── applications.js
├── Dockerfile                    # Container image
├── docker-compose.yml           # Local dev environment
└── DEPLOYMENT.md                # Deployment guide
```

## Quick Start

### Local Development
```bash
cd www/server
npm install
npm start
```

Open `http://localhost:3000`

### Docker
```bash
docker-compose up -d
```

## API Endpoints

### Jobs
- `GET /api/jobs` — List active jobs
- `GET /api/jobs/:id` — Get job details
- `POST /api/jobs` — Create job (admin)
- `POST /api/jobs/:id/apply` — Apply to job

### Visa Applications
- `POST /api/visa-applications` — Submit visa application
- `GET /api/visa-applications` — List applications (admin)

### Agent Management
- `POST /api/agents/register` — Register agency
- `GET /api/agents` — List agents (admin)
- `POST /api/agents/:id/login` — Agent login
- `POST /api/agents/:id/candidates` — Submit candidate

### Payments
- `POST /api/payments` — Create payment
- `GET /api/payments/:id` — Get payment status
- `POST /api/webhooks/pesalink` — PesaLink webhook
- `POST /api/webhooks/westernunion` — WU webhook

### Referrals
- `POST /api/referrals/generate` — Generate code
- `GET /api/referrals/validate/:code` — Validate code
- `POST /api/referrals/apply` — Apply referral
- `GET /api/referrals/stats` — Agent stats

### Health & Tracking
- `GET /api/health` — Health check
- `GET /api/track-application` — Track by email/ID

## Configuration

Create `.env` in `www/server/`:
```env
NODE_ENV=production
PORT=3000
PESALINK_PROVIDER=none
WU_MODE=mock
DB_ENABLED=false
# DATABASE_URL=postgresql://user:pass@localhost:5432/pascal
```

See `www/server/config.js` for all available options.

## Database (Optional)

To use PostgreSQL instead of in-memory storage:

1. Set `DB_ENABLED=true` in `.env`
2. Provide `DATABASE_URL`
3. Run migrations:
   ```bash
   npm run init-db
   ```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Local Docker setup
- Azure Container Instances
- Azure App Service
- GitHub Actions CI/CD

## Security Notes

This is a demo application. For production use:
- [ ] Enable HTTPS/TLS
- [ ] Use environment secrets for credentials
- [ ] Implement proper authentication (JWT)
- [ ] Add rate limiting
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Enable Application Insights
- [ ] Use Azure Key Vault for secrets

## Payment Integration

### PesaLink (Kenya)
- DIB (Direct Internet Banking) details provided to user
- Manual confirmation by admin
- No real bank integration in demo mode

### Western Union
- Mock mode for testing (default)
- Production mode requires WU API credentials
- Transaction verification via MTCN

### Stripe (Framework Ready)
- Configure API keys in `config.js`
- Uncomment Stripe routes in `server.js`
- Add Stripe webhook handlers

## Mobile App (Capacitor)

To build Android app:
```bash
npm run cap:init
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License — See LICENSE file for details

## Support

For issues, feature requests, or questions:
- 📧 Email: support@pascaltours.com
- 🐛 GitHub Issues: [Report Bug](https://github.com/your-repo/issues)
- 📖 Docs: [Wiki](https://github.com/your-repo/wiki)

## Roadmap

- [ ] Real payment provider integration (Stripe, MPesa)
- [ ] Email notifications (sendgrid)
- [ ] SMS alerts (Twilio)
- [ ] Admin dashboard with charts
- [ ] Mobile app (iOS via Capacitor)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] AI-powered agent matching

---

**Pascal Travels & Tours** — Making travel and recruitment seamless, one journey at a time. ✈️

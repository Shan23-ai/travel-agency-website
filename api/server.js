/**
 * Pascal Travels & Tours — Full-Featured Platform Server
 * Multi-page application with referral system, email notifications, and Vercel compatibility
 */

'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');

// ===== CONFIGURATION =====
const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  companyEmail: process.env.COMPANY_EMAIL || 'info@pascaltravels.com',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  dbEnabled: process.env.DB_ENABLED === 'true',
  allowedOrigins: ['localhost', 'localhost:3000', 'localhost:3001', '127.0.0.1', '*.vercel.app', 'pascaltravels.com', 'travel-agency-website.vercel.app']
};

// ===== IN-MEMORY DATABASE (Serverless compatible) =====
const database = {
  jobs: initializeJobs(),
  travelPackages: initializeTravelPackages(),
  visaApplications: [],
  quickApplications: [],
  agents: [],
  referralCodes: [],
  referralUsage: [],
  submissions: [],
  candidates: []
};

function initializeJobs() {
  return [
    {
      id: 'job-canada-pkg',
      title: 'Canada Package',
      country: 'Canada',
      description: 'Complete Canada Work Visa Package',
      requirements: ['Passport', 'ID', 'CV', 'Photo', 'Certificates', 'Police Clearance', 'Medical', 'English Test', 'Proof of Funds', 'Biometrics'],
      timeline: '10-12 months',
      originalPrice: 500000,
      currentPrice: 250000,
      currency: 'KES',
      installments: [250000, 150000, 100000],
      image: '/assets/images/canada-job.jpg'
    },
    {
      id: 'job-dubai-emp',
      title: 'Dubai Employment Visa',
      country: 'UAE',
      description: 'Fast-track employment visa for Dubai',
      requirements: ['Passport', 'CV', 'Job Offer', 'Medical', 'Police Clearance'],
      timeline: '2 months',
      originalPrice: 300000,
      currentPrice: 250000,
      currency: 'KES',
      installments: [100000, 150000],
      image: '/assets/images/dubai-job.jpg'
    },
    {
      id: 'job-qatar-emp',
      title: 'Qatar Employment Visa',
      country: 'Qatar',
      description: 'Qatar work sponsorship package',
      requirements: ['Passport', 'CV', 'Qualifications', 'Medical'],
      timeline: '2 months',
      originalPrice: 320000,
      currentPrice: 270000,
      currency: 'KES',
      installments: [100000, 100000, 70000],
      image: '/assets/images/qatar-job.jpg'
    },
    {
      id: 'job-soft-eng-ca',
      title: 'Software Engineer - Canada',
      country: 'Canada',
      description: 'Tech job placement with visa sponsorship',
      requirements: ['3+ years experience', 'Portfolio', 'Technical interview', 'Degree', 'English proficiency'],
      timeline: '6-8 weeks',
      originalPrice: 250000,
      currentPrice: 200000,
      currency: 'KES',
      installments: [100000, 100000],
      image: '/assets/images/software-engineer.jpg'
    },
    {
      id: 'job-nurse-uk',
      title: 'Nurse - UK',
      country: 'UK',
      description: 'Registered nurse placement with relocation',
      requirements: ['RN License', 'IELTS 7.0+', 'Medical clearance', 'References'],
      timeline: '8-12 weeks',
      originalPrice: 200000,
      currentPrice: 180000,
      currency: 'KES',
      installments: [90000, 90000],
      image: '/assets/images/nurse-uk.jpg'
    },
    {
      id: 'job-construction-au',
      title: 'Construction Worker - Australia',
      country: 'Australia',
      description: 'Skilled worker sponsorship for Australia',
      requirements: ['2+ years experience', 'Trade qualification', 'English 5.0+', 'Medical'],
      timeline: '10-14 weeks',
      originalPrice: 280000,
      currentPrice: 240000,
      currency: 'KES',
      installments: [120000, 120000],
      image: '/assets/images/construction-au.jpg'
    },
    {
      id: 'job-teacher-uae',
      title: 'Teacher - UAE',
      country: 'UAE',
      description: 'Education sector placement in Emirates',
      requirements: ['Bachelor degree', 'Teaching license', 'TEFL/TESOL', 'Experience'],
      timeline: '4-6 weeks',
      originalPrice: 180000,
      currentPrice: 150000,
      currency: 'KES',
      installments: [75000, 75000],
      image: '/assets/images/teacher-uae.jpg'
    },
    {
      id: 'job-driving-ca',
      title: 'Canada Driving Job Package',
      country: 'Canada',
      description: 'Professional driver sponsorship to Canada',
      requirements: ['Valid passport', 'ID', 'CV', 'Photo', 'Driving license', 'Clean record', 'Police clearance', 'Medical', 'Proof of funds', 'Biometrics'],
      timeline: '10-12 months',
      originalPrice: 500000,
      currentPrice: 250000,
      currency: 'KES',
      installments: [250000, 150000, 100000],
      image: '/assets/images/driver-canada.jpg'
    }
  ];
}

function initializeTravelPackages() {
  return [
    // East Africa
    { id: 'pkg-masai-mara', name: 'Masai Mara Safari', destination: 'Kenya', duration: '5 days', price: 85000, description: 'Witness the great migration', image: '/assets/images/masai-mara.jpg', region: 'East Africa' },
    { id: 'pkg-serengeti', name: 'Serengeti & Ngorongoro', destination: 'Tanzania', duration: '6 days', price: 95000, description: 'Wildlife & volcanic crater', image: '/assets/images/serengeti.jpg', region: 'East Africa' },
    { id: 'pkg-bwindi', name: 'Bwindi Gorilla Trek', destination: 'Uganda', duration: '4 days', price: 120000, description: 'Mountain gorilla encounter', image: '/assets/images/bwindi.jpg', region: 'East Africa' },
    { id: 'pkg-volcanoes', name: 'Volcanoes Gorilla Trek', destination: 'Rwanda', duration: '3 days', price: 110000, description: 'Gorilla trekking in volcanoes', image: '/assets/images/volcanoes.jpg', region: 'East Africa' },
    { id: 'pkg-zanzibar', name: 'Zanzibar Beach', destination: 'Tanzania', duration: '4 days', price: 75000, description: 'Tropical island paradise', image: '/assets/images/zanzibar.jpg', region: 'East Africa' },
    { id: 'pkg-mombasa', name: 'Mombasa Coast', destination: 'Kenya', duration: '5 days', price: 65000, description: 'Beach and water sports', image: '/assets/images/mombasa.jpg', region: 'East Africa' },
    
    // International
    { id: 'pkg-dubai', name: 'Dubai Luxury', destination: 'UAE', duration: '5 days', price: 120000, description: 'Burj Khalifa, shopping, desert', image: '/assets/images/dubai.jpg', region: 'Middle East' },
    { id: 'pkg-kazakhstan', name: 'Kazakhstan Adventure', destination: 'Kazakhstan', duration: '7 days', price: 95000, description: 'Steppes and culture', image: '/assets/images/kazakhstan.jpg', region: 'Central Asia' },
    { id: 'pkg-india', name: 'India Grand Tour', destination: 'India', duration: '10 days', price: 110000, description: 'Taj Mahal, temples, culture', image: '/assets/images/india.jpg', region: 'Asia' },
    { id: 'pkg-oman', name: 'Oman Explorer', destination: 'Oman', duration: '5 days', price: 100000, description: 'Mountains and deserts', image: '/assets/images/oman.jpg', region: 'Middle East' },
    { id: 'pkg-saudi', name: 'Saudi Arabia Cultural', destination: 'Saudi Arabia', duration: '6 days', price: 125000, description: 'Ancient sites and modern cities', image: '/assets/images/saudi.jpg', region: 'Middle East' },
    { id: 'pkg-qatar', name: 'Qatar Business & Leisure', destination: 'Qatar', duration: '4 days', price: 95000, description: 'Modern meets tradition', image: '/assets/images/qatar.jpg', region: 'Middle East' },
    { id: 'pkg-bahrain', name: 'Bahrain Pearl Route', destination: 'Bahrain', duration: '3 days', price: 60000, description: 'Historic pearl diving sites', image: '/assets/images/bahrain.jpg', region: 'Middle East' },
    { id: 'pkg-georgia', name: 'Georgia Wine Country', destination: 'Georgia', duration: '6 days', price: 85000, description: 'Mountains, wine, culture', image: '/assets/images/georgia.jpg', region: 'Caucasus' },
    { id: 'pkg-uk', name: 'UK Grand Tour', destination: 'UK', duration: '8 days', price: 140000, description: 'London, Scotland, Wales', image: '/assets/images/uk.jpg', region: 'Europe' },
    { id: 'pkg-usa', name: 'USA East Coast', destination: 'USA', duration: '10 days', price: 160000, description: 'New York, Washington DC, Boston', image: '/assets/images/usa.jpg', region: 'North America' }
  ];
}

// ===== EMAIL SETUP =====
const emailTransporter = createEmailTransporter();

function createEmailTransporter() {
  if (config.nodeEnv === 'production' && process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  // Development: use test account
  return nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    ignoreTLS: true
  });
}

async function sendEmail(to, subject, html) {
  try {
    if (config.nodeEnv === 'development') {
      console.log(`📧 Email to ${to}: ${subject}`);
      return { success: true, messageId: uuidv4() };
    }
    const result = await emailTransporter.sendMail({
      from: config.companyEmail,
      to,
      subject,
      html
    });
    return result;
  } catch (err) {
    console.error('Email error:', err);
    return { success: false, error: err.message };
  }
}

// ===== FILE UPLOAD SETUP =====
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ 
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    const allowed = /\.(pdf|doc|docx|jpg|jpeg|png|gif)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  }
});

// ===== EXPRESS SETUP =====
const app = express();
const staticRoot = path.join(__dirname, '..', 'www');

// Middleware
app.use(compression());
app.use(express.static(staticRoot));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Security
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
}));

// Logging
app.use(morgan('dev'));

// ===== ROUTES: PAGES =====
app.get('/', (req, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

app.get('/travel-packages', (req, res) => {
  res.sendFile(path.join(staticRoot, 'travel-packages.html'));
});

app.get('/jobs', (req, res) => {
  res.sendFile(path.join(staticRoot, 'jobs.html'));
});

app.get('/apply/:jobId', (req, res) => {
  res.sendFile(path.join(staticRoot, 'apply.html'));
});

app.get('/track-application', (req, res) => {
  res.sendFile(path.join(staticRoot, 'track-application.html'));
});

app.get('/visa-application', (req, res) => {
  res.sendFile(path.join(staticRoot, 'visa-application.html'));
});

app.get('/agent-register', (req, res) => {
  res.sendFile(path.join(staticRoot, 'agent-register.html'));
});

app.get('/agent-login', (req, res) => {
  res.sendFile(path.join(staticRoot, 'agent-login.html'));
});

app.get('/agent-dashboard', (req, res) => {
  res.sendFile(path.join(staticRoot, 'agent-dashboard.html'));
});

// ===== API ROUTES: JOBS =====
app.get('/api/jobs', (req, res) => {
  const country = req.query.country;
  const jobs = country 
    ? database.jobs.filter(j => j.country === country)
    : database.jobs;
  res.json({ jobs, count: jobs.length });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = database.jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// ===== API ROUTES: TRAVEL PACKAGES =====
app.get('/api/travel-packages', (req, res) => {
  const region = req.query.region;
  const packages = region
    ? database.travelPackages.filter(p => p.region === region)
    : database.travelPackages;
  res.json({ packages, count: packages.length });
});

app.get('/api/travel-packages/:id', (req, res) => {
  const pkg = database.travelPackages.find(p => p.id === req.params.id);
  if (!pkg) return res.status(404).json({ error: 'Package not found' });
  res.json(pkg);
});

// ===== API ROUTES: QUICK APPLICATIONS =====
app.post('/api/quick-applications', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'certificates', maxCount: 5 },
  { name: 'passportCopy', maxCount: 1 }
]), async (req, res) => {
  const { fullName, email, phone, country, jobId, referralCode } = req.body;
  
  if (!fullName || !email || !phone || !country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const applicationId = uuidv4();
  const application = {
    id: applicationId,
    fullName,
    email,
    phone,
    country,
    jobId: jobId || '',
    referralCode: referralCode || null,
    hasPassport: req.body.hasPassport === 'true',
    passportNumber: req.body.passportNumber || '',
    needsVisa: req.body.needsVisa === 'true',
    files: {
      cv: req.files?.cv?.[0]?.filename,
      certificates: req.files?.certificates?.map(f => f.filename),
      passportCopy: req.files?.passportCopy?.[0]?.filename
    },
    status: 'RECEIVED',
    createdAt: new Date().toISOString()
  };

  database.quickApplications.push(application);

  // Send email to company
  const emailHtml = `
    <h2>New Job Application</h2>
    <p><strong>Application ID:</strong> ${applicationId}</p>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Referral Code:</strong> ${referralCode || 'None'}</p>
  `;
  
  await sendEmail(config.companyEmail, `New Application: ${fullName}`, emailHtml);

  // Send confirmation to applicant
  const confirmHtml = `
    <h2>Application Submitted</h2>
    <p>Hi ${fullName},</p>
    <p>Your application has been received successfully!</p>
    <p><strong>Application ID:</strong> ${applicationId}</p>
  `;
  
  await sendEmail(email, 'Application Confirmation', confirmHtml);

  res.status(201).json({ applicationId, message: 'Application submitted successfully' });
});

app.get('/api/quick-applications', (req, res) => {
  res.json({ applications: database.quickApplications, count: database.quickApplications.length });
});

// ===== API ROUTES: VISA APPLICATIONS =====
app.post('/api/visa-applications', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'passportCopy', maxCount: 1 },
  { name: 'invitationLetter', maxCount: 1 },
  { name: 'documents', maxCount: 10 }
]), async (req, res) => {
  const { fullName, email, phone, passportNumber, visaType, country } = req.body;
  
  if (!fullName || !email || !phone || !visaType || !country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const applicationId = uuidv4();
  const application = {
    id: applicationId,
    fullName,
    email,
    phone,
    passportNumber: passportNumber || '',
    visaType,
    country,
    files: {
      photo: req.files?.photo?.[0]?.filename,
      passportCopy: req.files?.passportCopy?.[0]?.filename,
      invitationLetter: req.files?.invitationLetter?.[0]?.filename,
      documents: req.files?.documents?.map(f => f.filename)
    },
    status: 'RECEIVED',
    createdAt: new Date().toISOString()
  };

  database.visaApplications.push(application);

  const emailHtml = `
    <h2>New Visa Application</h2>
    <p><strong>Application ID:</strong> ${applicationId}</p>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Visa Type:</strong> ${visaType}</p>
    <p><strong>Destination:</strong> ${country}</p>
  `;
  
  await sendEmail(config.companyEmail, `New Visa Application: ${fullName}`, emailHtml);

  const confirmHtml = `
    <h2>Visa Application Submitted</h2>
    <p>Your visa application has been received.</p>
    <p><strong>Application ID:</strong> ${applicationId}</p>
  `;
  
  await sendEmail(email, 'Visa Application Confirmation', confirmHtml);

  res.status(201).json({ applicationId, message: 'Visa application submitted' });
});

app.get('/api/visa-applications', (req, res) => {
  res.json({ applications: database.visaApplications, count: database.visaApplications.length });
});

// ===== API ROUTES: AGENT REGISTRATION =====
app.post('/api/agents/register', async (req, res) => {
  const { agencyName, registrationNumber, contactName, email, phone, country, specialization, password } = req.body;
  
  const required = ['agencyName', 'registrationNumber', 'contactName', 'email', 'phone', 'country', 'password'];
  for (const field of required) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `Missing: ${field}` });
    }
  }

  const agentId = uuidv4();
  const agent = {
    id: agentId,
    agencyName,
    registrationNumber,
    contactName,
    email,
    phone,
    country,
    specialization: specialization || [],
    status: 'PENDING',
    approved: false,
    createdAt: new Date().toISOString()
  };

  database.agents.push(agent);

  const emailHtml = `
    <h2>New Agent Registration</h2>
    <p><strong>Agency:</strong> ${agencyName}</p>
    <p><strong>Contact:</strong> ${contactName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Country:</strong> ${country}</p>
  `;
  
  await sendEmail(config.companyEmail, `New Agent: ${agencyName}`, emailHtml);

  const confirmHtml = `
    <h2>Application Received</h2>
    <p>Your agent registration has been submitted.</p>
    <p>We will contact you within 48 hours.</p>
  `;
  
  await sendEmail(email, 'Agent Registration Confirmation', confirmHtml);

  res.status(201).json({ agentId, message: 'Registration submitted for review' });
});

app.get('/api/agents', (req, res) => {
  res.json({ agents: database.agents.filter(a => a.approved), count: database.agents.filter(a => a.approved).length });
});

// ===== API ROUTES: REFERRAL SYSTEM =====
app.post('/api/referrals/generate', (req, res) => {
  const { agentId } = req.body;
  if (!agentId) {
    return res.status(400).json({ error: 'Agent ID required' });
  }

  const code = 'PASCAL' + uuidv4().substring(0, 8).toUpperCase();
  const referral = {
    id: uuidv4(),
    code,
    agentId,
    active: true,
    createdAt: new Date().toISOString(),
    conversions: 0,
    earnings: 0
  };

  database.referralCodes.push(referral);
  res.status(201).json({ referral, shareUrl: `${process.env.DOMAIN || 'http://localhost:3000'}/?ref=${code}` });
});

app.get('/api/referrals/validate', (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'Code required' });
  }

  const referral = database.referralCodes.find(r => r.code === code && r.active);
  res.json({ valid: !!referral, code: referral?.code });
});

app.get('/api/referrals/stats/:agentId', (req, res) => {
  const agentId = req.params.agentId;
  const referrals = database.referralCodes.filter(r => r.agentId === agentId);
  const usage = database.referralUsage.filter(u => referrals.some(r => r.id === u.referralId));

  const stats = {
    agentId,
    totalCodes: referrals.length,
    totalConversions: usage.length,
    totalEarnings: usage.filter(u => u.approved).length * 5000
  };

  res.json(stats);
});

// ===== API ROUTES: APPLICATION TRACKING =====
app.get('/api/track-application', (req, res) => {
  const { id, email } = req.query;
  const q = String(id || email || '').toLowerCase().trim();

  if (!q) {
    return res.status(400).json({ error: 'Application ID or email required' });
  }

  const allApplications = [...database.visaApplications, ...database.quickApplications];

  const found = allApplications.find(app => {
    const appId = String(app.id || '').toLowerCase();
    const appEmail = String(app.email || '').toLowerCase();
    return appId.includes(q) || appEmail === q;
  });

  if (!found) {
    return res.status(404).json({ found: false, message: 'Application not found' });
  }

  res.json({ 
    found: true, 
    application: {
      id: found.id,
      status: found.status,
      createdAt: found.createdAt,
      fullName: found.fullName
    }
  });
});

// ===== API ROUTES: HEALTH & STATUS =====
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    jobs: database.jobs.length,
    packages: database.travelPackages.length,
    applications: {
      quick: database.quickApplications.length,
      visa: database.visaApplications.length,
      agents: database.agents.length
    },
    referrals: database.referralCodes.length
  });
});

// ===== ERROR HANDLERS =====
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: config.nodeEnv === 'development' ? err.message : 'An error occurred'
  });
});

// ===== SERVER STARTUP =====
if (require.main === module) {
  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(`\n🚀 Pascal Travels API running on http://localhost:${config.port}`);
    console.log(`📍 Environment: ${config.nodeEnv}`);
    console.log(`✅ Database: In-Memory (Development)`);
    console.log(`📦 Jobs: ${database.jobs.length} packages loaded`);
    console.log(`🌍 Travel: ${database.travelPackages.length} destinations loaded`);
    console.log(`✅ Server ready!\n`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${config.port} already in use`);
    }
    process.exit(1);
  });
}

// Export for Vercel
module.exports = app;

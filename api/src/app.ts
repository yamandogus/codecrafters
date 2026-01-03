import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport';
import googleRoutes from './modules/google';
import githubRoutes from './modules/github';

// Import existing routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import blogRoutes from './modules/blog/route';
import eventsRoutes from './modules/events/route';
import jobsRoutes from './modules/jobs/route';
import projectsRoutes from './modules/projects/route';
import forumRoutes from './modules/forum/route';
import learningRoutes from './modules/learning/route';

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Session configuration for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CodeCrafters API çalışıyor! 🚀',
    version: '1.0.0',
    endpoints: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/blog',
      '/api/events',
      '/api/jobs',
      '/api/projects',
      '/api/forum',
      '/api/learning'
    ]
  });
});

// API Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/learning', learningRoutes);

// OAuth Routes
app.use('/api', googleRoutes);
app.use('/api', githubRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
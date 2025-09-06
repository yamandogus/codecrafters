import express from 'express';
import dotenv from 'dotenv';

// Environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeCrafters API çalışıyor! 🚀',
    version: '1.0.0',
    endpoints: [
      '/api/auth',
      '/api/users', 
      '/api/blog',
      '/api/projects',
      '/api/events',
      '/api/jobs',
      '/api/forum',
      '/api/learning'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir şeyler ters gitti!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor!`);
  console.log(`📱 API: http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
import express from 'express';
import dotenv from 'dotenv';
import app from './app';

// Environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor!`);
  console.log(`📱 API: http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Google OAuth: http://localhost:${PORT}/api/auth/google`);
  console.log(`🔐 GitHub OAuth: http://localhost:${PORT}/api/auth/github`);
});

export default app;

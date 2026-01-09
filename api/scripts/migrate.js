const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { execSync } = require('child_process');

// Read .env file directly to ensure we get the correct value
const envPath = path.join(__dirname, '..', '.env');
let databaseUrl = process.env.DATABASE_URL;

// If not found in process.env, read directly from .env file
if (!databaseUrl || databaseUrl.includes('user:password')) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL="([^"]+)"/);
  if (match) {
    databaseUrl = match[1];
  }
}

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.error('Checked .env at:', envPath);
  process.exit(1);
}

console.log('📊 Using database:', databaseUrl.split('@')[1]?.split('/')[1]?.split('?')[0] || 'unknown');

try {
  console.log('🔄 Running Prisma migrations...');
  execSync(`npx prisma migrate dev --url "${databaseUrl}"`, {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: databaseUrl },
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Migrations completed successfully');
} catch (error) {
  console.error('❌ Migration failed');
  process.exit(1);
}

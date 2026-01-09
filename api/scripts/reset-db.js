require('dotenv').config();
const { execSync } = require('child_process');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
}

console.log('⚠️  WARNING: This will delete all data in your database!');
console.log('🔄 Resetting database schema...');

try {
  // Use prisma db push with force-reset to drop all tables and recreate schema
  console.log('📤 Resetting database schema with Prisma...');
  execSync(`npx prisma db push --force-reset --skip-generate`, {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: databaseUrl }
  });
  
  console.log('\n✅ Database schema reset completed successfully');
  console.log('💡 Now run: npm run prisma:migrate to create initial migration');
} catch (error) {
  console.error('\n❌ Database reset failed:', error.message);
  console.log('\n💡 Alternative manual reset:');
  console.log('   1. Connect to PostgreSQL');
  console.log('   2. DROP DATABASE codecrafters;');
  console.log('   3. CREATE DATABASE codecrafters;');
  console.log('   4. npm run prisma:migrate');
  process.exit(1);
}

# CodeCrafters Backend

Modern, production-ready backend API built with **NestJS**, **Prisma**, **PostgreSQL**, and **TypeScript**.

## 🚀 Features

- ✅ **Session-based Authentication** with Passport.js
- ✅ **User Management** with role-based access control
- ✅ **Blog System** with posts, comments, and view tracking
- ✅ **Forum System** with threaded discussions
- ✅ **Secure Password Hashing** with bcrypt
- ✅ **Input Validation** with class-validator
- ✅ **Type-safe Database** with Prisma ORM
- ✅ **Modular Architecture** for scalability
- ✅ **CORS Support** for frontend integration

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd codecrafters-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure your database:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/codecrafters?schema=public"
SESSION_SECRET="your-super-secret-key"
PORT=3001
ALLOWED_ORIGINS="http://localhost:3000"
```

4. **Setup database**
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

5. **Start development server**
```bash
npm run start:dev
```

The API will be running at `http://localhost:3001/api`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/profile` | Get current user | ✅ |
| GET | `/api/auth/check` | Check auth status | ❌ |

### Users Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | ❌ |
| GET | `/api/users/:id` | Get user by ID | ❌ |
| GET | `/api/users/username/:username` | Get user by username | ❌ |
| PATCH | `/api/users/profile` | Update own profile | ✅ |
| DELETE | `/api/users/profile` | Delete own account | ✅ |

### Posts Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/posts` | Create new post | ✅ |
| GET | `/api/posts` | Get all posts | ❌ |
| GET | `/api/posts/:slug` | Get post by slug | ❌ |
| PATCH | `/api/posts/:id` | Update post | ✅ |
| DELETE | `/api/posts/:id` | Delete post | ✅ |
| POST | `/api/posts/:slug/view` | Increment view count | ❌ |

### Forums Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/forums` | Create new forum | ✅ |
| GET | `/api/forums` | Get all forums | ❌ |
| GET | `/api/forums/:slug` | Get forum by slug | ❌ |
| PATCH | `/api/forums/:id` | Update forum | ✅ |
| DELETE | `/api/forums/:id` | Delete forum | ✅ |
| POST | `/api/forums/:slug/view` | Increment view count | ❌ |

### Comments Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/comments` | Create comment | ✅ |
| GET | `/api/comments/post/:postId` | Get post comments | ❌ |
| GET | `/api/comments/forum/:forumId` | Get forum comments | ❌ |
| PATCH | `/api/comments/:id` | Update comment | ✅ |
| DELETE | `/api/comments/:id` | Delete comment | ✅ |

## 🔐 Authentication

This API uses **session-based authentication** with cookies. After login, the session cookie will be automatically sent with subsequent requests.

### Example: Register & Login

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "name": "Your Name"
  }'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }' \
  -c cookies.txt

# Use session in subsequent requests
curl -X GET http://localhost:3001/api/auth/profile \
  -b cookies.txt
```

## 🗄️ Database Schema

The database includes the following models:
- **User** - User accounts with authentication
- **Post** - Blog posts with content
- **Forum** - Discussion forums
- **Comment** - Comments for posts and forums (with threading support)
- **Session** - User session storage

## 🧪 Development

```bash
# Development mode with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod

# Lint code
npm run lint

# Format code
npm run format

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

## 📦 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # Auth guards
│   ├── strategies/      # Passport strategies
│   └── dto/             # Data transfer objects
├── users/               # Users module
├── posts/               # Posts module
├── forums/              # Forums module
├── comments/            # Comments module
├── prisma/              # Prisma service
├── app.module.ts        # Root module
└── main.ts              # Application entry point

prisma/
├── schema.prisma        # Database schema
└── seed.ts              # Database seeding
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ HTTP-only session cookies
- ✅ CORS protection
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (Prisma)
- ✅ User authorization checks

## 🚢 Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong `SESSION_SECRET`
3. Enable HTTPS
4. Configure proper CORS origins
5. Use connection pooling for database
6. Set up proper logging and monitoring

## 📄 License

MIT

## 👥 Team

Built with ❤️ by the CodeCrafters Team

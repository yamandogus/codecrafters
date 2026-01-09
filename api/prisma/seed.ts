import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import * as bcrypt from "bcrypt"
import * as dotenv from "dotenv"
import * as path from "path"

// Load .env file
dotenv.config({ path: path.join(__dirname, "..", ".env") })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@codecrafters.com" },
    update: {},
    create: {
      email: "admin@codecrafters.com",
      username: "admin",
      password: hashedPassword,
      name: "Admin",
      surname: "User",
      bio: "Platform administrator",
      role: "ADMIN",
      isVerified: true,
      github: "https://github.com/admin",
      linkedin: "https://linkedin.com/in/admin",
    },
  })

  const company = await prisma.user.upsert({
    where: { email: "company@example.com" },
    update: {},
    create: {
      email: "company@example.com",
      username: "techcorp",
      password: hashedPassword,
      name: "TechCorp",
      surname: "Inc",
      bio: "Leading technology company hiring talented developers",
      role: "COMPANY",
      isVerified: true,
    },
  })

  const organizer = await prisma.user.upsert({
    where: { email: "organizer@example.com" },
    update: {},
    create: {
      email: "organizer@example.com",
      username: "eventorganizer",
      password: hashedPassword,
      name: "Event",
      surname: "Organizer",
      bio: "Organizing tech events and hackathons",
      role: "ORGANIZER",
      isVerified: true,
    },
  })

  const mentor = await prisma.user.upsert({
    where: { email: "mentor@example.com" },
    update: {},
    create: {
      email: "mentor@example.com",
      username: "mentor",
      password: hashedPassword,
      name: "Senior",
      surname: "Developer",
      bio: "Experienced developer helping others grow",
      isMentor: true,
      isVerified: true,
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      username: "johndoe",
      password: hashedPassword,
      name: "John",
      surname: "Doe",
      bio: "Full-stack developer passionate about TypeScript and NestJS",
      location: "San Francisco, CA",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "jane@example.com" },
    update: {},
    create: {
      email: "jane@example.com",
      username: "janesmith",
      password: hashedPassword,
      name: "Jane",
      surname: "Smith",
      bio: "Frontend specialist who loves React and modern web development",
      location: "New York, NY",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  })

  console.log("✅ Users created")

  // Create user skills
  await prisma.userSkill.createMany({
    data: [
      { userId: user1.id, name: "TypeScript", level: "ADVANCED", color: "#3178C6" },
      { userId: user1.id, name: "NestJS", level: "ADVANCED", color: "#E0234E" },
      { userId: user1.id, name: "React", level: "INTERMEDIATE", color: "#61DAFB" },
      { userId: user2.id, name: "React", level: "EXPERT", color: "#61DAFB" },
      { userId: user2.id, name: "JavaScript", level: "ADVANCED", color: "#F7DF1E" },
      { userId: user2.id, name: "CSS", level: "ADVANCED", color: "#1572B6" },
    ],
  })

  console.log("✅ User skills created")

  // Create blog posts
  const blogPost1 = await prisma.blogPost.create({
    data: {
      title: "Getting Started with NestJS",
      content:
        "NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses modern JavaScript, is built with TypeScript, and combines elements of OOP, FP, and FRP...",
      excerpt: "Learn the basics of NestJS framework",
      author: user1.name,
      category: "BACKEND",
      tags: ["nestjs", "typescript", "backend"],
      readTime: "5 min",
      isPublished: true,
      userId: user1.id,
    },
  })

  const blogPost2 = await prisma.blogPost.create({
    data: {
      title: "Modern Frontend Development with React",
      content:
        "React has revolutionized the way we build user interfaces. In this comprehensive guide, we'll explore modern React patterns, hooks, and best practices...",
      excerpt: "Discover modern React development techniques",
      author: user2.name,
      category: "FRONTEND",
      tags: ["react", "javascript", "frontend"],
      readTime: "8 min",
      isPublished: true,
      userId: user2.id,
    },
  })

  console.log("✅ Blog posts created")

  // Create forum posts
  const forumPost1 = await prisma.forumPost.create({
    data: {
      title: "Best practices for REST API design",
      content: "What are your thoughts on REST API design? I'm building a new API and want to follow best practices.",
      category: "BACKEND",
      isPinned: true,
      userId: user1.id,
    },
  })

  const forumPost2 = await prisma.forumPost.create({
    data: {
      title: "How to get started in web development?",
      content: "I'm new to programming and want to become a web developer. Where should I start?",
      category: "CAREER",
      userId: user2.id,
    },
  })

  console.log("✅ Forum posts created")

  // Create comments
  await prisma.comment.create({
    data: {
      content: "Great article! Very helpful for beginners.",
      userId: user2.id,
      blogPostId: blogPost1.id,
    },
  })

  await prisma.comment.create({
    data: {
      content:
        "I recommend following RESTful conventions and using proper HTTP methods. Also, versioning is important!",
      userId: mentor.id,
      forumPostId: forumPost1.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: "Start with HTML, CSS, and JavaScript basics. Then move to a framework like React.",
      userId: mentor.id,
      forumPostId: forumPost2.id,
    },
  })

  console.log("✅ Comments created")

  // Create jobs
  const job1 = await prisma.job.create({
    data: {
      title: "Senior Full-Stack Developer",
      description: "We're looking for an experienced full-stack developer to join our team.",
      company: "TechCorp Inc",
      location: "San Francisco, CA",
      type: "FULL_TIME",
      salary: "$120k - $180k",
      experience: "5+ years",
      category: "FULLSTACK",
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
      isRemote: true,
      isFeatured: true,
      requirements: [
        "5+ years of full-stack development experience",
        "Strong knowledge of TypeScript and React",
        "Experience with Node.js and NestJS",
        "Familiarity with PostgreSQL",
      ],
      responsibilities: [
        "Design and develop scalable web applications",
        "Collaborate with cross-functional teams",
        "Mentor junior developers",
      ],
      benefits: ["Health insurance", "401k", "Remote work", "Flexible hours"],
      companyDescription: "TechCorp is a leading technology company focused on innovation.",
      companyEmployees: "100-500",
      companyIndustry: "Technology",
      userId: company.id,
    },
  })

  const job2 = await prisma.job.create({
    data: {
      title: "Frontend Developer",
      description: "Join our frontend team to build amazing user experiences.",
      company: "StartupXYZ",
      location: "Remote",
      type: "FULL_TIME",
      salary: "$80k - $120k",
      experience: "2+ years",
      category: "FRONTEND",
      skills: ["React", "TypeScript", "CSS", "Tailwind"],
      isRemote: true,
      requirements: [
        "2+ years of frontend development experience",
        "Proficiency in React and TypeScript",
        "Strong CSS skills",
      ],
      responsibilities: ["Build responsive web applications", "Optimize performance", "Work with designers"],
      benefits: ["Remote work", "Learning budget", "Flexible schedule"],
      userId: company.id,
    },
  })

  console.log("✅ Jobs created")

  // Create events
  const event1 = await prisma.event.create({
    data: {
      title: "Web Development Bootcamp 2024",
      description: "Intensive 3-day bootcamp covering modern web development",
      longDescription:
        "Join us for an intensive 3-day bootcamp where you'll learn modern web development from scratch. Topics include HTML, CSS, JavaScript, React, and Node.js.",
      category: "WORKSHOP",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-06-03"),
      location: "San Francisco Convention Center",
      address: "123 Main St, San Francisco, CA 94102",
      isOnline: false,
      maxParticipants: 100,
      organizer: "CodeCrafters Team",
      organizerEmail: "events@codecrafters.com",
      tags: ["workshop", "web-development", "bootcamp"],
      price: "$299",
      requirements: ["Basic computer knowledge", "Laptop required"],
      organizerId: organizer.id,
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: "AI Hackathon 2024",
      description: "48-hour hackathon focused on AI and machine learning",
      category: "HACKATHON",
      startDate: new Date("2024-07-15"),
      endDate: new Date("2024-07-17"),
      location: "Online",
      isOnline: true,
      maxParticipants: 500,
      organizer: "Tech Community",
      tags: ["hackathon", "ai", "machine-learning"],
      price: "Free",
      requirements: ["Programming experience", "Team of 2-4 people"],
      organizerId: organizer.id,
    },
  })

  console.log("✅ Events created")

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      title: "E-commerce Platform",
      description: "Full-featured e-commerce platform built with modern technologies",
      category: "WEB",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
      demo: "https://demo.example.com",
      github: "https://github.com/user/ecommerce",
      stars: 45,
      forks: 12,
      featured: true,
      userId: user1.id,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      title: "Task Management App",
      description: "Modern task management application with real-time updates",
      category: "WEB",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      demo: "https://tasks.example.com",
      github: "https://github.com/user/tasks",
      stars: 23,
      forks: 5,
      userId: user2.id,
    },
  })

  console.log("✅ Projects created")

  // Create learning resources
  await prisma.learningResource.create({
    data: {
      title: "Complete Web Development Course",
      description: "Learn web development from scratch with this comprehensive course",
      category: "Web Development",
      duration: "40 hours",
      level: "Beginner",
      rating: 4.8,
      students: 1250,
      tags: ["html", "css", "javascript", "web"],
      content: "Course content details...",
    },
  })

  await prisma.learningResource.create({
    data: {
      title: "Advanced TypeScript Patterns",
      description: "Master advanced TypeScript patterns and best practices",
      category: "Programming",
      duration: "12 hours",
      level: "Advanced",
      rating: 4.9,
      students: 580,
      tags: ["typescript", "patterns", "advanced"],
      content: "Course content details...",
    },
  })

  console.log("✅ Learning resources created")

  // Create follows
  await prisma.follow.create({
    data: {
      followerId: user1.id,
      followingId: user2.id,
    },
  })

  await prisma.user.update({
    where: { id: user1.id },
    data: { following: { increment: 1 } },
  })

  await prisma.user.update({
    where: { id: user2.id },
    data: { followers: { increment: 1 } },
  })

  console.log("✅ Follows created")

  console.log("🎉 Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

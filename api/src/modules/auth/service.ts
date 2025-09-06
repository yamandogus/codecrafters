import { LoginDTO, RegisterDTO } from "../../dto/authDto";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthService {
  async register(data: RegisterDTO) {
    const { name, surname, email, password } = data;

    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      const e: any = new Error(
        "Bu e-posta ile zaten kayıtlı bir kullanıcı var"
      );
      e.status = 400;
      throw e;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );

    return { newUser, token };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const e: any = new Error("Geçersiz e-posta veya şifre");
      e.status = 401;
      throw e;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const e: any = new Error("Geçersiz e-posta veya şifre");
      e.status = 401;
      throw e;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );
    return {
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
      },
      token,
    };
  }
}

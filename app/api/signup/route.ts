import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  
  const data = await request.json();
  const email = data.email;
  const password = data.password;
  const name = data.name;
  console.log("signup called")

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  if (newUser) {
    return NextResponse.json({message: "user created"});
  }
}

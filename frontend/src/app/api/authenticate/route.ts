import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest): Promise<Response> {
  const body = await req.json();
  const { email, password } = body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
    });
    if(!user) {
        return new Response('User not found', { status: 404 });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) {
        return new Response('Invalid password', { status: 401 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  }

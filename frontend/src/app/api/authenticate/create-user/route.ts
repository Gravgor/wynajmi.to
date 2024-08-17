import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest): Promise<Response> {
    const body = await req.json();
    const { email, password, username } = body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if(user) {
        return new Response('User already exists', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            username: username,
        }
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
}

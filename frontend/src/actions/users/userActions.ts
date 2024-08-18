'use server';
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import { User } from "@/types/user";

export async function authenticate(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if(!user) {
        throw new Error('User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) {
        throw new Error('Invalid password');
    }
    return user;
}

export async function createUser(data: { email: string, password: string, username: string }): Promise<User> {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });
    if(user) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            username: data.username,
        }
    });
    return newUser;
}

export async function getUser(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    });
    if(!user) {
        throw new Error('User not found');
    }
    return user;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: data,
    });
    return user;
}

export async function deleteUser(id: string): Promise<void> {
   try {
       await prisma.user.delete({
           where: {
               id: id,
           },
       });
   } catch (error) {
         throw new Error('An error occurred while deleting the user');
   }
}
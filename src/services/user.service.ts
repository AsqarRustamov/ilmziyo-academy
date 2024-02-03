import prisma from './db'
import { hashPassword } from './crypto.service'

export const findUser = (email: string) => {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

export const createUser = (name: string, email: string, password: string) => {
    return prisma.user.create({
        data: {
            name,
            email: email,
            password: hashPassword(password),
        }
    })
}
import prisma from './db'

interface ProgramInput {
    name: string
    color: string
    duration: string
    description: string
    price: string
    content: string
}

export class ProgramService {


    static async getPrograms() {
        return prisma.program.findMany({
            include: {
                _count: {
                    select: {
                        applications: true
                    }
                }
            }
        })
    }

    static async getProgramById(id: number) {
        return prisma.program.findUnique({
            where: {
                id
            }
        })
    }

    static async createProgram(program: ProgramInput) {
        return prisma.program.create({
            data: {
                name: program.name,
                color: program.color,
                duration: program.duration,
                description: program.description,
                price: program.price,
                content: program.content,
            }
        })
    }

    static async updateProgram(id: number, program: ProgramInput) {
        return prisma.program.update({
            where: {
                id: id
            },
            data: {
                name: program.name,
                color: program.color,
                duration: program.duration,
                description: program.description,
                price: program.price,
                content: program.content
            }
        })
    }

    static async deleteProgram(id: number) {
        return prisma.program.delete({
            where: {
                id
            }
        })
    }
}

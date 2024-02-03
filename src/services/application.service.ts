import prisma from './db'

interface Application {
    fullName: string
    candidateFullName: string
    ageOrClass: string
    phone: string
    programId: number
}

export class ApplicationService {

    static async getApplications() {
        return prisma.application.findMany({
            include: {
                program: true
            }
        })
    }

    static async getApplicationById(id: number) {
        return prisma.application.findUnique({
            where: {
                id
            }
        })
    }
    
    static async createApplication(application: Application) {
        return prisma.application.create({
            data: {
                fullName: application.fullName,
                ageOrClass: application.ageOrClass,
                candicateFullName: application.candidateFullName,
                phone: application.phone,
                program: {
                    connect: {
                        id: Number(application.programId)
                    }
                }
            },
            include: {
                program: true
            }
        })
    }
    
    static async updateApplication(id: number, application: Application) {
        return prisma.application.update({
            where: {
                id: id
            },
            data: {
                fullName: application.fullName,
                ageOrClass: application.ageOrClass,
                candicateFullName: application.candidateFullName,
                phone: application.phone,
                program: {
                    connect: {
                        id: application.programId
                    }
                }
            }
        })
    }
    
    static async deleteApplication(id: number) {
        return prisma.application.delete({
            where: {
                id
            }
        })
    }
}

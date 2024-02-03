import prisma from './db'

interface ConnectInput {
    telegram: string
    instagram: string
    phone: string
    address: string
    location: string
}

interface UpdateConnectInput {
    telegram?: string
    instagram?: string
    phone?: string
    address?: string
    location?: string
}

export class ConnectService {

    static createFirstConnect(connect: ConnectInput) {
        return prisma.connect.create({
            data: {
                address: connect.address,
                instagram: connect.instagram,
                locationMap: connect.location,
                phone: connect.phone,
                telegram: connect.telegram
            }
        })
    }
    
    static getConnect() {
        return prisma.connect.findFirst()
    }
    
    static updateConnect(input: UpdateConnectInput) {
         return prisma.connect.findFirst().then(connect => {

            if (connect == null) {
                return
            }
        
            return prisma.connect.update({
                where: {
                    id: connect.id
                },
                data: {
                    address: input.address,
                    instagram: input.instagram,
                    locationMap: input.location,
                    phone: input.phone,
                    telegram: input.telegram
                }
            })
        })
    
    }
}

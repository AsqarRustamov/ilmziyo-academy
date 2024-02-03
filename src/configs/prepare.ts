import { ConnectService } from '@services/connect.service'
import fs from 'fs'

export default async () => {
    mkdir('./files')
    mkdir('./files/files')
    mkdir('./files/temps')


    const connect = await ConnectService.getConnect()
    if (!connect) {
        await ConnectService.createFirstConnect({
            address: "",
            instagram: "",
            location: "",
            phone: "",
            telegram: ""
        })
    }
}

function mkdir(dir: string) {
    if (!fs.existsSync(dir)) {
        console.log('directory created ' + dir);
        fs.mkdirSync(dir)
    }
}
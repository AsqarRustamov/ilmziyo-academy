import pathConfig from "@configs/path.config";
import multer from "multer";
import fs from 'fs'
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
    
    destination(req, file, callback) {
        const folder = pathConfig.filesPath
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
        callback(null, folder)
    },

    filename(req, file, callback) {
        callback(null, nanoid())
    }
})

export const upload = multer({ storage })
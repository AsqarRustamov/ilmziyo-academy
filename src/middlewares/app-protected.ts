import serverConfig from "@configs/server.config"
import { NextFunction, Request, Response } from "express"

export default () => (req: Request, res: Response, next: NextFunction) => {
    console.log("x-auth", req.header("x-auth"))
    console.log("appKey", serverConfig.appKey)
    if (req.header("x-auth") == serverConfig.appKey) {
        next()
    }
    else {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
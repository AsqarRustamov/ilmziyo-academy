import { verify } from '@services/jwt.service';
import { Payload } from '@models/payload';
import catchAsync from '@utils/catchAsync';
import serverConfig from '@configs/server.config';

export default () => {

    return catchAsync(async (req, res, next) => {
        
        let token = req.session?.userToken

        if (!token) {
            return res.redirect('/login')
        }

        try {
            let payload: Payload = await verify(token)
            res.locals.payload = payload
            
            next()
        }
        catch(err) {
            return res.redirect('/login')
        }
    })
}


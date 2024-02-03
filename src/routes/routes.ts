import { Router } from 'express'
import { authenticate, errorHandler } from '@middlewares/index'
import mainRoutes from './main.routes'
import adminRoutes from './admin.routes'

export default Router({ mergeParams: true })
    .use("/", mainRoutes)
    .use('/', authenticate(), adminRoutes)
    .use(errorHandler)

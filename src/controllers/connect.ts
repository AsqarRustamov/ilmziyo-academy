import { ConnectService } from '@services/connect.service';
import catchAsync from '@utils/catchAsync';

export const getConnectPage = catchAsync(async (req, res, next) => {

    const connect = await ConnectService.getConnect()

    res.render('connect', {
        contacts: connect
    })
})

export const updateConnect = catchAsync(async (req, res, next) => {
    await ConnectService.updateConnect(req.body)
    res.redirect('/admin/contacts/')
})
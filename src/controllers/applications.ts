import { ApplicationService } from '@services/application.service';
import catchAsync from '@utils/catchAsync';

export const getApplicationsPage = catchAsync(async (req, res, next) => {

    const applications = await ApplicationService.getApplications()

    res.render('applications', {
        applications
    })
})

export const deleteApplicationPage = catchAsync(async (req, res, next) => {
    const id = req.params.id

    const application = await ApplicationService.getApplicationById(Number(id))

    if (!application) {
        return res.redirect("/admin/applications")
    }
    
    await ApplicationService.deleteApplication(Number(id))

    res.redirect('/admin/applications')
})
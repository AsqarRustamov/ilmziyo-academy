import { deleteApplicationPage, getApplicationsPage } from '@controllers/applications'
import { getConnectPage, updateConnect } from '@controllers/connect'
import { createNews, createNewsPage, deleteNews, editNewsPage, getNewsPage, logout, updateNews } from '@controllers/news'
import { createProgram, createProgramPage, deleteProgram, editProgramPage, getProgramsPage, updateProgram } from '@controllers/programs'
import { upload } from '@middlewares/fileupload'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .get("/admin", (req, res, next) => {
        res.redirect('/admin/news')
    })
    .get('/admin/logout', logout)
    .get("/admin/news", getNewsPage)
    .post("/admin/news", upload.single('poster'), createNews)
    .get("/admin/news/create", createNewsPage)
    .get("/admin/news/:id/edit", editNewsPage)
    .get("/admin/news/:id/delete", deleteNews)
    .post("/admin/news/:id/update", upload.single('poster'),  updateNews)
    
    .get("/admin/programs", getProgramsPage)
    .post("/admin/programs", createProgram)
    .get("/admin/programs/create", createProgramPage)
    .get("/admin/programs/:id/edit", editProgramPage)
    .get("/admin/programs/:id/delete", deleteProgram)
    .post("/admin/programs/:id/update", updateProgram)

    .get("/admin/contacts", getConnectPage)
    .post("/admin/contacts", updateConnect)

    .get("/admin/applications", getApplicationsPage)
    .get("/admin/applications/:id/delete", deleteApplicationPage)
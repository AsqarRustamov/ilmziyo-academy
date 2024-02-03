import { getLoginPage, getMain, newsPreview, postLogin, submitApplication } from '@controllers/main'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .get("/", getMain)
    .get("/login", getLoginPage)
    .post("/login", postLogin)
    .get("/news/:id", newsPreview)
    .post("/submit", submitApplication)

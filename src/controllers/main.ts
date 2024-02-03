import serverConfig from '@configs/server.config';
import { ApplicationService } from '@services/application.service';
import { ConnectService } from '@services/connect.service';
import { sign } from '@services/jwt.service';
import { NewsService } from '@services/news.service';
import { ProgramService } from '@services/program.service';
import { findUser } from '@services/user.service';
import catchAsync from '@utils/catchAsync';
import { compareSync } from "bcrypt"

export const getMain = catchAsync(async (req, res, next) => {

    const programs = await ProgramService.getPrograms()
    const news = await NewsService.getNews()
    const contacts = await ConnectService.getConnect()

    res.render('main', {
        programs,
        mainNews: news[0],
        news: news,
        contacts
    })
})

export const getLoginPage = catchAsync(async (req, res, next) => {
    res.render('login', { layout: 'layout/admin.ejs' })
})

export const postLogin = catchAsync(async (req, res, next) => {
    const { username, password } = req.body

    const user = await findUser(username)

    if (!user || !compareSync(password, user.password)) {
        return res.redirect('/login')
    }

    if (req.session) {
        const token = await sign({
            userId: user.id,
            username: user.email,
            name: user.name
        })
        req.session.userToken = token
    }

    res.redirect('/admin')
})

export const submitApplication = catchAsync(async (req, res, next) => {
    const app = req.body
    const newApp = await ApplicationService.createApplication(app)

    const text = `
ID: ${newApp.id}
FullName: ${newApp.fullName}
AgeOrClass: ${newApp.ageOrClass}
candicateFullName: ${newApp.candicateFullName}
Phone: ${newApp.phone}
Program: ${newApp.program.name}
    `
    const upd = await fetch(`https://api.telegram.org/bot${serverConfig.botToken}/getUpdates`)
    console.log(upd)

    const resp = await fetch(`https://api.telegram.org/bot${serverConfig.botToken}/sendMessage?chat_id=${serverConfig.adminId}&text=${encodeURIComponent(text)}`)


    res.redirect('/')
})

export const newsPreview = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)
    const news = await NewsService.getNewsById(id)

    if (!news) {
        return res.redirect('/')
    }

    res.render("news-preview", {
        title: news.title,
        poster: news.poster,
        date: news.date.toDateString(),
        content: news.content
    })
})
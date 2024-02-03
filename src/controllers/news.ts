import { NewsService } from '@services/news.service';
import catchAsync from '@utils/catchAsync';

export const logout = catchAsync(async (req, res, next) => {
    req.session = null
    res.redirect('/')
})

export const getNewsPage = catchAsync(async (req, res, next) => {
    res.render("news", {
        news: await NewsService.getNews()
    })
})

export const createNewsPage = catchAsync(async (req, res, next) => {
    res.render("edit-news", {
        mode: 'create',
        id: undefined,
        content: undefined,
        title: undefined
    })
})

export const createNews = catchAsync(async (req, res, next) => {
    const posterFile = req.file

    if (!posterFile) {
        return res.send('File is not selected')
    }

    const poster = posterFile.filename
    const title = req.body.title
    const content = req.body.content

    await NewsService.createNews({
        poster: poster,
        title: title,
        content: content,
        date: new Date()
    })

    res.redirect('/admin/news')
})

export const editNewsPage = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const news = await NewsService.getNewsById(Number(id))

    if (!news) {
        return res.redirect("/admin/news")
    }

    res.render("edit-news", {
        mode: 'edit',
        id,
        content: news?.content.replaceAll('\n', '<br>'),
        title: news?.title
    })
})

export const deleteNews = catchAsync(async (req, res, next) => {
    const id = req.params.id

    const news = await NewsService.getNewsById(Number(id))

    if (!news) {
        return res.redirect("/admin/news")
    }    
    
    await NewsService.deleteNews(Number(id))

    res.redirect('/admin/news')
})

export const updateNews = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const news = await NewsService.getNewsById(Number(id))
    
    if (!news) {
        return res.redirect("/admin/news")
    }    
    
    const posterFile = req.file

    const poster = posterFile?.filename
    const title = req.body.title?.trim()
    const content = req.body.content?.trim()

    await NewsService.updateNews(Number(id), {
        poster: poster,
        title: title?.length ? title : undefined,
        content: content?.length ? content : undefined,
        date: new Date()
    })

    res.redirect('/admin/news')
})
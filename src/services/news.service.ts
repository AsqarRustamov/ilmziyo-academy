import prisma from './db'

interface NewsInput {
    title: string
    date: Date
    content: string
    poster: string
}

interface UpdateNewsInput {
    title?: string
    date?: Date
    content?: string
    poster?: string
}

export class NewsService {
    static getNews = () => {
        return prisma.news.findMany()
    }

    static getNewsById = (id: number) => {
        return prisma.news.findUnique({
            where: {
                id
            }
        })
    }
    
    static createNews = async (news: NewsInput) => {
        return prisma.news.create({
            data: {
                title: news.title,
                content: news.content,
                poster: news.poster,
                date: news.date
            }
        })
    }
    
    static updateNews = async (id: number, news: UpdateNewsInput) => {
        return prisma.news.update({
            where: {
                id: id
            },
            data: {
                title: news.title,
                content: news.content,
                poster: news.poster,
                date: news.date
            }
        })
    }
    
    static deleteNews = async (id: number) => {
        return prisma.news.delete({
            where: {
                id
            }
        })
    }
    
}


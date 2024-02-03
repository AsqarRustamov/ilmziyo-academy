import joi from 'joi'

export const newsSchema = joi.object({
    "title": joi.string().min(3).required(),
    "date": joi.date().required(),
    "content": joi.string().min(3).required(),
    "poster": joi.string().min(3).required(),
})
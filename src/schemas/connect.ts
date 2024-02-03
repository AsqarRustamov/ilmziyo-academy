import joi from 'joi'

export const connectSchema = joi.object({
    "location": joi.string().min(3),
    "telegram": joi.string().min(3),
    "instagram": joi.string().min(3),
    "phone": joi.string().min(3),
    "address": joi.string().min(3),
})
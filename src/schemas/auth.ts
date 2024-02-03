import joi from 'joi'

export const loginSchema = joi.object({
    "email": joi.string().email().min(3).required(),
    "password": joi.string().min(8).required(),
})

export const registerSchema = joi.object({
    "name": joi.string().min(3).required(),
    "email": joi.string().email().min(3).required(),
    "password": joi.string().min(8).required(),
})
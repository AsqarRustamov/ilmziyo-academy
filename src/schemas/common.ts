import joi from 'joi'

export const idParam = joi.object({
    "id": joi.number().min(1).required()
})
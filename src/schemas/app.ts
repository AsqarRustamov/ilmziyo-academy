import joi from 'joi'

export const appSchema = joi.object({
    "fullName": joi.string().min(3).required(), 
    "candidateFullName": joi.string().min(3).required(), 
    "ageOrClass": joi.string().min(0).required(), 
    "phone": joi.string().min(0).required(), 
    "programId": joi.number().min(1).default(0)
})
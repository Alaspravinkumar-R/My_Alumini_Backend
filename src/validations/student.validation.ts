import Joi from 'joi';

const studentPostPayload = {
    body: Joi.object().keys({
        Id: Joi.string(),
        rollNumber: Joi.string().required(),
        registerNumber: Joi.number(),
        name:Joi.string().required(),
        startingYear: Joi.number().required(),
        endingYear: Joi.number().required(),
        email: Joi.string().required().email(),
        mobileNumber: Joi.number().required(),
        degree: Joi.string().required(),
        department: Joi.string().required(),
        password: Joi.string().required(),
    }),
};


const studentManyPostPayload = {
    body:Joi.array().items(Joi.object().keys({
        Id: Joi.string(),
        rollNumber: Joi.string().required(),
        registerNumber: Joi.number(),
        name:Joi.string().required(),
        startingYear:Joi.number().required(),
        endingYear:Joi.number().required(),
        email: Joi.string().required().email(),
        mobileNumber: Joi.number().required(),
        degree: Joi.string().required(),
        department: Joi.string().required(),
        password: Joi.string().required(),
    })

    )};

const studentValidation = {
    studentPostPayload,
    studentManyPostPayload
}

export default studentValidation;
import Joi from 'joi';

const loginPayload = {
    body: Joi.object().keys({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const authValidation = {
    loginPayload
}

export default authValidation;

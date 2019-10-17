// Validation
const Joi = require('@hapi/joi');

// User registration validation
const registerUserValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
}

// User registration validation
const loginUserValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
}

module.exports.registerUserValidation = registerUserValidation;
module.exports.loginUserValidation = loginUserValidation;
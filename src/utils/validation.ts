import Joi from 'joi';
import { register, login } from './interface';

export const validateSignup = (guest: register) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(guest);
}

export const validateLogin = (member: login) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(member);
}
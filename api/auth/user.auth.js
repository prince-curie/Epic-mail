import Joi from 'joi';
import database from '../database/database';

const { users } = database;

const userAuth = {
  signUpAuth(req, res, next) {
    const error = users.find(person => person.email === req.body.email);

    const Schema = {
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    };

    const result = Joi.validate(req.body, Schema);

    if (result.error) {
      return res.status(401).json({
        status: 'fail',
        data: result.error.details[0].message,
      });
    }
    if (error) {
      return res.status(401).json({
        status: 'fail',
        data: 'request not authorized',
      });
    }

    return next();
  },
};

export default userAuth;

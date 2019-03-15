import Joi from 'joi';
import bcrypt from 'bcrypt';
import database from '../database/database';

const { users } = database;

const authError = (res, reply) => {
  return res.status(401).json({
    status: 'fail',
    data: reply,
  });
};

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
      authError(res, result.error.details[0].message);
    }
    if (error) {
      authError(res, 'request not authorized');
    }

    next();
  },
  signInAuth(req, res, next) {
    const Schema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
    const result = Joi.validate(req.body, Schema);
    if (result.error) authError(res, result.error.details[0].message);

    const user = users.find(person => person.email === req.body.email);

    if (!user) authError(res, 'request not authorized');
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) authError(res, 'request not authorized');
        if (response) next();
      });
    }
  },
};

export default userAuth;

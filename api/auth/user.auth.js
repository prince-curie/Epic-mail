import Joi from 'joi';
import bcrypt from 'bcrypt';
import database from '../database/database';

const { users } = database;

const authError = (res, reply) => res.status(401).json({
  status: 'fail',
  data: reply,
});

const userAuth = {
  signUpAuth(req, res, next) {
    const error = users.find(person => person.email === req.body.email);

    const Schema = {
      email: Joi.string().trim().email().required(),
      firstName: Joi.string().trim().min(2).required(),
      lastName: Joi.string().trim().min(2).required(),
      password: Joi.string().trim().min(6).required(),
    };

    const result = Joi.validate(req.body, Schema);

    if (result.error) authError(res, result.error.details[0].message);
    if (error) authError(res, 'request not authorized');

    if (!error && !result.error) next();
  },
  signInAuth(req, res, next) {
    const Schema = {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).required(),
    };
    const result = Joi.validate(req.body, Schema);
    if (result.error) return authError(res, result.error.details[0].message);

    const user = users.find(person => person.email === req.body.email);

    if (!user) return authError(res, 'request not authorized');
    const passwordCompare = bcrypt.compare(req.body.password, user.password) 
    if (passwordCompare) next();
  },
};

export default userAuth;

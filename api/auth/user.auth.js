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
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    };

    const result = Joi.validate(req.body, Schema);

    if (result.error) authError(res, result.error.details[0].message);
    if (error) authError(res, 'request not authorized');

    if (!error && !result.error) next();
  },
  signInAuth(req, res, next) {
    const Schema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
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

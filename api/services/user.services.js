import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import database from '../database/database';
import userAuth from '../auth/user.auth';

const { users } = database;
const env = dotenv.config();

const userService = {
  fetchAllUsersDB() {
    const allUsers = users.map((user) => {
      const newUser = new User();
      newUser.id = user.id;
      newUser.email = user.email;
      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      newUser.password = user.password;
      return newUser;
    });
    return allUsers;
  },
  addUserDB(req, res, next) {
    const lastId = users[users.length - 1].id;
    const newId = lastId + 1;
    // eslint-disable-next-line no-param-reassign
    req.body.id = newId;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      // eslint-disable-next-line no-param-reassign
      req.body.password = hash;
      users.push(req.body);
    });
    const token = jwt.sign({
      email: req.body.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '3hr',
    });
    res.json({
      status: 'success',
      data: token,
    });
    next();
  },
  signInDB(req, res, next) {
    const token = jwt.sign({
      email: req.body.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '3hr',
    });
    res.json({
      status: 'success',
      data: token,
    });
    next();
  },
};
export default userService;

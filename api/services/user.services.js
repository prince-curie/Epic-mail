import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import database from '../database/database';

const { users } = database;
dotenv.config();


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
  addUserDB(req, res) {
    const lastId = users[users.length - 1].id;
    const newId = lastId + 1;
    const user = new User();
    user.id = newId;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = bcrypt.hash(req.body.password, 10);
    users.push(user);
    const token = jwt.sign({
      email: req.body.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '3hr',
    });
    return { token };
  },
  signInDB(req, res) {
    const token = jwt.sign({
      email: req.body.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '3hr',
    });
    return { token };
  },
};
export default userService;

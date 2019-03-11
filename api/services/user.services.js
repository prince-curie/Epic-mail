import database from '../database/database';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv'

const {users} = database;
const envconfig = env.config();

const userService =   {
  fetchAllUsersDB () {
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
  addUserDB(user, res) {
    const lastId = users[users.length - 1].id;
    const newId = lastId + 1;
    //copied from jwt documentation and holland burke article on env variables
    const token = jwt.sign({
      email: user.email
    }, 
    process.env.JWT_KEY,
    {
      expiresIn: '3hr'
    });
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          data: err
        })
      } 
        user.id = newId;
        user.password = hash;
        users.push(user);
    });
    return token;
  },  
  getUser(id) {
    users.find( user => user.id == parseInt(id) );
  }
}

export default userService;

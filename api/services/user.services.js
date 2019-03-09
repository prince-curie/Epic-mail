import database from '../database/database';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

const {users} = database;

const userService = {
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
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          data: err
        })
      } else {
        user.id = newId;
        user.password = hash;
        console.log(user.password);
        users.push(user);
      }
    });
    return res.status(200).json({
      status: 'success',
      data: user
    });
  },  
  getUser(id) {
    users.find( user => user.id == parseInt(id) );
  }
}

export default userService;

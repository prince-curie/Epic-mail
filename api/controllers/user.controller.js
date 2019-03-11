import userServices from '../services/user.services';

const {fetchAllUsersDB, addUserDB } = userServices;

const userController = {
  fetchAllUser(req,res) {
    return res.json({
      status: 'success',
      data: fetchAllUsersDB()
    }).status(200);
  },
  signUp(req, res) {
    const newUser = req.body; 
    const createdUser = addUserDB(newUser);
      return res.json({
        status: 'success',
        data: createdUser
      }).status(201);
  }
}

export default userController;
import userServices from '../services/user.services';
import Userauth from '../auth/user.auth'


const {fetchAllUsersDB } = userServices;


const userController = {
  fetchAllUser(req,res) {
    return res.json({
      status: 'success',
      data: fetchAllUsersDB()
    }).status(200);
  },
  addUser(req, res) {
    const newUser = req.body; 
    return Userauth(newUser, res);
  }
}

export default userController;
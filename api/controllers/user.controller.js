import userServices from '../services/user.services';

const { fetchAllUsersDB } = userServices;

const userController = {
  fetchAllUser(req, res) {
    return res.json({
      status: 'success',
      data: fetchAllUsersDB(),
    }).status(200);
  },
 ch-test-create-user-164533590
  signUp(err, req, res) {
    return res;
  },
};

export default userController;

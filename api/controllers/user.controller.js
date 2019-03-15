import userServices from '../services/user.services';

const { fetchAllUsersDB, addUserDB, signInDB } = userServices;

export default {
  fetchAllUser(req, res) {
    return res.json({
      status: 'success',
      data: fetchAllUsersDB(),
    }).status(200);
  },
  signUp(req, res) {
    return res.json({
      status: 201,
      data: [addUserDB(req, res)],
    }).status(200);
  },
  signIn(req, res) {
    return res.json({
      status: 200,
      data: [signInDB(req, res)],
    }).status(200);
  },
};

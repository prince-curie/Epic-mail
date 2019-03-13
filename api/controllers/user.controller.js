import userServices from '../services/user.services';

const { fetchAllUsersDB } = userServices;

export default {
  fetchAllUser(req, res) {
    return res.json({
      status: 'success',
      data: fetchAllUsersDB(),
    }).status(200);
  },
  signUp(req, res) {
    try {
      return res;
    } catch (error) {
      /* istanbul ignore next */
      return error;
    }
  },
};

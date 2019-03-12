import Joi from 'joi';
import userServices from '../services/user.services';
import database from '../database/database';

const {addUserDB} = userServices;
const {users} = database;

function Userauth(user, res) {
  const Schema = {
    email: Joi.string().required(), 
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required()
  }

  const result = Joi.validate(user, Schema);

  if (result.error) {
    return res.status(400).json({
			status: 'fail',
			data: result.error.details[0].message});
  } else {
		users.find((person) => {
			if (person.email == user.email){
				return res.status(400).json({
					status: 'fail',
					data: 'Bad request'
				}) 
			}
		})
		return addUserDB(user, res)
	} 
}
export default Userauth
import { Router } from 'express';

import userController from '../controllers/user.controller';

import userService from '../services/user.services';

import userAuth from '../auth/user.auth';


const { signUpAuth, signInAuth } = userAuth;

const { fetchAllUser, signUp, signIn } = userController;

const { addUserDB, signInDB } = userService;

const router = Router();

router.get('/users/', fetchAllUser);

router.post('/auth/signup', signUpAuth, signUp);

router.post('/auth/login', signInAuth, signIn /*, signInAuth*/);

export default router;

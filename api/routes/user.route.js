import { Router } from 'express';

import userController from '../controllers/user.controller';

import userService from '../services/user.services';

import userAuth from '../auth/user.auth';


const { signUpAuth, signInAuth } = userAuth;

const { fetchAllUser, signUp, signIn } = userController;

const { addUserDB, signInDB } = userService;

const router = Router();

router.get('/', fetchAllUser);

router.post('/signup', signUpAuth, addUserDB, signUp);

router.post('/signin', signInAuth, signInDB, signIn);

export default router;

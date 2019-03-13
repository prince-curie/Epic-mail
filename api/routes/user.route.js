import { Router } from 'express';

import userController from '../controllers/user.controller';

import userService from '../services/user.services';

import userAuth from '../auth/user.auth';

const { signUpAuth } = userAuth;

const { fetchAllUser, signUp } = userController;

const { addUserDB } = userService;

const router = Router();

router.get('/', fetchAllUser);

router.post('/signup', signUpAuth, addUserDB, signUp);

export default router;

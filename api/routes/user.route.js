import {Router} from 'express';

import userController from '../controllers/user.controller';

import userAuth from '../auth/user.auth';

const {signUpAuth} = userAuth;

const {fetchAllUser, signUp} = userController;

const router = Router();

router.get('/', fetchAllUser);

router.post('/signup', signUpAuth, signUp );

export default router;
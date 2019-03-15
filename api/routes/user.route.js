import { Router } from 'express';
import userController from '../controllers/user.controller';
import userAuth from '../auth/user.auth';


const { signUpAuth, signInAuth } = userAuth;

const { fetchAllUser, signUp, signIn } = userController;

const router = Router();

router.get('/users/', fetchAllUser);

router.post('/auth/signup', signUpAuth, signUp);

router.post('/auth/login', signInAuth, signIn);

export default router;

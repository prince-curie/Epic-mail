import {Router} from 'express';

import userController from '../controllers/user.controller';

const {fetchAllUser, addUser} = userController;

const router = Router();

router.get('/', fetchAllUser);

router.post('/', addUser );

export default router;
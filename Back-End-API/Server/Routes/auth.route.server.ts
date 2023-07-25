import express from 'express';
const router = express.Router();

import { DisplayLoginPage,
    DisplayRegisterPage,
    ProcessLoginPage,
    ProcessLogoutPage,
    ProcessRegisterPage } from '../controllers/auth.controller.server';

//const router = Router();

router.get('/login', DisplayLoginPage);
router.get('/register', DisplayRegisterPage);
router.post('/login', ProcessLoginPage);
router.post('/register', ProcessRegisterPage);
router.get('/logout', ProcessLogoutPage);

export default router;

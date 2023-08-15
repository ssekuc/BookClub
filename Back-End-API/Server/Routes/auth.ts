
import express from 'express';
const router = express.Router();

// import controller module

import {DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessRegisterPage, ProcessLogoutPage, DisplayUserPage} from "../controllers/auth";



//Display Login page
router.get('/login', DisplayLoginPage);

//Display Register page
router.get('/register', DisplayRegisterPage);

//Display User page
router.get('/user-profile', DisplayUserPage);
//Display User page
//router.get('/administrator',ProcessLoginPage);

// Process Login Page
router.post('/login', ProcessLoginPage);

// Process Register Page
router.post('/register', ProcessRegisterPage);

// Process Logout Page
router.get('/logout', ProcessLogoutPage);





export default router;




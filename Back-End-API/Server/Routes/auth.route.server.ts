import express from 'express';
import Roles from '../models/roles'
const router = express.Router();

import {
    DisplayLoginPage,
    DisplayRegisterPage,
    ProcessLoginPage,
    ProcessLogoutPage,
    ProcessRegisterPage
} from '../controllers/auth.controller.server';

//const router = Router();

router.get('/login', DisplayLoginPage);
router.get('/register', DisplayRegisterPage);
router.post('/login', ProcessLoginPage);
router.post('/register', ProcessRegisterPage);
router.get('/logout', ProcessLogoutPage);



// Roles router

// List of Roles
router.get('/roles', async (req, res,) => {
    try {
        const Role = await Roles.find()
        res.json(Role)
    } catch (err) {
        res.status(500).json({ message: err })
    }

})

// Create a new Role
router.post('/roles', async (req, res) => {

    const Role = new Roles({
        name: req.body.name

    })
    try {
        const newRole = await Role.save()
        res.status(201).json(newRole)
    } catch (err) {
        res.status(400).json({ message: err })
    }

})





export default router;

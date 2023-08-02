"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roles_1 = __importDefault(require("../models/roles"));
const router = express_1.default.Router();
const auth_controller_server_1 = require("../controllers/auth.controller.server");
router.get('/login', auth_controller_server_1.DisplayLoginPage);
router.get('/register', auth_controller_server_1.DisplayRegisterPage);
router.post('/login', auth_controller_server_1.ProcessLoginPage);
router.post('/register', auth_controller_server_1.ProcessRegisterPage);
router.get('/logout', auth_controller_server_1.ProcessLogoutPage);
router.get('/roles', async (req, res) => {
    try {
        const Role = await roles_1.default.find();
        res.json(Role);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
router.post('/roles', async (req, res) => {
    const Role = new roles_1.default({
        name: req.body.name
    });
    try {
        const newRole = await Role.save();
        res.status(201).json(newRole);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.default = router;
//# sourceMappingURL=auth.route.server.js.map
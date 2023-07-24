"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_server_1 = require("../Controllers/auth.controller.server");
const router = (0, express_1.Router)();
router.get('/login', auth_controller_server_1.DisplayLoginPage);
router.get('/register', auth_controller_server_1.DisplayRegisterPage);
router.post('/login', auth_controller_server_1.ProcessLoginPage);
router.post('/register', auth_controller_server_1.ProcessRegisterPage);
router.get('/logout', auth_controller_server_1.ProcessLogoutPage);
exports.default = router;
//# sourceMappingURL=auth.route.server.js.map
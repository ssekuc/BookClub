"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_server_1 = require("../controllers/auth.controller.server");
router.get('/login', auth_controller_server_1.DisplayLoginPage);
router.get('/register', auth_controller_server_1.DisplayRegisterPage);
router.post('/login', auth_controller_server_1.ProcessLoginPage);
router.post('/register', auth_controller_server_1.ProcessRegisterPage);
router.get('/logout', auth_controller_server_1.ProcessLogoutPage);
exports.default = router;
//# sourceMappingURL=auth.route.server.js.map
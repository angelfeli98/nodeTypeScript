"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const User = require("../controllers/user");
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
router.get('/test', User.test);
router.post('/saveUser', User.saveUser);

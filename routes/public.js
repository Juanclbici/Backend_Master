const express = require('express');
const router = express.Router();
require('dotenv').config();

const authRouter = require('./api/auth');


const baseUrl = process.env.BASE_URL || '/api';

router.use(baseUrl, authRouter);

module.exports = router;

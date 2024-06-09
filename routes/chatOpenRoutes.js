const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const geminiController = require('../controllers/geminiController');
const ragController = require('../controllers/ragController');

router.post('/', chatController.getResponseChat); //we set as the root of the route the function getAllUsers from the userController because we want to get all the users from the database
router.post('/gemini', geminiController.getResponseChatGemini);
router.post('/context', ragController.getContextResponse);

module.exports = router; // we export the router so we can use it in the index.js file












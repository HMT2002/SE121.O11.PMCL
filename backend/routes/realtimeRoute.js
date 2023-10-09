const express = require('express');
const realtimeController = require('../controllers/realtimeController');

const router = express.Router();

//ROUTE HANDLER
router.route('/socket').get(realtimeController.SocketConnect);



module.exports = router;

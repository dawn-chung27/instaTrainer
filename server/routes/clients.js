// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to grab client work out session history +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const clientsControllers = require('../controllers/clientsControllers');


router.get('/dashboard', clientsControllers.getExersices, (req, res) =>
  res.status(200).json(res.locals.dashboard)
);



module.exports = router;
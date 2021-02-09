// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Router for methods to create accounts and login on website +++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
router.post('/signup', authControllers.createUsers, (req, res) => {
    if (res.locals.status === 'username taken') {
        return res.status(409).send('username taken')
    }
    return res.status(200).send('created user')
})
router.post('/signin', authControllers.verifyUsers, authControllers.setSSIDCookie, authControllers.startCookieSession, (req, res) => {
  if (res.locals.status === 'not found') {
    return res.status(409).send('user not found');
  }
  return res.status(200).send('logged in');
});

module.exports = router;
const express = require('express');
const passport = require('passport');

const AuthService = require('../services/authService');
const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      const rta = service.signToken(user);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const message = await service.sendRecoveryLink(email);
    res.json(message);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const message = await service.changePassword(token, newPassword);
    res.json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

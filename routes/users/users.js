import express from 'express';
import users from '../../db/models/users.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const user = await users.findOne({ where: { username: req.query.username } });

  if (user === null || user === undefined) {
    res.status(404).send({
      message: 'User not found',
    });
  } else {
    if (user.password === req.query.password && user.isActive) {
      res.send(user);
    } else {
      if (user.isActive) {
        user.loginAttempt++;
        if (user.loginAttempt >= 3) {
          user.isActive = false;
        }
        await user.save();
        res.status(401).send({
          message: 'Username or Password incorrect',
        });
      } else {
        res.status(401).send({
          message: 'Account is locked',
        });
      }

    }
  }
});

router.post('/', async (req, res) => {
  const user = await users.findOne({ where: { username: req.body.username } });
  if (user === null) {
    await users.create({ ...req.body, isActive: true, loginAttempt: 0 });
    res.send();
  } else {
    res.status(403).send({ message: 'Username already exists' });
  }
});

export { router as usersRoute };

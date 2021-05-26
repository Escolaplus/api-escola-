/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Users = require('../../database/models/Users');

router.get('/', (req, res) => {
  res.json({ message: 'see readme.md for more information' });
});

/**
 * @description Create user
*/
router.post('/users', (req, res) => {
  Users.add(req.body)
    .then((_Users) => {
      res.status(200).json(_Users);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'cannot create user',
      });
    });
});

/**
 * @description show all users
 */

router.get('/users', (req, res) => {
  Users.find()
    .then((_Users) => {
      res.status(200).json(_Users);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'cannot get users',
      });
    });
});

/**
 * @description show user by id
 */
router.get('/users/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then((_Users) => {
      if (_Users) {
        res.status(200).json(_Users);
      } else {
        res.status(404).json({
          message: 'this user is not exists',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'cannot get user',
      });
    });
});

/**
 * @description delete user
 */

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'the user has ben10 removed' });
      } else {
        res.status(500).json({ message: `error, cannot remove the user ${id}` });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: 'unable to delete' });
    });
});

/**
 * @description update user
 */

router.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then((_Users) => {
      if (_Users) {
        res.status(200).json(_Users);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'error updating user' });
    });
});

module.exports = router;

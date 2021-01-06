const db = require('../models/index')
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  // look in our user database and see if user exist
  //check for username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err
      })
      return
    }

    if (user) {
      res.status(400).send({
        message: "failed, This user already exist"
      })
      return
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return
      }

      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return
      }

      next();
    });
  });
};



const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};


module.exports = verifySignUp;

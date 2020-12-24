const config = require('../config/auth.config')
const db = require('../models/index')
// Access to our db through User
const User = db.user

// this will give access to encode and decode the jwt itself. ( allows us to work with jwt)
const jwt = require('jsonwebtoken')
// For hashing / encrypting out passwords 
const bcrypt = require('bcryptjs')

// This will handle stand up
exports.signup = (req,res) => {
    
    // we are going to make out user object using the params returned from req
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    // we save that user, and if there is an error we throw that error
    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err})
            return
        }else {
          res.status(200).send({message: 'User created successfully'})
        }
      })
    }
           

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    // exec retuning our user to user
    .exec((err, user) => {
        if(err) {
            res.status(500).send({message: err})
            return
        }

        // user did not exist
        if(!user) {
            return res.status(404).send({message: "User not found"})
        }

        // validate the password by passing req.body password and the password returned from db
        // over to bcrypt to unhash and compare
        const passwordIsValid = bcrypt.compareSync(
            req.body.password, // unencrypted pw from req.body
            user.password // encrypted pwd saved in db
        ) 

        // if password is not valid, we returning invalid password
        //return a boolean
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "invalid password"})
        }

        // is password is valid we generate a new token
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400// expires token in 24 hours
        })


        // seding that response back
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        })

    })
}
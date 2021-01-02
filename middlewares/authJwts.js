const jwt = require('jsonwebtoken')
const config = require("../config/auth.config")
const db = require('../models/index')
const User = db.user

// This function will verify our web token
verifyWebToken = (req, res, next) => {
    //First we declare our token which is passed in our headers
    let token = req.headers['x-access-token']
    // If not token given we respond with an error
    if(!token) {
        return res.status(403).send({message: "No token provided"})
    }

    // We try to verify the token
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({message: "Unauthorized"})
        }
        // set userid to decoded id.
        req.userId = decoded.id
        next()
    })
}



// add those to an object
const authJwt ={
    verifyWebToken,
}

module.exports = authJwt

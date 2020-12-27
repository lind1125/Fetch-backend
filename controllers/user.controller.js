const config = require('../config/auth.config')
const db = require('../models/index')
// Access to our db through User
const User = db.user

// exports.allAccess = (req,res) => {
//     res.status(200).send("public content")
// }

// exports.userBoard = (req,res) => {
//
//
//     res.status(200).send("User content")
// }


// Get request to /profile, get's user information and their dogs
exports.getProfile = (req,res) => {
    // get user from header info
    User.findOne({
      _id:req.userId
      // populate their dogs
    }).populate('dogs','-__v').exec((err,user)=>{
      if(err){
        return res.status(500).send({message:err.message})
      }
      console.log(user)
      return res.status(200).send(user)
    })
}

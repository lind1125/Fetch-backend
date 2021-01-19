const config = require('../config/auth.config')
const db = require('../models/index')
// Access to our db through User
const User = db.user
const Dog = db.dog





// Get request to /profile, gets user information and their dogs - return user document
exports.getProfile = (req, res) => {
  // get user from header info
  User.findOne({
      _id: req.userId
    })
    // populate their dogs
    .populate('dogs', '-__v')
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        })
      }
      return res.status(200).send(user)
    })
}

// Delete a user's profile and it's associated dogs from database.
exports.deleteProfile = (req, res) => {
    User.findOne({
        _id: req.userId
      }).then((user, err) => {
          if (err) {
            return res.status(500).send({
              message: err.message
            })
          }
          // need to go through all the user's dogs and delete them
          Dog.deleteMany({
              _id: {
                $in: user.dogs
              }
            },(err,result)=>{
              //then delete the user itself
              if (err) {
                return res.status(500).send({
                  message: err.message
                })
              }
              User.deleteOne({
                _id: req.userId
              }).then(result => {
                return res.status(200).send({
                  message: "deleted user"
                })
              })
            })
      })
    }


// Update the user's profile from the form - they can update email address and location?
exports.updateProfile = (req,res) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return
    }
    // if we found a user with that email address, check if it's the logged in user
    if (user && user._id.toString() !== req.userId) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return
    } else{
      User.updateOne({_id:req.userId},
      {
        email: req.body.email,
        location: req.body.location
      },(err,result)=>{
        if(err){
          return res.status(500).send({message:err.message})
        } else if (user.dogs.length>0){
          // update the user's dogs' location
          Dog.update({_id: {$in : user.dogs}},{$set:{location:req.body.location}},{$multi:true},(err,result)=>{
            if(err){
              return res.status(500).send({message: err.message})
            }
            return res.send({message:'Updated User Successfully'})
          })
        } else {
          return res.send({message:'Updated User Successfully'})
        }
      })
    }
  })

}

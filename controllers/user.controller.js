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
                console.log(result)
                // should we redirect here? TODO
                return res.status(200).send({
                  message: "deleted user"
                })
              })
            })
      })
    }


// Update the user's profile from the form - they can update email address and location? 
exports.updateProfile = (req,res) => {
  User.updateOne({_id:req.userId},
  {
    email: req.body.email,
    location: req.body.location
  },(err,result)=>{
    if(err){
      return res.status(500).send({message:err.message})
    } else{
      return res.send({message:'Updated User Successfully'})
    }
  })
}

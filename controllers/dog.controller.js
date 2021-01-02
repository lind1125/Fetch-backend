const config = require('../config/auth.config')
const db = require('../models/index')
// Access to our db through User
const User = db.user
const Dog = db.dog


exports.newDog = (req, res) => {
  // findone returns the found object
  User.findOne({
    _id: req.userId
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }
    if (!user) {
      res.status(400).send('User not found')
    }
    // All of these need to come from the form except location
    Dog.create({
      name: req.body.name,
      size: req.body.size,
      biography: req.body.biography,
      breed: req.body.breed,
      temperament: req.body.temperament,
      location: user.location, // inherit from User's profile
      age: req.body.age,
      size: req.body.size,
      preferences: {
        min_age: req.body.min_age,
        max_age: req.body.max_age,
        min_size: req.body.min_size,
        max_size: req.body.max_size
      }
    }, (err, newDog) => {
      user.dogs.push(newDog)
      user.save()
      res.status(200).send(user)
    })
  })

}


exports.showDog = (req, res) => {

  Dog.findOne({
    _id: req.params.dogid
  }).exec((err, foundDog) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }
    if (!foundDog) {
      return res.status(404).send('Dog was not found')
    }
    // check if user is the owner of this dog
    User.findOne({
      _id: req.userId
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        })
      }
      if (!user) {
        return res.status(403).send('You must be logged in to do this?')
      }
      // check that the logged in user owns this dog
      if (user.dogs.includes(foundDog.id)) {
        return res.status(200).send(foundDog)
      } else {
        return res.status(403).send('This is not your dog!')
      }
    })
  })
}

exports.updateDog = (req, res) => {
  User.findOne({
    _id: req.userId
  }).exec((err, user) => {
    if (!user) {
      return res.status(403).send('You must be logged in')
    }
    // check if user owns the dog trying to be updated
    if (user.dogs.includes(req.params.dogid)) {
      Dog.updateOne({
        _id: req.params.dogid
      }, {
        $set: {
          name: req.body.name,
          size: req.body.size,
          biography: req.body.biography,
          breed: req.body.breed,
          temperament: req.body.temperament,
          age: req.body.age,
          size: req.body.size,
          preferences: {
            min_age: req.body.preferences.min_age,
            max_age: req.body.preferences.max_age,
            min_size: req.body.preferences.min_size,
            max_size: req.body.preferences.max_size
          }
        }
      }).exec((err) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          })
        }
      })
      return res.status(200).send({
        message: 'Dog updated successfully'
      })

    } else {
      return res.status(403).send('This is not your dog!')
    }
  })
}

// function to delete a single dog from the database
exports.deleteDog = (req, res) => {
  User.findOne({_id:req.userId}).exec((err,user)=>{
    if(!user){
      return res.status(403).send('You must be logged in')
    }
    if (user.dogs.includes(req.params.dogid)){
      Dog.deleteOne({
        _id: req.params.dogid
      }).then(() => {
        // should we redirect here? TODO
        return res.status(200).send({
          message: 'Dog deleted successfully'
        })
        //error handling
      }).catch(err=>res.status(500).send({message:err.message}))

    } else {
      return res.status(403).send('This is not your dog!')
    }
  })
}



exports.rejectDog = (req,res) => {
  console.log(req.body.doToReject)
  // find the dog from the form
  Dog.findOne({_id:req.body.dogToReject}).exec((err,foundDog)=>{
    if(!foundDog){
      return res.status(404).send({message:"Dog not found"})
    }
    console.log(foundDog)
    // find and update the userDog
    Dog.findOneAndUpdate({_id:req.params.dogid},{$push :{rejected : foundDog}},{useFindAndModify:false, new:true}).then(data=>{
      console.log(data)
      res.send({message:"Added dog to rejected"})
    })
  })
}

exports.likeDog = (req,res) => {
  console.log(req.body.dogToLike)
  // find the dog from the form
  Dog.findOne({_id:req.body.dogToLike}).exec((err,foundDog)=>{
    if(!foundDog){
      return res.status(404).send({message:"Dog not found"})
    }
    console.log(foundDog)
    // find and update the userDog
    Dog.findOneAndUpdate({_id:req.params.dogid},{$push :{liked : foundDog}},{useFindAndModify:false, new:true}).then(data=>{
      console.log(data)
      res.send({message:"Added dog to liked"})
    })
  })
}

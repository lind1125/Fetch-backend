const config = require('../config/auth.config')
const db = require('../models/index')
// Access to our db through User
const User = db.user
const Dog = db.dog


exports.newDog = (req,res) => {
  // findone returns the found object
  User.findOne({_id:req.userId}).exec((err,user)=>{
    if(err){
      return res.status(500).send({message:err.message})
    }
    if(!user){
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
      preferences : {
        min_age: req.body.min_age,
        max_age: req.body.max_age,
        min_size: req.body.min_size,
        max_size: req.body.max_size
      }
    },(err,newDog)=>{
      user.dogs.push(newDog)
      user.save()
      res.status(200).send(user)
    })
  })

}


exports.showDog = (req,res)=>{

  Dog.findOne({
    _id: req.params.dogid
  }).exec((err,foundDog)=>{
    if(err){
      return res.status(500).send({message:err.message})
    }
    if(!foundDog){
      return res.status(404).send('Dog was not found')
    }
    // check if user is the owner of this dog
    User.findOne({
      _id : req.userId
    }).exec((err,user)=>{
      if(err){
        return res.status(500).send({message: err.message})
      }
      if(!user){
        return res.status(403).send('You must be logged in to do this?')
      }
      // check that the logged in user owns this dog
      if(user.dogs.includes(foundDog.id)){
        return res.status(200).send(foundDog)
      } else {
        return res.status(403).send('This is not your dog!')
      }
    })
  })
}

exports.deleteDog = (req, res)=>{
  console.log('DOG ID:', req.params.dogid)
  console.log('USER:', req.userId)
  Dog.deleteOne({
    _id: req.params.dogid
  }).exec(result => {
    console.log(result)
    // should we redirect here? TODO
    return res.status(200).send({
      message: 'Dog deleted successfully'
    })
  })
}
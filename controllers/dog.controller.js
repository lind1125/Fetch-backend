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

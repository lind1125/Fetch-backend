const mongoose = require("mongoose")


const DogSchema = new mongoose.Schema({
   name: String,
   picture_url: String,
   biography: String,
   breed: String,
   temperament: String,
   location: String, // passed down from User
   age: Number,
   size: String,
   preferences: {
     min_age: Number,
     max_age: Number,
     min_size: String,
     max_size: String,
   },
   liked: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Dog"
       }
   ],
   rejected: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Dog"
       }
   ]
})


const Dog = mongoose.model("Dog", DogSchema)

module.exports = Dog

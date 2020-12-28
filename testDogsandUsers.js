const db = require('./models/')
const Dog = db.dog
const User = db.user


const test =  async () => {

  const dog1 = await Dog.create({
    name: "brutus"+Math.floor(Math.random()*100)
  })
  // give the user a dog
  User.findOne({
      username: "user1"
    }).then(user=>{
      user.dogs.push(dog1)
      user.save()
    })
    // log the user
    User.find({name:'user1'}).populate("dogs","-__v").exec((err,user)=>{
      console.log(user)
    })


}
module.exports = test

// const testDog = () => {
//   const homer = new Dog({
//     name: "Homer",
//     preferences: {min_age: 6, max_age: 10, min_size: "small", max_size:"large"}
//   })
//   homer.save()
// }

// Here is a test string you can paste to postman for a user signup
// {
//     "username" :"user1",
//     "password":"password",
//     "email" : "user1@gmail.com",
//     "location" : "Houston, TX"
// }

// Here is a test string you can paste to postman to create a new dog
// {
//   "name": "Alex",
//   "picture_url": "www.google.com",
//   "biography": "Cranky old dog",
//   "breed": "Mutt",
//   "temperament": "Lazy",
//   "age": "14",
//   "size": "Medium",
//   "preferences": {
//     "min_age": "10",
//     "max_age": "15",
//     "min_size": "Small",
//     "max_size": "Large"
//   }
// }

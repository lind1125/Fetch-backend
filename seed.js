const bcrypt = require('bcryptjs')
const dbConfig = require('./config/db.config')
const mongoose = require("mongoose");
const db = require('./models/')
const Dog = db.dog
const User = db.user


const seed = async () => {
  const usersArray = [];
  for (let i = 1; i <= 4; i++) {
    usersArray.push({
      username: `user${i}`, // 4 users user1-user4
      password: await bcrypt.hashSync("password", 8), // password is password
      email: `user${i}@gmail.com`, // 4 users user1@gmail.com - user4@gmail.com
      location: "Houston, TX" //all same location for now
    })
  }
  User.insertMany(usersArray) //save the users in the database
    .then(() => console.log('users inserted'))
    .catch(err => console.log(err))

  const dog1 = await Dog.create({
    name: "Alex",
    picture_url: "www.google.com",
    biography: "Cranky old dog",
    breed: "Mutt",
    temperament: "Lazy",
    age: "14",
    size: 2,
    preferences: {
      min_age: "10",
      max_age: "15",
      min_size: 1,
      max_size: 3
    }
  })
  const dog2 = await Dog.create({
    name: "Bella",
    picture_url: "www.google.com",
    biography: "Little Pupper",
    breed: "Mutt",
    temperament: "Hyper",
    age: "1",
    size: 1,
    preferences: {
      min_age: "1",
      max_age: "5",
      min_size: 1,
      max_size: 3
    }
  })
  const dog3 = await Dog.create({
    name: "Charles",
    picture_url: "www.google.com",
    biography: "Charles in charge",
    breed: "Mutt",
    temperament: "Aggressive",
    age: "6",
    size: 2,
    preferences: {
      min_age: "4",
      max_age: "15",
      min_size: 2,
      max_size: 3
    }
  })
  const dog4 = await Dog.create({
    name: "Dingodile",
    picture_url: "www.google.com",
    biography: "Half dingo half dile",
    breed: "...dingodile",
    temperament: "Chompy",
    age: "4",
    size: 3,
    preferences: {
      min_age: "2",
      max_age: "15",
      min_size: 2,
      max_size: 3
    }
  })
  const dog5 = await Dog.create({
    name: "Eugene",
    picture_url: "www.google.com",
    biography: "Not actually a dog",
    breed: "Snake",
    temperament: "Lazy",
    age: "7",
    size: 1,
    preferences: {
      min_age: "3",
      max_age: "15",
      min_size: 1,
      max_size: 3
    }
  })
  const dog6 = await Dog.create({
    name: "Franklin",
    picture_url: "www.google.com",
    biography: "Just happy to be here",
    breed: "Corgi",
    temperament: "Happy",
    age: "4",
    size: 1,
    preferences: {
      min_age: "3",
      max_age: "12",
      min_size: 1,
      max_size: 3
    }
  })

  // give the users some dog
  User.findOne({
    username: "user1"
  }).then(user => {
    user.dogs.push(dog1)
    user.save()
  })


  User.findOne({
    username: "user2"
  }).then(user => {
    user.dogs.push(dog2)
    user.dogs.push(dog3)
    user.save()
  })
  User.findOne({
    username: "user3"
  }).then(user => {
    user.dogs.push(dog4)
    user.dogs.push(dog5)
    user.save()
  })
  User.findOne({
    username: "user4"
  }).then(user => {
    user.dogs.push(dog6)
    user.save()
  })
}


// connect to database and run the seed file. Make sure you're not connected to database already via nodemon.
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    seed()
    console.log("Successfully connected to MongoDB.");

  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

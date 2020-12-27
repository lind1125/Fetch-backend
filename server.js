const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require('cors')
const mongoose = require("mongoose");

const app = express()

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse request of content type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// SETUP MONGOOSE
const db = require('./models/')
const Dog = db.dog
// connect to mongo database
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //testDog()
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route, do I work?
app.get('/', (req,res) => {
    res.json({message: "Welcome to the home page"})
})

// import the routes we wrote
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

// set the port, listen for request
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})

// const testDog = () => {
//   const homer = new Dog({
//     name: "Homer",
//     preferences: {min_age: 6, max_age: 10, min_size: "small", max_size:"large"}
//   })
//   homer.save()
// }

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.user = require('./user.model')
db.dog = require('./dog.model')


module.exports = db

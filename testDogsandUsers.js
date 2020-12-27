const db = require('./models/')
const Dog = db.dog
const User = db.user


const test =  async () => {

  const dog1 = await Dog.create({
    name: "brutus"+Math.floor(Math.random()*100)
  })
  User.findOne({
      username: "monica"
    }).then(user=>{
      user.dogs.push(dog1)
      user.save()
    })
    User.find({name:'monica'}).populate("dogs","-__v").exec((err,user)=>{
      console.log(user)
    })


}
module.exports = test

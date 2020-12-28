const { authJwt } = require('../middlewares')
const controller = require('../controllers/dog.controller')

module.exports = function(app) {
    app.use( (req, res, next) => {
        // set header and allow use of x access token ( we will use this to pass our token )
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })

    // app.get("/api/test/all", controller.allAccess)

    // | POST | '/profile/dogs/' | Create one of your dog's profile |
    // add a new dog to the user
    app.post("/profile/dogs", [authJwt.verifyWebToken], controller.newDog)
    // | GET | '/profile/dogs/new' | Form to create a new dog on your own profile, posts to profile/new |
    // | GET | '/profile/dogs/:dogid/edit' | Form to edit data on one of your dogs |
    // | PUT | '/profile/dogs/:dogid' | Update one of your dog's profiles |
    // | DELETE | '/profile/dogs/:dogid' | Delete one of your dog's profile |
    // | GET | '/profile/dogs/:dogid' | View data on one of your dogs (note this has to be below other routes) |
    app.get('/profile/dogs/:dogid',[authJwt.verifyWebToken], controller.showDog)


}

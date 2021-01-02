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


    // | POST | '/profile/dogs/' | Create one of your dog's profile |
    // add a new dog to the user
    app.post("/profile/dogs", [authJwt.verifyWebToken], controller.newDog)
    // PUT add a dog to userDog's liked - requires dogid on the form body as hidden input
    app.put('/profile/dogs/:dogid/like',[authJwt.verifyWebToken],controller.likeDog)

    // | PUT | '/profile/dogs/:dogid' | Update one of your dog's profiles |
    app.put('/profile/dogs/:dogid', [authJwt.verifyWebToken], controller.updateDog)
    // | DELETE | '/profile/dogs/:dogid' | Delete one of your dog's profile |
    app.delete('/profile/dogs/:dogid', [authJwt.verifyWebToken], controller.deleteDog)
    // | GET | '/profile/dogs/:dogid' | View data on one of your dogs (note this has to be below other routes) |
    app.get('/profile/dogs/:dogid',[authJwt.verifyWebToken], controller.showDog)

    // PUT add a dog to userDog's reject - requires dogid on the form body as hidden input
    app.put('/profile/dogs/:dogid/reject',[authJwt.verifyWebToken],controller.rejectDog)
}

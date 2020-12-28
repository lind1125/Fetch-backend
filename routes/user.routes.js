const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')

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

    // get user's profile and all their dogs
    app.get("/profile", [authJwt.verifyWebToken], controller.getProfile)

    // delete the user's profile
    app.delete("/profile",[authJwt.verifyWebToken],controller.deleteProfile)

}

const { verifySignup } = require('../middlewares/')
const controller = require('../controllers/auth.controller')

module.exports = function(app) {
    app.use( (req,res, next) => {
        // set header and allow use of x access token ( we will use this to pass our token )
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })
    // set up signup route and pass middlewares to check username,email
    app.post("/auth/signup",
    [verifySignup.checkDuplicateUsernameOrEmail],
    controller.signup
    )
    // handle sign
    app.post("/auth/signin", controller.signin)
}

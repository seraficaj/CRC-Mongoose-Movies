// ensureLoggedIn.js

// middleware for routes that require a logged in user
module.exports = function(req,res,next) {
    // Pass the req/res to the next middleware/route handler
    if (req.isAuthenticated()) return next();
    // if not logged in, go to login page
    res.redirect("/auth/google")
}
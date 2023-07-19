const Movie = require("../models/movie");

module.exports = {
    create,
    delete: deleteReview,
};

async function create(req, res) {
    const movie = await Movie.findById(req.params.id);
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    // push or unshift into Reviews array
    movie.reviews.push(req.body);
    try {
        // save changes to movie doc
        await movie.save();
    } catch (err) {
        console.log(err);
    }
    // Step 5:  Respond to the Request (redirect if data has been changed)
    res.redirect(`/movies/${movie._id}`);
}

async function deleteReview(req, res) {
    // req.params.id = URL ID of review to delete
    const movie = await Movie.findOne({
        "reviews._id": req.params.id,
        "reviews.user": req.user._id,
    });
    // if there is no movie, go back to home page
    if (!movie) return res.redirect("/movies");
    // remove review using remove method from Mongoose methods for subdocs
    movie.reviews.remove(req.params.id);
    // save the updated movie doc
    await movie.save();
    // redirect back to movie's show view to show review is deleted
    res.redirect(`/movies/${movie._id}`)
}

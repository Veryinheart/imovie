const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================



router.post("/favoriteNumber", auth, (req, res) => {
    // console.log(req);
    //find the favorite info inside the favorite collection in database by movirId
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, FavoriteNumber: favorite.length })
        })
});

router.post("/favorited", auth, (req, res) => {
    //find the favorite info inside the favorite collection in database by movieId and userFrom
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, favorited) => {
            if (err) return res.status(400).send(err)

            //judge if I already favorite the movie
            let result = false;
            if (favorited.length !== 0) {
                let result = true
            }
            res.status(200).json({ success: true, favorited: result })
        })

});

router.post("/addToFavorite", auth, (req, res) => {
    //save the info about movieId and userId into the collection
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err: err })
        return res.status(200).json({ success: true })
    })

});

router.post("/removeFromFavorite", auth, (req, res) => {
    //save the info about movieId and userId into the collection
    Favorite.findOneAndDelete({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err: err });
            res.status(200).json({ success: true, doc })
        })

});

router.post("/getFavoritedMovies", (req, res) => {
    // console.log(req);
    //find the favorite info inside the favorite collection in database by movirId
    Favorite.find({ "userFrom": req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favorites})
        })
});



module.exports = router;

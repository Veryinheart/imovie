const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//=================================
//             Comments
//=================================


router.post("/saveComment", auth, (req, res) => {

    // console.log(req.body)
    //create a nrew comment model 
    const comment = new Comment(req.body);
   
    comment.save((err, comment) => {
        console.log("comment");
        console.log(err)
        if (err) return res.json({ success: false, err });
        console.log("comment2");
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true, result })
            })
    })

});

router.post("/getComments", (req, res) => {
    // console.log(req)
    // console.log(req.body)
    // console.log("object")
    Comment.find({ "postId": req.body.postId })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, comments })
        })

});


module.exports = router;
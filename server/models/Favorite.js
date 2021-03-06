const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    movieId:{
        type:String

    },
    movieTitle:{
        type:String
    },
    movieImage:{
        type:String
    },
    moviePost:{
        type:String
    },
    movieRunTime:{
        type:String
    }
})


const Favorite= mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
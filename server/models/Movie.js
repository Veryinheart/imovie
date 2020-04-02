const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    id:{
        type:Number,
        unique: 1 
    },
    imdb_id:{
        type:String,
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
},{ timestamps: true })


const Movie= mongoose.model('Movie',movieSchema);

module.exports = { Movie }
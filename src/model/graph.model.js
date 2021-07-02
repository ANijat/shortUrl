const mongoose = require('mongoose')


const Graph = mongoose.model('Graph', new mongoose.Schema({
    shortUrl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortUrl",
        required: true,
      }

},{timestamps:true}));

module.exports= Graph
const mongoose = require('mongoose')
var { nanoid } = require("nanoid");


const ShortUrl = mongoose.model('ShortUrl', {
    destination: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    short: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        default: () => nanoid(4),
        required: true,
    },
    count: {
        type: Number,
        default: 0,
        required: true,
    },
})

module.exports= ShortUrl
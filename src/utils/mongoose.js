
const mongoose = require('mongoose')



mongoose.connect('mongodb://nijataslan_121:Nijat12345@mongodb-nijataslan.alwaysdata.net:27017/nijataslan_url', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

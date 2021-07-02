const express= require('express')
const logger= require('./utils/logger')
const shortUrl= require('./routers/shorturl')
const path = require('path');
const cors = require('cors');

require('./utils/mongoose')

const app= express()
const port = process.env.Port || 3000

app.use(express.json())
app.use(shortUrl)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: "http://localhost:3000" 
}));




app.listen(port, () => {
    logger.info(`Server is up on port  : ${port}`);
    
})

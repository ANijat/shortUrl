const express= require('express')
const logger= require('./utils/logger')
const shortUrl= require('./routers/shorturl')
require('./utils/mongoose')

const app= express()
const port = process.env.Port || 3000

app.use(express.json())
app.use(shortUrl)




app.listen(port, () => {
    logger.info(`Server is up on port  : ${port}`);
    
})

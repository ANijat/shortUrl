const express=require('express')
const logger= require('../utils/logger')
const ShortUrl=require('../model/shortUrl.model')
const router= new express.Router()


//create short URL
router.post('/url', async (req, res)=> {
    logger.info(`New api request | url: ${req.url} | body: ${JSON.stringify(req.body)}`);
    const shorturl = new ShortUrl(req.body)
    try {
         let result= await shorturl.save()
        res.status(201).send(result)
    } catch (e) {
        logger.error(`Exception happened: ${e}`)
       res.status(400).send({
           message: (e.name === 'MongoError' && e.code === 11000) ? 'Url already exists ' : errorHandler.getErrorMessage(e)
        })
       
    }

   
})

//get all urls
router.get("/urls", async (req,res) => {
    logger.info(`New api request | url: ${req.url} | body: ${JSON.stringify(req.body)}`);
    try {
        const shorturl= await ShortUrl.find({})
        res.send(shorturl)
    } catch (e) {
        logger.error(`Exception happened: ${e}`)
        res.status(500).send(e)
    }
  
})


// Redirecting
router.get("/:short", async (req,res) => {
    const { short } = req.params;
 
    try {
        const shortUrl= await ShortUrl.findOne({short})
        
        if (!shortUrl) {
            return res.status(404).send()
        }
        res.redirect(shortUrl.destination);
        
        
    } catch (e) {
        logger.error(`Exception happened: ${e}`);
        res.status(500).send(e)

    }
})








module.exports=router
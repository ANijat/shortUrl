const express=require('express')
const logger= require('../utils/logger')
const ShortUrl=require('../model/shortUrl.model')
const Graph= require('../model/graph.model');
const { urlencoded } = require('express');
const router= new express.Router();

const APP_URL = 'http://localhost:3000/';

//Graph
router.get("/api/graph", async (req,res) => {
    logger.info(`New api request | url: ${req.url} | body: ${JSON.stringify(req.body)}`);
    try {
        
        const data= Graph
        .find({destination: 'https://rrr.com'})
        .populate('shortUrl').exec(function(err, urls) {
            if (!urls) {
                return res.status(405).send()
            }
          
            res.send(urls)
        }); 
       
    } catch (e) {
        logger.error(`Exception happened: ${e}`)
        res.status(500).send(e)
    }
  
})




//create short URL
router.post('/api/url', async (req, res)=> {
    logger.info(`New api request | url: ${req.url} | body: ${JSON.stringify(req.body)}`);
    try {
        const shorten = await new ShortUrl(req.body).save();
        let full_shorten_url = APP_URL + shorten.short;
        res.status(201).send({short_url: full_shorten_url});

    } catch (e) {
        logger.error(`Exception happened: ${e}`);
        res.status(400).send({
           message: (e.name === 'MongoError' && e.code === 11000) ? 'Url already exists ' : e.errors.destination.message
           
        });
    };
   
})

//get stats urls
router.get("/api/:short/stats", async (req,res) => {
    const { short } = req.params;
    logger.info(`New api request | url: ${req.url} | body: ${JSON.stringify(req.body)}`);
    try {
        const shortUrl= await ShortUrl.findOne({short}, {short: 1, count: 1, destination: 1})
        if (!shortUrl) {
            return res.status(404).send()
        }
       
        res.send(shortUrl)
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
        let incCount= await ShortUrl.findOneAndUpdate({short :shortUrl.short}, {$inc : {count : 1}});
        let graph= Graph.create({shortUrl: shortUrl._id,});
        res.redirect(shortUrl.destination);
       
        
    } catch (e) {
        logger.error(`Exception happened: ${e}`);
        res.status(500).send(e)
    }
})






module.exports=router
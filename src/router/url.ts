import express from 'express';
import { createCustomShortUrl, createShortUrl, getLongUrl } from '../controllers/url';



export default (router:express.Router)=>{
    router.get('/getUrl/:url',getLongUrl)
    router.post('/createShortUrl',createShortUrl)
    router.post('/createCustomShortUrl',createCustomShortUrl)
   
}

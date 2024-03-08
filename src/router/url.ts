import express from 'express';
import { createShortUrl, getLongUrl } from '../controllers/url';



export default (router:express.Router)=>{
    router.get('/getUrl/:url',getLongUrl)
    router.post('/createShortUrl',createShortUrl)
   
}

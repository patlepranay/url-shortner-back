import { clerkWebHook } from '../controllers/webhook';
import express from 'express'
import bodyParser from 'body-parser';
export default (router: express.Router) => {
  router.post("/webhook",  bodyParser.raw({type: 'application/json'}),clerkWebHook);
 
};

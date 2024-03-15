import { clerkWebHook } from '../controllers/webhook';
import express from 'express'
export default (router: express.Router) => {
  router.post("/webhook",  clerkWebHook);
 
};

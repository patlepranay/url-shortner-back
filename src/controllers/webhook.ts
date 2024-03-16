import { RequireAuthProp, WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import express from "express";

export const clerkWebHook = async (
  req: RequireAuthProp<Express.Request> | express.Request | any,
  res: express.Response
) => {

  console.log('webhook')
  // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Grab the headers and body
  const headers = req.headers;
  const payload = req.body;

  console.log(headers)
  console.log(payload)

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"] as string;
  const svix_timestamp = headers["svix-timestamp"] as string;
  const svix_signature = headers["svix-signature"] as string;

  // If there are missing Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Initiate Svix
 

    const wh = new Webhook(WEBHOOK_SECRET);
    let msg:WebhookEvent;
    try {
        msg = wh.verify(payload, headers) as WebhookEvent;
    } catch (err) {
      console.log(err)
        res.status(400).json({});
    }
    
    console.log(msg)

  // Grab the ID and TYPE of the Webhook
  // const { id } = msg.data;
  // const eventType = msg.type;


  switch(msg.type)
  {
    case 'user.created':  
      console.log(msg.data)
  }
  // console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  // Console log the full payload to view
  console.log("Webhook body:", msg.data);

  return res.status(200).json({
    success: true,
    message: "Webhook received",
  });
};

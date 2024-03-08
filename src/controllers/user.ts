import express from "express";
import {  getUsersByEmail } from "../db/users";


// export const login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).send("Email or password missing");
//     }

//     const user = await getUsersByEmail(email).select(
//       "+authentication.salt +authentication.password"
//     );

//     if (!user) {
//       return res.status(400).send("User not found");
//     }

//     const expectedHash = authentication(user.authentication.salt, password);
//     if (expectedHash != user.authentication?.password) {
//       return res.sendStatus(403);
//     }

//     const salt = random();
//     user.authentication.sessionToken = authentication(
//       salt,
//       user._id.toString()
//     );

//     await user.save();

//     res.cookie("Pranay-Auth", user.authentication.sessionToken, {
//       domain: "localhost",
//       path: "/",
//     });

//     return res.status(200).json(user).end();
//   } catch (error) {}
// };

// export const register = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password, username } = req.body;

//     if (!email || !password || !username) {
//       return res.status(400).send("Email missing");
//     }

//     const existingUser = await getUsersByEmail(email);

//     if (existingUser) {
//       return res.sendStatus(400);
//     }

//     const salt = random();

//     const user = await createUser({
//       email,
//       username,
//       authentication: {
//         salt,
//         password: authentication(salt, password),
//       },
//     });

//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };


// export const createUser=async(req:express.Request,res:express.Response)=>{

//   const {user}=req.body;

//   const existingUser = await getUsersByEmail(user.email);

//   if(existingUser)
//   {
//     return res.status(200).send({message:'User Already exists with email'})
//   }

//   const newUser=await createUser(user)
  
// }
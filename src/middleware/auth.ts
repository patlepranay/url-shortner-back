import { Request, Response, NextFunction } from "express";



const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");

//     // Verify the token with Clerk
//     const { user } = await clerk.verifySession(token);

//     // Attach the user object to the request for future use
//     req.user = user;

//     // Move to the next middleware or route handler
//     next();
//   } catch (error) {
//     // If the token is invalid or there's an error, return an unauthorized response
//     console.error("Authentication error:", error);
//     return res.status(401).json({ error: "Unauthorized" });
//   }
};

export default auth;

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    user?: JwtPayload;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void | Response => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization;

        // Check if token is missing
        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        // Split token by space and extract JWT token
        const [bearer, authToken] = token.split(" ");

        // Check if token format is incorrect
        if (bearer !== "Bearer" || !authToken) {
            return res.status(400).json({ message: "Invalid token format" });
        }

        // Verify JWT token
        jwt.verify(authToken, process.env.JWT_SEC!, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            
            // Assign the decoded payload to the user property
            req.user = decoded as JwtPayload;
            next();
        });
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ message: "An error occurred while verifying token" });
    }
};

export default verifyToken;

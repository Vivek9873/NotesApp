import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
    try {
        console.log(req.cookies)
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User!" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { userId } = decodedToken;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized User!" });
        }
        req.userId = userId;
        next();


    }
    catch (e) {
        return res.status(500).json({ message: `Authentication error is ${e}` }

        );

    }
}

export default authMiddleware;
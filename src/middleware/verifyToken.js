import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    console.log("Cookies:", req.cookies);
    const { authToken } = req.cookies;
    
    if (!authToken) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ message: "User not authenticated" });
        }

        req.userId = decoded.id;
        next();
    });
}

export default verifyToken;
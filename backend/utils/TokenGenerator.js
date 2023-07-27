const jwt = require("jsonwebtoken");

const TokenGenerator = async (res, userId) => {
    await res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development', // Set to true in production environment, assuming you have HTTPS configured
        sameSite: 'strict', // Use 'Strict' instead of 'strict'
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/', // Specify the path where the cookie should be accessible, '/' means it's accessible across the entire domain.
    });
    console.log(token);
};

const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_PASS, (err, decoded) => { // <-- Fix: Use process.env.JWT_PASS instead of process.env.JWT_SECRET
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId; // Store the decoded user ID in the request object
        next(); // Call the next middleware or route handler
    });
};

exports.modules = { TokenGenerator, authenticateUser };

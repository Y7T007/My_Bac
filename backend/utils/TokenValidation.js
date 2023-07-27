
const jwt = require('jsonwebtoken');
const Student = require("../models/StudentModel");


const TakonValidation= async (res,req)=>{

    try {
        authorizationHeader = req.headers.authorization;
        // console.log(req)
        console.log(authorizationHeader)

        const token = req.headers.authorization.split(' ')[1]; // Extract the token from headers

        jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Handle expired token error
                    return res.status(401).json({ message: 'Token expired' });
                }

                console.log('Errrroooooor:',err)
            }
            req.userId = decoded.userId; // Store the decoded user ID in the request object
        });

        const userId = req.userId;
        return userId;


    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
        return false;
    }
}
module.exports= {TakonValidation}

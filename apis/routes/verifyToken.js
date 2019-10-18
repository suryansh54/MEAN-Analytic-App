const jwt = require('jsonwebtoken');

// Middleware for protected and private Routes
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json(
            {
                type: 'error',
                message: 'Access Denied'
            }
        );
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        }catch(err) {
            res.json(
                {
                    type: 'error',
                    message: 'Invalid Token'
                }
            );
        }
    }
}
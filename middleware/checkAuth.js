const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try{
        const userData = jwt.verify(token, process.env.JWTKEY);
        req.currentUser = userData;
    }
    catch(error) {
        return res.status(500).json({
            error: error
        })
    }
    next();
}
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req?.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_SIGN_TOKEN);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'jwt invalid' });
    }
};

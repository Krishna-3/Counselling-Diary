const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; // Bearer token
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ 'message': 'unauthorized' });

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ 'message': 'Forbidden', 'err': err });
            req.cId = decoded.userInfo.id;
            req.user = decoded.userInfo.username;
            next();
        }
    );
}

module.exports = verifyJWT;
const jwt = require('jsonwebtoken');
const Counsellor = require('../models/counsellor');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ 'message': 'Bad request' });
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

    const foundCounsellor = await Counsellor.findOne({ refreshToken }).exec();

    // Detected refresh token reuse
    if (!foundCounsellor) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ 'message': 'Forbidden' });
                const hackedUser = await Counsellor.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = [];
                const query = await hackedUser.save();
            }
        )
        return res.status(403).json({ 'message': 'Forbidden' });
    }

    const newRefreshTokenArray = foundCounsellor.refreshToken.filter(rt => rt !== refreshToken);

    //evaluate JWt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                foundCounsellor.refreshToken = [...newRefreshTokenArray];
                const query = await foundCounsellor.save()
            }
            if (err || foundCounsellor.username !== decoded.username) return res.status(403).json({ 'message': 'Forbidden' });

            //refreshToken is still valid
            const accessToken = jwt.sign(
                {
                    'userInfo': {
                        'id': foundCounsellor._id,
                        'username': foundCounsellor.username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            const newRefreshToken = jwt.sign(
                { 'username': foundCounsellor.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            foundCounsellor.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const query = await foundCounsellor.save();

            res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken }; 
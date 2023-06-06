const bcrypt = require('bcrypt');
const Counsellor = require('../models/counsellor')
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and Password are required' });

    const foundCounsellor = await Counsellor.findOne({ username }).exec();
    if (!foundCounsellor) return res.status(401).json({ 'message': 'unauthorized' });

    const match = await bcrypt.compare(password, foundCounsellor.password);
    if (match) {
        //create JWTs
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

        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundCounsellor.refreshToken
                : foundCounsellor.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = await Counsellor.findOne({ refreshToken }).exec();
            if (!foundToken) {
                newRefreshTokenArray = [];
            }
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        }
        foundCounsellor.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const query = await foundCounsellor.save();

        res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({
            'success': `Counsellor ${username} is logged in!`,
            accessToken
        });
    } else {
        res.status(401).json({ 'message': 'unauthorized' });
    }
};

const handleSignup = async (req, res, next) => {
    const { username, password, mail } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and Password are required' });
    if (password.length < 8) return res.status(400).json({ 'message': 'password must have minimun length of 8 characters' });

    const duplicateUser = await Counsellor.findOne({ username }).exec();
    if (duplicateUser) return res.status(409).json({ 'message': 'User already exists!' });
    const duplicateMail = await Counsellor.findOne({ mail }).exec();
    if (duplicateMail) return res.status(409).json({ 'message': 'User already exists with this mail' });

    const regexUser = /^[A-Za-z][A-Za-z ]{2,30}$/g;
    const regexMail = /^[A-Za-z0-9][A-Za-z0-9.-_]+@[A-za-z]+\.[A-Za-z]{1,}$/g;
    const validUser = regexUser.test(username);
    const validMail = regexMail.test(mail);
    if (!validUser) return res.status(406).json({ 'message': 'Username should contain only alphabets or numbers or underscore and minimun 8 characters required' });
    if (!validMail) return res.status(406).json({ 'message': 'Mail should be correctly formatted' });

    try {
        //password encrytpion 
        const pwdhash = await bcrypt.hash(password, 12);
        //creating admin
        const user = new Counsellor({
            username,
            password: pwdhash,
            mail,
        });
        user.save();

        res.status(201).json({ 'success': `Counsellor ${user.username} created` });
    }
    catch (err) {
        next(err);
    }
};

const handleLogout = async (req, res) => {
    //delete accessToken in client also
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).json({ 'message': 'No content' });

    const refreshToken = cookies.jwt;
    const foundCounsellor = await Counsellor.findOne({ refreshToken }).exec();
    if (!foundCounsellor) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(204).json({ 'message': 'No content' });
    }

    foundCounsellor.refreshToken = foundCounsellor.refreshToken.filter(rt => rt !== refreshToken);;
    const query = await foundCounsellor.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(204).json({ 'message': 'No content' });
};

module.exports = { handleLogin, handleSignup, handleLogout };
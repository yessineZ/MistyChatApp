import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (id, res) => {
    const expireSeconds = 60 * 60 * 24 * 15; // 15 days in seconds
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: expireSeconds });

    const expireMilliseconds = expireSeconds * 1000; // Convert to milliseconds for cookie expiration
    res.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + expireMilliseconds),
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    return token;
};

export default generateTokenAndSetCookie;

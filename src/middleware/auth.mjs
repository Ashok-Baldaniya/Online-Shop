import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization') || req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

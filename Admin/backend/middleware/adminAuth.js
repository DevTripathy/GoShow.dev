import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
    const { adminToken } = req.cookies;
    if (!adminToken) {
        return res.json({ success: false, message: "Unauthorized access" });
    }

    try {
        const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.adminId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: "Unauthorized access" });
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }
}

export default adminAuth;

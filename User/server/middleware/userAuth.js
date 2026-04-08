import jwt from 'jsonwebtoken';
import 'dotenv/config';


const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.json({ success: false, message: "Token not available" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(tokenDecode.id)
        {
         req.userId = tokenDecode.id;
        }
        else
        {
            return res.json({ success: false, message: "Unauthorized access" });
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }
}

export default userAuth;
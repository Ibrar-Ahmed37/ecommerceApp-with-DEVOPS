import jwt from 'jsonwebtoken';
import { keys } from "../config/keys.js";

const authorization = (req,res,next) => {
    const token = req.header("x-auth-token");
    if(!token)
        return res.status(401).json({msg: 'You do not have the right authorization'})
    try
    {
        const decodedToken = jwt.verify(token, keys.secretKey)
        req.user = decodedToken.user;
        next();
    }
    catch(error){
        res.status(401).json({msg: 'Not a valid token'})
    }
}

export default authorization;
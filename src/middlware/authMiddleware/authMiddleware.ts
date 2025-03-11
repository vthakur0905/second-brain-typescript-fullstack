import { Request, Response, NextFunction } from "express"; 
import jwt  from "jsonwebtoken";
import { SECRET_KEY } from "../../config";



const authMiddleware = (req: Request, res:Response, next:NextFunction): void => {
    console.log("in authMiddleware")
    console.log(req.cookies) ;
    const token = req.cookies.token ;

    if (!token){
        res.status(401).json({
            message : "unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) ;
        (req as any).user = decoded ; 
        next() ;
    }catch (err){
        res.status(401).json({
            message : "invalid token"
        })
    }
}


export {
    authMiddleware
}
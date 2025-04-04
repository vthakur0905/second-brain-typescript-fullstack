import { Request, Response, NextFunction } from "express"; 
import jwt  from "jsonwebtoken";
import { SECRET_KEY } from "../../config";



const authMiddleware = (req: Request, res:Response, next:NextFunction):void => {
    try {
        const token = req.cookies.token ;
         
        if(!token) {
            //@ts-expect-error
            return res.status(401).json({
                message : "unauthorized no token"
            }) ;
        }

        const decoded = jwt.verify(token, SECRET_KEY) as {email: string} ;
        const username = decoded.email ;
        console.log("username :" + username) ;
        (req as any).email = decoded.email ;

        console.log("email in authMiddleware " + (req as any).email) ; 
        next() ;
        

    }
    catch(Err) {
        console.error(Err) ;
        //@ts-expect-error
        return res.status(401).json({
            message : "unauthorized"
        })
    }
}


export {
    authMiddleware
}
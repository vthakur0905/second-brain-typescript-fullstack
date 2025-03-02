import express, {Application,  Router, Request, Response } from "express" ;
import { userModel } from "../database/db";
import { signupValidation } from "../middlware/validationMiddleware/signupValidation";

const app = express() ;

function userRoutes(app : Application) {

    app.post('/signup', async (req : Request, res: Response) => {
        
        
        const validatedData = signupValidation.parse(req.body) ;       
        const {firstName, lastName, email, username, password} = validatedData  ;


        await userModel.create({
            firstName , 
            lastName,
            email , 
            username, 
            password 

        })

        console.log("created") ;
        res.status(200).json({
            message : "created the account"
        })

    })

    app.post('/signin', (req : Request, res: Response) => {

        res.send("sign in route")

    })

    app.post('/content', (req : Request , res: Response) => {
        res.send(" add content route")
    })

    app.get('/content', (req : Request , res: Response) => {
        res.send("get all content route")
    })

    app.delete('/content', (req : Request , res: Response) => {
        res.send("delete a content")
    })

    app.post('/brain/share', (req : Request , res : Response) => {
        res.send("get the shareable link here")
    })

    app.get('/brain/share', (req : Request , res : Response) => {
        res.send ("get detail of another's brain")
    })


}


export {userRoutes} ;
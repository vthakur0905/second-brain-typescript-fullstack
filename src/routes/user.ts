import express, { Application, Router, Request, Response } from "express";
import { userModel } from "../database/db";
import { signupValidation } from "../middlware/validationMiddleware/signupValidation";
import { ZodError } from "zod";
import bcrypt from "bcrypt" ;
import { signinValidation } from "../middlware/validationMiddleware/signinValidation";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser" ;
import { SECRET_KEY } from "../config";
import { authMiddleware } from "../middlware/authMiddleware/authMiddleware";


const saltRounds = 10 ;


const app = express();
app.use(express.json());
// app.use(cookieParser()) ;


function userRoutes(app: Application) {
  
 
  app.post("/signup", async (req: Request, res: Response):Promise<any> => {
    try {
      const validatedData = signupValidation.parse(req.body);
      const { firstName, lastName, email, username, password } = validatedData;

      const existingEmail = await userModel.findOne({ email });

      if (existingEmail) {
        return res.status(409).json({
          message: "account already exists",
        });
      }

      async function hashPassword (password : string) :Promise<string> {
        
        try {
          return await bcrypt.hash(password, saltRounds) ;
        }
        catch(err){
            console.error("error in hashing password in signup " + err) ;
            throw new Error("error in hashing password");
            
        }

      }

      const hashedPassword :string = await hashPassword(password) ;

      await userModel.create({
        firstName : firstName,
        lastName : lastName,
        email : email,
        username : username,
        password : hashedPassword
      });

      console.log("created");
      res.status(201).json({
        message: "created the account",
      });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error("failed to validate the input " + err.message);
        return res.status(411).json({
          message: "failed to validate data",
        });
      }
      console.log(err);
      return res.status(401).json({
        
        message: "failed to load data - here",
      });
    }
  });



  app.post("/signin", async (req: Request, res: Response) : Promise<any> => {
    
    try {
      const validatedData = signinValidation.parse(req.body) ; 
    const {email, password} = validatedData ;

    const checkEmail = await userModel.findOne({email}) ;

    if (!checkEmail) {
      return res.status(401).json({
        message : "email or password is wrong"
      })
    }


    const hashedPassword = checkEmail.password ;
    console.log(hashedPassword) ;

    bcrypt.compare(password , hashedPassword, (err, result)=> {
      if (err || !result) {
        return res.status(401).json({
          message : "bad credentials"
        })
      }

      if(result) {
        const token = jwt.sign({email : email}, SECRET_KEY, {
          expiresIn : "1h"
        }) ;
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict"
        }) ;
        return res.status(200).json({
          message : "logged in successfully"
        })

      }
    })
    }catch(Error) {
      console.log(Error)
      res.status(400).json({
        message : "some error"
      })
    }
    
  });

  app.post("/logout", (req:Request, res:Response):void => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      }) ;
      res.status(200).json({
        message : "logout success"
      })
    }catch(err){
      console.error(err) ;
      res.status(500).json({
        message : "logout failed"
      })
    }
  })

  app.post("/content", (req: Request, res: Response) => {
    res.send(" add content route");
  });

  app.get("/content",authMiddleware, (req: Request, res: Response)=> {
    res.send("get all content route after log in");
  });

  app.delete("/content", (req: Request, res: Response) => {
    res.send("delete a content");
  });

  app.post("/brain/share", (req: Request, res: Response) => {
    res.send("get the shareable link here");
  });

  app.get("/brain/share", (req: Request, res: Response) => {
    res.send("get detail of another's brain");
  });
}

export { userRoutes };

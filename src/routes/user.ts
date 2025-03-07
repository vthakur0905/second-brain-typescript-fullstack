import express, { Application, Router, Request, Response } from "express";
import { userModel } from "../database/db";
import { signupValidation } from "../middlware/validationMiddleware/signupValidation";
import { ZodError } from "zod";
import bcrypt from "bcrypt" ;
const saltRounds = 10 ;

const app = express();
app.use(express.json());

interface SignupRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}



function userRoutes(app: Application) {
  
  //@ts-expect-error
  app.post("/signup", async (req: Request, res: Response) => {
    try {
      const validatedData = signupValidation.parse(req.body);
      const { firstName, lastName, email, username, password } = validatedData;

      const existingEmail = await userModel.findOne({ email });

      if (existingEmail) {
        return res.status(409).json({
          message: "account already exists",
        });
      }

      async function hashPassword (password : string)
      :Promise<string> {
        
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
      return res.status(401).json({
        message: "failed to load data",
      });
    }
  });



  app.post("/signin", (req: Request, res: Response) => {
    const validatedData
  });

  app.post("/content", (req: Request, res: Response) => {
    res.send(" add content route");
  });

  app.get("/content", (req: Request, res: Response) => {
    res.send("get all content route");
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

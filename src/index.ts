import express , {Application , Request, Response} from "express" ;
import { userRoutes } from "./routes/user";
import mongoose from "mongoose";
import "./database/db"

const app : Application = express() ;
const port : number = 3000 ;

app.use(express.json()) ;

userRoutes(app) ;



async function startServer() {
    try {
        await mongoose.connect("mongodb+srv://root:root@cluster0.yca2k.mongodb.net/secondBrainApp")
        
        console.log("connected to db")
        
        app.listen(port , () => {
            console.log(`app is running on port : ${port}`) ;
        })
         
    }
    catch(err) {
        console.error(`failed to connect - ${String(err)}`)
    }
}

startServer() ;


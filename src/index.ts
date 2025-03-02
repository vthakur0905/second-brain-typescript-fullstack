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
        await mongoose.connect("mongodb+srv://sample:123@cluster0.r2tts.mongodb.net/secondBrainApp")
        .then(() => console.log("connected to db"))
        .catch(err => console.error("connection to db failed : " + err))


        app.listen(port , () => {
            console.log(`app is running on port : ${port}`) ;
        })
        
        
    }

    catch(err) {
        console.error(`failed to connect - ${String(err)}`)
    }
}

startServer() ;


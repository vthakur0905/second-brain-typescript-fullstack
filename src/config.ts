import dotenv from 'dotenv' ;

dotenv.config() ;

if (!process.env.SECRET_KEY){
    throw new Error("secret key not found") ;
}

export const SECRET_KEY = process.env.SECRET_KEY as string ;
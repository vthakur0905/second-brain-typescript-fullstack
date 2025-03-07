import {z} from "zod" ;

const signinValidation = z.object ({
    email : z.string().email("invalid email"),
    password  : z.string().min(1, "password cannot be empty") 
})

export  {
    signinValidation
}
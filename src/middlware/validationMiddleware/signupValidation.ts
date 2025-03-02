import {z} from "zod" ;


const signupValidation = z.object({
    email : z.string().email("invalid email") , 
    password : z.string().min(3,"password should have minimum length of 3" ), 
    firstName : z.string().min(1, "first name cannot be empty") ,
    lastName : z.string().optional(), 
    username : z.string()

})



export {
    signupValidation
}

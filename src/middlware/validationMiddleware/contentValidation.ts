import {z} from "zod" ;


const contentValidation = z.object({
    link : z.string().url().optional() ,
    type : z.enum(["audio", "video", "tweet", "link"]) ,
    title : z.string().min(1, "should not be empty"),
    tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")).optional(), 
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID")

})

export {
    contentValidation
}
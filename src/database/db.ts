import mongoose, { MongooseError } from "mongoose";
import { string } from "zod";


const { Schema, Document } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

type contentType = "audio" | "tweet" | "video" | "link";

interface IContent extends Document {
  link: string;
  type: contentType;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username : {type : String, required : true, unique: true},
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
});

const contentSchema = new Schema({
  link: { type: String },
  type: {
    type: String,
    enum: ["audio", "video", "tweet", "link"],
    required: true,
  },
  title: { type: String, required: true },
  tags: [
    {
      type: String
    }
  ],
  email : {type : String}
});


const linkSchema = new Schema({
    hash : {type : String , required : true} ,
    userId : {type : Schema.Types.ObjectId, ref: 'User', required : true}
});


const tagSchema = new Schema ({
    title : {type: String , required : true, unique : true}
})


const userModel = mongoose.model("User" , userSchema) ;
const contentModel = mongoose.model("Content", contentSchema) ;
const linkModel = mongoose.model("Link", linkSchema) ;
const tagModel = mongoose.model("Tag", tagSchema) ;


export {
    userModel ,
    contentModel ,
    linkModel ,
    tagModel
}
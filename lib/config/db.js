import mongoose from "mongoose";

export const conneectDB = async ()=>{
    await mongoose.connect('mongodb+srv://blogapp:maamarjan@cluster0.h165k.mongodb.net/blog-app')
    console.log("DB connected");
}
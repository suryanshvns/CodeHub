import mongoose from "mongoose";

export default async function connectMongoDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected");
    } catch(error) {
        console.log("error in connecting mongo db", error.message);
    }
}
import mongoose from "mongoose";

export async function connectToDatabase(){
    try {

        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error)
    }
}
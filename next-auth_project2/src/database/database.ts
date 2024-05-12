import mongoose from "mongoose";

export async function connect(): Promise<void>  {
    try {

        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("MongoDb connected");
        })
        connection.on('error', (err) => {
            console.log("MongoDb connection failed:" + err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Something went wrong in conecting to DataBase");
        console.log(error);
    }
}
import mongoose from "mongoose";

// type ConnectionObject = {
//     isConnected?: number;
//   };
  
//   const connection: ConnectionObject = {};

export async function connect(): Promise<void>  {
    try {

        await mongoose.connect(process.env.MONGO_URL!);
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

//     if (connection.isConnected) {
//         console.log('Already connected to the database');
//         return;
//       }
    
//       try {
//         // Attempt to connect to the database
//         const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
    
//         connection.isConnected = db.connections[0].readyState;
    
//         console.log('Database connected successfully');
//       } catch (error) {
//         console.error('Database connection failed:', error);
    
//         // Graceful exit in case of a connection error
//         process.exit(1);
//       }
}
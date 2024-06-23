import mongoose from "mongoose";
import 'dotenv/config';

// Connect to MongoDB
const connectMongoDB = async () => {
    
    try {
        console.log('DB is trying to connect',process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Failed");
    }
};

export default connectMongoDB;

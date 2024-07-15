import mongoose from "mongoose";

export const connectToMongoDb = async () => {
    try {
       await mongoose.connect(process.env.MONGO)
       console.log("Connected to MongoDB");

    }catch(e) {
        console.error("Failed to connect to MongoDB", e);
    }
}
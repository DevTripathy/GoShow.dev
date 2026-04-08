import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected successfully");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB connection failed", err);
    });

    await mongoose.connect("mongodb://swastikbisoigoshow:goshow2025@ac-2berwi8-shard-00-00.nisgc3v.mongodb.net:27017,ac-2berwi8-shard-00-01.nisgc3v.mongodb.net:27017,ac-2berwi8-shard-00-02.nisgc3v.mongodb.net:27017/?ssl=true&replicaSet=atlas-x853js-shard-0&authSource=admin&appName=Cluster0");
}

export default connectDB;

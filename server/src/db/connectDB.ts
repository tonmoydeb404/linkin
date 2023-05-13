import mongoose from "mongoose";

const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("database connection failed");
  }
};

export default connectDB;

import mongoose, { Document, Model } from "mongoose";
import models from "../models";

const createCollection = async (models: Model<Document>[]) => {
  await Promise.all(models.map((model) => model.createCollection()));
};

const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI);
    // creating all collection - mongoose transaction
    await createCollection(models);
    console.log("database connected successfully");
  } catch (error) {
    console.log("database connection failed");
  }
};

export const connection = mongoose.connection;

export default connectDB;

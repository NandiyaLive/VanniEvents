import { MONGO_URI } from "@/utils/config";
import mongoose from "mongoose";

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  return mongoose
    .connect(MONGO_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.error(
        "MongoDB connection unsuccessful, retry after 5 seconds.",
        error
      );
      setTimeout(connectWithRetry, 5000);
    });
};

const connectDB = () => {
  connectWithRetry();

  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully");
  });

  mongoose.connection.on("error", (error) => {
    console.log(`Error connecting to database: ${error}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from database");
  });
};

export default connectDB;

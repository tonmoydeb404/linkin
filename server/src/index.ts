import http from "http";
import app from "./app";
import connectDB from "./db/connectDB";
import loadEnv from "./helpers/loadEnv";

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB(loadEnv.MONGO_URI);
    server.listen(loadEnv.PORT, () => {
      console.log(`server running on http://localhost:${loadEnv.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// start the server
startServer();

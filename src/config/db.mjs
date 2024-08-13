import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`DB connection successful..`);
    })
    .catch((err) => {
      throw new Error(err);
    })
    .finally(() => {
      console.log(`Database-app conn initialized`);
    });
};

export default connectDb;

import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/allfunds_test";
    await connect(mongoUri);
    console.log("Connected");
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;

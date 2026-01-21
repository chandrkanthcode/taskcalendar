import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`.red.bold);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;

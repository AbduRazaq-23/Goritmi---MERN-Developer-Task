import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI + "/Goritmi");
    console.log(mongoose.connection.name + " db connected");
  } catch (error) {
    console.log(error.message);
  }
};
export default dbConnect;

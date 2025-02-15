import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_DSN || "")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose;

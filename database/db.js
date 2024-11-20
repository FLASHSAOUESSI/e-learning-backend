// database/db.js
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({path:'./.env'});
console.log(process.env.MONGO_URI);

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connecté avec succès");
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error.message);
    process.exit(1);
  }
};
connectDb()
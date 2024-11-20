import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import {connectDb} from './database/db.js'
import cors from "cors"
dotenv.config();
connectDb()
const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(cors())

// Routes utilisateur
app.use("/api/users", userRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});



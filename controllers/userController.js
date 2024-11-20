import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Module } from "module";
import dotenv from "dotenv";

dotenv.config({path:'./.env'});

// Créer un token JWT
const generateToken = (id) => {
    
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Inscription d'un utilisateur
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body)
        
    const salt = await bcrypt.genSalt(10); 
    const passwordHash = await bcrypt.hash(password, salt); 
    console.log('=',passwordHash);
    
    // Vérifier les champs
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
            
        }

        // Créer un nouvel utilisateur
        const user = await User.create({
           name:name,
           email:email,
           password:passwordHash,
           role:role
        });
        console.log(user);
        
        // Réponse si la création est réussie
        if (user) {
            res.status(201).json({ message: "ajout avec suceè" });
        } else {
            res.status(400).json({ message: "Données utilisateur invalides" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Connexion d'un utilisateur
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Vérifier si l'utilisateur existe et si le mot de passe est correct
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};
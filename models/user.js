import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema(
    {


    name :{
        
        type:String,
        required:[true,"le nom est obligatoire"],
        trim:true,

    },

    googleId: { 
        type: String, 
        required: false, 
    },
    email:{
        type:String,
        required:[true,"le nom est obligatoire"],
        unique:true,
        match :[
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Veuillez entrer une adresse email valide",
        ],
    }, 
    password:{
        type:String,
        required:[true,"le mot de pase doit contenir au moins 6 caracteres"],
    },

    role: {
        type:String,
        enume:["student","tutor"],
        dfault:"student",
        required: [true, "Le rôle est obligatoire"],
    },

    isActive: {
        type: Boolean,
        default: true,
    
    },
},
    {
        timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    }
);

    const User = mongoose.model("User", userSchema);

    export default User;    

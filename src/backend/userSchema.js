import mongoose from "mongoose";
import pkg from "validator";

const { isEmail } = pkg;

const userSchema = mongoose.Schema(
    {
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Se requiere un email',
        validate: [ isEmail, 'email invalido' ]
    },
    password: {
        type: String,
        trim: true,
        required: 'Se requiere una contraseña'
    },
    name: {
        type: String,
        trim: true,
        required: 'Se requiere una contraseña'
    }
    },
    {
        timestamps: true
    })

    const ModelUser = mongoose.model("User", userSchema, "Users")
    export default ModelUser;
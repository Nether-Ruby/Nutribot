import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbconnect from "./dbConfig.js";
import ModelUser from "./userSchema.js";
import bcrypt from "bcrypt";
import generateAuthToken from "./generateAuthToken.js";
import config from "../../configs.js";
import RecipeModel from "./recipeSchema.js";
const { PORT} = config;



const app = express();
app.use(cors());
app.use(bodyParser.json());

dbconnect();

app.post("/Nutribot/Users", async (req, res) => {
  try {
    console.log("Received request:", req.body); // Log the request payload
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ error: "Username, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new ModelUser({ name, email, password: hashedPassword });
    console.log(newUser);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error("Error saving user:", error); // Log the error for debugging
    res.status(500).send({ error: error.message });
  }
});

app.post("/Nutribot/Login", async (req, res) => {
  try {
    console.log("Received login request:", req.body); // Log the request payload
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    // Busca el usuario en la base de datos por su correo electrónico
    const user = await ModelUser.findOne({ email });

    // Si no se encuentra el usuario, devuelve un error
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }
    // Si las credenciales son válidas, genera un token de autenticación
    const token = generateAuthToken(user._id, user.name, user.email);

    // Devuelve el token al cliente
    res.send({ token });
  } catch (error) {
    console.error("Error logging in:", error); // Log the error for debugging
    res.status(500).send({ error: error.message });
  }
});

app.post("/Nutribot/Recipes", async (req, res) => {
  try {
    // Crear una nueva instancia del modelo Recipe con los datos enviados en la solicitud
    const newRecipe = new RecipeModel({
      userId: req.body.userId,
      title: req.body.title,
      usedIngredients: req.body.usedIngredients,
      missedIngredients: req.body.missedIngredients
    });

    // Guardar la receta en la base de datos
    const savedRecipe = await newRecipe.save();

    // Enviar la receta guardada como respuesta
    res.status(201).json(savedRecipe);
  } catch (error) {
    // Manejar errores
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});

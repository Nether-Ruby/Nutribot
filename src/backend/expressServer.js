import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbconnect from "./dbConfig.js";
import ModelUser from "./userSchema.js";
import bcrypt from 'bcryptjs';
import generateAuthToken from "./generateAuthToken.js";
import config from "../../configs.js";
import RecipeModel from "./recipeSchema.js";
const { PORT} = config;



const app = express();
app.use(cors());
app.use(bodyParser.json());

dbconnect();

//REGISTRO DE USUARIOS

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

//LOGIN DE USUARIOS
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

//AGREGAR RECETA A FAVORITOS

app.post("/Nutribot/Recipes", async (req, res) => {
  try {
    const newRecipe = new RecipeModel({
      userId: req.body.userId,
      title: req.body.title,
      usedIngredients: req.body.usedIngredients,
      missedIngredients: req.body.missedIngredients,
      instructions: req.body.instructions.map(instruction => ({
        name: instruction.name,
        steps: instruction.steps.map(step => ({
          number: step.number,
          step: step.step,
        })),
      })),
    });

    console.log('Saving recipe:', newRecipe); // Log the recipe data

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//MOSTRAR FAVORITOS

app.get('/Nutribot/Recipes/:field/:value', async (req, res) => {
  try {
    const field = req.params.field;
    const value = req.params.value;

    // Realiza la búsqueda por el campo específico
    const recipe = await RecipeModel.find({ [field]: value });

    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error al obtener receta por campo específico:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET para modificar contraseña
app.get('/Nutribot/Users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await ModelUser.findById(userId); // Suponiendo que utilizas Mongoose para interactuar con MongoDB

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//modificar datos del usuario
app.put('/Nutribot/Users/Update/:id', async (req, res) => {
  const { id } = req.params; // Obtiene el ID del usuario de los parámetros de la URL
  const updates = req.body; // Obtiene los datos de actualización del cuerpo de la solicitud

  try {
    // Encuentra el usuario por su ID y actualiza los campos especificados
    const updatedUser = await ModelUser.findByIdAndUpdate(id, { $set: updates }, { new: true });

    if (!updatedUser) {
      return res.status(404).send('Usuario no encontrado'); // Maneja el caso donde el usuario no es encontrado
    }

    res.status(200).json(updatedUser); // Envía el usuario actualizado como respuesta
  } catch (error) {
    console.error('Error actualizando el usuario:', error); // Maneja errores
    res.status(500).json({ error: 'Error Interno del Servidor' }); // Envía una respuesta de error
  }
});

app.delete('/Nutribot/Recipes/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    // Elimina la receta de la base de datos utilizando el método findByIdAndDelete de Mongoose
    const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ error: 'No se encontró la receta con el ID proporcionado.' });
    }

    res.status(200).json({ message: 'Receta eliminada correctamente.' });
  } catch (error) {
    console.error('Error eliminando la receta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});

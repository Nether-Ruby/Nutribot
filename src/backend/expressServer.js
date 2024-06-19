import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbconnect from "./dbConfig.js";
import ModelUser from "./userschema.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

dbconnect();

app.post("/Nutribot/Users", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
          return res.status(400).send({ error: "Username, email, and password are required" });
        }
    
        const newUser = new ModelUser({ username, email, password });
        await newUser.save();
        res.status(201).send(newUser);
      } catch (error) {
        console.error("Error saving user:", error); // Log the error for debugging
        res.status(500).send({ error: error.message });
      }
    });
    
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

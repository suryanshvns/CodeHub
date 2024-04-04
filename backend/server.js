import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("server is ready");
});

app.use("/api/users", userRoutes);

app.listen(5001, () => {
    console.log("server is running on http://localhost:5001");
});
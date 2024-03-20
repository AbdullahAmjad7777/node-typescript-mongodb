import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./database/db.connection";
import authRoute from "./routes/auth.route";
import taskRoute from "./routes/task.route"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/Tasks",taskRoute);


connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to the task manager API");
    });

    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

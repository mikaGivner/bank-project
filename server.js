import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

if (process.env.NODE_ENV !== `production`) {
  app.use(morgan(`dev`));
}

app.get("/", (req, res) =>
  res.status(200).json({ message: "server is running" })
);
const PORT = process.env.PORT || 5001;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

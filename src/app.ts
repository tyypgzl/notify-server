import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// API
app.use("/api",routes);


// SERVER
app.listen(3000,'localhost', () => {
    return console.log("Express is listening at http://localhost/3000");
});

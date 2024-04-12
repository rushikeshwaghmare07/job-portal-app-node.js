const express = require("express");
require("dotenv").config();
const connectDB = require("./db/index.js");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT} on ${process.env.DEV_MODE} mode`);
        });
    })
    .catch((err) => {
        console.error("MONGO DB connection failed !!", err);
    });

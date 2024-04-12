const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

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

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes and route imports
const authenticateRoute = require("./routes/authenticate.route.js");

app.use("/api/v1/auth", authenticateRoute);
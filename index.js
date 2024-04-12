const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT} on ${process.env.DEV_MODE} mode`);
});

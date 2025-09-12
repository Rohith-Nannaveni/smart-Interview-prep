require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

// Middleware to handle CORS

app.use(
    cors({
        origin: "*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["content-Type","Authorization"],
    })
);

//Middlewares
app.use(express.json());

//Routes 

// serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"), {}));

// start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
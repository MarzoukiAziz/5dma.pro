const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const companyRoutes = require("./routes/companies");
const jobRoutes = require("./routes/jobs");
const userRoutes = require("./routes/user");
const appsRoutes = require("./routes/apps");
const resumeRoutes = require("./routes/resume");
const searchsRoutes = require("./routes/searchs");
const functions = require('firebase-functions');




const app = express();

mongoose
    .connect(
        "mongodb+srv://moazmar:" +
        "ISSATSO2023rades" +
        "@5dma.kq63drg.mongodb.net/?retryWrites=true&w=majority"

    )
    .then(() => {

        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Connection failed!");
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/apps", appsRoutes);
app.use("/api/searchs", searchsRoutes);
app.use("/api/resume", resumeRoutes);


app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
});


exports.app = functions.https.onRequest(app);
module.exports = app
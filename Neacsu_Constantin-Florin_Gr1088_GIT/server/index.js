"use strict";

const express = require('express');
const sequelize = require('./sequelize');
const router = require('./routes/routes');
const cors = require('cors');


const app = express();

const PORT = 8080;

app.use(
    express.urlencoded({
        extended:true
    })
);
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, async () => {
    console.log("Server started on http://localhost:8080");
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
    } catch (err) {
        console.error("Unable to connect to the database:", error);
    }
});


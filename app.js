const express = require("express");

const app = express();

const routeProducts = require('./routes/routeProducts')

app.use(express.json());

app.use('/produtos',routeProducts);

app.use('*',(req, res, next) => {
    res.status(404).send('error 404, not found');

    next();
});

// SERVER

app.listen(3001, () => console.log("Servidor Online"));
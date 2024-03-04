const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const budgetModel = require("./schema");

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/perbud';

app.use('/', express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database");
            budgetModel.find({})
                .then((data) => {
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.post("/newpostBudget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database to insert data");
            let newData = new budgetModel(req.body);
            budgetModel.insertMany(newData)
                .then(() => {
                    res.send("Data Inserted into database Successfully");
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                    res.send(connectionError.message);
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.send(connectionError);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

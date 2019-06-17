require('./config/index.js');

const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/users.js'));


app.delete('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id })
})

mongoose.connect('mongodb://localhost:27017/cofee', { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;
    console.log('DB online');
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port ', process.env.PORT)
})
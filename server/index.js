require('./config/index.js');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id })
})

app.post('/user', function(req, res) {

    let body = req.body;
    console.log('>>>');
    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "Name needed",
        });
    } else {
        //res.setHeader('Content-Type', 'text/plain')
        //res.write('you posted:\n')
        //res.end(JSON.stringify(req.body, null, 2))
        res.json({
            person: body
        })
    }
})

app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id })
})

app.delete('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id })
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port ', process.env.PORT)
})
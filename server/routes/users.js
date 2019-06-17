const express = require('express')
const User = require('../models/user.js/index.js')

const app = express()

app.get('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id })
})

app.post('/user', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
    });

    user.save((err, userDB) => {

    })

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

module.exports = app;
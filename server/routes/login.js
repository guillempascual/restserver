const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('underscore')
const User = require('../models/user.js')

const app = express()

app.post('/login', function(req, res) {

    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err,
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Incorrect (user) ' + body.email +' or password'
                },
            });
        }
        if(!bcrypt.compareSync(body.password,userDB.password)){
            return res.status(400).json({
                ok: false,
                bodyPassword: body.password,
                userPassword:userDB.password, 
                error: {
                    message: 'Incorrect user or (password)'
                },
            });
        }

        let token = jwt.sign({
            user: userDB
          }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRE });
           
        res.json({
            ok: true,
            user: userDB,
            token
        })
    })
})

module.exports = app;
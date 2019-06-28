const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user.js')

const app = express()

app.get('/user', function(req, res) {
    let id = req.params.id;

    let from = req.query.from || 0
    from = Number(from)

    let limit = req.query.limit || 5
    limit = Number(limit)

    User.find({}, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err,
                });
            }

            User.count({}, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count,
                })
            })

        })
})


app.get('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json({ id })
})

app.post('/user', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err,
            });
        }

        res.json({
            ok: true,
            user: userDB,
        })
    })
})

app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'img', 'role', 'status']);

    let options = {
        new: true,
        runValidators: true,
    }

    User.findByIdAndUpdate(id, body, options, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err,
            });
        }
        res.json({
            ok: true,
            user: userDB,
        })
    })
})

app.get('/delete/:id', function(req, res) {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err,
            });
        }

        if (deletedUser === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'User not found'
                },
            });
        }
    })


})


module.exports = app;
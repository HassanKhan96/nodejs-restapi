const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.CREATE_USER = (req, res, next) => {
    User.find({ email: req.body.email })
        .then(result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({
                        error: error
                    });
                }
                new User({
                    email: req.body.email,
                    password: hash
                })
                    .save()
                    .then(newUser => {
                        console.log(newUser)
                        res.status(201).json({
                            message: "User successfully created"
                        });
                    })
                    .catch(err => {
                        console.log("error in user" + err)
                        res.status(500).json({
                            error: err
                        });
                    });
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}

exports.USER_LOGIN = (req, res, next) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password
    };
    User.findOne({ email: credentials.email })
        .then(user => {
            if (user === null) {
                return res.status(422).json({
                    message: "Authorization failed."
                })
            }

            bcrypt.compare(credentials.password, user.password, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        message: "Authorization failed"
                    });
                }

                else if (result) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email
                    },
                        process.env.JWTKEY,
                        {
                            expiresIn: "2 days"
                        },
                        (error, token) => {
                            if(error){
                                return res.status(500).json({
                                    message: "Authorization failed."
                                })
                            }
                            res.status(200).json({
                                message: "Successfully logged in.",
                                token: token
                            })
                        }
                    )
                }
            });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.DELETE_USER = (req, res, next) => {
    User.find({ _id: req.params.uid })
        .then(user => {
            if (user.length >= 1) {
                User.remove({ _id: req.params.uid }, (error, result) => {
                    res.status(200).json({
                        message: 'User successfully deleted.'
                    })
                })
            }
            else {
                res.status(404).json({
                    message: "user does not exists."
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}
module.exports = function(app, model) {


    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var LocalStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var bcrypt = require("bcrypt-nodejs");

    app.use( session({
        secret: 'this is a secret',
        resave: true,
        saveUninitialized: true

    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);




    var facebookConfig = {
        clientID     : process.env.clientID,
        clientSecret : process.env.clientSecret,
        callbackURL  : process.env.callbackURL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done)
    {
        model.userModel.findUserByFacebookId(profile.id).then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var displayName = profile.displayName.split(" ");

                    var newUser = {
                        username:  displayName[0],
                        firstName: displayName[0],
                        lastName:  displayName[1],
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return model.userModel.createUser(newUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    app.post("/api/login", passport.authenticate('local'),  login);
    app.get("/api/user/:userId" , findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId" , updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/checkLogin", checkLogin);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    app.get("/api/user", findUser);


    function register (req, res) {

        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model.userModel
            .findUserByUsername(user.username)
            .then( function(userObj) {
                if(userObj) {
                    res.send("0");
                }
                else {
                    model.userModel
                        .createUser(user)
                        .then(
                            function(user){
                                if(user){
                                    req.login(user, function(err) {
                                        if(err) {
                                            res.status(400).send(err);
                                        } else {
                                            res.json(user);
                                        }
                                    });
                                }
                            }
                        );
                }
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user: '0');
    }
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        model
            .userModel
            .findUserById(user._id)
            .then(function (user) {
                    done(null, user);
            },
            function (err) {
                done(err, null);
            });

    }
    function localStrategy(username, password, done) {

        model.userModel
            .findUserByUsername(username)
            .then(
                function (user){

                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (error) {

                }
            );


    }

    function login(req, res) {
        var  user = req.user;
        res.send(user);
    }
    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
           model.userModel
               .findUserByCredentials(username, password)
               .then(
                   function (user){

                       if(user) {
                           res.send(user);
                       }
                       else {
                           res.send(null);
                       }
                   },
                   function (error) {
                       res.sendStatus(400).send(error);
                   }
               );
       }
       else if(req.query.username)
       {
           model.userModel
               .findUserByUsername(req.query.username)
               .then(
                   function (user) {
                       res.send(user);

                   },
                   function (error) {
                       res.sendStatus(400).send(error);
                   }
               );

       }
       else  {
           res.json(req.user);
        }

    }

    function updateUser(req, res) {

        var user = req.body;
        var userId = req.params.userId;

        model.userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.send(200);

                },
                function (status) {
                    res.sendStatus(400).send(status);
                }
            );

    }

    function deleteUser(req, res) {

        var userId = req.params.userId;

        model.userModel
            .deleteUser(userId)
            .then(
                function(status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {

        var userId = req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {

                    if(user) {
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }

                },

                function (error) {
                    res.sendStatus(400).send(error);
                }

            );
    }


    function createUser(req, res) {

        var user = req.body;
        if (isNotEmpty(user.username))

            model.userModel
                .createUser(user)
                .then(
                    function (newUser) {
                    res.send(newUser);
                    },

                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );

    }

    function isNotEmpty(val) {
        return !( val === null || val === "" || val === undefined );
    }
};
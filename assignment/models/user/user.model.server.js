module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    var model = {};

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        setModel: setModel,
        findUserByFacebookId: findUserByFacebookId
    };

    return api;


    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});

    }
    function setModel(_model) {
        model  = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {_id: userId},
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            );
    }

    function findUserByCredentials(username, password) {

        return UserModel.findOne({
            username: username,
            password: password
        })
    }

    function deleteUser(userId) {

        return UserModel.remove({_id: userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

};
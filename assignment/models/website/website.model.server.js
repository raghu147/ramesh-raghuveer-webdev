module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var model = {};

    var api = {
        createWebsite: createWebsite,
        findWebsitesForUser:findWebsitesForUser,
        setModel: setModel,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

    };


    return api;

    function setModel(_model) {
        model  = _model;
    }

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function (websiteObj) {

               model.userModel.findUserById(userId)
                   .then(function (userObj) {
                       userObj.websites.push(websiteObj);
                       websiteObj._user = userObj._id;
                       websiteObj.save();
                       return userObj.save();
                   });
            });
    }

    function findWebsitesForUser(userId) {
        return model.userModel.findUserById(userId).populate("websites","name").exec();
    }

    function findWebsiteById(websiteId) {

        return WebsiteModel.findOne({_id:websiteId});
    }

    function updateWebsite(websiteId, website) {

        return WebsiteModel
            .update(
                {_id: websiteId},
                {
                    name: website.name,
                    description: website.description,
                }
            );

    }

    function deleteWebsite(websiteId) {

        return WebsiteModel.remove({_id: websiteId});
    }


};
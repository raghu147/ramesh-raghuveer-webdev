module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var model = {};

    var api = {
        createPage: createPage,
        findAllPagesForWebsite:findAllPagesForWebsite,
        setModel: setModel,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage

    };

    return api;

    function setModel(_model) {
        model  = _model;
    }

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function (pageObj) {

               model.websiteModel.findWebsiteById(websiteId)
                   .then(function (websiteObj) {
                       websiteObj.pages.push(pageObj);
                       pageObj._page = pageObj._id;
                       pageObj.save();
                       return websiteObj.save();
                   });
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findWebsiteById(websiteId).populate("pages","name").exec();
    }

    function findPageById(pageId) {

        return PageModel.findOne({_id:pageId});
    }

    function updatePage(pageId, page) {

        return PageModel
            .update(
                {_id: pageId},
                {
                    name: page.name,
                    title: page.title,
                    description: page.description,
                }
            );

    }

    function deletePage(pageId) {

        return PageModel.remove({_id: pageId});
    }


};
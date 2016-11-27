module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var model = {};

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        setModel: setModel,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function setModel(_model) {
        model  = _model;
    }

    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {

               model.pageModel.findPageById(pageId)
                   .then(function (pageObj) {
                       pageObj.widgets.push(widgetObj);
                       widgetObj._page = widgetObj._id;
                       widgetObj.save();
                       return pageObj.save();
                   });
            });
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findPageById(pageId).populate("widgets").exec();
    }

    function findWidgetById(widgetId) {

        return WidgetModel.findOne({_id:widgetId});
    }

    function updateWidget(widgetId, widget) {

        return WidgetModel
            .update(
                {_id: widgetId},
                {
                    name: widget.name,
                    size: widget.size,
                }
            );

    }

    function deleteWidget(widgetId) {

        return WidgetModel.remove({_id: widgetId});
    }

    function reorderWidget(pageId, initial, final) {



         return model.pageModel.findPageById(pageId).populate("widgets").exec().then(
             function (page) {
                 var tt = page.widgets;
                 tt.splice(final, 0, tt.splice(initial, 1)[0]);
                 page.widgets = tt;
                 page.save();
             }
         );
    }


};
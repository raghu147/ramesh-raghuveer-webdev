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
            },
            function (error) {
                console.log("Error " + error);
            }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findPageById(pageId).populate("widgets").exec();
    }

    function findWidgetById(widgetId) {

        return WidgetModel.findOne({_id:widgetId});
    }

    function updateWidget(widgetId, widget) {

        var widgetObj = {name : widget.name};

        switch(widget.type) {
            case 'HEADING' :
                widgetObj.size = widget.size;
                break;
            case 'IMAGE' :
                widgetObj.url =  widget.url;
                break
            case 'YOUTUBE' :
                widgetObj.url =  widget.url;
                break;
            case 'TEXT' :
                widgetObj.text = widget.text;
                widgetObj.rows = widget.rows;
                widgetObj.placeholder = widget.placeholder;
                if(widget.formatted == undefined || widget.formatted == false) {
                    widgetObj.formatted = false;
                }
                else if(widget.formatted) {
                    widgetObj.formatted = true;
                }
                break;
            case 'HTML' :
                widgetObj.text = widget.text;
                break;

        }
        return WidgetModel
            .update(
                {_id: widgetId},widgetObj
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
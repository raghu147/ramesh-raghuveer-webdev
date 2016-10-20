(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            if (isNotEmpty(widget._id) &&
                isNotEmpty(widget.widgetType) &&
                isNotEmpty(widget.size) &&
                isNotEmpty(widget.text))
            {
                widget.pageId = pageId;
                //widgets.push(widget);
            }
        }

        function findWidgetsByPageId(pageId) {

            var result = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId === pageId) {
                    result.push(widget);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {

            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;

        }

        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].widgetType = widget.widgetType;
                    widgets[i].size = widget.size;
                    widgets[i].text = widget.text;
                    widgets[i].pageId = widget.pageId;
                }
            }
        }

        function deleteWidget(widgetId) {

            widgets.forEach(function (result, index) {
                if (result["_id"] === widgetId) {
                    widgets.splice(index, 1);
                    return;
                }
            });
        }

        function isNotEmpty(val) {
            return !( val === null || val === "" || val === undefined );
        }
    }
})();
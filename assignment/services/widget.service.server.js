module.exports = function(app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {


        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;

        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        var widget  = {widgetType:"IMAGE", url: "/uploads/"+filename};

        var widgetId = req.body.widgetId;

        if(widgetId == "") {
            widget._id = new Date().getTime().toString();
            widget.pageId = pageId;
            widgets.push(widget);
        }
        else
        {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = widget.url;
                    break;
                }
            }
        }

        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+"/widget");

    }


    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];


    app.post("/api/page/:pageId/widget" , createWidget);
    app.get("/api/page/:pageId/widget" , findAllWidgetsForPage);
    app.get("/api/widget/:widgetId" , findWidgetById);
    app.put("/api/widget/:widgetId" , updateWidget);
    app.delete("/api/widget/:widgetId" , deleteWidget);
    app.put("/page/:pageId/widget", sortWidgets);

    function sortWidgets(req, res) {
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        var pageId = req.query.pageId;
        model
            .widgetModel
            .reorderWidget(pageId, initial, final)
            .then(
                function (status) {
                    res.send(200);
                }
            );
    }


    function createWidget(req, res) {

        var pageId = req.params.pageId;
        var widget = req.body;

        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    res.send('1');
                });

    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;


        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                }
            );
    }

    function updateWidget(req, res) {

        var widgetId = req.params.widgetId;
        var widget = req.body;

        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.send(200);

                },
                function (status) {
                    res.sendStatus(400).send(status);
                }
            );

        // for (var i = 0; i < widgets.length; i++) {
        //     if (widgets[i]._id === widgetId) {
        //
        //         if(widgets[i].size != undefined) {
        //             widgets[i].size = widget.size;
        //         }
        //
        //         if(widgets[i].name != undefined) {
        //             widgets[i].name = widget.name;
        //         }
        //
        //         if(widgets[i].text != undefined) {
        //             widgets[i].text = widget.text;
        //         }
        //
        //         if(widgets[i].width != undefined) {
        //             widgets[i].width = widget.width;
        //         }
        //
        //         if(widgets[i].url != undefined) {
        //             widgets[i].url = widget.url;
        //         }
        //
        //         res.send('1');
        //         return;
        //     }
        // }
        //
        // res.send('0');

    }


    function findWidgetById(req, res) {

        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function (w) {
                    res.json(w);
                }
            );

    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        model.widgetModel
            .deleteWidget(widgetId)
            .then(
                function(status) {
                    res.send(200);
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

module.exports = function(app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {


        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var name          = req.body.name;
        var url           = req.body.url;

        var myFile        = req.file;
        var filename      = "";

        if(myFile) {
            filename = myFile.filename;     // new file name in upload folder
        }




        var widget  = {type:"IMAGE", url: "/uploads/"+filename, name:name};

        if(filename == "") {
            widget.url = url;
        }

        var widgetId = req.body.widgetId;

        if(widgetId == "") {

            model
                .widgetModel
                .createWidget(pageId, widget)
                .then(
                    function(widget) {
                        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+"/widget");
                    });
        }
        else
        {

            model
                .widgetModel
                .updateWidget(widgetId, widget)
                .then(
                    function (status) {
                        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+"/widget");
                    },
                    function (error) {
                        console.log("Update error " + error);
                        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+"/widget");
                    }
                );
        }

    }



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
                    res.sendStatus(200);
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
                    res.sendStatus(200);

                },
                function (status) {
                    console.log(status);
                    res.sendStatus(400);
                }
            );
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
                    res.sendStatus(200);
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

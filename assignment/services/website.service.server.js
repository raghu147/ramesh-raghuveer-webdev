module.exports = function(app, model) {

    app.post("/api/user/:userId/website" , createWebsite);
    app.get("/api/user/:userId/website" , findAllWebsitesForUser);
    app.get("/api/website/:websiteId" , findWebsiteById);
    app.put("/api/website/:websiteId" , updateWebsite);
    app.delete("/api/website/:websiteId" , deleteWebsite);

    function createWebsite(req, res) {

        var userId = req.params.userId;
        var website = req.body;

        model
            .websiteModel
            .createWebsite(userId, website)
            .then(
                function(website) {
                    res.send('1');
            });
    }

    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;
        model
            .websiteModel
            .findWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                }
            );
    }

    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;

        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                }
            );

    }

    function updateWebsite(req, res) {

        var websiteId = req.params.websiteId;
        var website = req.body;


        model.websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (status) {
                    res.send(200);

                },
                function (status) {
                    res.sendStatus(400).send(status);
                }
            );
    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;


        model.websiteModel
            .deleteWebsite(websiteId)
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

module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    app.post("/api/user/:userId/website" , createWebsite);
    app.get("/api/user/:userId/website" , findAllWebsitesForUser);
    app.get("/api/website/:websiteId" , findWebsiteById);
    app.put("/api/website/:websiteId" , updateWebsite);
    app.delete("/api/website/:websiteId" , deleteWebsite);

    function createWebsite(req, res) {

        var userId = req.params.userId;
        var website = req.body;

        if (isNotEmpty(website.name)) {
            website.developerId = userId;
            website._id = new Date().getTime().toString() ;
            websites.push(website);

            res.send('1');
        }

        res.send('0');
    }

    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;

        var result = [];
        for (var w in websites) {
            var site = websites[w];
            if (site.developerId === userId) {
                result.push(site);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;

        for (var w in websites) {
            var site = websites[w];
            if (site._id === websiteId) {
                res.send(site);
                return;
            }
        }

        res.send('0');

    }

    function updateWebsite(req, res) {

        var websiteId = req.params.websiteId;
        var website = req.body;

        for (var i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                websites[i].developerId = website.developerId;
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.send('1');
                return;
            }
        }

        res.send('0');
    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        websites.forEach(function (result, index) {
            if (result["_id"] === websiteId) {
                websites.splice(index, 1);
                res.send('1');
            }
        });

    }

    function isNotEmpty(val) {
        return !( val === null || val === "" || val === undefined );
    }
};

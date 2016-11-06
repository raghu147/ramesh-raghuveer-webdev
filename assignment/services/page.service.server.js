module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post("/api/website/:websiteId/page" , createPage);
    app.get("/api/website/:websiteId/page" , findAllPagesForWebsite);
    app.get("/api/page/:pageId" , findPageById);
    app.put("/api/page/:pageId" , updatePage);
    app.delete("/api/page/:pageId" , deletePage);

    function createPage(req, res) {

        var websiteId = req.params.websiteId;
        var page = req.body;

        if (isNotEmpty(page.name)) {
            page.websiteId = websiteId;
            page._id = new Date().getTime().toString();
            pages.push(page);

            res.send('1');
            return;
        }

        res.send('0');

    }

    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.websiteId;

        var result = [];
        for (var p in pages) {
            var page = pages[p];
            if (page.websiteId === websiteId) {
                result.push(page);
            }
        }
        res.send(result);

    }

    function findPageById(req, res) {

        var pageId = req.params.pageId;

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pageId) {
                res.send(page);
                return;
            }
        }

        res.send('0');
    }

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].description = page.description;
                res.send('1');
                return;
            }
        }

        res.send('0');

    }

    function deletePage(req, res) {

        var pageId = req.params.pageId;

        pages.forEach(function (result, index) {
            if (result["_id"] === pageId) {
                pages.splice(index, 1);
                res.send('1');
                return;
            }
        });

    }

    function isNotEmpty(val) {
        return !( val === null || val === "" || val === undefined );
    }
};

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {

            if (isNotEmpty(page._id) &&
                isNotEmpty(page.name)) {
                page.websiteId = websiteId;
                pages.push(page);
            }

        }

        function findPageByWebsiteId(websiteId) {

            var result = [];
            for (var p in pages) {
                var page = pages[p];
                if (page.websiteId === websiteId) {
                    result.push(page);
                }
            }
            return result;

        }

        function findPageById(pageId) {

            for (var p in pages) {
                var page = pages[p];
                if (page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {

            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    pages[i].description = page.description;

                }
            }

        }

        function deletePage(pageId) {

            pages.forEach(function (result, index) {
                if (result["_id"] === pageId) {
                    pages.splice(index, 1);
                    return;
                }
            });
        }

        function isNotEmpty(val) {
            return !( val === null || val === "" || val === undefined );
        }

    }
})();
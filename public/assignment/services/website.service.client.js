(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            if (isNotEmpty(website._id) &&
                isNotEmpty(website.name)) {
                website.developerId = userId;
                websites.push(website);
            }
        }

        function findWebsitesByUser(userId) {

            var result = [];
            for (var w in websites) {
                site = websites[w];
                if (site.developerId === userId) {
                    result.push(site);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {

            for (var w in websites) {
                site = websites[w];
                if (site._id === websiteId) {
                    return site;
                }
            }
            return null;

        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id === websiteId) {
                    websites[i].developerId = website.developerId;
                    websites[i].name = website.name;
                    websites[i].description = website.description;

                }
            }
        }

        function deleteWebsite(websiteId) {

            websites.forEach(function (result, index) {
                if (result["_id"] === websiteId) {
                    websites.splice(index, 1);
                    return;
                }
            });

        }

        function isNotEmpty(val) {
            return !( val === null || val === "" || val === undefined );
        }
    }
})();
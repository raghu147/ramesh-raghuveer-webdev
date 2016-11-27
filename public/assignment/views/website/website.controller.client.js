(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId + "");
            promise
                .success(function (user) {
                    vm.websites = user.websites;
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }

        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId + "");
            promise
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }

        init();

        function createWebsite(websitename, websitedesc) {

            var website = {name: websitename, description: websitedesc};
            var promise = WebsiteService.createWebsite(vm.userId + "", website);
            promise
                .success(function (result) {

                    if(result === '1') {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                    else {
                        alert('Error !');
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        var websiteId = $routeParams.wid;
        vm.userId = $routeParams['uid'];


        function updateWebsite() {

            var promise = WebsiteService.updateWebsite(websiteId + "", vm.website);
            promise
                .success(function (val) {

                    if(val ==='OK') {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                    else {
                        alert("An Error occurred");
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });



        }

        function deleteWebsite() {

            var promise =  WebsiteService.deleteWebsite(websiteId + "");
            promise
                .success(function (val) {

                    if(val ==='OK') {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                    else {
                        alert("An Error occurred");
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId + "");
            promise
                .success(function (websites) {
                    vm.websites = websites;
                    getCurrentWebsite();
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }

        function getCurrentWebsite() {

            var promise = WebsiteService.findWebsiteById(websiteId + "");
            promise
                .success(function (website) {
                    vm.website = website;
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }


        init();
    }
})();
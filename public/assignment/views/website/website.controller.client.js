(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId+"");
        }
        init();
    }
    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId+"");
        }
        init();

        function createWebsite(websitename, websitedesc) {
            var website = {name:websitename,_id:getRandomNumber(), description: websitedesc};
            WebsiteService.createWebsite(vm.userId+"", website)
            $location.url("/user/" + vm.userId + "/website");

        }

        function getRandomNumber() {
            var randomNumber = Math.floor(Math.random() * 90000);
            if(randomNumber < 0)
                randomNumber *= -1;

            return randomNumber+"";
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        var websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams['uid']);


        function updateWebsite(){
            WebsiteService.updateWebsite(websiteId+"", vm.website);
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId+"");
            $location.url("/user/" + vm.userId + "/website");
        }

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId+"");
            vm.website = WebsiteService.findWebsiteById(websiteId+"");
        }
        init();
    }
})();
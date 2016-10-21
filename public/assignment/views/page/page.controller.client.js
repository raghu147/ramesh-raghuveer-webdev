(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);


        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId+"");
        }
        init();
    }
    function NewPageController($routeParams, $location, PageService) {

        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.createPage = createPage;

        function createPage(pageName, pageDesc) {
            var page = {name:pageName,_id:getRandomNumber(), description: pageDesc};
            PageService.createPage(vm.wid+"", page)
            $location.url("/user/" + vm.uid + "/website/"+vm.wid+"/page");


        }

        function getRandomNumber() {
            var randomNumber = Math.floor(Math.random() * 90000);
            if(randomNumber < 0)
                randomNumber *= -1;

            return randomNumber+"";
        }

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid+"");
        }
        init();

    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.pid = parseInt($routeParams['pid']);
        var PageId = parseInt($routeParams.pid);

        function init() {
            vm.Page = PageService.findPageById(PageId+"");
            vm.pages = PageService.findPageByWebsiteId(vm.wid+"");
        }
        init();

        function updatePage() {

            PageService.updatePage(PageId+"", vm.Page);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid+"/page");
        }

        function deletePage() {
            PageService.deletePage(PageId+"");
            $location.url("/user/" + vm.uid + "/website/"+vm.wid+"/page");
        }
    }
})();
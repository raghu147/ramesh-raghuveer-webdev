(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {

            var promise = PageService.findPageByWebsiteId(vm.websiteId+"");
            promise
                .success(function (website) {
                    vm.pages = website.pages;
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {

        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.createPage = createPage;

        function createPage(pageName, pageDesc) {

            var page = {name:pageName, description: pageDesc};
            var promise = PageService.createPage(vm.wid+"", page)
            promise
                .success(function (result) {
                    if(result === '1') {
                        $location.url("/user/" + vm.uid + "/website/"+vm.wid+"/page");
                    }
                    else {
                        alert('Error!');
                    }

                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.wid+"");
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }
        init();

    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        var PageId = $routeParams.pid;

        function init() {

            var promise = PageService.findPageById(PageId+"");
            promise
                .success(function (page) {
                    vm.Page = page;
                })
                .error(function (error) {
                    console.log("error " + error);
                });



            var promise = PageService.findPageByWebsiteId(vm.wid+"");
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }
        init();

        function updatePage() {

            var promise = PageService.updatePage(PageId+"", vm.Page);
            promise
                .success(function (result) {
                    if(result === 'OK') {
                        $location.url("/user/" + vm.uid + "/website/"+vm.wid+"/page");
                    }
                    else {
                        alert('Error!');
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }

        function deletePage() {

            var promise = PageService.deletePage(PageId+"");
            promise
                .success(function (result) {
                    if(result === 'OK') {
                        $location.url("/user/" + vm.uid + "/website/"+vm.wid+"/page");                    }
                    else {
                        alert('Error!');
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });


        }
    }
})();
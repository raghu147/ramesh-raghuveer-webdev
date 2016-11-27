(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams,
                                  WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {

            var promise = WidgetService.findWidgetsByPageId(vm.pid);
            promise
                .success(function (page) {
                    vm.widgets = page.widgets;
                })
                .error(function (error) {
                    console.log("error " + error);
                });


        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController ($routeParams, WidgetService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.handleHeaderWidget = handleHeaderWidget;
        vm.handleImageWidget = handleImageWidget;
        vm.handleYoutubeWidget = handleYoutubeWidget;

        function handleHeaderWidget() {

            var widget = { name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            doCreate(widget);
        }

        function handleImageWidget() {

            var widget = {name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            doCreate(widget);
        }

        function handleYoutubeWidget() {

            var widget = {name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            doCreate(widget);
        }



        function doCreate(widget) {

            var promise = WidgetService.createWidget(vm.pid+"", widget);
            promise
                .success(function (result) {
                    if(result === '1') {
                        $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }
    }

    function EditWidgetController ($routeParams, WidgetService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;


        vm.handleHeaderWidget = handleHeaderWidget;
        vm.handleImageWidget = handleImageWidget;
        vm.handleYoutubeWidget = handleYoutubeWidget;
        vm.deleteWidget = deleteWidget;

        function handleHeaderWidget() {

            var widget = {name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            doUpdate(widget)
        }

        function handleImageWidget() {

            var widget = {name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            doUpdate(widget)
        }

        function handleYoutubeWidget() {

            var widget = {name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            doUpdate(widget)

        }

        function doUpdate(widget) {

            var promise = WidgetService.updateWidget(vm.wgid+"", widget);
            promise
                .success(function (result) {
                    if(result === 'OK') {
                        $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });
        }

        function deleteWidget() {

            var promise = WidgetService.deleteWidget(vm.wgid+"");
            promise
                .success(function (result) {
                    if(result === 'OK') {
                        $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
                    }
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }

        function init() {
            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {
                    console.log("error " + error);
                });

        }
        init();


    }
})();
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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
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

            var widget = {_id:getRandomNumber(), name:vm.widget.name, widgetType: "HEADER", size: vm.widget.size, text: vm.widget.text };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function handleImageWidget() {

            var widget = {_id:getRandomNumber(), name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function handleYoutubeWidget() {

            var widget = {_id:getRandomNumber(), name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            WidgetService.createWidget(vm.pid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function getRandomNumber() {
            var randomNumber = Math.floor(Math.random() * 90000);
            if(randomNumber < 0)
                randomNumber *= -1;

            return randomNumber+"";
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
            WidgetService.updateWidget(vm.wgid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function handleImageWidget() {

            var widget = {name:vm.widget.name, widgetType: "IMAGE", text: vm.widget.text, width: vm.widget.width, url: vm.widget.url };
            WidgetService.updateWidget(vm.wgid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function handleYoutubeWidget() {

            var widget = {name:vm.widget.name, widgetType: "YOUTUBE", width: vm.widget.width, url: vm.widget.url };
            WidgetService.updateWidget(vm.wgid+"", widget);
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid+"");
            $location.url("/user/" + vm.uid + "/website/"+vm.wid + "/page/" + vm.pid + "/widget");
        }

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();




    }
})();
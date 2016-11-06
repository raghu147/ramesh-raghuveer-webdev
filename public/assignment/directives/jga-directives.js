(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgasortable", jgasortable);

    function jgasortable() {

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    start: function (event, ui) {
                        start = $(ui.item).index();
                    },
                    stop : function (event, ui) {

                        end = $(ui.item).index();
                        pageId = "0";//document.baseURI.split("/page/")[1].split("/")[0];
                        scope.sortableController.sort(pageId, start, end);
                    }
               });
        }

        return {
            scope: {},
            link : linker,
            controller: sortableController,
            controllerAs:'sortableController'
        }

    }

    function sortableController(WidgetService){

        var vm = this;
        vm.sort = sort;

        function sort(pageId, start, end){
            WidgetService.sort(pageId, start, end);
        }

    }


})();
angular.module('app').directive('uiAccordions', function(){
    return {
        controller: function ($scope, $element, $attrs){
           var accordions = [];

           this.registreAccordion = function(accordion){
            accordions.push(accordion);

            };

            this.closeAll = function(){
                accordions.forEach(function (acordion){
                    acordion.isOpened = false;
                });
            }
        }
    };
});


angular.module('app').directive('uiAccordion', function(){
    return {
        templateUrl: "view/acordion.html",
        transclude: true,
        scope: {
            title: "@title"
        },
        require: "^uiAccordions",
        link: function (scope, element, attrs, ctrl) {
            ctrl.registreAccordion(scope);
            scope.open = function(){
                ctrl.closeAll();
                scope.isOpened = true;
            };
        }
    };
});
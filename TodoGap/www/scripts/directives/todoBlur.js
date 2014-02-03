TodoApp.directive('todoBlur', function() {
    return function(scope, elem, attr) {
        elem.bind('blur', function() {
            scope.$apply(attr.todoBlur);
        });
    };
});
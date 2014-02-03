TodoApp.controller('TodoController', function($scope, $location, $firebase) {
    var url = 'https://burning-fire-6966.firebaseio.com/';
    var fireRef = new Firebase(url);

    $scope.$watch('todos', function() {
        var total = 0;
        var remaining = 0;
        $scope.todos.$getIndex().forEach(function (index) {
            var todo = $scope.todos[index];
            if (!todo || !todo.title) {
                return;
            }

            total++;

            if (todo.completed === false)
                remaining++;
        });
        $scope.totalCount = total;
        $scope.remainingCount = remaining;
        $scope.completedCount = total - remaining;
        $scope.allCompleted = remaining === 0;

    }, true);

    $scope.todos = $firebase(fireRef);
    $scope.newTodo = '';

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.addTodo = function() {
        var newTodo = $scope.newTodo.trim();

        if (!newTodo.length)
            return;

        $scope.todos.$add({
            title: newTodo,
            completed: false
        });

        $scope.newTodo = '';
    };

    $scope.editTodo = function(id) {
        $scope.editedTodo = $scope.todos[id];
        $scope.originalTodo = angular.extend({}, $scope.editedTodo);
    };

    $scope.doneEditing = function(id) {
        $scope.editedTodo = null;

        var title = $scope.todos[id].title.trim();
        if (title)
            $scope.todos.$save(id);
        else
            $scope.todos.$remove(id);
    };

    $scope.revertEditing = function(id) {
        $scope.todos[id] = $scope.originalTodo;
        $scope.doneEditing(id);
    };

    $scope.markAll = function (allCompleted) {
        angular.forEach($scope.todos.$getIndex(), function(index) {
            $scope.todos[index].completed = !allCompleted;
        });
        $scope.todos.$save();
    };

    $scope.removeTodo = function(id) {
        $scope.todos.$remove(id);
    };
});
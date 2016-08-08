(function () {
    'use strict';

    angular
        .module('TodoList')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$q', 'Todo'];
    function TodoService($q, Todo) {
        var service = {
            save: save,
            remove: remove,
            findAll: findAll
        };

        return service;

        //public methods
        function save(todo) {
            var deferred = $q.defer();

            var newTodo = new Todo({
                name: todo.name,
                belongsTo: todo.belongsTo
            });

            newTodo.save(function (err, todo) {
                if (err) deferred.reject(err);
                deferred.resolve(todo);
            });

            return deferred.promise;
        }

        function findAll() {
            var deferred = $q.defer();

            Todo.find({}).sort({createdAt: -1}).exec(function (err, todos) {
                if (err) deferred.reject(err);
                deferred.resolve(todos);
            });

            return deferred.promise;
        }

        function remove(id) {
            var deferred = $q.defer();

            Todo.findById(id).exec(function (err, todo) {
                if (err) deferred.reject(err);
                if (todo) {
                    todo.remove(function (err) {
                        if (err) deferred.reject(err);
                        deferred.resolve();
                    });
                } else {
                    deferred.reject('Todo does not exists!');
                }
            });

            return deferred.promise;
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('TodoList')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$q', 'Todo', '$rootScope'];

    function TodoService($q, Todo, $rootScope) {
        var service = {
            save: save,
            remove: remove,
            findAll: findAll,
            done: done,
            undone: undone,
            notify: notify,
            subscribe: subscribe
        };

        return service;

        function notify(event, data){
            if(data) {
                $rootScope.$emit(event, data);
            } else {
                $rootScope.$emit(event);
            }
            
        }

        function subscribe(scope, event, callback){
            var handler = $rootScope.$on(event, callback);
            scope.$on('$destroy', handler);
        }

        //public methods
        function save(todo) {
            var self = this;

            var deferred = $q.defer();

            var newTodo = new Todo({
                name: todo.name,
                startDate: todo.startDate,
                startTime: todo.startTime,
                belongsTo: todo.belongsTo
            });

            newTodo.save(function (err, todo) {
                if (err) deferred.reject(err);
                deferred.resolve(todo);
                
                self.notify('save-todo', todo);
            });

            return deferred.promise;
        }

        function findAll() {
            var deferred = $q.defer();

            Todo.find({}).sort({ priority: 1 }).exec(function (err, todos) {
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

        function done(id) {
            var deferred = $q.defer();

            Todo.findById(id, function (err, todo) {
                if (err) return deferred.reject(err);
                if (!todo) return deferred.reject('Todo not found');

                todo.do();
                todo.save(function (err) {
                    if (err) return deferred.reject(err);
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }

        function undone(id) {
            var deferred = $q.defer();

            Todo.findById(id, function (err, todo) {
                if (err) return deferred.reject(err);
                if (!todo) return deferred.reject('Todo not found');

                todo.undo();
                todo.save(function (err) {
                    if (err) return deferred.reject(err);
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('TodoList')
        .factory('DoListService', DoListService);

    DoListService.$inject = ['DoList', 'Todo', '$q', 'async'];

    function DoListService(DoList, Todo, $q, async) {
        var service = {
            findAll: findAll,
            findById: findById,
            save: save,
            update: update,
            remove: remove,
            reorder: reorder,
            sortable: sortable
        };

        return service;

        //public methods
        function save(doList) {
            var deferred = $q.defer();

            var doList = new DoList({
                name: doList.name,
                color: doList.color
            });

            doList.save(function (err, doList) {
                if (err) deferred.reject(err);
                deferred.resolve(doList);
            });

            return deferred.promise;
        }

        function update(id, data) {
            var deferred = $q.defer();

            DoList.findById(id, function (err, doList) {
                if (err) deferred.reject(err);

                doList.name = data.name;
                doList.color = data.color;

                doList.save(function (err, doList) {
                    if (err) deferred.reject(err);
                    deferred.resolve(doList);
                });
            });

            return deferred.promise;
        }

        function findAll() {
            var deferred = $q.defer();

            DoList.find({}).sort({position: 1}).exec(function (err, doLists) {
                if (err) deferred.reject(err);
                async.each(doLists, function (doList, done) {
                    Todo.find({ belongsTo: doList }).sort({ priority: 1 }).exec(function (err, todos) {
                        if (err) done(err);
                        doList.todos = todos;
                        done();
                    });
                }, function (err) {
                    if (err) deferred.reject(err);
                    deferred.resolve(doLists);
                });
            });

            return deferred.promise;
        }

        function findById(id) {
            var deferred = $q.defer();

            DoList.findById(id).exec(function (err, doList) {
                if (err) deferred.reject(err);
                Todo.find({ belongsTo: doList }).sort({ priority: 1 }).exec(function (err, todos) {
                    doList.todos = todos;
                    deferred.resolve(doList);
                });
            });

            return deferred.promise;
        }

        function remove(id) {
            var deferred = $q.defer();

            DoList.findById(id).exec(function (err, doList) {
                if (err) deferred.reject(err);
                if (doList) {
                    doList.remove(function (err) {
                        if (err) deferred.reject(err);
                        deferred.resolve();
                    });
                } else {
                    deferred.reject('Do List does not exists!');
                }
            });

            return deferred.promise;
        }

        function reorder(todos) {
            var deferred = $q.defer();

            for (var i = 0; i < todos.length; i++) {
                var todo = todos[i];
                todo.priority = i;
            }

            async.each(todos, function (todo, done) {
                todo.save(function (err) {
                    if (err) return done(err);
                    done();
                });
            }, function (err) {
                if (err) return deferred.reject(err);
                deferred.resolve(todos);
            });

            return deferred.promise;
        }

        function sortable(doLists) {
            var deferred = $q.defer();

            for (var i = 0; i < doLists.length; i++) {
                var doList = doLists[i];
                doList.position = i;
            }

            async.each(doLists, function (doList, done) {
                doList.save(function (err) {
                    if (err) return done(err);
                    done();
                });
            }, function (err) {
                if (err) return deferred.reject(err);
                deferred.resolve(doLists);
            });

            return deferred.promise;
        }
    }
})();
var app = angular.module('starter', ['ionic', 'pouchdb']);
app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}]);

// #####################################################
// Alterar as constantes abaixo para os devidos valores.
// #####################################################
app.constant('COUCHDB_URL', 'http://localhost:5984');
app.constant('COUCHDB_COLLECTION', 'todos');



app.factory('PouchDBProvider', ['pouchDB', 'COUCHDB_URL', 'COUCHDB_COLLECTION',
  function (pouchDB, COUCHDB_URL, COUCHDB_COLLECTION) {
    var db = null;
    var changeCallback = function() {};
    var initializeDB = function() {
      db = pouchDB(COUCHDB_COLLECTION);
      db.replicate.to(COUCHDB_URL, {live: true});
      db.replicate.from(COUCHDB_URL, {live: true});

      db.changes({
        since: 'now',
        live: true
      }).on('change', function() {
        changeCallback();
      });
    };

    var onChangeCallback = function(callback) {
      changeCallback = callback;
    }

    var save = function(doc, callback) {
      db.put(doc, callback);
    };

    var findAll = function(callback) {
      db.allDocs({include_docs: true, descending: true}, function(err, results) {
        callback(err, results.rows.map(function(row) {return row.doc}));
      });
    };

    initializeDB();
    return {
      onChangeCallback: onChangeCallback,
      save: save,
      findAll: findAll
    };
}])

app.controller('ExampleController', ['$scope', '$ionicPopup', 'PouchDBProvider',
  function ($scope, $ionicPopup, PouchDBProvider) {
    $scope.todos = [];

    $scope.create = function() {
      $ionicPopup.prompt({
        title: 'Enter a new TODO item',
        intputType: 'text'
      }).then(function(result) {
        if (!!result) {
          var todo = {_id: new Date().toISOString(), title: result, completed: false };
          PouchDBProvider.save(todo);
        }
      });
    };

    $scope.init = function() {
      PouchDBProvider.onChangeCallback(fullFillTodos);
      fullFillTodos();
    }

    var fullFillTodos = function() {
      PouchDBProvider.findAll(function(err, results) {
        $scope.todos = results;
        $scope.$apply();
      });
    };
    
  }]);
(function(){

  var myApp = angular.module('myApp')
  myApp.provider('catService', function catServiceProvider(){
    var type = 'gif'
    this.setType = function(newType){
      type = newType
    }

    function CatService(){
      this.get = function(){
        return `http://thecatapi.com/api/images/get?format=src&type=${type}`
      }   
    }

    this.$get = function(){
      return new CatService()
    }
  })


  myApp.config(function (catServiceProvider){
    catServiceProvider.setType('png')
  })

  myApp.controller('catController', function($scope, catService){
    $scope.nextCat = function(){
      $scope.src = catService.get() + '&' + _.random(100)
    }
    $scope.nextCat()
  })

}())
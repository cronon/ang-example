(function(){

var myApp = angular.module('myApp')
myApp.directive("colorsButton", function(colorService){
  return {
    templateUrl: 'templates/colorsButton.html',
    restrict: 'C',

    link: function(scope, element, attrs){
      scope.color = attrs.color
      scope.origin = attrs.origin
      scope.colors = colorService.colors,
      scope.update = function(){
        colorService.get((color, data) => {
          scope.color = color
          scope.origin = data.origin
          scope.colors = _.sample(scope.colors, scope.colors.length)
        })
      }
      element.find('button').on('click', scope.update)
    }
  }
})

myApp.controller("MyCtrl", function myCtrl($scope, $interval){
  $scope.origin = "8.8.8.8:8080"
  $scope.color = "green"
})

}())
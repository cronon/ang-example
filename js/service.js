(function(){

var myApp = angular.module("myApp")
myApp.factory('colorService', function($http){
  return {
    colors: "red green blue yellow".split(" "),
    get: function(onSuccess, onError){
      $http.get("//httpbin.org/ip")
        .success((data) => {
          data.origin += ':'+_.random(99999)
          onSuccess(_.sample(this.colors), data)
        })
        .error(onError)
    }
  }
})

}())
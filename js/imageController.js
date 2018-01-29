myApp.controller("imageController", function($scope){


$scope.allResults=[]; //array to store all searched keywords before

//function to fetch images from google

$scope.fetchImages = function(queryStr){

$scope.allResults.push(queryStr);

$scope.queryString = queryStr;
console.log($scope.queryString);

      var data = $.param({
        imagesQuery: JSON.stringify({
            query: $scope.queryString
                })
      });

      $http.post("/api/images/", data).success(function(data, status) {
        console.log('Data posted successfully');
      })
}

  });

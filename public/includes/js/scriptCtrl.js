angular.module('employeeDetailApp').controller('ctrl', function($scope, $http) {
  $scope.prv = false;
  $scope.nxt = false;
    var start = 0;


    $scope.viewBtn = function() {
    //$scope.prv = false;
    $scope.nxt = true;
        $http.get('http://localhost:8080/employees/?=&_start=' + start + '&_limit=10').success(function(data) {
            $scope.results = data;
        });
    };

    $scope.next = function() {
        $scope.prv = true;
        start = start + 10;
        $scope.viewBtn();
    };

    $scope.prev = function() {
        if (start == 10) {
            $scope.prv = false;
        }
        start = start - 10;
        $scope.viewBtn();
    };

    $scope.emp = {};
    $scope.add = function() {
        $http({
                method: 'post',
                url: 'http://localhost:8080/employees',
                data: $scope.emp,
            })
            .success(function(data) {
                alert("New employee has been added successfully");
                $scope.emp = {};
            })
    };

    $scope.delBtn = function(id) {

        $http({
            method: 'delete',
            url: 'http://localhost:8080/employees/' + id,
        }).success(function(data) {
            alert("One employee has been deleted successfully");
            $scope.results.splice(id);
            $scope.viewBtn();
        })
    };
    var x=0;
    $scope.edtBtn=function(i){
      x=i.id;
      $scope.nme=i.name;
      $scope.gndr=i.gender;
      $scope.cmpy=i.company;
      $scope.mail=i.email;
    }
    $scope.modifyRow=function(){
      var updt={
name:$scope.nme,
gender:$scope.gndr,
company:$scope.cmpy,
email:$scope.mail

      };
      $http({
            method: 'patch',
            url: 'http://localhost:8080/employees/' + x,
            data: updt,
            "content-Type": 'application/json',
        }).success(function(data) {
            alert("updated successfully");
            $scope.viewBtn();

        })
    }

});

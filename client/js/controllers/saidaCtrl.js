angular.module('app.controllers.Saida',[]).controller('SaidaListController',function($scope,$state,popupService,$window,Saida){



  Saida.find(
    function (res) {
      // success

      console.log(res);
      $scope.saidas=res;
      

    }, function (res) {
      // error
      console.log( "Erro ao recuperar saidas!");

      console.log(res);
    });



  });

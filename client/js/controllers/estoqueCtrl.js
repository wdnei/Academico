angular.module('app.controllers.Estoque',[]).controller('EstoqueListController',function($scope,$state,popupService,$window,Estoque){



  Estoque.find(
    function (res) {
      // success

      console.log(res);
      $scope.estoques=res;
      $scope.patrimonio_total=0;
      $scope.total_itens=0;
      for (var i = 0; i < $scope.estoques.length; i++) {
        var estoque=$scope.estoques[i];
        $scope.patrimonio_total+=estoque.preco_unitario*estoque.qtd_atual;
        $scope.total_itens+=estoque.qtd_atual;
      }

    $scope.patrimonio_total= Math.round($scope.patrimonio_total*100)/100;

    }, function (res) {
      // error
      console.log( "Erro ao recuperar estoques!");

      console.log(res);
    });



  });

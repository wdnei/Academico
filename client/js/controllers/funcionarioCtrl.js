angular.module('app.controllers.Funcionario',[]).controller('FuncionarioListController',function($scope,$state,popupService,$window,Funcionario){

  $scope.funcionarios={};
  Funcionario.find(
    function (res) {
      // success

      console.log(res);
      $scope.funcionarios=res;

    }, function (res) {
      // error
      console.log( "Erro ao recuperar funcionarios!");

      console.log(res);
    });

    $scope.deleteFuncionario=function(id)
    {
      if(popupService.showPopup('Realmente deseja deletar?'))
      {

        Funcionario.deleteById({id:id},
          function (res)
          {
            // success

            console.log(res);
            $window.location.reload();

          }, function (res)
          {
            // error
            console.log( "Erro ao deletar funcionario!");

            console.log(res);
          });


        }
      };

    }).controller('FuncionarioViewController',function($scope,$stateParams,Funcionario){

      Funcionario.findById({id:$stateParams.id},
        function (res) {
          // success

          console.log(res);
          $scope.funcionario=res;
          $scope.$apply();

        }, function (res) {
          // error
          console.log( "Erro ao procurar funcionario!");

          console.log(res);
        });



      }).controller('FuncionarioCreateController',function($scope,$state,$stateParams,Funcionario){

        $scope.funcionario={
          primeiro_nome:"",
          ultimo_nome:"",
          cargo:"Estoquista",
          email:"",
          password:"",
          id:0

        };



        $scope.addFuncionario=function(){
          console.log("Adicionando funcionario");
          console.log($scope.funcionario);
          Funcionario.create($scope.funcionario,function (res) {
            // success

            console.log(res);
            $state.go('funcionarios');

          }, function (res) {
            // error
            console.log( "Erro ao realizar registro!");

            console.log(res);
          });
        };

      }).controller('FuncionarioEditController',function($scope,$state,$stateParams,Funcionario){

        $scope.updateFuncionario=function(){
          Funcionario.upsert($scope.funcionario,function (res) {

            // success

            console.log(res);
            $state.go('funcionarios');

          }, function (res) {

            // error
            console.log( "Erro ao atualizar registro!");


            console.log(res);
          });
        }

        $scope.loadFuncionario=function(){
          Funcionario.findById({id:$stateParams.id},
            function (res) {

              // success

              console.log(res);
              $scope.funcionario=res;
              $scope.funcionario.password="";


            }, function (res) {

              // error
              console.log( "Erro ao realizar registro!");


              console.log(res);
            });
          };

          $scope.loadFuncionario();

        });

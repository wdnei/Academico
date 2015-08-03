angular.module('app.controllers.Professor',[]).controller('ProfessorListController',function($scope,$state,$window,popupService,$window,Professor){

  $scope.professores={};
  Professor.find(
    function (res) {
      // success

      console.log(res);
      $scope.professores=res;

    }, function (res) {
      // error
      console.log( "Erro ao recuperar professores!");

      console.log(res);
    });

    $scope.deleteProfessor=function(professor)
    {
      if(popupService.showPopup('Realmente deseja deletar?'))
      {

        Professor.disciplina.count({id:professor.id},function(res){
          console.log("count:",res);

          if(res.count>0)
          {
            $window.alert("Professor não pode ser deletado, pois esta vinculado a uma disciplina");
          }
          else {
            Professor.deleteById({id:professor.id},
              function (res)
              {
                // success

                console.log(res);
                $window.alert("Professor deletado com sucesso!");
                $window.location.reload();

              }, function (res)
              {
                // error
                console.log( "Erro ao deletar professor!");
                $window.alert("Erro ao deletar professor:"+res.status);
                console.log(res);
              });


            }

          },function(res){

          });



        }
      };

    }).controller('ProfessorViewController',function($scope,$stateParams,Professor){

      Professor.findById({id:$stateParams.id},
        function (res) {
          // success

          console.log(res);
          $scope.professor=res;
          $scope.$apply();

        }, function (res) {
          // error
          console.log( "Erro ao procurar professor!");

          console.log(res);
        });



      }).controller('ProfessorCreateController',function($scope,$state,$window,$http,$stateParams,APIlb,Professor){

        $scope.showMSG=function(str){
          $window.alert(str);
        };
        
        $scope.professor={
          nome:"",
          cpf:"",
          genero:"Masculino",
          data_nasc:new Date(),
          end_cep:"",
          end_rua:"",
          end_numero:"",
          end_bairro:"",
          end_cidade:"",
          end_estado:"",
          id:0
        };

        $scope.getEndereco=function(cep){
          $scope.professor.end_cep=cep;
          $http.get(APIlb.urlCorreios+$scope.professor.end_cep+".json").success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.professor.end_bairro=  data.bairro;
            $scope.professor.end_cidade=data.localidade;
            $scope.professor.end_rua=data.logradouro;
            $scope.professor.end_estado=data.uf;

            console.log(data);
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(data);
            $scope.professor.end_bairro="";
            $scope.professor.end_cidade="";
            $scope.professor.end_rua="";
            $scope.professor.end_estado="";
            if(status==0)
            {
              $window.alert("Não há conexão com a internet para recuperar o endereço!");
            }else {
              $window.alert("CEP inválido");
            }


          });
        };



        $scope.addProfessor=function(){
          console.log("Adicionando professor");
          console.log($scope.professor);
          Professor.create($scope.professor,function (res) {
            // success

            console.log(res);
            $window.alert("Professor adicionado com sucesso!");
            $state.go('professores');

          }, function (res) {
            // error
            console.log( "Erro ao realizar registro!");
            if(res.status==422)
            {
              $window.alert("Erro ao adicionar professor:"+res.data.error.message);
            }
            else
            {
              $window.alert("Erro ao adicionar professor:"+res.status);
            }

            console.log(res);
          });
        };

      }).controller('ProfessorEditController',function($scope,$http,APIlb,$state,$window,$stateParams,Professor){

        $scope.showMSG=function(str){
          $window.alert(str);
        };
        $scope.updateProfessor=function(){
          Professor.upsert($scope.professor,function (res) {

            // success

            console.log(res);
            $window.alert("Professor atualizado com sucesso!");
            $state.go('professores');

          }, function (res) {

            // error
            console.log( "Erro ao atualizar registro!");
            $window.alert("Erro ao atualizar professor:"+res.status);


            console.log(res);
          });
        };

        $scope.getEndereco=function(cep){
          $scope.professor.end_cep=cep;
          $http.get(APIlb.urlCorreios+$scope.professor.end_cep+".json").success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.professor.end_bairro=  data.bairro;
            $scope.professor.end_cidade=data.localidade;
            $scope.professor.end_rua=data.logradouro;
            $scope.professor.end_estado=data.uf;

            console.log(data);
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(data);
            $scope.professor.end_bairro="";
            $scope.professor.end_cidade="";
            $scope.professor.end_rua="";
            $scope.professor.end_estado="";
            if(status==0)
            {
              $window.alert("Não há conexão com a internet para recuperar o endereço!");
            }else {
              $window.alert("CEP inválido");
            }


          });
        };


        $scope.loadProfessor=function(){
          Professor.findById({id:$stateParams.id},
            function (res) {

              // success

              console.log(res);
              $scope.professor=res;
              $scope.professor.data_nasc=new Date($scope.professor.data_nasc);


            }, function (res) {

              // error
              console.log( "Erro ao realizar registro!");
              $window.alert("Erro ao carregar professor:"+res.status);


              console.log(res);
            });
          };

          $scope.loadProfessor();

        });

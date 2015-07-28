angular.module('app.controllers.Caixa',[]).controller('CaixaListController',function($scope,$state,popupService,$window,Caixa){



  Caixa.find(
    function (res) {
      // success

      console.log(res);
      $scope.caixas=res;

    }, function (res) {
      // error
      console.log( "Erro ao recuperar caixas!");

      console.log(res);
    });

    $scope.deleteCaixa=function(id){
      if(popupService.showPopup('Realmente deseja deletar?')){

        Caixa.deleteById({id:id},
          function (res) {
            // success

            console.log(res);
            $window.location.reload();

          }, function (res) {
            // error
            console.log( "Erro ao deletar caixa!");

            console.log(res);
          });


        }
      }

    }).controller('CaixaViewController',function($scope,$stateParams,Caixa){

      Caixa.findById({id:$stateParams.id},
        function (res) {
          // success

          console.log(res);
          $scope.caixa=res;


        }, function (res) {
          // error
          console.log( "Erro ao procurar caixa!");

          console.log(res);
        });



      }).controller('CaixaCreateController',function($scope,$state,$stateParams,Setting,Caixa,Entrada,Saida,Estoque,Funcionario){



        $scope.caixa={
          "qtd": 0,
          "preco_unitario": 0,
          "comentatio": "",
          "data_movimentacao": new Date(),
          "data_adicao": new Date(),
          "tipo": "venda",
          "metodo": Setting.metodo,
          "id": 0,
          "funcionarioId": 0
        }


        $scope.funcionarios={};





        Funcionario.find({order:"primeiro_nome ASC"},
        function (res) {
          // success

          console.log(res);
          $scope.funcionarios=res;
          $scope.caixa.funcionarioId=$scope.funcionarios[0].id;

        }, function (res) {
          // error
          console.log( "Erro ao recuperar caixas!");

          console.log(res);
        });

        $scope.addVenda=function(){
          console.log("Adicionando venda");





          //Ver qtd de produtos em Estoque
          Estoque.find({
            where: {
              qtd_atual: {gt: 0}
            }
          },function(listEstoque){


            if($scope.caixa.metodo=="peps")
            {
              listEstoque.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.data_adicao) - new Date(b.data_adicao);
              });
            }else if ($scope.caixa.metodo=="ueps") {
              listEstoque.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.data_adicao) - new Date(a.data_adicao);
              });
            }

            console.log("Lista Estoque",listEstoque);


            var arraySaidasCriada=[];
            var arrayEstoqueAlterados=[];
            var qtdARetirar=$scope.caixa.qtd;
            var qtdAtualTotal=0;
            for (var i = 0; i < listEstoque.length; i++) {
              qtdAtualTotal+=listEstoque[i].qtd_atual;
            }
            if(qtdAtualTotal>=qtdARetirar){

              for (var i = 0; i < listEstoque.length; i++) {


                var itemEstoque=listEstoque[i];

                var saida={
                  "qtd": 0,
                  "preco_unitario": 0,
                  "data_adicao": new Date(),
                  "id": 0,
                  "caixaId": 0,
                  "estoqueId": 0
                };

                saida.qtd=0;
                saida.preco_unitario=itemEstoque.preco_unitario;
                saida.estoqueId=itemEstoque.id;
                if((itemEstoque.qtd_atual-qtdARetirar)<=0)
                {//se qtd menor q a retirar

                  saida.qtd=itemEstoque.qtd_atual;
                  qtdARetirar-=itemEstoque.qtd_atual;
                  itemEstoque.qtd_atual=0;
                  arraySaidasCriada[arraySaidasCriada.length]= saida;
                  arrayEstoqueAlterados[arrayEstoqueAlterados.length]=itemEstoque;
                }else
                {
                  saida.qtd=qtdARetirar;
                  itemEstoque.qtd_atual-=qtdARetirar;
                  qtdARetirar=0;
                  arraySaidasCriada[arraySaidasCriada.length]= saida;
                  arrayEstoqueAlterados[arrayEstoqueAlterados.length]=itemEstoque;

                }

                if(qtdARetirar<=0)
                {
                  break;
                }

              }

              console.log("Saidas Criadas",arraySaidasCriada);
              console.log("Estoque Alterados",arrayEstoqueAlterados);


              //salvar caixa e estoque
              Caixa.create($scope.caixa,function(res){
                //success
                console.log("Criando saidas...");
                for (var i = 0; i < arraySaidasCriada.length; i++) {
                  saida.caixaId=res.id;
                  Saida.create(arraySaidasCriada[i],function(res){
                    //success

                    console.log("saida criada",res);

                  },function(err){
                    //err
                    throw err;
                  }
                );
              }


              console.log("Saidas criadas");
              console.log("Alterando estoques...");
              for (var i = 0; i < arrayEstoqueAlterados.length; i++) {
                arrayEstoqueAlterados[i].$save();

              }
              console.log("Estoque alterados");
            });
          }
          else {
            console.log( "Quantidade em estoque menor que a requerida");
          }

        },function(err){
          //err
          throw err;
        });
      };



      $scope.addCompra=function(){
        console.log("Adicionando compra");
        $scope.caixa.tipo="compra";
        //salvar caixa e estoque
        Caixa.create($scope.caixa,function(res){
          //success

          var novoEstoque={
            "qtd_inicial": res.qtd,
            "preco_unitario": res.preco_unitario,
            "data_adicao": res.data_adicao,
            "qtd_atual": res.qtd,
            "caixaId": res.id,
            "id": 0
          }

          Estoque.create(novoEstoque,function(res){
            //success

            console.log("estoque criado",res);

          },function(err){
            //err
            throw err;
          });

        },function(err){
          //err
          throw err;
        });


      };


    }).controller('CaixaEditController',function($scope,$state,$stateParams,Caixa){

      $scope.updateCaixa=function(){
        Caixa.upsert($scope.caixa,function (res) {

          // success

          console.log(res);
          $state.go('caixas');

        }, function (res) {

          // error
          console.log( "Erro ao atualizar registro!");


          console.log(res);
        });
      }

      $scope.loadCaixa=function(){
        Caixa.findById({id:$stateParams.id},
          function (res) {

            // success

            console.log(res);
            $scope.caixa=res;
            $scope.caixa.password="";


          }, function (res) {

            // error
            console.log( "Erro ao realizar registro!");


            console.log(res);
          });
        };

        $scope.loadCaixa();

      });

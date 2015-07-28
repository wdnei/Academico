angular.module('app.controllers.DRE',[]).controller('DREListController',function($scope,$state,popupService,$window,Caixa,Estoque,Saida){

  var ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
  $scope.search={};
  $scope.data_inicial=new Date(Date.now()-(60*1000*60*24*1));
  $scope.data_final=new Date();

    $scope.receita_bruta=0;
    $scope.CMV=0;
    $scope.lucro=0;

  $scope.gerarDRE=function(){
    console.log($scope.data_final.toJSON());
    $scope.receita_bruta=0;
    $scope.CMV=0;
    $scope.lucro=0;


    Caixa.find({where:{tipo:"venda"}},function(res){
      console.log(res);
      var filtrados=[];

      for (var i = 0; i < res.length; i++) {
        var data_movimentacao=new Date(res[i].data_movimentacao);
        if(data_movimentacao>=$scope.data_inicial && data_movimentacao<=$scope.data_final && res[i].tipo=="venda" )
        {
          filtrados.push(res[i]);
          $scope.receita_bruta+=res[i].qtd*res[i].preco_unitario;
        }
      }
      console.log(filtrados);

      Saida.find(null,function(res){

        for (var i = 0; i < res.length; i++) {
          var data_adicao=new Date(res[i].data_adicao);
          if(data_adicao>=$scope.data_inicial && data_adicao<=$scope.data_final)
          {
            
            $scope.CMV+=res[i].qtd*res[i].preco_unitario;
          }
        }

        $scope.lucro=$scope.receita_bruta-$scope.CMV;
        console.log($scope.dre);


      },function(res){console.log(res);});



    },function(res){
      console.log(res);
    });

  };




});

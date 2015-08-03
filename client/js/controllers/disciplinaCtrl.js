angular.module('app.controllers.Disciplina',[]).controller('DisciplinaListController',function($scope,$state,popupService,$window,Disciplina){

  Disciplina.find({"filter": {
    "include": "professor"
  }
}
,
function (res) {
  // success

  console.log(res);
  $scope.disciplinas=res;

}, function (res) {
  // error
  console.log( "Erro ao recuperar disciplinas!");

  console.log(res);
});

$scope.deleteDisciplina=function(id){
  if(popupService.showPopup('Realmente deseja deletar?')){

    Disciplina.deleteById({id:id},
      function (res) {
        // success

        console.log(res);
        $window.location.reload();

      }, function (res) {
        // error
        console.log( "Erro ao deletar disciplina!");

        console.log(res);
      });


    }
  }

}).controller('DisciplinaViewController',function($scope,$stateParams,Disciplina){

  Disciplina.findById({id:$stateParams.id,"filter": {
    "include": "professor"
  }
},
function (res) {
  // success

  console.log(res);
  $scope.disciplina=res;


}, function (res) {
  // error
  console.log( "Erro ao procurar disciplina!");

  console.log(res);
});



}).controller('DisciplinaCreateController',function($scope,$state,$stateParams,$window,Disciplina,Professor){

  $scope.alert=function(str){
    $window.alert(str);
  };



  $scope.disciplina={
    "nome": "",
    "ano_letivo": "",
    "numero_vagas": 0,
    "id": 0,
    "professorId": 0
  }




  $scope.professores={};



  Professor.find({order:"nome ASC"},
  function (res) {
    // success

    console.log(res);
    $scope.professores=res;
    $scope.disciplina.professorId=$scope.professores[0].id;

  }, function (res) {
    // error
    console.log( "Erro ao recuperar disciplinas!");

    console.log(res);
  });

  $scope.addDisciplina=function(){
    console.log("Adicionando disciplina");
    if($scope.disciplina.professorId==0)
    {
      $window.alert("É necessário que um professor seja adicionado!");
      return false;
    }

    //salvar disciplina e estoque
    Disciplina.create($scope.disciplina,function(res){
      //success
      $window.alert("Disciplina adicionada com sucesso!");
      $state.go('disciplinas');

    },function(err){
      $window.alert("Erro ao adicionar disciplina:"+err.status);
      console.log(err);
    });
  };


}).controller('DisciplinaEditController',function($scope,$state,$window,$stateParams,Disciplina,Professor){

  $scope.professores={};

  $scope.showMSG=function(str){
    $window.alert(str);
  };

  Professor.find({order:"nome ASC"},
  function (res) {
    // success

    console.log(res);
    $scope.professores=res;
    //  $scope.disciplina.professorId=$scope.professores[0].id;

  }, function (res) {
    // error
    console.log( "Erro ao recuperar disciplinas!");

    console.log(res);
  });



  $scope.updateDisciplina=function(){
    Disciplina.upsert($scope.disciplina,function (res) {

      // success

      console.log(res);
      $window.alert("Disciplina atualizada com sucesso!");
      $state.go('disciplinas');

    }, function (res) {

      // error
      console.log( "Erro ao atualizar registro!");
      $window.alert("Erro ao atualizar disciplina:"+res.status);


      console.log(res);
    });
  }

  $scope.loadDisciplina=function(){
    Disciplina.findById({id:$stateParams.id},
      function (res) {

        // success
        $scope.disciplina=res;

        console.log(res);

      }, function (res) {

        // error
        console.log( "Erro ao realizar registro!");


        console.log(res);
      });
    };

    $scope.loadDisciplina();


    $scope.professores={};


    Professor.find({order:"nome ASC"},
    function (res) {
      // success
      console.log(res);
      $scope.professores=res;

    }, function (res) {
      // error
      console.log( "Erro ao recuperar disciplinas!");

      console.log(res);
    });


  });

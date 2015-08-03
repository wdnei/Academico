/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app',['ui.router',
                      'ui.utils.masks',
                      'ngResource',
                      'app.controllers.Disciplina',
                      'app.controllers.Professor',
                      'app.services',
                      'lbServices','ui.mask']);

angular.module('app').config(function($stateProvider,$httpProvider){
    $stateProvider.state('professores',{
        url:'/professores',
        templateUrl:'partials/professor/professores.html',
        controller:'ProfessorListController'
    }).state('viewProfessor',{
       url:'/professores/:id/view',
       templateUrl:'partials/professor/professor-view.html',
       controller:'ProfessorViewController'
    }).state('newProfessor',{
        url:'/professores/new',
        templateUrl:'partials/professor/professor-add.html',
        controller:'ProfessorCreateController'
    }).state('editProfessor',{
        url:'/professores/:id/edit',
        templateUrl:'partials/professor/professor-edit.html',
        controller:'ProfessorEditController'
    })
    .state('disciplinas',{
        url:'/disciplinas',
        templateUrl:'partials/disciplina/disciplinas.html',
        controller:'DisciplinaListController'
    }).state('viewDisciplina',{
       url:'/disciplinas/:id/view',
       templateUrl:'partials/disciplina/disciplina-view.html',
       controller:'DisciplinaViewController'
    }).state('newDisciplina',{
        url:'/disciplinas/new',
        templateUrl:'partials/disciplina/disciplina-add.html',
        controller:'DisciplinaCreateController'
    }).state('editDisciplina',{
        url:'/disciplinas/:id/edit',
        templateUrl:'partials/disciplina/disciplina-edit.html',
        controller:'DisciplinaEditController'
    });
}).run(function($state){
   $state.go('disciplinas');
}).config(function (LoopBackResourceProvider) {

            // Use a custom auth header instead of the default 'Authorization'
            // LoopBackResourceProvider.setAuthHeader('X-Access-Token');

            // Change the URL where to access the LoopBack REST API server
            LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
        })
        .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }
        ])

.constant("APIlb", {
        "urlLB": "http://localhost:3000/api",
        "urlCorreios": "http://cep.correiocontrol.com.br/"
    });

/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app',['ui.router',
                      'ngResource',
                      'app.controllers.Caixa',
                      'app.controllers.Funcionario',
                      'app.controllers.Estoque',
                      'app.controllers.Saida',
                      'app.controllers.DRE',
                      'app.services',
                      'lbServices']);

angular.module('app').config(function($stateProvider,$httpProvider){
    $stateProvider.state('funcionarios',{
        url:'/funcionarios',
        templateUrl:'partials/funcionario/funcionarios.html',
        controller:'FuncionarioListController'
    }).state('viewFuncionario',{
       url:'/funcionarios/:id/view',
       templateUrl:'partials/funcionario/funcionario-view.html',
       controller:'FuncionarioViewController'
    }).state('newFuncionario',{
        url:'/funcionarios/new',
        templateUrl:'partials/funcionario/funcionario-add.html',
        controller:'FuncionarioCreateController'
    }).state('editFuncionario',{
        url:'/funcionarios/:id/edit',
        templateUrl:'partials/funcionario/funcionario-edit.html',
        controller:'FuncionarioEditController'
    })
    .state('caixas',{
        url:'/caixas',
        templateUrl:'partials/caixa/caixas.html',
        controller:'CaixaListController'
    }).state('viewCaixa',{
       url:'/caixas/:id/view',
       templateUrl:'partials/caixa/caixa-view.html',
       controller:'CaixaViewController'
    }).state('newCaixa',{
        url:'/caixas/new',
        templateUrl:'partials/caixa/caixa-add.html',
        controller:'CaixaCreateController'
    }).state('editCaixa',{
        url:'/caixas/:id/edit',
        templateUrl:'partials/caixa/caixa-edit.html',
        controller:'CaixaEditController'
    }).state('estoques',{
        url:'/estoques',
        templateUrl:'partials/estoque/estoques.html',
        controller:'EstoqueListController'
    }).state('saidas',{
        url:'/saidas',
        templateUrl:'partials/saida/saidas.html',
        controller:'SaidaListController'
    }).state('dres',{
        url:'/dres',
        templateUrl:'partials/dre/dres.html',
        controller:'DREListController'
    });
}).run(function($state){
   $state.go('caixas');
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
        "url": "http://localhost:3000/api"
    }).constant("Setting", {
            "metodo": "peps"
        });

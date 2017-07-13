var qsDataAnalysisApp = angular.module("qsDataAnalysisApp",[
    "ui.bootstrap",
    "ui.router",
    "ngResource",
    "ngAnimate"
]);
//


qsDataAnalysisApp.config(function($stateProvider, $urlRouterProvider,$httpProvider){

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"]="*";
    $httpProvider.defaults.headers.common["Content-Type"]="application/json";

    $stateProvider
        .state("ndt",{
            url:"/ndt",
            abstract:true,
            templateUrl:"views/commons/framework.html",
            controller:'frameworkerController'
        })

        .state('ndt.sccsMap', {
            url: "/sccsMap?type",
            templateUrl:basePath+"/views/pages/sccsMap.html",
            controller:'sccsMapController'
        })

        .state('ndt.scscProvince', {
            url: "/scscProvince/:name/:name1/:id",
            templateUrl:basePath+"/views/pages/scscProvince.html",
            controller:'qsScscProvinceController'
        })

    $urlRouterProvider.otherwise("/ndt/sccsMap");


});

qsDataAnalysisApp.run(function($rootScope, $urlRouter,$state) {
    $rootScope.$on('$locationChangeSuccess', function (evt,toState) {

    });
});

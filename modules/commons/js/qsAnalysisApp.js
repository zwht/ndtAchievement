var qsDataAnalysisApp = angular.module("qsDataAnalysisApp",[
    "ui.bootstrap",
    "ui.router",
    "ngAnimate",
    "ngStorage",
    "qs.utils"
]);
//

var chinaJsonMappings = [
    //中国
    {name:"中国",jsonName:"china"},
    //各省
    {name:"安徽",jsonName:"anhui"},
    //{name:"澳门",jsonName:"aomen"},
    {name:"重庆",jsonName:"chongqing"},
    {name:"北京",jsonName:"beijing"},
    {name:"福建",jsonName:"fujian"},
    {name:"甘肃",jsonName:"gansu"},
    {name:"广东",jsonName:"guangdong"},
    {name:"广西",jsonName:"guangxi"},
    {name:"贵州",jsonName:"guizhou"},
    {name:"海南",jsonName:"hainan"},
    {name:"河北",jsonName:"hebei"},
    {name:"黑龙江",jsonName:"heilongjiang"},
    {name:"河南",jsonName:"henan"},
    {name:"湖北",jsonName:"hubei"},
    {name:"湖南",jsonName:"hunan"},
    {name:"江苏",jsonName:"jiangsu"},
    {name:"江西",jsonName:"jiangxi"},
    {name:"吉林",jsonName:"jilin"},
    {name:"辽宁",jsonName:"liaoning"},
    {name:"内蒙古",jsonName:"neimenggu"},
    {name:"宁夏",jsonName:"ningxia"},
    {name:"青海",jsonName:"qinghai"},
    {name:"山东",jsonName:"shandong"},
    {name:"上海",jsonName:"shanghai"},
    {name:"山西",jsonName:"shanxi"},
    {name:"陕西",jsonName:"shanxi1"},
    {name:"四川",jsonName:"sichuan"},
    {name:"天津",jsonName:"tianjin"},
    {name:"香港",jsonName:"xianggang"},
    {name:"新疆",jsonName:"xinjiang"},
    {name:"西藏",jsonName:"xizang"},
    {name:"云南",jsonName:"yunnan"},
    {name:"浙江",jsonName:"zhejiang"},
];



qsDataAnalysisApp.config(function($stateProvider, $urlRouterProvider,$httpProvider){

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"]="*";
    $httpProvider.defaults.headers.common["Content-Type"]="application/json";

    $stateProvider
        .state("qs100",{
            url:"/qs100",
            abstract:true,
            templateUrl:"modules/commons/framework.html",
            controller:'frameworkerController'
        })

        .state('qs100.sccsMap', {
            url: "/sccsMap?type",
            templateUrl:basePath+"/modules/sccs/sccsMap-show.html"//,
            //controller:'qsSccsEchartsMapController'
        })

        .state('qs100.scscProvince', {
            url: "/scscProvince/:province",
            templateUrl:basePath+"/modules/sccs/scscProvince.html",
            controller:'qsScscProvinceController'
        })

    $urlRouterProvider.otherwise("/qs100/sccsMap?type=sccsMap");


    angular.forEach(chinaJsonMappings,function(jsonMapping){
        $.ajax({
            url:basePath+"/static/assets/echarts3/mapJson/"+jsonMapping.jsonName+".json",
            async:false,//设置请求为同步
            success:function(json){
                echarts.registerMap(jsonMapping.jsonName, json);
            }
        });
    });

});

qsDataAnalysisApp.run(function($rootScope, $urlRouter,$state) {
    $rootScope.$on('$locationChangeSuccess', function (evt,toState) {

        if(((toState.indexOf("/qs100/sccsMap"))!=-1)||
            ((toState.indexOf("/qs100/scscCompanyEventTimeline"))!=-1)||
            ((toState.indexOf("/qs100/scscInvestmentRelation"))!=-1)||
            ((toState.indexOf("/qs100/scscProvinceIndustryCompanycountTimeline"))!=-1)||
            ((toState.indexOf("/qs100/scscProvinceIndustryInvestmentTotalTimeline"))!=-1)||
            ((toState.indexOf("/qs100/chengDuMap"))!=-1)||
            ((toState.indexOf("/qs100/importQsscData"))!=-1)||
            ((toState.indexOf("/qs100/addQsscData"))!=-1)

        ){
            $rootScope.showRight2Popup = true;
            $rootScope.showLeft2Popup = false;
        }else{
            $rootScope.showRight2Popup = false;
            $rootScope.showLeft2Popup = true;
        }

        if((toState.indexOf("/qs100/sccsMap")!=-1)|| (toState.indexOf("/qs100/sccsAddQSTP")!=-1)|| (toState.indexOf("/qs100/sccsAddCompany")!=-1)|| (toState.indexOf("/qs100/sccsAddHatch")!=-1)){
            $rootScope.showGoAdd = true;
        }else{
            $rootScope.showGoAdd = false;
        }

    });
});

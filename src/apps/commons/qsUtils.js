var qsUtils = angular.module("qs.utils",["ng"]);

qsUtils.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, {$event: event});
            });
        });
    };
});

qsUtils.factory('ScscInstance', function(){
    return {};
});

qsUtils.filter("qsDateFormatter",['$sce',function($sce){
    return function(input,formatter){
        if(input){
            var temp = parseInt(input);
            var date = new Date(temp);
            return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
        }else{
            return "";
        }

    };
}]);


qsUtils.factory('GotoService',['$state',function($state){
    var goFunction = {
        gotoIncubator : function(incubator){
            console.log("gotoIncubator");
            $state.transitionTo("qs100.scscIncubatorDetail",{incubator:angular.toJson(incubator.name)});
        },
        gotoStPark : function(stPark){
            console.log("gotoStPark");
            $state.transitionTo("qs100.scscStParkDetail",{stPark:angular.toJson(stPark.name)});
        },
        gotoCompany : function(company){
            console.log("gotoCompany");
            $state.transitionTo("qs100.scscCompanyDetail",{company:angular.toJson(company.name)});
        },
        gotoCity : function(city){
            console.log("gotoCity");
            $state.transitionTo("qs100.scscCityDetail",{city:angular.toJson(city.name)});
        }
    };
    return  goFunction
}]);

qsUtils.factory("ComparisonManage",["$localStorage","$sessionStorage",function($localStorage,$sessionStorage){

    if(!$localStorage.ComparisonManage){
        $localStorage.ComparisonManage = {};
    }

    $localStorage.ComparisonManage ={
        provinceList:($localStorage.ComparisonManage.provinceList && $localStorage.ComparisonManage.provinceList.length>0)? _.uniqBy($localStorage.ComparisonManage.provinceList,'name'):[],
        cityList:($localStorage.ComparisonManage.cityList && $localStorage.ComparisonManage.cityList.length>0)?_.uniqBy($localStorage.ComparisonManage.cityList,'name'):[],
        stParkList:($localStorage.ComparisonManage.stParkList && $localStorage.ComparisonManage.stParkList.length>0)?_.uniqBy($localStorage.ComparisonManage.stParkList,'name'):[],
        incubatorList:($localStorage.ComparisonManage.incubatorList && $localStorage.ComparisonManage.incubatorList.length>0)?_.uniqBy($localStorage.ComparisonManage.incubatorList,'name'):[],
        companyList:($localStorage.ComparisonManage.companyList && $localStorage.ComparisonManage.companyList.length>0)?_.uniqBy($localStorage.ComparisonManage.companyList,'name'):[]
    };

    var operateFunctionSet = {
        getComparisonManage:function(){
            $localStorage.ComparisonManage.provinceList =  _.uniqBy($localStorage.ComparisonManage.provinceList,'name');
            $localStorage.ComparisonManage.cityList = _.uniqBy($localStorage.ComparisonManage.cityList,'name');
            $localStorage.ComparisonManage.stParkList = _.uniqBy($localStorage.ComparisonManage.stParkList,'name');
            $localStorage.ComparisonManage.incubatorList = _.uniqBy($localStorage.ComparisonManage.incubatorList,'name');
            $localStorage.ComparisonManage.companyList = _.uniqBy($localStorage.ComparisonManage.companyList,'name');
            return $localStorage.ComparisonManage;
        },
        addProvince:function(province){
            $localStorage.ComparisonManage.provinceList.push(province);
            $localStorage.ComparisonManage.provinceList = _.uniqBy($localStorage.ComparisonManage.provinceList,'name');
            return $localStorage.ComparisonManage;
        },
        addCity:function(city){
            $localStorage.ComparisonManage.cityList.push(city);
            $localStorage.ComparisonManage.cityList = _.uniqBy($localStorage.ComparisonManage.cityList,'name');
            return $localStorage.ComparisonManage;
        },
        addStPark:function(stPark){
            $localStorage.ComparisonManage.stParkList.push(stPark);
            $localStorage.ComparisonManage.stParkList =  _.uniqBy($localStorage.ComparisonManage.stParkList,'name');
            return $localStorage.ComparisonManage;
        },
        addIncubator:function(incubator){
            $localStorage.ComparisonManage.incubatorList.push(incubator);
            $localStorage.ComparisonManage.incubatorList =  _.uniqBy($localStorage.ComparisonManage.incubatorList,'name');
            return $localStorage.ComparisonManage;
        },
        addCompany:function(company){
            $localStorage.ComparisonManage.companyList.push(company);
            $localStorage.ComparisonManage.companyList = _.uniqBy($localStorage.ComparisonManage.companyList,'name');
            return $localStorage.ComparisonManage;
        }
    };

    return operateFunctionSet;

}]);

qsUtils.directive('qsDataGrid',["$http","$filter",function($http,$filter){
    return {
        restrict: 'EA',
        transclude: true,
        templateUrl:'modules/commons/tpl/qsDataGrid.html',
        replace : true,
        scope:{
            gridOption:"="
        },
        link:function($scope, $element, $attrs, $ctrl){

            $scope.colList = [];
            $scope.resultDataList = [];
            angular.forEach($scope.gridOption.colDef,function(col){
                $scope.colList.push(col["col"]);
            });

            $scope.dispalyPageCodeList = [];

            $scope.requestUrl = basePath+ $scope.gridOption.url;

            if($scope.requestUrl.indexOf("?")!=-1){
                $scope.requestUrl +="&";
            }else{
                $scope.requestUrl +="?";
            }

            $scope.requestData = function(pageCode,pageSize){
                $http.get($scope.requestUrl+"pageCode="+pageCode+"&pageSize="+pageSize).success(function (res) {
                    $scope.resultDataList = [];
                    $scope.dispalyPageCodeList = [];
                    if(res.state===0){
                        $scope.result = res.result.voList;

                        var itemArr;
                        angular.forEach($scope.result,function(row){
                            itemArr = [];
                            angular.forEach($scope.colList,function(col){
                                if(col.indexOf("Date")>-1){
                                    itemArr.push($filter("qsDateFormatter")(row[col]));
                                }else{
                                    itemArr.push(row[col]);
                                }

                            });
                            $scope.resultDataList.push({row:row,item:itemArr});
                        });

                        $scope.totalPage = res.result.totalPage;
                        $scope.currentPage = res.result.currentPage;
                        $scope.pageSize = res.result.pageSize;

                        $scope.dispalyPageCodeList = [];

                        if($scope.currentPage<5 && $scope.totalPage>5){
                            $scope.dispalyPageCodeList=[1,2,3,4,5];
                        }

                        if($scope.currentPage<5 && $scope.totalPage<=5){
                            for(var i=1;i<=$scope.totalPage;i++){
                                $scope.dispalyPageCodeList.push(i);
                            }
                        }

                        if($scope.currentPage>=5 && ($scope.totalPage-$scope.currentPage)>2){
                            for(var i=$scope.currentPage-2;i<=$scope.currentPage+2;i++){
                                $scope.dispalyPageCodeList.push(i);
                            }
                        }

                        if($scope.currentPage>=5 && ($scope.totalPage-$scope.currentPage)<=2){
                            for(var i=$scope.currentPage-2;i<=$scope.totalPage;i++){
                                $scope.dispalyPageCodeList.push(i);
                            }
                        }
                    }
                });
            };

            $scope.requestData(1,30);

        }
    }
}]);
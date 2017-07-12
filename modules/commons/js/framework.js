qsDataAnalysisApp.controller("frameworkerController",
    ["$scope","backTop", "$rootScope", "resize","$state", "$http", "$sce", "ScscInstance", "ComparisonManage", "$stateParams", "$location",
        function ($scope,backTop, $rootScope,resize, $state, $http, $sce, ScscInstance, ComparisonManage, $stateParams, $location) {

            $rootScope.bigTitle="农贷通-成果展示";
            //初始化回到顶部插件
            backTop.init();
            /**
             * 对比展示的初始化方法
             */
            $scope.init = function () {
                $scope.displayProvince = false;
                $scope.displayCity = false;
                $scope.displayStPark = false;
                $scope.displayIncubator = false;
                $scope.displayCompany = false;
                $scope.provinceList = [];
                $scope.cityList = [];
                $scope.stParkList = [];
                $scope.incubatorList = [];
                $scope.companyList = [];
            };

            $rootScope.coloeList=[
                {
                    fc:"#932",
                    lists:["#932","#d48265","#333"]
                },
                {
                    fc:"#61a0a8",
                    lists:["#b63600","#961600","#960600"]
                },
                {
                    fc:"#c4ccd3",
                    lists:["#382d2a","#182d2a","#386d2a"]
                },
                {
                    fc:"#d48265",
                    lists:["#8c003e","#6c003e","#8c303e"]
                },
                {
                    fc:"#2f4554",
                    lists:["#b50028","#700020","#950088"]
                },
                {
                    fc:"#ca8622",
                    lists:["#8b4d00","#8b2d00","#7b4d00"]
                },
                {
                    fc:"#749f83",
                    lists:["#005c24","#7d1540","#7d1529"]
                },
                {
                    fc:"#91c7ae",
                    lists:["#0556b1","#0536b1","#055691"]
                },
                {
                    fc:"#bda29a",
                    lists:["#00a44a","#90a44a","#30649a"]
                },
                {
                    fc:"#6e7074",
                    lists:["#6846a2","#2040a2","#604652"]
                }
            ]

            /**
             * 对DIV展示的控制入口
             * @param div
             */
            $scope.displayComparison = function (div) {
                var divName = div;
                $scope.displayName = div.display;
                $scope.init();
                if (divName == "province") {
                    $scope.displayProvince = true;
                    $scope.provinceList = _.uniqBy(ComparisonManage.getComparisonManage().provinceList, 'name');
                }
                if (divName == "city") {
                    $scope.displayCity = true;
                    $scope.cityList = _.uniqBy(ComparisonManage.getComparisonManage().cityList, 'name');
                }
                if (divName == "stPark") {
                    $scope.displayStPark = true;
                    $scope.stParkList = _.uniqBy(ComparisonManage.getComparisonManage().stParkList, 'name');
                }
                if (divName == "incubator") {
                    $scope.displayIncubator = true;
                    $scope.incubatorList = _.uniqBy(ComparisonManage.getComparisonManage().incubatorList, 'name');
                }
                if (divName == "company") {
                    $scope.displayCompany = true;
                    $scope.companyList = _.uniqBy(ComparisonManage.getComparisonManage().companyList, 'name');
                }
            };


            /**
             * 关闭DIV的控制方法
             * @param divName
             */
            $scope.closeComparison = function (divName) {
                if (divName == "province") {
                    $scope.displayProvince = false;
                }
                if (divName == "city") {
                    $scope.displayCity = false;
                }
                if (divName == "stPark") {
                    $scope.displayStPark = false;
                }
                if (divName == "incubator") {
                    $scope.displayIncubator = false;
                }
                if (divName == "company") {
                    $scope.displayCompany = false;
                }
            };




            $scope.selectCity = null;

            $scope.showCityDetail = function (city) {
                $scope.selectCity = city;
            };

            $scope.listMoreCities = function () {
                $state.transitionTo("qs100.scscCityRank");
            };

            $scope.gotoCity = function (city) {
                $state.transitionTo("qs100.scscCityDetail", {city: angular.toJson(city)});
            };

            $scope.qsPopupContent = "qsPopupContent.html";


            $scope.pageChange = "page2";
            var list = [
                {
                    url: "sccsMap"
                },
                {
                    url: "scscCompanyEventTimeline"
                },
                //{
                //    url: "scscInvestmentRelation"
                //},
                {
                    url: "scscProvinceIndustryCompanycountTimeline"
                },
                //{
                //    url: "scscProvinceIndustryInvestmentTotalTimeline"
                //},
               /* {
                    url: "chengDuMap"
                }*/
                //,
                //{
                //    url: "sccsInnovativeVenture"
                //}
            ];


            $scope.prev = function () {
                $scope.pageChange = "page2";
                getGoPage("prev");
            };
            $scope.next = function () {
                $scope.pageChange = "page3";
                getGoPage("next");
            }

            $rootScope.showChang = true;
            $scope.newPage = $location.search().type;
            function getGoPage(key) {
                $scope.newPage = $location.search().type;


                for (var i = 0; i < list.length; i++) {
                    if (list[i].url === $scope.newPage) {

                        if (key === "prev") {
                            if (i === 0) {
                                $scope.newPage = list[list.length - 1].url;
                            } else {
                                $scope.newPage = list[i - 1].url;
                            }
                        } else {
                            if (i === list.length - 1) {
                                $scope.newPage = list[0].url;
                            } else {
                                $scope.newPage = list[i + 1].url;
                            }
                        }
                        break;
                    }
                }

                $state.transitionTo("qs100." + $scope.newPage, {type: $scope.newPage});
            }

        }]);
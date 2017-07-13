qsDataAnalysisApp.controller("sccsMapController",
    ["$scope", "$http", "$rootScope", "$state", "ScscInstance",
        function ($scope, $http, $rootScope, $state, ScscInstance) {
            $rootScope.showChang = true;
            var mapChart;
            $rootScope.bigTitle = "农贷通-成果展示";

            $scope.goMap = function (name) {
                var newName = angular.toJson(name);
                $state.transitionTo("ndt.scscProvince", { province: newName });
            }



            $scope.toProvince = function (event) {
                moveTab(event);
                event.event.event.cancelBubble = false;
                event.event.event.stopPropagation();

            };

            function moveTab(event) {

                $scope.style02 = {
                    left: event.event.event.layerX + "px",
                    top: (event.event.event.layerY+98) + "px",
                    display: "block"
                };
                $scope.style03 = {
                    left: (event.event.event.layerX + 99) + "px",
                    top: (event.event.event.layerY + 99) + "px",
                    display: "block"
                };
                $scope.style01 = {
                    left: (event.event.event.layerX + 80) + "px",
                    top: (event.event.event.layerY + 118) + "px",
                    display: "block"
                };
                $scope.newData = event;
                //debugger;


                $scope.$apply();
            }

            //创建成都市地图
            function createMap() {
                var arr = [
                    {
                        name: "天府新区",
                        value: 3,
                        url: "510110"
                    },
                    {
                        name: "高新区",
                        value: 3,
                        url: "510199"
                    },

                    {
                        name: "双流区",
                        value: 3,
                        url: "510122"
                    },
                    {
                        name: "郫都区",
                        value: 3, url: "510124"
                    },
                    {
                        name: "青白江区",
                        value: 3,
                        url: "510113"
                    },
                    {
                        name: "龙泉驿区",
                        value: 3,
                        url: "510112"
                    },
                    {
                        name: "温江区",
                        value: 3,
                        url: "510115"
                    },
                    {
                        name: "新都区",
                        value: 3,
                        url: "510114"
                    },
                    {
                        name: "崇州市",
                        value: 3,
                        url: "510184"
                    },
                    {
                        name: "彭州市",
                        value: 3,
                        url: "510182"
                    },
                    {
                        name: "都江堰市",
                        value: 3,
                        url: "510181"
                    },

                    {
                        name: "邛崃市",
                        value: 3,
                        url: "510183"
                    },
                    {
                        name: "新津县",
                        value: 3,
                        url: "510132"
                    },
                    {
                        name: "蒲江县",
                        value: 3,
                        url: "510131"
                    },
                    {
                        name: "大邑县",
                        value: 3,
                        url: "510129"
                    },
                    {
                        name: "金堂县",
                        value: 3,
                        url: "510121"
                    },
                    {
                        name: "简阳市",
                        value: 3,
                        url: "510188"
                    },

                    {
                        name: "金牛区",
                        value: 1,
                        url: "510188"
                    },
                    {
                        name: "青羊区",
                        value: 2,
                        url: "510188"
                    },
                    {
                        name: "锦江区",
                        value: 3,
                        url: "510188"
                    },
                    {
                        name: "武侯区",
                        value: 3,
                        url: "510188"
                    },
                    {
                        name: "成华区",
                        value: 3,
                        url: "510188"
                    }
                ]
                var colors = [
                    "#f9f9f9",
                    "#fdf7e0",
                    "#f9d6f9",
                    "#fdf0e6",
                    "#f3f4f9",
                    "#f9f7e6",
                    "#fdf0e0",
                    "#fff"
                ]
                $.each(arr, function (index, item) {
                    var ind = index % colors.length;

                    item.itemStyle = {
                        normal: {
                            //areaColor:colors[ind],
                            areaColor: '#243d68',
                            //opacity:0.4,
                            borderWidth: 1,
                            borderColor: '#00083e'
                        },
                        emphasis: {
                            areaColor: "#f89367",
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 15,
                            shadowOffsetX: 10,
                            shadowOffsetY: 10
                        }
                    }
                    item.label = {
                        normal: {
                            textStyle: {
                                color: "#FFF",
                                fontSize: 13
                            }
                        },
                        emphasis: {
                            textStyle: {
                                fontWeight: "bold",
                                fontColor: "#fff",
                                fontSize: 20
                            }

                        }
                    }
                })

                //设置地图geoJson数据
                function setMapData(mapName, callBack) {
                    if (echarts.getMap(mapName)) {
                        callBack();
                        return;
                    }
                    $.getJSON('./static/datas/' + mapName + '.json', function (data) {
                        echarts.registerMap('chengdu', data);
                        callBack();
                    });
                }

                //创建地图类
                function zMap(mapName, dom, data) {
                    this.mapName = mapName;
                    this.chart = echarts.init(dom);
                    this.data = data;
                    this.time = 21;

                    this.chart.on("click", function (e) {
                        $(".tab-fore").hide();
                        if (e.seriesType == "map" && e.componentSubType == "map") {
                            $scope.toProvince(e);
                        }
                    });

                    var that = this;
                    setMapData(this.mapName, function () {
                        that.setOp()
                    });
                }

                zMap.prototype.setOp = function () {
                    var that = this;
                    setTimeout(function () {
                        if (that.time < that.data.length) {
                            that.time++
                            var newData = [];
                            for (var j = 0; j < that.time; j++) {
                                newData.push(that.data[j]);
                            }
                            that.chart.setOption({
                                /**tooltip: {
                                trigger: 'item'
                            },*/
                                animation: true,

                                series: [{
                                    name: "test",
                                    type: 'map',
                                    map: 'chengdu',
                                    roam: false,
                                    zoom: 1,
                                    scaleLimit: {
                                        max: 2,
                                        min: 1
                                    },
                                    label: {

                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            //borderWidth: 0
                                        }
                                    },
                                    data: newData
                                }]
                            });
                            that.setOp();
                        }
                    }, 100)
                }

                new zMap("chengdu", $('#mainChart')[0], arr);
            }

            createMap();

            document.onclick = function () {
                $scope.style03 = $scope.style02 = $scope.style01 = { display: "none" };

                $scope.$apply();
            }
        }]);
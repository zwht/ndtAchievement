qsDataAnalysisApp.controller("sccsMapController",
    ["$scope", "$http", "$rootScope", "$state", "chartService",
        function ($scope, $http, $rootScope, $state, chartService) {
            $rootScope.showChang = true;
            var mapChart;
            $rootScope.bigTitle = "农贷通-成果展示";
            intMap1();
            intMap2();
            createMap();



            $scope.goMap = function (data) {
                $state.transitionTo("ndt.scscProvince", { name: data.name,name1:data.name1,id:data.id });
            }

            $scope.toProvince = function (event) {
                moveTab(event);
                event.event.event.cancelBubble = false;
                event.event.event.stopPropagation();

            };

            function moveTab(event) {

                $scope.style02 = {
                    left: event.event.event.layerX + "px",
                    top: (event.event.event.layerY) + "px",
                    display: "block"
                };
                $scope.style03 = {
                    left: (event.event.event.layerX + 99) + "px",
                    top: (event.event.event.layerY + 1) + "px",
                    display: "block"
                };
                $scope.style01 = {
                    left: (event.event.event.layerX + 80) + "px",
                    top: (event.event.event.layerY + 20) + "px",
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
                        name1:"tianfu",
                        value: 3,
                        url: "510110"
                    },
                    {
                        name: "高新区",
                        name1:"gaoxin",
                        value: 3,
                        url: "510199"
                    },

                    {
                        name: "双流区",
                        name1:"shuangliu",
                        value: 3,
                        url: "510122"
                    },
                    {
                        name: "郫都区",
                        name1:"pidu",
                        value: 3,
                         url: "510124"
                    },
                    {
                        name: "青白江区",
                        name1:"qingbai",
                        value: 3,
                        url: "510113"
                    },
                    {
                        name: "龙泉驿区",
                        name1:"longquan",
                        value: 3,
                        url: "510112"
                    },
                    {
                        name: "温江区",
                        name1:"wenjiang",
                        value: 3,
                        url: "510115"
                    },
                    {
                        name: "新都区",
                        name1:"xindu",
                        value: 3,
                        url: "510114"
                    },
                    {
                        name: "崇州市",
                        name1:"chonzhou",
                        value: 3,
                        url: "510184"
                    },
                    {
                        name: "彭州市",
                        name1:"pengzhou",
                        value: 3,
                        url: "510182"
                    },
                    {
                        name: "都江堰市",
                        name1:"dujiang",
                        value: 3,
                        url: "510181"
                    },

                    {
                        name: "邛崃市",
                        name1:"qionglai",
                        value: 3,
                        url: "510183"
                    },
                    {
                        name: "新津县",
                        name1:"xinjin",
                        value: 3,
                        url: "510132"
                    },
                    {
                        name: "蒲江县",
                        name1:"pujiang",
                        value: 3,
                        url: "510131"
                    },
                    {
                        name: "大邑县",
                        name1:"daba",
                        value: 3,
                        url: "510129"
                    },
                    {
                        name: "金堂县",
                        name1:"jintang",
                        value: 3,
                        url: "510121"
                    },
                    {
                        name: "简阳市",
                        name1:"jianyang",
                        value: 3,
                        url: "510188"
                    },

                    {
                        name: "金牛区",
                        name1:"jingniu",
                        value: 1,
                        url: "510188"
                    },
                    {
                        name: "青羊区",
                        name1:"qingyang",
                        value: 2,
                        url: "510188"
                    },
                    {
                        name: "锦江区",
                        name1:"jinjiang",
                        value: 3,
                        url: "510188"
                    },
                    {
                        name: "武侯区",
                        name1:"wuhou",
                        value: 3,
                        url: "510188"
                    },
                    {
                        name: "成华区",
                        name1:"chenghua",
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



            document.onclick = function () {
                $scope.style03 = $scope.style02 = $scope.style01 = { display: "none" };

                $scope.$apply();
            }


            function intMap2() {
                getData('lendingSum', function (data1) {

                    debugger
                })
                var jiaoyiTJ = echarts.init(document.getElementById('chart1'));
                var jyOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    grid: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },

                    series: [{
                        name: '今日交易',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [{
                            value: 335,
                            name: '农业'
                        }, {
                            value: 310,
                            name: '牧业'
                        }, {
                            value: 234,
                            name: '畜业'
                        }, {
                            value: 135,
                            name: '林业'
                        }, {
                            value: 1548,
                            name: '其他'
                        }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal: {
                                label: {
                                    show: true,
                                    formatter: '{b}:{c}'
                                },
                                labelLine: {
                                    show: true
                                }
                            }
                        }
                    }]
                }
                jiaoyiTJ.setOption(jyOption);


            }

            function intMap1() {
                getData('lendingAmt', function (data1) {
                    var xData = [];
                    var data = [];
                    for (item in data1.data[0].keyvalues) {
                        xData.push(item);
                        data.push(data1.data[0].keyvalues[item])
                    }
                    var LeiJiXM = echarts.init(document.getElementById('chart2'));

                    var ljOption = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },

                        grid: {
                            left: '1%',
                            right: '1%',
                            bottom: '4%',
                            top: '4%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: xData,
                            axisLabel: {
                                textStyle: {
                                    color: "#fff"
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                        series: [{
                            name: '放款金额',
                            type: 'bar',
                            data: data
                        }]
                    };
                    LeiJiXM.setOption(ljOption);
                })

            }


            function getData(type, call) {
                chartService.getChartData({}, { type: type },
                    function (data) {
                        call(data);
                    }, function (err) {

                    });
            }
        }]);

function setValueUnite(v) {
    var cs = 1, unit = "";
    switch (type) {
        case 4:
            cs = 10000;
            unit = '万';
            break;
        case 5:
            cs = 100000;
            unit = '十万';
            break;
        case 6:
            cs = 1000000;
            unit = '百万';
            break;
        case 7:
            cs = 10000000;
            unit = '千万';
            break;
        case 8:
            cs = 100000000;
            unit = '亿';
            break;
    }
    if (v == '中文') {
        return unit;
    } else {
        return parseFloat(v) / cs;
    }

}
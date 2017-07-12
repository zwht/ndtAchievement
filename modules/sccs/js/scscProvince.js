qsDataAnalysisApp.controller("qsScscProvinceController",
    ["$scope", "$location", "$state", "$http", "$stateParams", "GotoService", "ComparisonManage", "$rootScope",
        function ($scope, $location, $state, $http, $stateParams, GotoService, ComparisonManage, $rootScope) {

            $scope.pageClass = "scscProvincePage";

            $rootScope.bigTitle = $scope.province = angular.fromJson($stateParams.province);

            console.log(angular.fromJson($stateParams.province))
            intMap();
            intMap1();
            intMap2();
            intMap3();
            intMap4();
            intMap5();
            intMap6();




            function intMap() {
                $.getJSON('./modules/sccs/js/' + 'qingyang' + '.json', function (data) {
                    echarts.registerMap('qingyang', data);


                    var chart=echarts.init($('#provinceMap')[0]);

                    chart.setOption({
                        /**tooltip: {
                        trigger: 'item'
                    },*/
                        animation: true,

                        series: [{
                            name: "test",
                            type: 'map',
                            map: 'qingyang',
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
                            //data: newData
                        }]
                    })
                });


            }

            function intMap1() {
                // 图表1
                // 基于准备好的dom，初始化echarts实例
                var RongZiZE = echarts.init(document.getElementById('chart1'));    // 指定图表的配置项和数据
                var rzOption = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{c}万元'
                    },

                    xAxis: [{
                        type: 'category',
                        data: ['银行贷款', '股权投资', '金融投资', '债券投资'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#fff"
                            }
                        }

                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:false
                        }
                    }],
                    series: [{
                        name: '投资金额',
                        type: 'bar',
                        barWidth: '60%',
                        data: [2800, 1600, 600, 1000],

                    }]
                };
                RongZiZE.setOption(rzOption);
            }

            function intMap2() {
                var LeiJiXM = echarts.init(document.getElementById('chart2'));

                var ljOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['重点项目', '补贴项目', '申请融资项目', '融资成功项目'],
                        top: '0'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月'],
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
                        splitLine:{
                            show:false
                        }
                    }],
                    series: [{
                        name: '重点项目',
                        type: 'bar',
                        data: [320, 332, 301, 334]
                    }, {
                        name: '补贴项目',
                        type: 'bar',
                        data: [120, 132, 101, 134]
                    }, {
                        name: '申请融资项目',
                        type: 'bar',
                        data: [220, 182, 191, 234]
                    }, {
                        name: '融资成功项目',
                        type: 'bar',
                        data: [150, 232, 201, 154]
                    }]
                };
                LeiJiXM.setOption(ljOption);
            }

            function intMap3() {
                var jiaoyiTJ = echarts.init(document.getElementById('chart3'));
                var jyOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        bottom: 0,
                        data: ['农业', '牧业', '畜业', '林业', '其他'],
                        tooltip: {
                            show: true,
                            formatter: '{c}aaa'
                        }
                    },
                    series: [{
                        name: '今日交易',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
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

            function intMap4() {
                var dk = echarts.init(document.getElementById('chart4'));
                var dkOption = {
                    color: ['#ff88e9'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{c}万元'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['农业', '牧业', '林业', '渔业', '其他'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:false
                        }
                    }],
                    series: [{
                        name: '贷款金额',
                        type: 'bar',
                        barWidth: '60%',
                        data: [800, 600, 1300, 90, 1340],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: '{c} 万'
                            }
                        }
                    }]
                };

                dk.setOption(dkOption);
            }

            function intMap5() {
                var fk = echarts.init(document.getElementById('chart5'));
                var fkOption = {
                    color: ['#d48265'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{c}万元'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['人民银行', '农业银行', '工商银行', '建设银行', '中国银行'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:false
                        }
                    }],
                    series: [{
                        name: '放款金额',
                        type: 'bar',
                        barWidth: '60%',
                        data: [200, 900, 1100, 560, 230],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: '{c} 万'
                            }
                        }
                    }]
                };

                fk.setOption(fkOption);
            }

            function intMap6() {
                var fk1 = echarts.init(document.getElementById('chart6'));
                var fk1Option = {
                    color: ['#2f4554'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: '{c}万元'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['彭州', '崇州', '都江堰', '新津', '新都'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#fff"
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 万',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        splitLine:{
                            show:false
                        }
                    }],
                    series: [{
                        name: '贷款金额',
                        type: 'bar',
                        barWidth: '60%',
                        data: [200, 1200, 890, 346, 842],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: '{c} 万'
                            }
                        }
                    }]
                };

                fk1.setOption(fk1Option);
            }

        }]);
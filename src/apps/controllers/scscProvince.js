qsDataAnalysisApp.controller("qsScscProvinceController",
    ["$scope",  "chartService", "$stateParams", "$rootScope",
        function ($scope,  chartService, $stateParams, $rootScope) {

            $scope.pageClass = "scscProvincePage";

            $rootScope.bigTitle = $stateParams.name;
            $scope.mane1 = $stateParams.name1
            $scope.id = $stateParams.id

            initChart();
            initChart1();
            initChart2();
            initChart3();
            initChart4();
            initChart5();
            initChart6();
            initChart7();
            initChart8();
            initChart9();
            initChart10();
            initChart11();
            initChart12();
            initChart13();
            initChart14();




            function initChart() {
                $.getJSON('./static/datas/' + $scope.mane1 + '.json', function (data) {
                    echarts.registerMap($scope.mane1, data);


                    var chart = echarts.init($('#provinceMap')[0]);

                    chart.setOption({
                        /**tooltip: {
                        trigger: 'item'
                    },*/
                        animation: true,

                        series: [{
                            name: "test",
                            type: 'map',
                            map: $scope.mane1,
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

            function initChart1() {
                getData('lendingAmt', function (data1) {
//debugger
                    var xData = [];
                    for (item in data1.data[0].keyvalues) {
                        xData.push({ value: data1.data[0].keyvalues[item], name: item });
                    }


                    var option = {

                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        series: [
                            {
                                name: '放款总数',
                                type: 'pie',

                                radius: ['60%', '80%'],
                                center: ['50%', '50%'],
                                data: xData
                            }
                        ]
                    };

                    var chart = echarts.init(document.getElementById('chart1'));
                    chart.setOption(option);
                })
                
            }

            function initChart2() {
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
                        splitLine: {
                            show: false
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

            function initChart3() {
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

            function initChart4() {
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
                        splitLine: {
                            show: false
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

            function initChart5() {
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
                        splitLine: {
                            show: false
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

            function initChart6() {
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
                        splitLine: {
                            show: false
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

            function initChart7() {
                var dataBJ = [
                    [1, 55, 9, 56, 0.46, 18, 6, "良"],
                    [2, 25, 11, 21, 0.65, 34, 9, "优"],
                    [3, 56, 7, 63, 0.3, 14, 5, "良"],
                    [4, 33, 7, 29, 0.33, 16, 6, "优"],
                    [5, 42, 24, 44, 0.76, 40, 16, "优"],
                    [6, 82, 58, 90, 1.77, 68, 33, "良"],
                    [7, 74, 49, 77, 1.46, 48, 27, "良"],
                    [8, 78, 55, 80, 1.29, 59, 29, "良"],
                    [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
                    [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
                    [11, 39, 19, 38, 0.57, 31, 15, "优"],
                    [12, 41, 11, 40, 0.43, 21, 7, "优"],
                    [13, 64, 38, 74, 1.04, 46, 22, "良"],
                    [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
                    [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
                    [16, 33, 6, 29, 0.34, 13, 5, "优"],
                    [17, 94, 66, 110, 1.54, 62, 31, "良"],
                    [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
                    [19, 57, 31, 54, 0.96, 32, 14, "良"],
                    [20, 22, 8, 17, 0.48, 23, 10, "优"],
                    [21, 39, 15, 36, 0.61, 29, 13, "优"],
                    [22, 94, 69, 114, 2.08, 73, 39, "良"],
                    [23, 99, 73, 110, 2.43, 76, 48, "良"],
                    [24, 31, 12, 30, 0.5, 32, 16, "优"],
                    [25, 42, 27, 43, 1, 53, 22, "优"],
                    [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
                    [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
                    [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
                    [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
                    [30, 52, 24, 60, 1.03, 50, 21, "良"],
                    [31, 46, 5, 49, 0.28, 10, 6, "优"]
                ];

                var dataGZ = [
                    [1, 26, 37, 27, 1.163, 27, 13, "优"],
                    [2, 85, 62, 71, 1.195, 60, 8, "良"],
                    [3, 78, 38, 74, 1.363, 37, 7, "良"],
                    [4, 21, 21, 36, 0.634, 40, 9, "优"],
                    [5, 41, 42, 46, 0.915, 81, 13, "优"],
                    [6, 56, 52, 69, 1.067, 92, 16, "良"],
                    [7, 64, 30, 28, 0.924, 51, 2, "良"],
                    [8, 55, 48, 74, 1.236, 75, 26, "良"],
                    [9, 76, 85, 113, 1.237, 114, 27, "良"],
                    [10, 91, 81, 104, 1.041, 56, 40, "良"],
                    [11, 84, 39, 60, 0.964, 25, 11, "良"],
                    [12, 64, 51, 101, 0.862, 58, 23, "良"],
                    [13, 70, 69, 120, 1.198, 65, 36, "良"],
                    [14, 77, 105, 178, 2.549, 64, 16, "良"],
                    [15, 109, 68, 87, 0.996, 74, 29, "轻度污染"],
                    [16, 73, 68, 97, 0.905, 51, 34, "良"],
                    [17, 54, 27, 47, 0.592, 53, 12, "良"],
                    [18, 51, 61, 97, 0.811, 65, 19, "良"],
                    [19, 91, 71, 121, 1.374, 43, 18, "良"],
                    [20, 73, 102, 182, 2.787, 44, 19, "良"],
                    [21, 73, 50, 76, 0.717, 31, 20, "良"],
                    [22, 84, 94, 140, 2.238, 68, 18, "良"],
                    [23, 93, 77, 104, 1.165, 53, 7, "良"],
                    [24, 99, 130, 227, 3.97, 55, 15, "良"],
                    [25, 146, 84, 139, 1.094, 40, 17, "轻度污染"],
                    [26, 113, 108, 137, 1.481, 48, 15, "轻度污染"],
                    [27, 81, 48, 62, 1.619, 26, 3, "良"],
                    [28, 56, 48, 68, 1.336, 37, 9, "良"],
                    [29, 82, 92, 174, 3.29, 0, 13, "良"],
                    [30, 106, 116, 188, 3.628, 101, 16, "轻度污染"],
                    [31, 118, 50, 0, 1.383, 76, 11, "轻度污染"]
                ];

                var dataSH = [
                    [1, 91, 45, 125, 0.82, 34, 23, "良"],
                    [2, 65, 27, 78, 0.86, 45, 29, "良"],
                    [3, 83, 60, 84, 1.09, 73, 27, "良"],
                    [4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
                    [5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
                    [6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
                    [7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
                    [8, 89, 65, 78, 0.86, 51, 26, "良"],
                    [9, 53, 33, 47, 0.64, 50, 17, "良"],
                    [10, 80, 55, 80, 1.01, 75, 24, "良"],
                    [11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
                    [12, 99, 71, 142, 1.1, 62, 42, "良"],
                    [13, 95, 69, 130, 1.28, 74, 50, "良"],
                    [14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
                    [15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
                    [16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
                    [17, 79, 43, 107, 1.05, 59, 37, "良"],
                    [18, 71, 46, 89, 0.86, 64, 25, "良"],
                    [19, 97, 71, 113, 1.17, 88, 31, "良"],
                    [20, 84, 57, 91, 0.85, 55, 31, "良"],
                    [21, 87, 63, 101, 0.9, 56, 41, "良"],
                    [22, 104, 77, 119, 1.09, 73, 48, "轻度污染"],
                    [23, 87, 62, 100, 1, 72, 28, "良"],
                    [24, 168, 128, 172, 1.49, 97, 56, "中度污染"],
                    [25, 65, 45, 51, 0.74, 39, 17, "良"],
                    [26, 39, 24, 38, 0.61, 47, 17, "优"],
                    [27, 39, 24, 39, 0.59, 50, 19, "优"],
                    [28, 93, 68, 96, 1.05, 79, 29, "良"],
                    [29, 188, 143, 197, 1.66, 99, 51, "中度污染"],
                    [30, 174, 131, 174, 1.55, 108, 50, "中度污染"],
                    [31, 187, 143, 201, 1.39, 89, 53, "中度污染"]
                ];

                var schema = [
                    { name: 'date', index: 0, text: '日' },
                    { name: 'AQIindex', index: 1, text: 'AQI指数' },
                    { name: 'PM25', index: 2, text: 'PM2.5' },
                    { name: 'PM10', index: 3, text: 'PM10' },
                    { name: 'CO', index: 4, text: '一氧化碳（CO）' },
                    { name: 'NO2', index: 5, text: '二氧化氮（NO2）' },
                    { name: 'SO2', index: 6, text: '二氧化硫（SO2）' }
                ];


                var itemStyle = {
                    normal: {
                        opacity: 0.8,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                };

                var option = {
                    //backgroundColor: '#404a59',
                    color: [
                        '#dd4444', '#fec42c', '#80F1BE'
                    ],
                    legend: {
                        y: 'top',
                        data: ['北京', '上海', '广州'],
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        }
                    },
                    grid: {
                        x: '10%',
                        x2: 150,
                        y: '18%',
                        y2: '10%'
                    },
                    tooltip: {
                        padding: 10,
                        backgroundColor: '#222',
                        borderColor: '#777',
                        borderWidth: 1,
                        formatter: function (obj) {
                            var value = obj.value;
                            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                                + obj.seriesName + ' ' + value[0] + '日：'
                                + value[7]
                                + '</div>'
                                + schema[1].text + '：' + value[1] + '<br>'
                                + schema[2].text + '：' + value[2] + '<br>'
                                + schema[3].text + '：' + value[3] + '<br>'
                                + schema[4].text + '：' + value[4] + '<br>'
                                + schema[5].text + '：' + value[5] + '<br>'
                                + schema[6].text + '：' + value[6] + '<br>';
                        }
                    },
                    xAxis: {
                        type: 'value',
                        name: '日期',
                        nameGap: 16,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14
                        },
                        max: 31,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#eee'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: 'AQI指数',
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#eee'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    visualMap: [
                        {
                            left: 'right',
                            top: '10%',
                            dimension: 2,
                            min: 0,
                            max: 250,
                            itemWidth: 30,
                            itemHeight: 120,
                            calculable: true,
                            precision: 0.1,
                            text: ['圆形大小：PM2.5'],
                            textGap: 30,
                            textStyle: {
                                color: '#fff'
                            },
                            inRange: {
                                symbolSize: [10, 70]
                            },
                            outOfRange: {
                                symbolSize: [10, 70],
                                color: ['rgba(255,255,255,.2)']
                            },
                            controller: {
                                inRange: {
                                    color: ['#c23531']
                                },
                                outOfRange: {
                                    color: ['#444']
                                }
                            }
                        },
                        {
                            left: 'right',
                            bottom: '5%',
                            dimension: 6,
                            min: 0,
                            max: 50,
                            itemHeight: 120,
                            calculable: true,
                            precision: 0.1,
                            text: ['明暗：二氧化硫'],
                            textGap: 30,
                            textStyle: {
                                color: '#fff'
                            },
                            inRange: {
                                colorLightness: [1, 0.5]
                            },
                            outOfRange: {
                                color: ['rgba(255,255,255,.2)']
                            },
                            controller: {
                                inRange: {
                                    color: ['#c23531']
                                },
                                outOfRange: {
                                    color: ['#444']
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '北京',
                            type: 'scatter',
                            itemStyle: itemStyle,
                            data: dataBJ
                        },
                        {
                            name: '上海',
                            type: 'scatter',
                            itemStyle: itemStyle,
                            data: dataSH
                        },
                        {
                            name: '广州',
                            type: 'scatter',
                            itemStyle: itemStyle,
                            data: dataGZ
                        }
                    ]
                };
                var fk1 = echarts.init(document.getElementById('chart7'));
                fk1.setOption(option);

            }

            function initChart8() {
                var option = option = {
                    title: {
                        text: '某地区蒸发量和降水量',
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['蒸发量', '降水量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '蒸发量',
                            type: 'bar',
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: '平均值' }
                                ]
                            }
                        },
                        {
                            name: '降水量',
                            type: 'bar',
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                            markPoint: {
                                data: [
                                    { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                                    { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: '平均值' }
                                ]
                            }
                        }
                    ]
                };



                var fk1 = echarts.init(document.getElementById('chart8'));
                fk1.setOption(option);
            }

            function initChart9() {
                var option = {
                    angleAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        z: 10
                    },
                    radiusAxis: {
                    },
                    polar: {
                    },
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['A', 'B', 'C']
                    }
                };

                var fk1 = echarts.init(document.getElementById('chart9'));
                fk1.setOption(option);
            }
            function initChart10() {
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: 335, name: '直达', selected: true },
                                { value: 679, name: '营销广告' },
                                { value: 1548, name: '搜索引擎' }
                            ]
                        },
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '55%'],

                            data: [
                                { value: 335, name: '直达' },
                                { value: 310, name: '邮件营销' },
                                { value: 234, name: '联盟广告' },
                                { value: 135, name: '视频广告' },
                                { value: 1048, name: '百度' },
                                { value: 251, name: '谷歌' },
                                { value: 147, name: '必应' },
                                { value: 102, name: '其他' }
                            ]
                        }
                    ]
                };
                var fk1 = echarts.init(document.getElementById('chart10'));
                fk1.setOption(option);
            }
            function initChart11() {
                var option = {
                    title: {
                        text: '基础雷达图'
                    },
                    tooltip: {},
                    legend: {
                        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: [
                            { name: '销售（sales）', max: 6500 },
                            { name: '管理（Administration）', max: 16000 },
                            { name: '信息技术（Information Techology）', max: 30000 },
                            { name: '客服（Customer Support）', max: 38000 },
                            { name: '研发（Development）', max: 52000 },
                            { name: '市场（Marketing）', max: 25000 }
                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [4300, 10000, 28000, 35000, 50000, 19000],
                                name: '预算分配（Allocated Budget）'
                            },
                            {
                                value: [5000, 14000, 28000, 31000, 42000, 21000],
                                name: '实际开销（Actual Spending）'
                            }
                        ]
                    }]
                };
                var fk1 = echarts.init(document.getElementById('chart11'));
                fk1.setOption(option);
            }
            function initChart12() {
                var option = {
                    title: {
                        text: '漏斗图',
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: ['展现', '点击', '访问', '咨询', '订单']
                    },
                    calculable: true,
                    series: [
                        {
                            name: '漏斗图',
                            type: 'funnel',
                            left: '10%',
                            top: 60,
                            //x2: 80,
                            bottom: 60,
                            width: '80%',
                            // height: {totalHeight} - y - y2,
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                },
                                emphasis: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 10,
                                    lineStyle: {
                                        width: 1,
                                        type: 'solid'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                            },
                            data: [
                                { value: 60, name: '访问' },
                                { value: 40, name: '咨询' },
                                { value: 20, name: '订单' },
                                { value: 80, name: '点击' },
                                { value: 100, name: '展现' }
                            ]
                        }
                    ]
                };

                var fk1 = echarts.init(document.getElementById('chart12'));
                fk1.setOption(option);
            }

            function initChart13() {
                // Generate data
                var category = [];
                var dottedBase = +new Date();
                var lineData = [];
                var barData = [];

                for (var i = 0; i < 20; i++) {
                    var date = new Date(dottedBase += 3600 * 24 * 1000);
                    category.push([
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                    ].join('-'));
                    var b = Math.random() * 200;
                    var d = Math.random() * 200;
                    barData.push(b)
                    lineData.push(d + b);
                }


                // option
                var option = {
                    backgroundColor: '#0f375f',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['line', 'bar'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    xAxis: {
                        data: category,
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    yAxis: {
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{
                        name: 'line',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 15,
                        data: lineData
                    }, {
                        name: 'bar',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#14c8d4' },
                                        { offset: 1, color: '#43eec6' }
                                    ]
                                )
                            }
                        },
                        data: barData
                    }, {
                        name: 'line',
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: 'rgba(20,200,212,0.5)' },
                                        { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                                        { offset: 1, color: 'rgba(20,200,212,0)' }
                                    ]
                                )
                            }
                        },
                        z: -12,
                        data: lineData
                    }, {
                        name: 'dotted',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        itemStyle: {
                            normal: {
                                color: '#0f375f'
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: [12, 4],
                        symbolMargin: 1,
                        z: -10,
                        data: lineData
                    }]
                };

                var fk1 = echarts.init(document.getElementById('chart13'));
                fk1.setOption(option);
            }
            function initChart14() {
                var cellSize = [80, 80];
                var pieRadius = 30;

                function getVirtulData() {
                    var date = +echarts.number.parseDate('2017-02-01');
                    var end = +echarts.number.parseDate('2017-03-01');
                    var dayTime = 3600 * 24 * 1000;
                    var data = [];
                    for (var time = date; time < end; time += dayTime) {
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            Math.floor(Math.random() * 10000)
                        ]);
                    }
                    return data;
                }

                function getPieSeries(scatterData, chart) {
                    return echarts.util.map(scatterData, function (item, index) {
                        var center = chart.convertToPixel('calendar', item);
                        return {
                            id: index + 'pie',
                            type: 'pie',
                            center: center,
                            label: {
                                normal: {
                                    formatter: '{c}',
                                    position: 'inside'
                                }
                            },
                            radius: pieRadius,
                            data: [
                                { name: '工作', value: Math.round(Math.random() * 24) },
                                { name: '娱乐', value: Math.round(Math.random() * 24) },
                                { name: '睡觉', value: Math.round(Math.random() * 24) }
                            ]
                        };
                    });
                }

                function getPieSeriesUpdate(scatterData, chart) {
                    return echarts.util.map(scatterData, function (item, index) {
                        var center = chart.convertToPixel('calendar', item);
                        return {
                            id: index + 'pie',
                            center: center
                        };
                    });
                }

                var scatterData = getVirtulData();

                var option = {
                    tooltip: {},
                    legend: {
                        data: ['工作', '娱乐', '睡觉'],
                        bottom: 20
                    },
                    calendar: {
                        top: 'middle',
                        left: 'center',
                        orient: 'vertical',
                        cellSize: cellSize,
                        yearLabel: {
                            show: false,
                            textStyle: {
                                fontSize: 30
                            }
                        },
                        dayLabel: {
                            margin: 20,
                            firstDay: 1,
                            nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                        },
                        monthLabel: {
                            show: false
                        },
                        range: ['2017-02']
                    },
                    series: [{
                        id: 'label',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return echarts.format.formatTime('dd', params.value[0]);
                                },
                                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                                textStyle: {
                                    color: '#000',
                                    fontSize: 14
                                }
                            }
                        },
                        data: scatterData
                    }]
                };

        

                var fk1 = echarts.init(document.getElementById('chart14'));
                fk1.setOption(option);
            }
            function initChart15() {


                var fk1 = echarts.init(document.getElementById('chart15'));
                fk1.setOption(option);
            }
            function initChart16() {


                var fk1 = echarts.init(document.getElementById('chart16'));
                fk1.setOption(option);
            }


            function getData(type, call) {
                chartService.getChartData({}, { type: type },
                    function (data) {
                        call(data);
                    }, function (err) {

                    });
            }
        }]);
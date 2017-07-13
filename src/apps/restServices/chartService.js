qsDataAnalysisApp.factory('chartService', ['$resource', function ($resource) {
    return $resource('city/api/:param1/:param2/:param3/:param4/:param5', {}, {

        getChartData: {
            method: 'POST',
            params: { param1: 'statistics', param2: "queryTopStatistics" },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: transformRequest
        }
    })
}])
function transformRequest(data, headersGetter) {
    var str = [];
    for (var d in data) {
        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
    return str.join("&");
}



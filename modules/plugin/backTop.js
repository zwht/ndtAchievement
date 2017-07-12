

qsDataAnalysisApp.provider("resize", resizeProvider);

function resizeProvider() {
    var last;
    this.$get = ["$rootScope", "$window", "$document", function ($rootScope, $window, $document) {

        $window.onresize = function () {
            $rootScope.$broadcast("resize", document.body.clientWidth);
        };

        $window.onscroll = document.body.onscroll=document.getElementById("page-container").onscroll = function () {
            $rootScope.$broadcast("scroll", document.body.clientWidth);

        };



        /*setInterval(function(){
         if(last!==document.body.clientWidth){

         trigger();
         }
         last=document.body.clientWidth;
         },100);
         var tiggerTimeout;
         function trigger(){
         clearTimeout(tiggerTimeout);
         tiggerTimeout=setTimeout(function(){
         $rootScope.$broadcast("resize",document.body.clientWidth);
         },300);
         }
         */
    }];
}
qsDataAnalysisApp.provider("backTop", backTop);


function backTop() {
    this.$get = ["$rootScope",function ($rootScope) {

        var img  = angular.element("<img src='static/qsassets/qsstyle/images/rocket.png'/>");
        var img1 = angular.element("<img class='img1' src='static/qsassets/qsstyle/images/rocket.gif'/>");
        var oTop = angular.element("<div id='backTop'></div>");
        var root = angular.element(document.body).css("position", "relative");

        var createBackTop  = {};
        createBackTop.init = function () {

            //判断页面是否有id为backTop的标签，是就删除掉
            if (document.getElementById("backTop")) document.getElementById("backTop").remove();

            oTop.append(img);
            oTop.append(img1);
            root.append(oTop);

            var windowWidth=document.body.clientWidth||window.innerWidth;
            //底部高度
            var marginBottom=30;
            if(windowWidth<768) marginBottom=35;
            oTop.css({bottom: marginBottom+"px"});

            $rootScope.$on("scroll",pageScroll);
            function pageScroll(){
                var scrolltop=document.getElementById("page-container").scrollTop || document.body.scrollTop;
                oTop.css({bottom: marginBottom+"px"});
                if(scrolltop>400){
                    oTop.css({display:"block"});
                }else{
                    oTop.css({display:"none"});
                }
            }


            var c = 1, bottom=marginBottom;
            oTop[0].onclick = function () {
                var screenh = (document.documentElement.clientHeight || document.body.clientHeight)-100;
                img.css({display: "none"});
                img1.css({display: "block"});


                var time = setInterval(function () {
                    bottom+=c;
                    c+=10;
                    oTop.css({bottom: bottom + "px"});
                    if (screenh < bottom) {
                        clearInterval(time);
                        oTop.css({display: "none"});
                        document.getElementById("page-container").scrollTop  = 0;
                        img.css({display: "block"});
                        img1.css({display: "none"});
                        c = 1;
                        bottom=marginBottom;
                    }
                }, 41);
            };
            oTop[0].onmouseover=function(){
                img.css({display: "none"});
                img1.css({display: "block"});
            };
            oTop[0].onmouseout=function(){
                img.css({display: "block"});
                img1.css({display: "none"});
            };
        };
        return createBackTop;
    }];
}
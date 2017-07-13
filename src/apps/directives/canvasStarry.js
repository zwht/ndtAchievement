qsDataAnalysisApp.directive('canvasStarry', canvasStarry);

canvasStarry.$inject = [];

function canvasStarry() {
    return {
        restrict: 'A',
        replace: true,
        template: "<canvas></canvas>",
        link: function (scope, element) {

            function html5_3d_animation(p){
                var p=p||{};
                var w_w=p&&p.window_width?p.window_width:document.body.clientWidth;
                var w_h=p&&p.window_height?p.window_height:document.body.clientHeight;
                var w_b=p&&p.window_background?p.window_background:"#000";
                var s_c=p&&p.star_count?p.star_count:"600";
                var s_color=p&&p.star_color?p.star_color:"#FFF";
                var s_d=p&&p.star_depth?p.star_depth:"250";
                var fov = parseInt(s_d);
                var SCREEN_WIDTH = parseInt(w_w);
                var SCREEN_HEIGHT = parseInt(w_h);
                var HALF_WIDTH = SCREEN_WIDTH/2;
                var HALF_HEIGHT = SCREEN_HEIGHT/2;
                var numPoints = s_c;
                var canvas = element[0];
                canvas.width=w_w;
                canvas.height=w_h;


                setup();
                function setup()
                {
                    function draw3Din2D(point3d)
                    {
                        x3d = point3d[0];
                        y3d = point3d[1];
                        z3d = point3d[2];
                        var scale = fov/(fov+z3d);
                        var x2d = (x3d * scale) + HALF_WIDTH;
                        var y2d = (y3d * scale)  + HALF_HEIGHT;

                        c.fillStyle= s_color;
                        c.strokeStyle = s_color;
                        c.lineWidth= 0;


                        c.beginPath();
                        c.arc(x2d,y2d, scale, 0, Math.PI * 2, true);
                        c.closePath();




                        /*c.beginPath();
                        //五角星边的长度为100px，x1、h2为五角星的底部点坐标偏差值，x2、h2为五角星上部点偏差值
                        var x1 = scale*Math.sin(Math.PI/10);
                        var h1 = scale*Math.cos(Math.PI/10);
                        var x2 = scale/2;
                        var h2 = scale/2*Math.tan(Math.PI/5);
                        c.lineTo(x2d+x1,y2d+h1);
                        c.lineTo(x2d-scale/2,y2d+h2);
                        c.lineTo(x2d+scale/2,y2d+h2);
                        c.lineTo(x2d-x1,y2d+h1);
                        c.lineTo(x2d-x1,y2d+h1);
                        c.lineTo(x2d,y2d);
                        c.closePath();

                        x2d=(i+2)*scale;
                        y2d=scale;
                        c.moveTo(x2d,y2d);*/


                        /*c.beginPath();
                        c.moveTo(x2d,y2d);
                        c.lineTo(x2d+scale,y2d);*/

                        c.fill();
                        c.stroke();

                    }


                    var c = canvas.getContext('2d');
                    var img = new Image();
                    img.src = "static/qsassets/qsstyle/images/bcg.png";

                    var points = [];

                    function initPoints()
                    {
                        for (i=0; i<numPoints; i++)
                        {
                            point = [(Math.random()*400)-200, (Math.random()*400)-200 , (Math.random()*400)-200 ];
                            points.push(point);
                        }

                    }

                    function render()
                    {

                        //c.fillStyle=w_b;
                        //c.globalAlpha=0;

                        //c.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);
                        c.clearRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);
                        //c.drawImage(img, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                        //debugger;
                        for (i=0; i<numPoints; i++)
                        {
                            point3d = points[i];

                            z3d = point3d[2];
                            z3d-=4;
                            if(z3d<-fov) z3d +=400;
                            point3d[2] = z3d;


                            draw3Din2D(point3d);

                        }

                    }

                    initPoints();

                    var loop = setInterval(function(){
                        render();
                    }, 50);

                }
            }
            html5_3d_animation({
                id:'html5_3d_animation',
                //window_width: '600',
                //window_height: '400',
                window_background: 'rgba(0,0,0,0.9)',
                star_count: '100',
                star_color: 'rgba(200,200,200,0.1)',
                star_depth: '400'
            });
        }

    };
}
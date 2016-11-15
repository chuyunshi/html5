/**
 * Created by Administrator on 16-10-26.
 */
$(document).ready(function(){
    var pageH,pageW;
    page={
        init:function(){
            page.resize();
            window.addEventListener("deviceorientation",page.handleOrientation,true);
            // page._touch();
            $('body').on("touchmove",function(e){
                e.preventDefault();
            })

        },
        handleOrientation:function(orientDate){
           // var absolute = orientDate.absolute;
           // var alpha = orientDate.alpha;
            var beta = orientDate.beta;
            var gamma = orientDate.gamma;
            $(".space").css({
                "transform":"rotateX("+beta+"deg) rotateY("+(-gamma)+"deg)"
            })


        },
        _touch:function(){
            var el=$("body");
            var x_move,y_move,x_start,y_start;
            var x_length= 0,y_length=0;
            el.on("touchstart",function(e) {
                var touch = e.touches[0];
                x_start = touch.pageX - x_length;
                y_start = touch.pageY - y_length;
               // console.log(x_start +'-'+ y_start)

            });
            el.on("touchmove",function(e) {
                var touch = e.touches[0];
                x_move=touch.pageX;
                y_move=touch.pageY;
                x_length = x_move-x_start;
                y_length = y_move-y_start;
                 x_length=parseInt(x_length);
                 y_length=parseInt(y_length);
                if(y_length>90){
                    y_length=90;
                }
                if(y_length<-90){
                    y_length=-90;
                }
                console.log(x_length +'-'+ y_length);
                //transform: rotateX(-2deg) rotateY(21deg);
                $(".space").css({
                    "transform":"rotateX("+(-y_length)+"deg) rotateY("+(x_length)+"deg)"
                })

            })
        },



        resize:function(){
            pageH = $(window).height();
            pageW = $(window).width();
            $("body").height(pageH).width(pageW);

        },
    }
    page.init();
})

/**
 * Created by Administrator on 16-11-8.
 */
$(document).ready(function () {
    var pageW,pageH,num_tag;
    var _w=$('.w');
    var _n=$('.n');
    var c = 0;
    var x;
    var y;
    var page = {
        init: function () {
            $('body').on("touchmove",function (e) {
                e.preventDefault();
            });
            page.resize();
            page._touch.init();


        },
        _touch:{
            init:function(){
                page._touch._zhuanstart();
                page._touch._start();
                page._touch.click_link();
            },
            _start:function(){

                for(var i=1;i<=6;i++){
                    x = 9*Math.cos(c-1.3-(1-i)*0.65)+-2;
                    y = 9*Math.sin(c-1.3-(1-i)*0.65)+pageH*0.5/num_tag;
                    if(x<-3){
                        $(".year"+i).hide();
                    }else{
                        $(".year"+i).show();
                    }
                    if(x>=7){
                        $(".year"+i).addClass("big")
                    }else{
                        $(".year"+i).removeClass("big")
                    }
                    $(".year"+i).css({
                        "left":x+"rem",
                        "top":y+"rem"
                    })
                }
            },
            _zhuanstart:function(){
                var y_start;
                var y_move=0;
                var touch;
                var num_c=0;
                var el = $(".oldphone");
                var el_all = $(".p0");
                el_all.on("touchstart",function(e){
                    touch = e.touches[0];
                    y_start = touch.pageY - y_move ;

                })

                el_all.on("touchmove",function(e){
                    touch = e.touches[0];
                    y_move = touch.pageY-y_start;
                    y_move = y_move/3;

                    c=2*Math.PI/360*y_move;

                    //console.log(c)
                    num_c = Math.round(c/0.65);
                    if(num_c >= 2){
                        num_c = 2
                    }
                    if(num_c <= -3){
                        num_c = -3
                    }
                    $(".num_year").html(3-num_c)
                    if(c >= 1.3){
                        y_move=78;
                        c=1.3;
                    }
                    if(c<=-1.95){
                        y_move=-120;
                        c=-1.95;
                    }
                    for(var i=1;i<=6;i++){
                        x = 9*Math.cos(c-1.3-(1-i)*0.65)+-2;
                        y = 9*Math.sin(c-1.3-(1-i)*0.65)+pageH*0.5/num_tag;


                        if(x<-3){
                            $(".year"+i).hide();
                        }else{
                            $(".year"+i).show();
                        }
                        $(".year"+i).css({
                            "left":x+"rem",
                            "top":y+"rem"
                        })
                    }

                    page._touch.zhuanmove(y_move);
                })

                el_all.on("touchend",function(){
                    c = num_c *0.65;
                    y_move = num_c*38*3;
                    _w.anim({rotate:y_move/3+'deg'});
                    _n.anim({rotate:-y_move/3+'deg'});
                    for(var i=1;i<=6;i++){
                        x = 9*Math.cos(c-1.3-(1-i)*0.65)+-2;
                        y = 9*Math.sin(c-1.3-(1-i)*0.65)+pageH*0.5/num_tag;
                        if(x>=7){
                            $(".year"+i).addClass("big");
                        }else{
                            $(".year"+i).removeClass("big");
                        }
                        $(".year"+i).anim({
                            "left":x+"rem",
                            "top":y+"rem"
                        })
                    }
                    //page._touch.zhuanend();
                })



            },
            zhuanmove:function(n){
                _w.css("transform",'rotate('+n+'deg)');
                _n.css("transform",'rotate('+-n+'deg)');


            },
            zhuanend:function(){
                _w.anim({
                    rotate: '0deg',
                },1);
                _n.anim({
                    rotate: '0deg',
                },1);
            },
            click_link:function(){
                var _year = $(".year");
                var _close = $(".close")
                var num;
                _year.on("click",function(){
                    if($(this).hasClass('big')){
                        num = $(this).data("num");
                        $(".p"+num).show().siblings().hide();
                        console.log(num);
                    }
                });
                _close.on("click",function(){
                    $(".p0").show().siblings().hide();
                })

            }

        },

        resize: function () {
            pageW = $(window).width();
            pageH = $(window).height();
            num_tag = 20*(pageW/320)
            $('body,.page,.p0,.p1,.p2,.p3,.p4,.p5,.p6').width(pageW).height(pageH);

        },

    }
    page.init();



});

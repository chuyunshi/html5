$(document).ready(function () {
    var pageH,pageW;
    var page={
        init:function(){
            page.resize();
            page.p0.init();
            page.p1.init();
            page.p3.init();
        },

        p0:{
            init:function(){
                var _img=$(".zhimg li");

                var i=0;
                var _click=$(".btn");
                _img.eq(0).show().siblings().hide();

              setInterval(function(){
                  _img.eq(i).show().siblings().hide();
                  $(".zhimgplus li").eq(i+1).show().siblings().hide();
                  $('.zhimg2 li').eq(i).show().siblings().hide();
                  $('.zhimg3 li').eq(i).show().siblings().hide();
                  $('.zhimg4 li').eq(i).show().siblings().hide();
                  $('.zhimg7 li').eq(i).show().siblings().hide();
                  $('.zhimg8 li').eq(i).show().siblings().hide();
                  $('.zhimg9 li').eq(i).show().siblings().hide();
                  i++;
                  if(i==_img.length){
                      i=0;
                  }
              },200);

                _click.on("click",function(){
                    $(".welcomepage").hide();
                    $(".swiper-container").show();
                    page.p1._swiper();
                })
            }
        },

        p1:{
          init:function(){
              //$(".welcomepage").hide();
             // $(".p1").hide();
              //$(".p2").hide();
             // $(".p3").hide();
             // $(".p4").hide();
             // $(".p5").hide();
             // $(".p6").hide();
             //$(".p7").hide();
             // $(".p8").hide();
              //$(".p9").hide();
              //$(".swiper-container").show();
             // page.p1._swiper();
          },
            _swiper:function(){
               /* var mySwiper = new Swiper('.swiper-container', {
                    direction: 'vertical',
                })*/
                if (mySwiper == undefined) {
                    var mySwiper = new Swiper('.swiper-container', {
                        direction: 'vertical',
                        followFinger : false,
                        observer:true,
                        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                            //console.log("111");
                            swiperAnimateCache(swiper); //隐藏动画元素
                            swiperAnimate(swiper); //初始化完成开始动画
                        },
                        onSlideChangeStart:function(aw){
                            var _index=aw.activeIndex;
                           // console.log(_index);
                            if(_index==8){
                                $(".arrow").hide();
                            }else{
                                $(".arrow").show();
                            }
                        },
                        onSlideChangeEnd: function (swiper){
                            swiperAnimate(swiper);
                        },

                    });

                }

            },
        },
        p3:{
            init:function(){
                page.p3._touch();
                page.p3._click();
            },
            _click:function(){
                $(".font3602").click(function(){
                    $(".p3_1").hide();
                })

            },
            _touch:function(){
                var _img=$(".pic img");
                var i=0;
                var j=0;
                _img.hide();
                _img.eq(0).show();
                var el=$(".xuanzhuan");
                var x_move,x_start;
                var x_length=0;
                el.on("touchstart",function(e) {


                    var touch = e.touches[0];
                    x_start = touch.pageX - x_length;

                    el.on('touchmove',function(e){

                        var touch= e.touches[0];
                        x_move=touch.pageX
                        x_length=x_move-x_start;

                        x_length=parseInt(x_length);
                        i=x_length/5;
                        i=parseInt(i);
                        if(i<0){
                            i=i%31;
                            _img.eq(-i).show().siblings().hide();

                        }
                        else{
                            //i = i - Math.floor(i / 25) * 25;
                            i=i%31;
                            _img.eq(31-i).show().siblings().hide();
                        }


                    });

                })

            },
        },
















        resize:function(){
            pageW=$(window).width();
            pageH=$(window).height();
            $(".wrap,.swiper-container,.welcomepage,.swiper-slide,.p3_1,._hand").width(pageW).height(pageH);
        }
    }
    page.init();
})
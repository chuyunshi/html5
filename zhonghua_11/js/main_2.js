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
            page._preload.init();

            //音乐播放
            page.BGM = $('.bgm')[0];
            page.BGM2 = $('.bgm')[1];
            page.BGM.play();
            //音乐开始/暂停
            page.MusicICO = $('.music-ico');
            page.MusicICO.addClass('playing');
            page.MusicICO.on('touchstart', page.bgm);
        },
        _preload:{
            init:function(){
                //利用preload.js预加载
                var manifest = [

                    './img/p0/bg.png','./img/p0/1949.png','./img/p0/1951.png','./img/p0/1983.png',
                    './img/p0/1988.png','./img/p0/2010.png','./img/p0/2012.png','./img/p4/pic3.png',
                    './img/p0/w.png','./img/p0/n.png','./img/p1/bg3.png','./img/p2/bg.png',
                    './img/p1/dai.png','./img/p1/mao.png','./img/p1/return.png','./img/p2/mao.png',
                    './img/p2/yan.png','./img/p3/pic.png','./img/p4/pic1.png','./img/p4/pic2.png',
                    './img/p4/yan.png','./img/p5/pic1.png','./img/p5/pic2.png','./img/p6/yan.png',
                    './img/p6/xin.png','./img/p6/light.png','./img/turn.gif',  './img/p6/logo.png',
                ];
                for (var i = 1; i <= 6; i++) {
                    manifest[manifest.length] = './img/p0/' + i + '.png';
                    manifest[manifest.length] = './img/p'+i+'/line.png';
                }
                var queue = new createjs.LoadQueue(false);
                queue.on("complete",function(){
                    //完成后操作
                    setTimeout(function(){
                        $(".loading").hide();
                        $(".page").show();
                    },200)
                    console.log("加载完成！！！")
                });
                queue.on("progress",function(){
                    var progress = queue.progress * 100;
                    progress = Math.floor(progress);
                    console.log(progress);
                    $(".loading_num").html(progress);
                    $(".load_box2").css({
                        "width":progress+'%',
                    })


                });
                queue.loadManifest(manifest);
            }
        },

        _touch:{
            init:function(){
                page._touch._zhuanstart();
                page._touch._start();
                page._touch.click_link();
            },
            _start:function(){
                page._touch._for();
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
                    page.BGM2.play();
                    touch = e.touches[0];
                    y_move = touch.pageY-y_start;
                    y_move = y_move/3;
                    c=2*Math.PI/360*y_move;
                    //console.log(c)
                    num_c = Math.round(c/(2*Math.PI/12));
                    page._touch._for();

                    page._touch.zhuanmove(y_move);
                })

                el_all.on("touchend",function(){
                    c = num_c *2*Math.PI/12;
                    y_move = num_c*30*3;
                    _w.anim({rotate:y_move/3+'deg'});
                    _n.anim({rotate:-y_move/3+'deg'});
                    for(var i=1;i<=12;i++){
                        x = 9.5*Math.cos(c-4*Math.PI/12-(1-i)*2*Math.PI/12)+-2;
                        y = 9.5*Math.sin(c-4*Math.PI/12-(1-i)*2*Math.PI/12)+pageH*0.5/num_tag;
                        if(x<-1){
                            $(".year"+i).hide();
                        }else{
                            $(".year"+i).show();
                        }
                        if(x>=7.17){
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
                    var tag = $(".big").data("num");
                    $(".num_year").html("<img src='img/p0/"+tag+".png' />");
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

            },
            _for:function(tag){
                for(var i=1;i<=12;i++){
                    x = 9.5*Math.cos(c-4*Math.PI/12-(1-i)*2*Math.PI/12)+-2;
                    y = 9.5*Math.sin(c-4*Math.PI/12-(1-i)*2*Math.PI/12)+pageH*0.5/num_tag;
                    if(x<-1){
                        $(".year"+i).hide();
                    }else{
                        $(".year"+i).show();
                    }
                    if(x>=7.17){
                        $(".year"+i).addClass("big");
                    }else{
                        $(".year"+i).removeClass("big");
                    }

                    $(".year"+i).css({
                        "left":x+"rem",
                        "top":y+"rem"
                    })
                }
            }
        },
        bgm : function () {
            var _t = page.MusicICO;
            if (_t.hasClass('playing-stop')) {
                _t.removeClass('playing-stop');
                page.BGM.play();
            } else if (_t.hasClass('playing')) {
                _t.addClass('playing-stop');
                page.BGM.pause();
            } else {
                _t.addClass('playing');
                page.BGM.play();
            }
        },
        resize: function () {
            pageW = $(window).width();
            pageH = $(window).height();
            num_tag = 20*(pageW/320)
            $('body,.page,.loading,.p0,.p1,.p2,.p3,.p4,.p5,.p6').width(pageW).height(pageH);

        },

    }
    page.init();



});

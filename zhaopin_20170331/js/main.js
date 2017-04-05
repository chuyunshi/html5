/**
 * Created by ShiHongZi on 2017/2/26.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            window.addEventListener("touchstart", function (e) {
                //e.preventDefault();
            });

            $(window).resize(function () {
                page.resize();
            });

            page.BGM = $('.bgm')[0];
            page.BGM1 = $('.bgm1')[0];

            page.resize();
            page._sound.init();
            page.p0.init();
            //page.p0_0.init();
            //page.swiper.init();
            page.loading.init();

        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', page.imgW).attr('height', page.imgH)
        },

        loading: {
            init: function () {
                var num=10;
                var num_num=0;
                var loading_time=setInterval(function(){
                    num+=10;
                    //$(".loading_top").css("left",num+"%");
                    num_num=Math.floor((num-10)*1.25);
                    //num_num=num;
                    $("#loading_num").html(num_num+"%");
                    console.log(12)
                    if(num>=100){
                        clearInterval(loading_time);
                        $(".loading").hide();
                        $(".p0").show();
                        setTimeout(function () {
                            $(window).scrollTop(1);
                        }, 0);
                         page.BGM.play();
                        wx.getNetworkType({
                            success: function (res) {
                                page.BGM.play();
                            }
                        });
                        page.timer5=setTimeout(function(){
                            page.BGM.pause();
                            $(".p0").hide();
                            $(".p0_0").show();
                            var num=0;
                            var p0_timer=setInterval(function(){
                                setTimeout(function () {
                                    $(window).scrollTop(1);
                                }, 0);
                                num++
                                createjs.Sound.play("s0");
                                wx.getNetworkType({
                                    success: function (res) {
                                        createjs.Sound.play("s0");
                                    }
                                });
                                if(num==6){
                                    setTimeout(function(){
                                        $(".p0_0_hand").show()
                                    },1000)
                                    page.p0_0.init();
                                    clearInterval(p0_timer)
                                }
                            },1200)

                        },4000)
                    }
                },80)

            },
            _preload: function () {
                page.stage = {};
                var manifest = [
                    './img/hp.png'
                ], str;
                /*  for (var j = 0; j <= 76; j++) {
                 str = page._http + 'loading/loading' + j + '.jpg';
                 manifest[manifest.length] = str;
                 }*/
                var queueBe = new createjs.LoadQueue(false);

                queueBe.setMaxConnections(1);//设置并发数

                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function () {
                    var progress = queueBe.progress * 100;
                    progress = Math.floor(progress);
                });

                queueBe.on("complete", function () {
                    //完成后操作
                    /*   for (var i = 0; i <= 76; i++) {
                     page._canvas.initBitmap("p0", i, page._http + "loading/loading" + i + ".jpg");
                     }
                     */
                    //  page._canvas.playAni('p0', 'p0', 25, 1);

                    // page.loading._preload1();

                    /*setTimeout(function () {
                     $(window).scrollTop(1);
                     }, 0);
                     // page.BGM.play();
                     wx.getNetworkType({
                     success: function (res) {
                     //page.BGM.play();
                     }
                     });*/
                });
                queueBe.loadManifest(manifest);

            },

        },
        _sound:{
            init:function(){
                createjs.Sound.alternateExtensions = ["mp3"];
                //createjs.Sound.on("fileload", page._sound.playSound, this);
                createjs.Sound.registerSound("./img/music/message.mp3", "s0");
            },
        },
        p0:{
            init:function(){
                page.p0._click();
            },
            _click:function(){
                $(".pub_p0").on("click",function(){
                    clearTimeout(page.timer5);
                    page.BGM.pause();
                    $(".p0").hide();
                    $(".p0_0").show();
                    var num=0;
                    var p0_timer=setInterval(function(){
                        setTimeout(function () {
                            $(window).scrollTop(1);
                        }, 0);
                        num++
                        createjs.Sound.play("s0");
                        wx.getNetworkType({
                            success: function (res) {
                                createjs.Sound.play("s0");
                            }
                        });
                        if(num==6){
                            setTimeout(function(){
                                $(".p0_0_hand").show()
                            },1000)

                            page.p0_0.init();
                            clearInterval(p0_timer)
                        }
                    },1200)
                })
            }
        },
        p0_0:{
            init:function(){
                page.p0_0._click();
            },
            _click:function(){
                $(".p0_0_6").on("click",function(){
                    $(".p0_0").hide();
                    $("#swiper1").show();
                    page.swiper.init();
                })
            }
        },
        swiper:{
            init:function(){
                page.swiper._swiper();
                page.swiper._swiper2();
            },
            _swiper:function(){
                var mySwier = new Swiper("#swiper1", {
                    initialSlide :0,
                    direction : 'vertical',
                    nextButton:'.swiper-button-next1',
                    //effect: "fade",
                    //autoplay: 2000,
                    //speed: 2000,
                    //autoplayDisableOnInteraction: false,
                    //loop: true,
                    //fade: {
                        //crossFade: false,
                    //},
                    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                        swiperAnimateCache(swiper); //隐藏动画元素
                        swiperAnimate(swiper); //初始化完成开始动画
                    },
                    onSlideChangeStart: function (swiper) {
                        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                        page.slide1 = swiper.activeIndex;
                        //console.log(page.slide)
                        if(page.slide1==4){
                            $("#p1_down").hide();
                        }else{
                            $("#p1_down").show();
                        }
                    }
                })
            },
            _swiper2:function(){
                var _html;
                var mySwier = new Swiper("#swiper2", {
                    initialSlide :1,
                    //direction : 'vertical',
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next2',
                    //effect: "fade",
                    //autoplay: 2000,
                    //speed: 2000,
                    //autoplayDisableOnInteraction: false,
                    //loop: true,
                    //fade: {
                    //crossFade: false,
                    //},
                    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
                        //swiperAnimateCache(swiper); //隐藏动画元素
                        //swiperAnimate(swiper); //初始化完成开始动画
                    },
                    onSlideChangeStart: function (swiper) {
                        //swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                        page.slide = swiper.activeIndex;
                        console.log(page.slide);
                        $(".slide"+(page.slide)).anim({
                            "opacity":"1",
                            "transform": "scale(1.2)"
                        })
                        $(".slide"+(page.slide-1)).anim({
                            "opacity":"0.5",
                            "transform": "scale(0.7)"
                        })
                        $(".slide"+(page.slide+1)).anim({
                            "opacity":"0.5",
                            "transform": "scale(0.7)"
                        })
                     /*   if(page.slide==7){
                            $(".slide0").anim({
                                "opacity":"1",
                                "transform": "scale(1.2)"
                            })
                            _html = "<img src='img/06/0_0.png'/>"
                        } else if(page.slide==0){
                            $(".slide5").anim({
                                "opacity":"1",
                                "transform": "scale(1.2)"
                            })
                            _html = "<img src='img/06/5_5.png'/>"
                        }else{
                            _html = "<img src='img/06/" + (page.slide-1)+"_"+(page.slide-1) + ".png'/>"
                        }*/
                        if(page.slide==0){
                            $("#p4_left").hide();
                        }else{
                            $("#p4_left").show();
                        }
                        if(page.slide==5){
                            $("#p4_right").hide();
                        }else{
                            $("#p4_right").show();
                        }
                        _html = "<img src='img/06/" + (page.slide)+"_"+(page.slide) + ".png'/>"

                        $(".jieshao").html(_html)

                    }
                })
            }
        }
    };
    page.init();
});
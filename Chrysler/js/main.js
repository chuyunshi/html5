$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            $(window).resize(function () {
                page.resize();
            });
            page.BGM1 = $('.bgm1')[0];

            setTimeout(function(){
                $(window).scrollTop(1);
            },0);


            page.BGM1.play();

            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    page.BGM1.play();
                    if($(".loading").hasClass("fadeOut")){
                        page.BGM1.pause();
                    }
                });
            }, false);

         






                page.BGM = $('.bgm')[0];
            page.resize();
            page.soundplay.init();
            page.menu_click.init();
            page.loading.init();
           // page.guide.init();
            page.move_left_right.init();
            page.move_right_left.init();
            page.p1.init();
            page.p2.init();
            page.p4.init();
            page.p5.init();
            page.p7.init();
        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
        },

        loading:{
            init:function(){
                //page.loading._preload();
                page.loading._preload1()
            },
            _preload:function(){
                var _num = 0;
                var timer;
                var _load_zhen =  $(".load_zhen")
                timer = setInterval(function(){
                    _num++;
                    _load_zhen.css("transform","rotateZ("+(_num*2.55)+"deg)");
                    if(_num==15){
                        $("._img2").show();
                    }
                    if(_num==30){
                        $("._img3").show();
                    }
                    if(_num==45){
                        $("._img4").show();
                    }
                    if(_num==60){
                        $("._img5").show();
                    }
                    if(_num==75){
                        $("._img6").show();
                    }

                    if(_num>=100){
                        clearInterval(timer);
                        $(".loading").addClass("fadeOut");
                        $(".page_box,.menu_list").show();
                    }
                },40)
            },
            _preload1: function () {
                var num = 0;
                var _load_zhen =  $(".load_zhen")
                var manifest = [
                    './img/loading/1.png','./img/loading/pan.png','./img/loading/zhen.png',
                    './img/move_line.png','./img/touch_move.png','./img/turn.png',
                    './img/p1/bg.jpg',
                    './img/p5/1.jpg','./img/p5/2.jpg',
                    './img/p7/bg.jpg','./img/p7/1.jpg',
                ];
                for(var b=1;b<=4;b++){
                    manifest[manifest.length] = './img/p1/0' + b + '.jpg';
                    manifest[manifest.length] = './img/p2/' + b + '.jpg';

                }
                for(var c=1;c<=5;c++){
                    manifest[manifest.length] = './img/p2/0' + c + '.jpg';
                }
                for(var d=1;d<=2;d++){
                    manifest[manifest.length] = './img/p3/' + d + '.jpg';
                    manifest[manifest.length] = './img/p4/' + d + '.jpg';
                    manifest[manifest.length] = './img/p6/' + d + '.jpg';
                }

                for(var i= 1;i<=7;i++){
                    manifest[manifest.length] = './img/menu/' + i + '.png';
                    manifest[manifest.length] = './img/menu/0' + i + '.png';
                }
                for(var j= 1;j<=6;j++){
                    manifest[manifest.length] = './img/loading/' + j + '.png';
                }
                for (var a = 1; a <= 50; a++) {
                    manifest[manifest.length] = './img/car_360_0/' + a + '.png';
                    manifest[manifest.length] = './img/car_360_1/' + a + '.png';
                    manifest[manifest.length] = './img/car_360_2/' + a + '.png';
                    manifest[manifest.length] = './img/car_360_3/' + a + '.png';
                }

                var queue = new createjs.LoadQueue(false);
                // 关键！----设置并发数
                queue.setMaxConnections(10);
                // 关键！---一定要将其设置为 true, 否则不起作用
                queue.maintainScriptOrder = true;

                queue.on("complete", function () {
                    console.log("加载完成!!!");
                    $(".loading").addClass("fadeOut");
                    $(".swiper-container1").show();
                    page.guide.init();

                    page.BGM1.pause();

                    $("#auto_play_pic,.swiper-button").on("touchstart",function(){
                        page.BGM.play();
                    });

                    setTimeout(function () {
                        $(window).scrollTop(1);
                    }, 0);
                    page.BGM.play();
                    wx.getNetworkType({
                        success: function (res) {
                           page.BGM.play();
                        }
                    });

                });
                queue.on("progress", function () {
                    var progress = queue.progress * 100;
                    progress = Math.floor(progress);
                    _load_zhen.css("transform","rotateZ("+(progress*2.55)+"deg)");
                    console.log(progress)
                    if(progress==1){
                        $(".loading").show();
                    }
                    if(progress==15){
                        $("._img2").show();
                    }
                    if(progress==30){
                        $("._img3").show();

                    }
                    if(progress==45){
                        $("._img4").show();

                    }
                    if(progress==60){
                        $("._img5").show();

                    }
                    if(progress==75){
                        $("._img6").show();

                    }
                    if(progress>=100){
                        $(".loading").addClass("fadeOut");
                        $(".swiper-container1").show();
                        page.guide.init();

                        page.BGM1.pause();

                        setTimeout(function () {
                            $(window).scrollTop(1);
                        }, 0);
                        page.BGM.play();
                        wx.getNetworkType({
                            success: function (res) {
                                page.BGM.play();
                            }
                        });
                    }
                });
                queue.loadManifest(manifest);
            },


        },
        guide:{
            init:function(){
                page.guide._swiper();
                page.guide._click();
            },
            _swiper:function(){
                var mySwiper = new Swiper('.swiper-container1',{
                    observer: false,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    onSlideChangeStart: function (swiper){
                        var _index = swiper.activeIndex;
                        console.log(_index);
                        $(".swiper-button").on("tap",function(e){
                            mySwiper.slideTo(_index, 500,false);
                            e. stopPropagation();
                        });

                        if(_index==3){
                            $(".swiper-button").hide();
                        }
                    }
                })

            },
            _click:function(){
                $(".load_start").on("click",function(){
                    $(".load_start,.load_arrow,.load_starttext").removeClass("up_y").addClass("fadeOut");

                    createjs.Sound.play("start");

                    //   $(".swiper-container").removeClass("fadeIn");
                    setTimeout(function(){
                        $(".load_start1").show();
                    },200);
                    setTimeout(function(){
                        $(".load_start2").show();
                        $(".swiper_p4 .img1,.swiper_p4 .img2").addClass("x_y");
                        if(navigator.vibrate){
                            navigator.vibrate([1200 ]);//或navigator.vibrate(3000)；
                        }else if(navigator.webkitVibrate){
                            navigator.webkitVibrate([1200])
                        }
                    },600);
                    setTimeout(function(){
                        $(".load_start3").show();
                    },900);
                    setTimeout(function(){
                        $(".swiper-container1").addClass("fadeOut");
                    },1700);
                    setTimeout(function(){
                        $(".page_box,.menu_list").show();
                        $(".swiper-container1").hide();
                        $(".swiper_p4 .img1,.swiper_p4 .img2").removeClass("x_y");
                        createjs.Sound.play("demo5");
                    },2000);

                });
            },

        },
        soundplay:{
            init:function(){
                page.soundplay.music_btn();
                page.soundplay.play_start();
                page.soundplay.sound();

            },
            sound:function(){
                createjs.Sound.alternateExtensions = ["mp3"];
                //createjs.Sound.on("fileload", page.soundplay.playSound, this);
                createjs.Sound.registerSound("./img/media/sound/loading.mp3", "loading");
                createjs.Sound.registerSound("./img/media/sound/bgm.mp3", "bgm");
                createjs.Sound.registerSound("./img/media/sound/start.mp3", "start");
                createjs.Sound.registerSound("./img/media/sound/daohang.mp3", "daohang");
                createjs.Sound.registerSound("./img/media/sound/transfer.mp3", "transfer");
                createjs.Sound.registerSound("./img/media/sound/demo1.mp3", "demo1");
                createjs.Sound.registerSound("./img/media/sound/demo2.mp3", "demo2");
                createjs.Sound.registerSound("./img/media/sound/demo3.mp3", "demo3");
                createjs.Sound.registerSound("./img/media/sound/demo4.mp3", "demo4");
                createjs.Sound.registerSound("./img/media/sound/demo5.mp3", "demo5");

            },
            playSound : function (event) {
                if (event.id == 'bgm') {
                    page.BGM = createjs.Sound.play("bgm");  // 发挥使用ID。也可以使用完整的源路径或event.src。
                    page.BGM.loop = -1;
                    page.BGM.paused = true;
                }
            },


            play_start:function(){
                var _num=0;
                page.timer = setInterval(function(){
                    for(var i=1;i<=7;i++){
                        $(".music-ico .music-ico"+i+" img").eq(_num).show().siblings().hide();
                    }

                    _num++;
                    if(_num>=4){
                        _num=0;
                    }
                },150)

            },
            music_btn:function(){
                page.music=1;
                $(".music-ico").on("click",function(){

                    if(page.music==1){
                        page.BGM.pause();
                        $(".music-ico .close").show();
                        $(".music-ico .music-ico0").hide();
                        clearInterval(page.timer);
                        page.music=0;
                    }else{
                        page.BGM.play();
                        $(".music-ico .close").hide();
                        $(".music-ico .music-ico0").show();
                        page.soundplay.play_start();
                        page.music=1;
                    }
                });
            },
        },
        menu_click:{
            init:function(){
                page.menu_click.menu_change();
                page.menu_click.menu_link();
            },
            menu_change:function(){
                $(".menu_box li").on("click",function(){
                    if($(this).hasClass("click")){
                        createjs.Sound.play("daohang");
                        setTimeout(function(){
                            createjs.Sound.play("demo5");
                        },200)
                        for(var i=0;i<6;i++){
                            $(this).siblings().find("img").eq(2*i+1).hide()
                        }
                        $(this).find("img").eq(1).show();
                    }
                    $(this).removeClass("click").siblings().addClass("click");


                })
            },
            menu_link: function () {
                var _link = $('.menu_list ul li');
                var $this
                _link.on('click', function () {
                    $this = $(this);
                    var _num = $(this).data("link");
                    $('.link' + _num).siblings().removeClass("rotate_Y_In");
                    $('.link' + _num).siblings().addClass("rotate_Y_out");
                    setTimeout(function(){
                        $(".page_z").removeClass("rotate_Y_out");
                        $('.link' + _num).addClass("rotate_Y_In");
                        $('.link' + _num).show().siblings().hide();
                        if(_num==7&&$this.hasClass("swiper_this")){
                            console.log(123)
                            //$(".swiper-container2").show();
                            page.p7._swiper();
                            $this.removeClass("swiper_this");
                        }
                    },300)


                })
            },

        },
        move_left_right:{
            init:function(){
                page.move_left_right.left_right()
            },
            left_right:function(){
                var num = 20 * (pageW / 320);
                var touch_move = $(".touch_move");
                var x_start, x_move, x_length = 0;

                touch_move.on("touchmove", function (e) {
                    $(".p4_pic,.p5_pic,.p5_pic1").hide();
                    var touch = e.touches[0];
                    x_move = touch.pageX;
                    if(x_move<50){
                        x_move=50;
                    }else if(x_move>pageW-50){
                        x_move=pageW-50;
                    }
                    $(this).parent(".page_hidden_box").css({
                        "width":x_move+"px"
                    })
                })

            }

        },
        move_right_left:{
            init:function(){
                page.move_right_left. right_left();
            },
            right_left:function(){
                var num = 20 * (pageW / 320);
                var touch_move = $(".touch_move1");
                var x_start, x_move, x_length = 0;

                touch_move.on("touchmove", function (e) {
                    $(".p4_pic,.p5_pic,.p5_pic1").hide();
                    var touch = e.touches[0];
                    x_move = touch.pageX;
                    if(x_move<50){
                        x_move=50;
                    }else if(x_move>pageW-50){
                        x_move=pageW-50;
                    }
                    $(this).parent(".page_hidden_box1").css({
                        "width":(pageW-x_move)+"px"
                    })

                })

            }

        },
        p1:{
            init:function(){
                page.p1.select_list();
                page.p1.select_btn();
                page.p1._touchmove();
                page.p1._num_click();
               // page.p1.words_swiper();

            },
           /* words_swiper:function(){
                var el =$(".layer_7");
                var num = 20 * (pageW /320)
                var y_start, y_move, y_length = 0;

                el.on("touchstart", function (e) {
                    var touch = e.touches[0];
                    y_start = touch.pageY - y_length;
                })
                el.on("touchmove", function (e) {
                    var touch = e.touches[0];
                    y_move = touch.pageY;

                    y_length = y_move - y_start;
                    console.log(y_length);
                    if(y_length>=0){
                        y_length=0;
                    }
                    if(y_length<=-1.8949*num){
                        y_length=-1.8949*num;
                    }
                    $(".layer_words").css({
                        "top":y_length+"px"
                    })



                })



            },*/
            select_list:function(){
                var _select_list = $(".select_list");
                var _select_num;
                _select_list.on("touchstart",function(){
                    _select_num = $(this).data("select");
                    for(var i=0;i<7;i++){
                        _select_list.find("img").eq(2*i+1).hide();
                        _select_list.find("img").eq(2*i).show();
                    }
                    $(this).find("img").eq(1).show();
                    $(".yes_img").eq(_select_num).show().siblings().hide();
                    page.p1._changecolor(_select_num);
                })
            },

            select_btn:function(){
                var _select_btn = $(".select_btn");
                var yes=0;
                var _select_box =$(".select_box");
                $(".p1_yes").on("click",function(){
                    if(yes==0){
                        _select_btn.eq(1).show();
                        _select_btn.eq(0).hide();
                        _select_box.anim({
                            "height":"2.0097rem"
                        },0.2)
                        yes=1;
                    }else{
                        _select_btn.eq(0).show();
                        _select_btn.eq(1).hide();
                        _select_box.anim({
                            "height":"0rem"
                        },0.2);
                        yes=0;
                    }

                })
                $(".prompt1").on("tap",function(e){
                    $(this).hide();
                    e. stopPropagation();

                })
                $(".prompt2").on("tap",function(e){
                    $(".prompt2").hide();
                    e. stopPropagation();

                })
            },
            _changecolor: function (_select_num) {
                var _html='';
                for (var i = 1; i <= 50; i++) {
                    _html="<img class='ab' src='img/car_360_"+_select_num+"/"+i+".png'/>"
                    $('.rotate360_pic .rotate_box_'+i).html(_html);
                }
                var _img = $('.rotate360_pic .rotate_box');
                //_img.eq(0).show().siblings().hide();

            },
            _touchmove: function () {
                var _img = $('.rotate360_pic .rotate_box');
                _img.eq(0).show().siblings().hide();

                var el = $('.rotate360_pic');
                var temp_auto=1;
                var x_move = 0, x_start = 0;
                var x_length = 0;
                var num = 0;
                var _pub_num=$(".pub_num");
                var _layer=$(".layer");
                el.on("touchstart", function (e) {
                    var touch = e.touches[0];
                    x_start = touch.pageX - x_length;
                });
                el.on("touchmove", function (e) {
                    _pub_num.hide();
                    _layer.hide();
                    $(".pub_num").removeClass("big_small").addClass("fadeIn1s");
                    $(".p1_btn").removeClass("this");
                    var touch = e.touches[0];
                    x_move = touch.pageX
                    x_length = x_move - x_start;
                    num = -x_length / 8;
                    num = parseInt(num);
                    num = num % 50;
                    console.log(num)
                    if (num > 0) {
                        _img.eq(num).show().siblings().hide();
                    }
                    else {
                        num = 50+num;
                        _img.eq(num).show().siblings().hide();
                    }
                });
                $(".p1_btn").on("click",function(){
                    createjs.Sound.play("demo1");
                    _pub_num.show();
                    var time_auto;
                    if($(this).hasClass("this")){
                        $(".pub_num").removeClass("fadeIn1s").addClass("big_small");
                    }
                    $(this).addClass("this");
                    if(num>0&&num<=25){
                        time_auto = setInterval(function(){
                            x_length++;
                            num = -x_length/8 ;
                            num = num % 50;
                            num = parseInt(num);
                            console.log(num);
                            if (num > 0) {

                                _img.eq(num).show().siblings().hide();
                            }
                            else {

                                _img.eq(50+num).show().siblings().hide();
                            }
                            if(num==0){
                                clearInterval(time_auto);
                                _img.eq(0).show().siblings().hide();
                            }

                        },2);
                    }else if(num>25&&num<50){
                        time_auto = setInterval(function(){
                            x_length--
                            num = -x_length/8 ;
                            num = num % 50;
                            num = parseInt(num);
                            console.log(num);
                            if (num > 0) {

                                _img.eq(num).show().siblings().hide();
                            }
                            else {

                                _img.eq(50+num).show().siblings().hide();
                            }
                            if(num==0){
                                clearInterval(time_auto);
                                _img.eq(0).show().siblings().hide();
                            }

                        },5);

                    }

                })

            },
            _num_click:function(){
                var _num;
                $(".pub_num").on("click",function(){
                    createjs.Sound.play("demo2");
                    _num = $(this).data("num");
                    $(".layer_"+_num).show().siblings().hide();
                });
                $(".p1_btn1").on("click",function(){
                    createjs.Sound.play("demo1");
                    _num = $(this).data("num");
                    $(".layer_"+_num).show().siblings().hide();
                });
                $(".p1_delete").on("click",function(){
                    $(".layer").hide();
                })
            }
        },
        p2:{
            init:function(){
               page.p2.btn_click();
            },
            btn_click:function(){
                var p2_num1=0;
                var p2_num2=0;
                $(".p2_top .bigTosmall").on("click",function(){
                    createjs.Sound.play("demo3");
                    p2_num1++;
                    if(p2_num1>=4){
                        p2_num1=0;
                    }
                    $(".p2_img1").eq(p2_num1).show().siblings().hide();
                });
                $(".p2_bottom .bigTosmall").on("click",function(){
                    createjs.Sound.play("demo3");
                    p2_num2++;
                    if(p2_num2>=5){
                        p2_num2=0;
                    }
                    $(".p2_img2").eq(p2_num2).show().siblings().hide();
                });
            },

        },
        p4:{
            init:function(){
                page.p4._click();
            },
            _click:function(){
                $(".p_delete4").on("click",function(){
                    $(".p4_pic").hide();

                })
                $(".p4_bottom .bigTosmall").on("click",function(event){
                    createjs.Sound.play("demo3");
                    $(".p4_pic").show();
                    event.stopPropagation();
                })

            }
        },
        p5:{
            init:function(){
                page.p5._click();
            },
            _click:function(){
                $(".p_delete5").on("click",function(){
                    $(".p5_pic").hide();

                });
                $(".p5_bottom .bigTosmall").on("click",function(event){
                    createjs.Sound.play("demo3");
                    $(".p5_pic").show();
                    event.stopPropagation();
                });

                $(".p_delete5_1").on("click",function(){
                    $(".p5_pic1").hide();

                });
                $(".p5_bottom1 .bigTosmall").on("click",function(event){
                    createjs.Sound.play("demo3");
                    $(".p5_pic1").show();
                    event.stopPropagation();
                });

            }
        },
        p7:{
            init:function(){

            },
            _swiper:function(){
                var mySwiper = new Swiper('.swiper-container2',{
                    observer: false,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    onSlideChangeStart: function (swiper){
                        var _index = swiper.activeIndex;
                        console.log(_index);
                        $(".swiper-button").on("tap",function(e){
                            mySwiper.slideTo(_index, 500,false);
                            e. stopPropagation();
                        });
                        if(_index==0){
                            //$(".swiper-button-next").show();
                            $(".swiper-button-prev").hide();
                        }
                        if(_index==1){
                            $(".swiper-button-prev,.swiper-button-next").show();
                        }
                        if(_index==2){
                            $(".swiper-button-next").hide();
                        }
                    }
                })

            },
        }


    };
    page.init();
});
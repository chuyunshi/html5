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
            page.MV = document.getElementById("video1");


            page.imgW = 750;
            page.imgH = 1333;

            page._http = "./img/images/";
            page.mov = 0;
            page.time = 0;
            page.aniImgs = {'p0': [], 'p1': []}

            page.resize();
            page._p1_1.init();
            page.p2.init();
            page.soundplay.init();
            page.loading.init();
            page._click.init();
        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', page.imgW).attr('height', page.imgH)
        },
        soundplay: {
            init: function () {
                page.soundplay._music_icon_click();
            },
            _music_icon_click: function () {
                var musicIcon = $(".music_icon");
                page._close = 0;
                musicIcon.on("click", function () {
                    clearInterval(page.timer_Mc)
                    if (page._close == 0) {
                        page.soundplay._music_close();
                        page.MV.volume=0;
                        page._close = 1;
                    } else {
                        page.soundplay._music_close();
                        page.MV.volume=1;
                        page._close = 0;
                    }
                    console.log(page._close)
                })
            },
            _music_open: function () {
                var s = 0;
                $(".music_open").show();
                $(".music_close").hide();
                page.timer_Mo = setInterval(function () {
                    $(".music_open").find("img").eq(s).show().siblings().hide();
                    s++;
                    if (s >= 8) {
                        s = 0;
                    }
                }, 100);
            },
            _music_close: function () {
                var c = 0;
                clearInterval(page.timer_Mo)
                $(".music_open").hide();
                $(".music_close").show();
                page.timer_Mc = setInterval(function () {
                    $(".music_close").find("img").eq(c).show().siblings().hide();
                    c++;
                    if (c >= 6) {
                        c = 0;
                        clearInterval(page.timer_Mc)
                    }
                }, 100);
            }


        },
        loading: {
            init: function () {
                //  page.loading._preload();
                page.loading._preload2();
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
            _preload1: function () {

                var manifest = [
                    './img/hp.png',
                    page._http + "sound/bgm.mp3"
                ], str;
                for (var j = 0; j <= 3054; j++) {
                    str = './img/images/panzi/panzi' + j + '.jpg';
                    manifest[manifest.length] = str;
                }
                for (var a = 0; a <= 399; a++) {
                    page._canvas.initBitmap("p1", a, page._http + 'panzi/panzi' + a + '.jpg')
                }
                for (var b = 0; b <= 399; b++) {
                    page._canvas.initBitmap("p3", b, page._http + 'panzi/panzi' + (b + 400) + '.jpg')
                }
                for (var c = 0; c <= 399; c++) {
                    page._canvas.initBitmap("p7", c, page._http + 'panzi/panzi' + (c + 800) + '.jpg')
                }
                for (var d = 0; d <= 399; d++) {
                    page._canvas.initBitmap("p5", d, page._http + 'panzi/panzi' + (d + 1200) + '.jpg')
                }
                for (var e = 0; e <= 399; e++) {
                    page._canvas.initBitmap("p6", e, page._http + 'panzi/panzi' + (e + 1600) + '.jpg')
                }
                for (var f = 0; f <= 499; f++) {
                    page._canvas.initBitmap("p8", f, page._http + 'panzi/panzi' + (f + 2000) + '.jpg')
                }
                for (var g = 0; g <= 551; g++) {
                    page._canvas.initBitmap("p9", g, page._http + 'panzi/panzi' + (g + 2500) + '.jpg')
                }

                var queueBe = new createjs.LoadQueue(false);

                queueBe.setMaxConnections(600);//设置并发数

                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function () {
                    var progress = queueBe.progress * 100;
                    progress = Math.floor(progress);
                    $(".s1").html(progress + "%");
                });
                queueBe.on("complete", function () {
                    //完成后操作

                    /*   for(var s=0;s<=page.panzi;s++){
                     page._canvas.initBitmap("p1", s,'./img/images/panzi/panzi' + s + '.jpg')
                     }*/
                    setTimeout(function () {
                        $(".p0").hide();
                        $(".p1").show();
                        //  page.loading._preload2();
                    }, 1500);
                });
                queueBe.loadManifest(manifest);
            },
            _preload2: function () {
                page.stage = {};
                var manifest = [
                    './img/hp.png',
                    page._http + "sound/bgm.mp3"
                ], str;
                for (var a = 1; a <= 8; a++) {
                    manifest[manifest.length] = './img/p2/' + a + '.png';
                }
                for (var j = 0; j <= 126; j++) {
                    str = page._http + 'end/end' + j + '.jpg';
                    manifest[manifest.length] = str;
                }
                var queueBe = new createjs.LoadQueue(true);
                queueBe.setMaxConnections(20);//设置并发数
                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function () {
                     var progress = queueBe.progress * 100;
                     progress = Math.floor(progress);
                     $(".s").html(progress + "%");
                });
                queueBe.on("complete", function () {
                    setTimeout(function () {
                        $(".p0").hide();
                        $(".p1").show();
                    }, 500);
                    for (var i = 0; i <= 126; i++) {
                      //  page._canvas.initBitmap("p1", i, page._http + 'end/end' + i + '.jpg')
                    }

                });
                queueBe.loadManifest(manifest);
            }
        },
        _canvas: {
            initBitmap: function (key, i, strurl) {
                var img = new Image();
                img.src = strurl;
                page.aniImgs[key][i] = img;
            },

            playAni: function (key, id, fps, num) {
                if (fps == undefined) {
                    fps = 25;
                }
                page.aniKey = key;
                if (page.stage[key] == undefined) {
                    page.len = page.aniImgs[key].length;
                    page.num = 0;
                    page.stage[key] = new createjs.Stage(id);
                    var container = new createjs.Container();
                    page.stage[key].canvas.width = page.imgW;
                    page.stage[key].canvas.height = page.imgH;

                    var data = {
                        "images": page.aniImgs[key],
                        "frames": {width: page.imgW, height: page.imgH, count: page.len, regX: 0, regY: 0},

                        "animations": {
                            run: [0, page.len - 1, num]
                        }
                    };
                    var spriteSheet = new createjs.SpriteSheet(data);
                    var animation = new createjs.Sprite(spriteSheet, "run");
                    container.addChild(animation);
                    page.stage[key].addChild(container);
                }
                page.mov++;
                createjs.Ticker.reset();
                createjs.Ticker.setFPS(fps);
                createjs.Ticker.on("tick", page._canvas.tick);


            },
            tick: function () {
                page.num++;
                page.stage[page.aniKey].update();
            }
        },
        _click: {
            init: function () {
                page._click._click1();
                page._click._click1_1();
            },
            _click1: function () {
               /* $(".link_1").on("click",function(){
                    page.MV.currentTime=111
                })*/
                $(".tap_10086").on("touchstart", function (e) {
                    page.MV.play();
                    page._click._start_out();
                    clearInterval(page.timer_Mc);
                    if (page._close == 0) {
                        page.soundplay._music_open()
                    }
                    page.MV.addEventListener("timeupdate",function(){
                       // console.log(page.MV.currentTime)
                        if(page.MV.currentTime>=122){
                            $(".p1_1").show();
                            page.MV.pause();
                            $(".p1").hide();
                        }
                    })
                    e.preventDefault();
                })
            },

            _click1_1: function () {
                $(".tap_10086").on("touchend", function (e) {
                    page._click._start_in();
                    if (page._close == 0) {
                        page.soundplay._music_close();
                    }
                    page.MV.pause();

                    e.preventDefault();


                })
            },
            _start_out: function () {

                $(".p1_words_1,.p1_words_2,.p1_words_3").hide();
                $(".tap").removeClass("fadeIn").hide();
            },
            _start_in: function () {
                $(".p1_words_3,.tap").show();

            }

        },
        _p1_1: {
            init: function () {
                page._p1_1.swiper_down();
            },
            swiper_down: function () {
                var _el = $(".p1_1");
                var start_y, length_y = 0;
                _el.on("touchstart", function (e) {
                    start_y = e.touches[0].clientY;
                })
                _el.on("touchmove", function (e) {
                    length_y = e.touches[0].clientY - start_y;
                    if (length_y >= 100) {
                        _el.addClass("fadeOut");
                        page.resize();
                        $(".p2").show();
                        setTimeout(function () {
                           // page._canvas.playAni('p1', 'p1', 25, 0);
                            //page.p2._swiper();
                        }, 2000)
                    }
                })

            }
        },
        p2: {
            init: function () {
                page.p2._show();
                page.p2._hide();
                // page.p2._swiper();
                page.p2.video_btn();
                page.p2.video_play();
            },
            _show: function () {
                $(".p2_words_6").on("click", function () {
                    $(".top").show();
                })
            },
            _hide: function () {
                $(".top").on("click", function () {
                    $(this).hide();
                })
            },
            _swiper: function () {
                var mySwier = new Swiper(".swiper-container", {
                    effect: "fade",
                    autoplay: 2000,
                    speed: 2000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    fade: {
                        crossFade: false,
                    },
                    onSlideChangeStart: function (swiper) {
                        page.slide = swiper.activeIndex;
                    }
                })
            },

            video_play: function () {
                $(".video_btn").on("touchstart", function () {
                    page.slide=2;
                    var mv = document.getElementById("video" + page.slide);
                    mv.play();
                })


            },
            video_btn: function () {
                var a = 0;
                setInterval(function () {
                    $(".video_btn").find("img").eq(a).show().siblings().hide();
                    $(".p2_words_5").find("img").eq(a).show().siblings().hide();
                    $(".p2_words_6").find("img").eq(a).show().siblings().hide();
                    a++;
                    if (a >= 4) {
                        a = 0;
                    }
                }, 150)

            }
        }
    };
    page.init();
});
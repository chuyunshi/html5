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
            page.c = document.getElementById("p4");
            page.ctx = page.c.getContext("2d");

            page.imgW = 750;
            page.imgH = 1334;
            page.imgW1 = 750;
            page.imgH1 = 1333;
            page.panzi = 200;
            page._http = "./img/images/";

            page.mov = 0;
            page.time = 0;
            page.aniImgs = {'p0': [], 'p1': [], 'p2': [], 'p3': [], 'p5': [], 'p6': [], 'p7': [], 'p8': [], 'p9': []}

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
                // page.soundplay.music_btn();
                // page.soundplay.sound();
                page.soundplay._music_icon_click();
            },
            sound: function () {
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.registerSound("./img/images/sound/bgm.mp3", "bgm");
                //createjs.Sound.play("bgm");
            },
            _music_icon_click: function () {
                var musicIcon = $(".music_icon");
                page._close = 0;
                musicIcon.on("click", function () {
                    clearInterval(page.timer_Mc)
                    if (page._close == 0) {
                        page.soundplay._music_close();
                        page._close = 1;
                    } else {
                        page.soundplay._music_close();
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
                page.loading._preload1();
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
                page.stage = {};
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
                var manifest = [], str;
                for (var a = 1; a <= 8; a++) {
                    manifest[manifest.length] = './img/p2/' + a + '.png';
                }
                for (var j = 0; j <= 126; j++) {
                    str = page._http + 'end/end' + j + '.jpg';
                    manifest[manifest.length] = str;
                }
                var queueBe = new createjs.LoadQueue(true);
                queueBe.setMaxConnections(150);//设置并发数
                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function () {
                    // var progress = queueBe.progress * 100;
                    // progress = Math.floor(progress);
                });
                queueBe.on("complete", function () {
                    for (var i = 0; i <= 126; i++) {
                        page._canvas.initBitmap("p2", i, page._http + 'end/end' + i + '.jpg')
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
            playAni1: function (key, id, fps, num) {
                if (fps == undefined) {
                    fps = 15;
                }
                page.aniKey = key;
                if (page.stage[key] == undefined) {
                    page.len = page.aniImgs[key].length;
                    page.num = 0;
                    page.stage[key] = new createjs.Stage(id);
                    var container = new createjs.Container();
                    page.stage[key].canvas.width = page.imgW1;
                    page.stage[key].canvas.height = page.imgH1;

                    var data = {
                        "images": page.aniImgs[key],
                        "frames": {width: page.imgW1, height: page.imgH1, count: page.len, regX: 0, regY: 0},

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
                $(".tap_10086").on("touchstart", function (e) {
                    page._click._start_out();
                    clearInterval(page.timer_Mc)
                    if (page._close == 0) {
                        page.soundplay._music_open()
                    }
                    if (page.time <= 3051 && page.time > 5) {
                        if (page._close == 0) {
                            page.crTime = (page.time * 39.6) / 1000;
                            page.BGM.currentTime = page.crTime;
                            page.BGM.play();
                        }
                        page.aniImgs["p" + page.sss] = [];
                        if (page.time <= 399 && page.time > 5) {
                            for (var a = 0; a <= 399 - (page.time - 5); a++) {
                                page._canvas.initBitmap("p" + page.sss, a, page._http + 'panzi/panzi' + (page.time - 5 + a) + ".jpg");
                            }
                        }
                        if (page.time <= 799 && page.time > 399) {
                            for (var b = 0; b <= 799 - (page.time - 5); b++) {
                                page._canvas.initBitmap("p" + page.sss, b, page._http + 'panzi/panzi' + (page.time - 5 + b) + ".jpg");
                            }
                        }
                        if (page.time <= 1199 && page.time > 799) {
                            for (var c = 0; c <= 1199 - (page.time - 5); c++) {
                                page._canvas.initBitmap("p" + page.sss, c, page._http + 'panzi/panzi' + (page.time - 5 + c) + ".jpg");
                            }
                        }
                        if (page.time <= 1599 && page.time > 1199) {
                            for (var d = 0; d <= 1599 - (page.time - 5); d++) {
                                page._canvas.initBitmap("p" + page.sss, d, page._http + 'panzi/panzi' + (page.time - 5 + d) + ".jpg");
                            }
                        }
                        if (page.time <= 1999 && page.time > 1599) {
                            for (var f = 0; f <= 1999 - (page.time - 5); f++) {
                                page._canvas.initBitmap("p" + page.sss, f, page._http + 'panzi/panzi' + (page.time - 5 + f) + ".jpg");
                            }
                        }
                        if (page.time <= 2499 && page.time > 1999) {
                            for (var g = 0; g <= 2599 - (page.time - 5); g++) {
                                page._canvas.initBitmap("p" + page.sss, g, page._http + 'panzi/panzi' + (page.time - 5 + g) + ".jpg");
                            }
                        }
                        if (page.time <= 3051 && page.time > 2499) {
                            for (var h = 0; h <= 3051 - (page.time - 5); h++) {
                                page._canvas.initBitmap("p" + page.sss, h, page._http + 'panzi/panzi' + (page.time - 5 + h) + ".jpg");
                            }
                        }
                        page._canvas.playAni('p' + (page.sss), 'p2', 25, 0);
                        $("#p2").show();
                        page.sss++;
                        // page.time=page.time-5;
                    } else {
                        if (page._close == 0) {
                            page.BGM.play();
                        }
                        page._canvas.playAni('p1', 'p2', 25, 0);
                    }

                    // page._canvas.playAni('p1', 'p2', 16,0);
                    // $("#p2").show()

                    //var s = createjs.Sound.play("sound1");
                    // s.volume=s.volume*0.8
                    // $(this).hide()
                    page.flag = page.time;
                    page.timer = setInterval(function () {
                        page.time++;
                        // console.log(page.time+"---"+page.BGM.currentTime);
                        //console.log(page.time);
                        if (page.time == 398) {
                            page._canvas.playAni('p3', 'p4', 25, 0);
                            $("#p4").show();

                        }
                        if (page.time == 798) {
                            page._canvas.playAni('p7', 'p5', 25, 0);
                            $("#p5").show();

                        }
                        if (page.time == 1198) {
                            page._canvas.playAni('p5', 'p6', 25, 0);
                            $("#p6").show();

                        }
                        if (page.time == 1598) {
                            page._canvas.playAni('p6', 'p7', 25, 0);
                            $("#p7").show();

                        }
                        if (page.time == 1998) {
                            page._canvas.playAni('p8', 'p8', 25, 0);
                            $("#p8").show();
                        }
                        if (page.time == 2498) {

                            page._canvas.playAni('p9', 'p9', 26, 0);
                            $("#p9").show();

                        }
                        if (page.time == 3051) {
                            $(".tap_10086").unbind("touchend")
                            setTimeout(function () {
                                page.loading._preload2();
                                $(".p1").hide();
                                $(".p1_1").show();
                            }, 600)
                        }
                    }, 40);

                    e.preventDefault();


                })
            },
            _click1_1: function () {
                page.sss = 10;
                $(".tap_10086").on("touchend", function (e) {
                    page.BGM.pause();
                    page._click._start_in();
                    if (page._close == 0) {
                        page.soundplay._music_close();
                    }
                    console.log(page.num)
                    page.qw += page.num;
                    page.aniImgs["p" + page.sss] = [];
                    //console.log(page.num)
                    clearInterval(page.timer);

                    page.length = page.time - page.flag;
                    // console.log(page.length);
                    if (page.length >= 5) {
                        page.time = page.time - 5;
                    }

                    if (page.time < 3051) {
                        for (var b = 0; b <= 5; b++) {
                            page._canvas.initBitmap("p" + page.sss, b, page._http + 'panzi/panzi' + (page.time - b) + ".jpg");
                        }
                        page._canvas.playAni('p' + page.sss, 'p1', 25, 0);

                    }

                    setTimeout(function () {
                        $("#p2").hide();
                        $("#p4,#p5,#p6,#p7,#p8,#p9").hide();

                        page.sss++
                    }, 40)

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
                        $(".p2").show();
                        setTimeout(function () {
                           // page._canvas.playAni1('p2', 'p3', 25, 0);
                           // page.p2._swiper();
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
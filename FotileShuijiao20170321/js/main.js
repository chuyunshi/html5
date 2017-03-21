function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
temp = getUrlParam('temp');
temp = temp == null ? "水槽 先碗机" : temp;
num = getUrlParam('num');
num = num == null ? 1 : num;
index = getUrlParam('index');
index = index == null ? 2 : index;
video = getUrlParam('video');
video = video == null ? 1 : video;
$(document).ready(function() {
    var pageH, pageW;
    page = {
        init: function() {
            $('body').on("touchmove", function(e) {
                //e.preventDefault();
            });
            window.addEventListener("touchstart", function(e) {
                //e.preventDefault();
            });
            $(window).resize(function() {
                page.resize();
            });
            page.imgW = 531;
            page.imgH = 1817;
            page.imgW1 = 750;
            page.imgH1 = 1334;
            if (index == 0) {
                $(".zzz").css("margin-left", "1rem");
                $(".video_name").css("margin-left", "0.5rem");
            }
            page.name = temp;
            page.num = num; //0两点水，1三点水；
            page.index = index; //空格下标；第一个有水的下标
            //_shareName = temp;
            //_num = num;
            //_index = index;
            //_video = video;
            page.BGM = document.getElementById("bgm");
            page.DIE = document.getElementById("die");
            page.MV = document.getElementById("video" + video);
            $("#video" + video).show();
            page.aniImgs = {
                'p0': [],
                'p1': [],
                'p2': [],
                'p3': [],
                'p5': [],
                'p6': [],
                'p7': [],
                'p8': [],
                'p9': []
            };
            page.resize();
            page.loading.init();
            page.p1.init();
            page.p2.init();
            page.video.init();
        },
        loading: {
            init: function() {
                page.loading._preload();
                var l_t = 1;
                var num_loading;
                var timer_loading = setInterval(function() {
                    if (l_t < 50) {
                        l_t = l_t + 4;
                    } else {
                        l_t = l_t * 1.04;
                    }
                    $(".panzi1").css("-webkit-transform", "rotateZ(" + l_t + "deg)")
                    if (l_t >= 5000) {
                        clearInterval(timer_loading);
                        $(".loading").hide();
                        $(".p1").show();
                        page.p1.btn_click();
                    }
                }, 100);
            },
            _preload: function() {
                page.stage = {};
                var manifest = [],
                    str;
                for (var j = 0; j <= 68; j++) {
                    str = './img/2/2_000' + j + '.png';
                    manifest[manifest.length] = str;
                }
                for (var i = 0; i <= 68; i++) {
                    str = './img/3/3_000' + i + '.png';
                    manifest[manifest.length] = str;
                }
                for (var k = 1; k <= 233; k++) {
                    str = './img/ending_750/end' + i + '.png';
                    manifest[manifest.length] = str;
                }
                for (var a = 0; a <= 68; a++) {
                    page._canvas.initBitmap("p0", a, './img/2/2_000' + a + '.png')
                }
                for (var b = 0; b <= 68; b++) {
                    page._canvas.initBitmap("p1", b, './img/3/3_000' + b + '.png')
                }
                for (var c = 0; c <= 232; c++) {
                    page._canvas.initBitmap("p2", c, './img/ending_750/end' + (c + 1) + '.png')
                }
                var queueBe = new createjs.LoadQueue(false);
                queueBe.setMaxConnections(50); //设置并发数
                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function() {
                    var progress = queueBe.progress * 100;
                    progress = Math.floor(progress);
                });
                queueBe.on("complete", function() {
                    page._canvas.playAni('p' + page.num, 'c' + page.num, 25, 0);
                    setTimeout(function() {
                        createjs.Ticker.reset();
                    }, 60);
                   /* $.getScript('js/font.js', function() {
                        console.log('success');
                    });*/
                });
                queueBe.loadManifest(manifest);
            },
        },
        _canvas: {
            initBitmap: function(key, i, strurl) {
                var img = new Image();
                img.src = strurl;
                page.aniImgs[key][i] = img;
            },
            playAni: function(key, id, fps, num) {
                if (fps == undefined) {
                    fps = 25;
                }
                page.aniKey = key;
                if (page.stage[key] == undefined) {
                    page.len = page.aniImgs[key].length;
                    page.num_0=0;
                    page.stage[key] = new createjs.Stage(id);
                    var container = new createjs.Container();
                    page.stage[key].canvas.width = page.imgW;
                    page.stage[key].canvas.height = page.imgH;
                    var data = {
                        "images": page.aniImgs[key],
                        "frames": {
                            width: page.imgW,
                            height: page.imgH,
                            count: page.len,
                            regX: 0,
                            regY: 0
                        },
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
            playAni1: function(key, id, fps, num) {
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
                        "frames": {
                            width: page.imgW1,
                            height: page.imgH1,
                            count: page.len,
                            regX: 0,
                            regY: 0
                        },
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
                createjs.Ticker.on("tick", page._canvas.tick1);
            },
            tick: function() {
                page.stage[page.aniKey].update();
                page.num_0++;
                if(page.num_0==68){
                    $(".cd").anim({
                        "top": "24.5rem"
                    }, 2,'ease-in-out',function(){
                        $(".p1").hide();
                        $(".video").show();
                       /* setTimeout(function(){
                            $(".video_cd_img").addClass("playing1-stop");
                        },2000)*/
                        createjs.Ticker.reset();
                    })


                }
            },
            tick1: function() {
                page.num++;
                page.stage[page.aniKey].update();
                if(page.num==113){
                    $(".p2_center").show();
                }
                if (page.num == page.len) {
                    $(".p2_logo2").show()
                    $(".p2_btn").show();
                }
            }
        },
        p1: {
            init: function() {
                //page.p1.btn_click();

                var entity={
                    AccessKey:'a59d53f7bbff47908015c24c37e97e05',
                    Content:page.name
                };
                $youzikuClient.getFontFace(entity, function (result) {
                    $(".zzz").html(page.name).css("opacity", '1');
                });
                $(".video_name").html(page.name);

                $("#c" + page.num).css("left", (2.5 * page.index - 1) + "rem");
                $("canvas").show();
               ;
                if (page.name == "水槽 先碗机") {
                    $(".my1").hide();
                    $(".my2").show();
                    $(".woshi").html("我是方太");
                    var entity1={
                        AccessKey:'a59d53f7bbff47908015c24c37e97e05',
                        Content:"我是方太"
                    };
                    $youzikuClient.getFontFace(entity1, function (result) {
                        $(".woshi").html("我是方太");
                    });
                }
               /* $.getScript("http://cdn.webfont.youziku.com/wwwroot/js/wf/youziku.api.min.js", function() {
                    console.log("success");
                })
                $youziku.load(".wdxzh", "3e27dcb216644afc9b883af0e88ed6a8", "hdjtechuhei");
                $youziku.draw(0);
                $youziku.ajaxfont()*/
            },
            btn_click: function() {
                page.p1._btn_true();
                page.p1._canvas_play(page.num);
                $.getScript('js/share.js', function() {
                    console.log('重新加载');
                });
            },
            _btn_true: function() {
                $(".p1_btn").hide();
                $(".cd").anim({
                    "top": "8.5rem"
                }, 2);
            },
            _canvas_play: function(num) {
                setTimeout(function() {
                    page._canvas.playAni('p' + num, 'c' + num, 25, 0);
                }, 2500);
                /*setTimeout(function() {
                    createjs.Ticker.reset();
                    $(".p1").hide();
                    $(".video").show();
                    page.DIE.pause();
                }, 6000)*/
            },
        },
        p2: {
            init: function() {
                page.p2._btn_click();
            },
            _btn_click: function() {
                $(".btn_also").on("click", function() {
                    page.BGM.pause();
                    window.location.href = "index2.html";
                })
            }
        },
        video: {
            init: function () {
                var first_btn = $(".video_first_btn");
                page.open = 0;
                $(".video_btn").on("click", function () {
                    if (page.open == 0) {
                        $(".video_open").hide();
                        $(".video_close").show();
                        page.MV.play();
                        page.open = 1;
                    } else {
                        $(".video_open").show();
                        $(".video_close").hide();
                        page.MV.pause();
                        page.open = 0;
                    }
                });
                first_btn.on("touchstart",function(e){
                    e.preventDefault();
                    page.DIE.play();
                    page.MV.play();
                    page.open = 1;
                    $(".video_line,.video_hand").hide();
                    $(".video_cd_img").addClass("playing1").anim({
                        "top": "-13.6rem"
                    },1,'ease-in-out',function(){
                        $(".video_first_btn").hide();
                        $(".video_open").hide();
                        $(".video_close").show();
                        $(".video_top").show();
                        page.video.video_control();
                    });
                    $(".video_center").hide();

                    $(".video").on("touchstart",function(){
                        clearTimeout(page.video_control_timer);
                        page.video.video_control();
                    })
                });

                page.video.meToo();
                page.video.video_open();
            },
            video_open: function () {
                var video_left, _left;
                var start_time, start_time_m, start_time_s;
                var end_time = 0,
                    end_time_m, end_time_s;
                var rem_num = pageW/16;
                var px_num =Math.floor(11.7185*rem_num);
                var el = $(".jindu_move");
                var move_left = $(".jindutiao_box");
                var start_x, move_x, length_x = 0;
                var move_left_all;
                el.on("touchstart", function (e) {
                    start_x = e.touches[0].pageX;
                    page.MV.pause();
                    _left = Math.floor((page.MV.currentTime / page.MV.duration) * px_num);
                });
                el.on("touchmove", function (e) {
                    length_x = e.touches[0].pageX - start_x;
                    //console.log(length_x);
                    if (length_x + _left >= px_num - 5) {
                        length_x = px_num - _left - 5;
                    }
                    move_left_all = px_num - (length_x + _left);
                    move_left.css("left", -move_left_all);
                    page.MV.currentTime = ((length_x + _left) / px_num) * page.MV.duration;
                });
                el.on("touchend", function (e) {
                    if (page.open == 1) {
                        page.MV.play();
                    }
                });
                // $(".video_btn,.video_first_btn").on("click", function () {
                end_time = page.MV.duration;
                page.MV.addEventListener("timeupdate", function () {
                    start_time = Math.floor(page.MV.currentTime);
                    start_time_m = Math.floor(start_time / 60);
                    start_time_s = start_time % 60;
                    if (start_time_s > 9) {
                        $(".s_s").html(start_time_s);
                    } else {
                        $(".s_s").html("0" + start_time_s);
                    }
                    if (end_time_m > 9) {
                        $(".s_m").html(start_time_m);
                    } else {
                        $(".s_m").html("0" + start_time_m);
                    }
                    if(page.MV.currentTime ==2){
                        //$(".video_control").show();
                        //px_num = $(".jindutiao").width();
                    }
                    if (page.MV.currentTime >= page.MV.duration) {
                        page.MV.pause();
                        $(".video_open").show();
                        $(".video_close").hide();
                        open = 0;
                        $(".video").hide();
                        $(".p2").show();
                        page._canvas.playAni1('p2', 'p2_canvas', 25, 0)
                        setTimeout(function () {
                            $(window).scrollTop(1);
                        }, 0);
                        page.device.init();
                        page.BGM.play();
                        wx.getNetworkType({
                            success: function (res) {
                                page.BGM.play();
                            }
                        });
                    }
                    move_left.css("left", ((page.MV.currentTime / page.MV.duration) * px_num) - px_num);
                });

                //})
            },
            video_control:function(){
                $(".video_control").show();
                page.video_control_timer = setTimeout(function(){
                    $(".video_control").hide();
                },4000)
            },
            meToo: function () {
                $(".video_btn_other").on("click", function () {
                    page.MV.pause();
                    $(".video").hide();
                    $(".p2").show();
                });
                $(".video_btn_10").on("click", function () {
                    page.MV.pause();
                    $(".video").hide();
                    $(".p3").show();
                    page.p3.wave1();
                    page.p3.wave2();
                    page.p3.wave3();
                    page.p3._active_num();
                    page.p3._active_list();
                    page.BGM.play();

                    //page._canvas.playAni1('p2', 'p2_canvas', 25, 0)
                });
                $(".video_btn_11").on("click", function () {
                    $(".pub_popup").show();
                    page.p2._share_pic()
                });
            }
        },
        device: {
            init: function() {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                }
                var x = 0,
                    y = 0,
                    lx = 0,
                    ly = 0,
                    speed = 0.2,
                    p2Move1 = $(".p2_move_1"),
                    p2Move2 = $(".p2_move_2"),
                    p2Move3 = $(".p2_move_3"),
                    mx, my;

                function deviceMotionHandler(eventData) {
                    var acceleration = eventData.accelerationIncludingGravity;
                    x = acceleration.x;
                    y = acceleration.y;
                    if (Math.abs(lx - x) > speed) {
                        mx = x * 2;
                        my = y * 2;
                        lx = x;
                        ly = y;
                        p2Move1.css({
                            "left": mx + "px",
                            "top": my + "px"
                        });
                        p2Move2.css({
                            "left": mx + "px",
                            "top": -my + "px"
                        });
                        p2Move3.css({
                            "left": -mx + "px",
                            "top": -my + "px"
                        });
                    }
                }
            }
        },
        resize: function() {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('.canvas_pub').attr('width', page.imgW).attr('height', page.imgH)
        }
    };
    page.init();
});
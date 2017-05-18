/**
 * Created by chuyunshi on 2017/5/10.
 */
$(document).ready(function() {
    var pageH, pageW;
    page = {
        init: function () {
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            window.addEventListener("touchstart", function (e) {
                //e.preventDefault();
            });


            $(window).resize(function () {

                setTimeout(function () {
                    page.resize();
                    page.video_center()
                }, 100)
            });
            window.addEventListener("orientationchange", function () {
                setTimeout(function () {
                    page.resize();
                    page.video_center()
                }, 200)
            }, false);
            page.imgW = 667;
            page.imgH = 375;
            page.aniImgs = {'p0': [], 'p1': [], 'p2': [], 'p3': [], 'p4': [], 'p5': []}
            page.BGM = $('.bgm')[0];
            page.resize();
            page.loading.init();
            page.video1 = document.getElementById("video_1");
            page.ban = '';
            page.closepage = '';
            page.openpage = '';
            page.video = '';
            page.hand = true;
            page.timer = true;
            page.NG = false;
            page.timer1 = true;
            page.NG1 = false;
            page.clear = '';
            page.c1 = "";
            page.last = true;
            page.sound.init();
            page.flag = 1;
            page.playVideo = 1;
            page.video_11 = true;
            page.video_22 = false;
            page.video_33 = false;
            page.video_44 = false;
            page.video_55 = false;
            page.video_66 = false;
            //播放起止时间
            page.videoTime = {
                1: [0, 40 * 1000 + 15 * 40],
                2: [41 * 1000 + 12 * 40, 97 * 1000 + 10 * 40],
                3: [296 * 1000 + 19 * 40, 404 * 1000 + 11 * 40],
                4: [97 * 1000 + 21 * 40, 189 * 1000 + 10 * 40],
                5: [189 * 1000 + 22 * 40, 295 * 1000 + 10 * 40],
                6: [404 * 1000 + 22 * 40, 441 * 1000 + 6 * 40]
            };
        },
        loading: {
            //虚拟加载,下面有preload预加载
            init: function () {
                var num = 0;
                var pic_num = 0;
                var loading_text_num = 0;
                var loading_text_words = ''

                var loading_num = $("#loading_num");
                var loading_pic = $(".header_pic img")
                var loading_text = $(".loading_text")

                var pic_change_timer = setInterval(function () {
                    pic_num++;
                    loading_text_num++
                    loading_text_words += "."
                    if (pic_num >= 4) {
                        pic_num = 0;
                    }
                    if (loading_text_num >= 7) {
                        loading_text_words = ''
                        loading_text_num = 0
                    }
                    loading_text.html("loading" + loading_text_words)
                    loading_pic.eq(pic_num).show().siblings().hide()

                }, 600);
                var loading_timer = setInterval(function () {
                    num += 1;
                    loading_num.html(num + "%");
                    if(num>=40){
                        $("#errorScreen").addClass("fadeOut")
                    }
                    if (num >= 100) {
                        clearInterval(loading_timer);
                        clearInterval(pic_change_timer);
                        $("#errorScreen").hide();
                        $(".loading_hide").hide();
                        $(".loading_btn").show();
                        setTimeout(function () {
                            setTimeout(function () {
                                $(window).scrollTop(1);
                            }, 0);
                            page.BGM.play();
                        }, 1000)
                        setTimeout(function () {
                            $(".load_btn").show().addClass("bsb")
                        }, 2000)
                    }
                }, 50)

                $(".load_btn").on("click", function () {
                    createjs.Sound.play("click");
                    $(".load_btn").find("img").eq(0).hide();
                    $(".load_btn").find("img").eq(1).show();
                    $(".btn_head").css("transform", "rotate(10deg)")
                    setTimeout(function () {
                        $(".btn_head").css("transform", "rotate(0deg)")
                        page.video1.play();
                        $(".loading").hide();
                        page.video_guide_1.init();
                    }, 400)
                });
                page.loading._preload();
            },

            _preload: function () {
                var manifest = [
                    './img/shupin.jpg', './img/shupin_text.png', './img/bg.jpg',
                    './img/loading/black.png', './img/loading/btn_head.png', './img/loading/loading_bg.jpg', './img/loading/loading_btn1.png', './img/loading/loading_btn2.png', './img/loading/loading_pic_right.png', './img/caidan/bong.png', './img/caidan/bottom.png', './img/caidan/btn33.png', './img/caidan/btn44.png', './img/caidan/light.png', './img/caidan/ready.png', './img/video1/bg.png', './img/video1/btn_next.png', './img/video1/btn_start.png', './img/video1/v1_text.png', './img/video1/zhengban.png', './img/video2/btn_center.png', './img/video2/btn_center_next.png', './img/video2/btn_left.png', './img/video2/btn_left_next.png', './img/video2/btn_right.png', './img/video2/btn_right_next.png', './img/video2/hand_black.png', './img/video2/hand_white.png', './img/video2/mengliao_text.png', './img/video2/none_see.png', './img/video2/shaqin.png', './img/video2/text_first.png', './img/video2/text_left.png', './img/video2/text_right.png', './img/videoBox/box.png', './img/videoBox/box2.png', './img/videoBox/mains.png', './img/videoBox/mains1.png', './img/videoBox/rec.png', './img/videoMain/btn11.png', './img/videoMain/btn22.png', './img/videoMain/btn33.png', './img/videoMain/btn1.png', './img/videoMain/btn2.png', './img/videoMain/btn3.png', './img/videoMain/c1_center.png', './img/videoMain/c1_left.png', './img/videoMain/c1_right.png', './img/videoMain/c2_center.png', './img/videoMain/c2_left.png', './img/videoMain/c2_right.png', './img/videoMain/center.png', './img/videoMain/head1.png', './img/videoMain/head2.png', './img/videoMain/left.png', './img/videoMain/pic1.png', './img/videoMain/pic2.png', './img/videoMain/progress_box.png', './img/videoMain/progress_box1.png', './img/videoMain/progress_content.png', './img/videoMain/progress_next.png', './img/videoMain/progress_success.png', './img/videoMain/progress_top.png', './img/videoMain/right.png', './img/videoMain/share_page.jpg', './img/videoMain/share_text.png', './img/videoMain/title_text.png'

                ];
                for (var a = 1; a <= 4; a++) {
                    manifest[manifest.length] = './img/caidan/btn' + a + '.png';
                    manifest[manifest.length] = './img/loading/loading_pic' + a + '.png';
                }
                for (var b = 1; b <= 5; b++) {
                    manifest[manifest.length] = './img/caidan/xing' + b + '.png';
                }
                for (var c = 1; c <= 8; c++) {
                    manifest[manifest.length] = './img/daban/ban_' + c + '.png';
                }
                for (var d = 1; d <= 9; d++) {
                    manifest[manifest.length] = './img/video2/star' + d + '.png';
                }

                var queueBe = new createjs.LoadQueue(false);
                queueBe.setMaxConnections(10);
                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function () {
                    var progress = queueBe.progress * 100;
                    progress = Math.floor(progress);
                    //console.log(progress);

                    // $(".page_Box").show();

                });
                queueBe.on("complete", function () {

                });
                queueBe.loadManifest(manifest);
            },
            _preload_canvas: function () {
                page.stage = {};
                for (var a = 0; a <= 40; a++) {
                    page._canvas.initBitmap("p0", a, './img/canvasPic/1/' + a + '.jpg')
                }
                for (var b = 0; b <= 55; b++) {
                    page._canvas.initBitmap("p1", b, './img/canvasPic/2/' + b + '.jpg')
                }
                for (var c = 0; c <= 91; c++) {
                    page._canvas.initBitmap("p2", c, './img/canvasPic/3/' + c + '.jpg')
                }
                for (var d = 0; d <= 105; d++) {
                    page._canvas.initBitmap("p3", d, './img/canvasPic/4/' + d + '.jpg')
                }
                for (var e = 0; e <= 107; e++) {
                    page._canvas.initBitmap("p4", e, './img/canvasPic/5/' + e + '.jpg')
                }
                for (var f = 0; f <= 35; f++) {
                    page._canvas.initBitmap("p5", f, './img/canvasPic/6/' + f + '.jpg')
                }
            }
        },
        //序列帧动画
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
                    //重置；
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
                if (page.num == 40 && page.video_11) {
                    console.log(page.num)
                    page.video_11 = false
                }
                if (page.num == 55 && page.video_22) {
                    console.log(page.num)
                    page.video_22 = false
                }
                if (page.num == 91 && page.video_33) {
                    console.log(page.num)
                    page.video_33 = false
                }
                if (page.num == 105 && page.video_44) {
                    console.log(page.num)
                    page.video_44 = false
                }
                if (page.num == 107 && page.video_55) {
                    console.log(page.num)
                    page.video_55 = false
                }
                if (page.num == 35 && page.video_66) {
                    console.log(page.num)
                    page.video_66 = false
                }
            }
        },
        //声音预加载
        sound: {
            init: function () {
                page.sound.sound_load();
            },
            sound_load: function () {
                createjs.Sound.alternateExtensions = ["mp3", "wav"];
                createjs.Sound.registerSound("./img/media/sound/click.mp3", "click");
                createjs.Sound.registerSound("./img/media/sound/daban.mp3", "daban");
                createjs.Sound.registerSound("./img/media/sound/zhang.mp3", "zhang");
                createjs.Sound.registerSound("./img/media/sound/jingguang.mp3", "jingguang");
                createjs.Sound.registerSound("./img/media/sound/yinbi.mp3", "yinbi");
                createjs.Sound.registerSound("./img/media/sound/ng.mp3", "ng");
                createjs.Sound.registerSound("./img/media/sound/kuaizou.mp3", "kuaizou");
                createjs.Sound.registerSound("./img/media/sound/share.mp3", "share");
                createjs.Sound.registerSound("./img/media/sound/left.mp3", "left");
                createjs.Sound.registerSound("./img/media/sound/center.mp3", "center");
                createjs.Sound.registerSound("./img/media/sound/right.mp3", "right");
                createjs.Sound.registerSound("./img/media/sound/black.mp3", "black");
                createjs.Sound.registerSound("./img/media/sound/dazhizuo.mp3", "dazhizuo");
                createjs.Sound.registerSound("./img/media/sound/godie.mp3", "godie");
                createjs.Sound.registerSound("./img/media/sound/weixin.mp3", "weixin");
                createjs.Sound.registerSound("./img/media/sound/weixin2.mp3", "weixin2");
                createjs.Sound.registerSound("./img/media/sound/wuli.mp3", "wuli");
                createjs.Sound.registerSound("./img/media/sound/lihai.mp3", "lihai");
                createjs.Sound.registerSound("./img/media/sound/who.mp3", "who");
                createjs.Sound.registerSound("./img/media/sound/titleshow.mp3", "titleshow");
                createjs.Sound.registerSound("./img/media/sound/btnshow.mp3", "btnshow");
                createjs.Sound.registerSound("./img/media/sound/alsoegg.mp3", "alsoegg");
                createjs.Sound.registerSound("./img/media/sound/shaqin.mp3", "shaqin");
                createjs.Sound.registerSound("./img/media/sound/shaqin2.mp3", "shaqin2");
                createjs.Sound.registerSound("./img/media/sound/beng.mp3", "beng");


                // createjs.Sound.play("click");


            }
        },
        //视频控制
        videoTimeUpdate: function () {
            var nowTime = page.video1.currentTime * 1000;
            // console.log('nowTime', nowTime);
            if (page.playVideo == 1) {
                //第一段视频
                //视频播放大于21秒出现动画
                if (page.video_guide_1.noVideoBG && nowTime >= 21000) {
                    page.video_guide_1.noVideoBG = false;
                    $(".video1_bg").show();
                    page.video_center();
                    setTimeout(function () {
                        $(".v1_text").show()
                        if (page.video_guide_1.sound_run) {
                            createjs.Sound.play("dazhizuo");
                        }
                        page.video_guide_1.sound_run = false
                    }, 1000);
                    setTimeout(function () {
                        $(".video1_btn").show()
                    }, 3000);
                    setTimeout(function () {
                        $(".zhengban").show()
                    }, 4000)
                    setTimeout(function () {
                        $(".btn_head,.zhengban").addClass("leftbottom")
                        $(".video1_btn .btn1").addClass("bsb")
                    }, 4500)
                }
                //视频播放大于30秒,暂停
                if (page.video_guide_1.notStop && nowTime >= page.videoTime[1][1]) {
                    page.video1.pause();
                }
            } else if (page.playVideo == 2) {
                //第二段视频
                page.left_num = Math.floor((nowTime - page.videoTime[2][0]) / 1000);  //起始时间为当前时间减去端视频起始时间
                //ng5S
                if (page.left_num >= 5) {
                    if (page.timer1) {
                        $(".progress_success1").show();
                        var name = "progress_right1"
                        page.video_main.progress_right_pic_change(name)
                        createjs.Sound.play("beng");
                    }
                    page.timer1 = false;
                    page.NG1 = true
                }

                page.video_guide_2.progress_num.html(page.left_num + "s");
                page.video_guide_2.progress_content.css("left", -100 + (page.left_num * 20) + "%")

                //执行手遮挡动画
                if (page.video_guide_2.noAction1 && nowTime > (45000 + page.videoTime[2][0])) {
                    page.video_guide_2.noAction1 = false;
                    $(".progress1").hide();
                    //避免多次回调重复执行动画
                    if (page.hand) {
                        page.video_guide_2.hand_animated()
                    }
                    page.hand = false;
                }
                // console.log('page.videoTime[2][1]', page.videoTime[2][1]);
                if (nowTime >= page.videoTime[2][1]) {//第二段视频结束
                    page.video1.pause();
                }
            } else if (page.playVideo == 3) {
                //三个视频选择
                page.left_num = Math.floor((nowTime - page.videoTime[page.video_id][0]) / 1000);
                //ng30S
                if (page.left_num >= 10) {
                    if (page.timer) {
                        $(".progress_success").show();
                        var name = "progress_right";
                        page.video_main.progress_right_pic_change(name)
                        createjs.Sound.play("beng");
                    }
                    page.timer = false;
                    page.NG = true
                }
                //主视频播放结束
                if (page.videoNoEnd && nowTime >= page.videoTime[page.video_id][1]) {
                    if (page.last) {
                        page.video_main.c1_pic_change(page.c1);
                        page.last = false
                    }
                    $(".btn1").show();
                    $(".btn2").hide();
                    $(".popupBtn").show();
                    clearInterval(page.progressTimer)
                    if (page.video_main._soundplay) {
                        page.video1.pause();
                        setTimeout(function () {
                            createjs.Sound.play("titleshow");
                        }, 1000)
                        setTimeout(function () {
                            $(".btn_pub").show()
                            createjs.Sound.play("btnshow");
                        }, 3000)
                    }
                    page.video_main._soundplay = false;

                    setTimeout(function () {
                        //$(".progress").hide();
                    }, 1000)

                }

                page.video_main.progress_num.html(page.left_num + "s");
                page.video_main.progress_content.css("left", -100 + (page.left_num * 10) + "%")
            } else if (page.playVideo == 6) {
                if (page.caidan.NotEnd && nowTime >= page.videoTime[6][1]) {
                    page.caidan.NotEnd = false;
                    var num = Math.floor(Math.random() * 2)
                    $(".caidan_end").show();
                    if (num == 0 && page.flag == 1) {
                        setTimeout(function () {
                            createjs.Sound.play("shaqin");
                        }, 1000);
                        page.flag = 0
                    } else if (num == 1 && page.flag == 1) {
                        setTimeout(function () {
                            createjs.Sound.play("shaqin2");
                            // console.log(1113)
                        }, 1000)
                        page.flag = 0
                    }
                }
            }
        },
        video_guide_1: {
            init: function () {
                $(".video_guide_first,.video_area").show();
                page.video_center()
                page.video_guide_1.video_run();
            },
            video_run: function () {
                //监听视频1播放
                page.video_guide_1.sound_run = true;
                //监听视频播放，下同
                page.playVideo = 1;
                page.video_guide_1.noVideoBG = true;
                page.video_guide_1.notStop = true;
                //page.video1.playbackRate = 4;  //调整播放速度,调试使用
                page.video1.addEventListener("timeupdate", page.videoTimeUpdate);

                $(".video1_btn").on("click", function () {
                    $(this).hide();
                    $(".v1_text").hide();
                    page.video1.pause();
                    createjs.Sound.play("click");
                    $(this).children(".btn2").show();
                    $(this).children(".btn1").hide();
                    //获取打板
                    var ban = $(this).data("ban");
                    page.ban = $("." + ban);
                    page.openpage = $(".video_guide_secend");
                    page.closepage = $(".video_guide_first");
                    //获取播放视频
                    //page.video = document.getElementById("video_2");
                    page.video_guide_2.init();
                })
            },
            btn_click: function () {
                //跳过1
                $(".tiaoguo1").on("click", function () {
                    page.video1.pause();
                    $(".video1_bg").show();
                    setTimeout(function () {
                        $(".v1_text").show()
                        createjs.Sound.play("dazhizuo");
                    }, 1000);
                    setTimeout(function () {
                        $(".video1_btn").show()
                    }, 3000);
                    setTimeout(function () {
                        $(".zhengban").show()
                    }, 4000)
                    setTimeout(function () {
                        $(".btn_head,.zhengban").addClass("leftbottom")
                        $(".video1_btn .btn1").addClass("bsb")
                    }, 4500)
                })
                $(".video1_btn1").one("click", function () {
                    page.video2 = document.getElementById("video_2");
                    page.video3 = document.getElementById("video_3");
                    page.video4 = document.getElementById("video_4");
                    page.video5 = document.getElementById("video_5");
                    page.video6 = document.getElementById("video_6");
                })
            }

        },
        video_guide_2: {
            init: function () {
                page.video_guide_2.video_run();
                page.video_guide_2.btn_click();
                //page.video_guide_2.pic_change();
                page.video_guide_2.weixin_click();
            },
            video_run: function () {
                var _click = true;
                page.video_guide_2.progress_num = $(".progress_num1");
                page.video_guide_2.progress_content = $(".progress_content1");

                //跳过2
                $(".tiaoguo2").on("click", function () {
                    page.video1.pause();
                    $(".talk_words").show()
                    $(".v2_text").hide();
                    $(".boTtom").show()
                    setTimeout(function () {
                        $(".mengliao_text").show();
                    }, 1000);
                    setTimeout(function () {
                        $(".v2_btn").show()
                    }, 2000);
                    setTimeout(function () {
                        createjs.Sound.play("who")
                    }, 3000)
                });

                page.playVideo = 2; //第二段视频
                page.video_guide_2.noAction1 = true;
                //page.video1.play();
                var start = page.videoTime[2][0] / 1000;
                page.video1.currentTime = start;
                page.daban();

                $(".progress1").on("click", function () {
                    if (page.NG1) {
                        createjs.Sound.play("ng");
                        page.video1.pause();
                        $(".progress1").hide();
                        page.video_guide_2.hand_animated()
                    }
                })
            },
            hand_animated: function () {
                $(".hand_box").anim({
                    "right": "-30px"
                }, 0.5, "ease-in-out", function () {
                    $(".hand_black").show();
                    setTimeout(function () {
                        $(".hand_black").anim({
                            "opacity": "1"
                        }, 2.5, "ease-in-out");
                        $(".hand_box").anim({
                            "right": "80px",
                            "transform": "scale(2)"
                        }, 2.5, "ease-in-out", function () {
                            $(".none_see").show();
                            createjs.Sound.play("godie");
                            setTimeout(function () {
                                $(".none_see").hide();
                                $(".talk_words").show();
                                createjs.Sound.play("weixin")
                                createjs.Sound.play("wuli")
                            }, 5000)
                            setTimeout(function () {
                                //$(".hand_box").hide();
                                $(".text_first").addClass("inOut")
                                page.nextTimer = setTimeout(function () {
                                    page.video_guide_2.btn_show();
                                    console.log("time_run")
                                }, 4000)
                            }, 6000)
                        })
                    }, 500)
                })
            },
            weixin_click: function () {
                //杨洋微信点击后执行动画
                $(".text_first").on("click", function () {
                    clearTimeout(page.nextTimer);
                    page.video_guide_2.btn_show();
                });

            },
            btn_show: function () {
                $(".text_first").hide();
                $(".hand_box").hide();
                createjs.Sound.play("weixin2")
                setTimeout(function () {
                    $(".text_left").show()
                }, 1000)

                setTimeout(function () {
                    createjs.Sound.play("lihai")
                }, 1000);
                setTimeout(function () {
                    createjs.Sound.play("weixin2")
                    setTimeout(function () {
                        $(".text_right").show()
                    }, 1000)
                }, 2000);
                setTimeout(function () {
                    $(".mengliao_text").show();
                    $(".boTtom").show()
                }, 6000);
                setTimeout(function () {
                    $(".v2_btn").show()
                }, 7000);
                setTimeout(function () {
                    createjs.Sound.play("who")
                }, 8000)
            },
            btn_click: function () {
                $(".talk_words .btn").on("click", function () {
                    page.last = true;
                    // page.video.pause()
                    clearInterval(page.c1Timer);
                    $(".popupBtn").hide()
                    $(".progress_pic4,.progress_pic3").hide();

                    //移除返回选择页动画
                    $(".v2_text").hide();
                    $(".v2_back").removeClass("fadeIn fadeInUp fadeInRight");
                    $(".progress_next").hide();
                    $(".progress_success").hide();
                    //解决快速点击出现的bug
                    //clearTimeout(page.clear)
                    $(".this").removeClass("big_small1");
                    $(".btn1").removeClass("big_small2")
                    //显示被人为隐藏的进度条
                    $(".progress").show();
                    //变量重置
                    page.timer = true;
                    page.NG = false;
                    //page.video.pause();
                    $(this).children(".btn1").hide();
                    $(this).children(".btn2").show();

                    //增加印章效果2
                    if (!$(this).children(".shaqin").hasClass("this")) {
                        var $this = $(this)
                        setTimeout(function () {
                            $this.children(".btn1").addClass("big_small2")
                        }, 2000)
                    }
                    //标记即将进行的杀青动画
                    $(this).children(".shaqin").addClass("this");
                    page.video_id = $(this).data("name");
                    if (page.video_id == "3") {
                        createjs.Sound.play("left");
                        page.c1 = "left_c1"
                    } else if (page.video_id == "4") {
                        createjs.Sound.play("center");
                        page.c1 = "center_c1"
                    } else {
                        createjs.Sound.play("right");
                        page.c1 = "right_c1"
                    }
                    var ban = $(this).data("ban");
                    page.ban = $("." + ban);
                    //获取即将打开关闭的页面
                    page.openpage = $(".video_main");
                    page.closepage = $(".video_guide_secend");
                    page.openpage.show();
                    //动态获取视屏
                    console.log('page.video_id', page.video_id);

                    page.playVideo = 3;
                    page.video1.currentTime = page.videoTime[page.video_id][0] / 1000;
                    page.daban();

                    page.video_main.init()
                })
            },
            //导演发火图片切换
            pic_change: function () {
                var pic = $(".fire");
                var num = 0;
                setInterval(function () {
                    pic.find("img").eq(num).hide().siblings().show();
                    num++;
                    if (num == 2) {
                        num = 0
                    }
                }, 300)
            }
        },

        video_main: {
            init: function () {
                page.video_main.video_run();
                page.video_main.btn_click();
                //page.video_main.c1_pic_change();
            },
            video_run: function () {
                page.video_main._soundplay = true;
                //隐藏视频，只打开播放的视频，避免视频覆盖
                //定义视屏事件存储变量
                page.left_num = 0;
                page.video_main.progress_num = $(".progress_num");
                page.video_main.progress_content = $(".progress_content");
                page.videoNoEnd = true;
            },

            progress_right_pic_change: function (temp) {
                var num = 0;
                var progress_right = $("." + temp);
                page.progressTimer = setInterval(function () {
                    progress_right.find("img").eq(num).show().siblings().hide();
                    num++;
                    if (num >= 4) {
                        num = 2
                    }
                }, 200)
            },

            btn_click: function () {
                //NG按钮事件
                $(".progress").on("click", function () {
                    $(".btn1").show();
                    $(".btn2").hide();
                    if (page.NG) {
                        createjs.Sound.play("ng");
                        $(".progress_next").show();
                        $(".progress_success").hide();
                        clearInterval(page.progressTimer);
                        $(".progress_right").find("img").eq(3).show().siblings().hide()
                        page.video1.pause();
                        setTimeout(function () {
                            createjs.Sound.play("titleshow");
                        }, 1000)
                        setTimeout(function () {
                            $(".btn_pub").show()
                            createjs.Sound.play("btnshow");
                        }, 3000)
                        $(".popupBtn").show();
                        setTimeout(function () {
                            $(".progress").hide();
                            $(".progress_pic4").hide();
                        }, 1000)
                    }
                });

                $(".btn_top").one("click", function () {
                    $(this).children(".btn1").hide();
                    $(this).children(".btn2").show();
                    createjs.Sound.play("kuaizou");
                });
                $(".btn_next").on("click", function () {

                    $(this).children(".btn1").hide();
                    $(this).children(".btn2").show();
                    createjs.Sound.play("click");
                    $(".popupBtn .btn").removeClass("lightSpeedIn").addClass("lightSpeedOut")
                    setTimeout(function () {
                        $(".video_main").hide();
                        $(".video_guide_secend").show();
                        $(".popupBtn").hide();
                        $(".popupBtn .btn").removeClass("lightSpeedOut").addClass("lightSpeedIn")
                        $(".btn_pub").hide();
                        //清除视屏播放完定时器，关闭最后页面
                        $(".last_pic").hide();

                    }, 1000)
                    if ($(".this").hasClass("big_small1")) {
                        setTimeout(function () {
                            createjs.Sound.play("zhang");
                        }, 1300)
                    }

                    if ($(".shaqin").hasClass("this")) {
                        $(".this").show();
                        page.clear = setTimeout(function () {
                            // $(".this").removeClass("big_small1");
                            // $(".btn1").removeClass("big_small2")
                        }, 2000)
                    }
                    //三个视屏都播放，返回后执行彩蛋
                    if ($(".this").length == 3) {
                        //解绑点击事件
                        $(".talk_words .btn").unbind("click");
                        setTimeout(function () {
                            //$(".zhengdong").addClass("shake-slow shake-constant")
                            //彩蛋页动画
                            var caidan_timer = setTimeout(function () {
                                $(".caidan").show();
                                page.caidan.init();
                                createjs.Sound.play("jingguang");
                                setTimeout(function () {
                                    $(".light").addClass("fadeInOut");
                                }, 1500)
                                setTimeout(function () {
                                    $(".xing").show();
                                }, 1500)
                                setTimeout(function () {
                                    //星星散落
                                    $('.xing').addClass('animate');
                                    setTimeout(function () {
                                        createjs.Sound.play("yinbi");
                                    }, 1000)
                                    setTimeout(function () {
                                        createjs.Sound.play("alsoegg");
                                    }, 2000)
                                }, 1600)
                                setTimeout(function () {
                                    $(".caidan_btn").show()
                                }, 3000)

                            }, 800)
                            //
                        }, 2000)


                        /*setTimeout(function(){
                         $(".caidan").show();
                         //$(".video_guide_secend").hide();
                         // $('.xing').addClass('animate');
                         page.caidan.init();
                         },4000)*/
                    }

                });
                //分享页
                $(".btn_bottom,.caidan_end_btn2").on("click", function () {
                    createjs.Sound.play("share");
                    $(this).children(".btn1").hide();
                    $(this).children(".btn2").show();
                    $(".share").show()
                })
                $(".share").on("click", function () {
                    $(".share").hide();
                    $(".btn_bottom,.caidan_end_btn2").children(".btn2").hide();
                    $(".btn_bottom,.caidan_end_btn2").children(".btn1").show();

                })
                $(".popupBtn .btn").on("click", function () {
                })


            },

            c1_pic_change: function (c1) {
                var c1_num = 1;
                $(".last_pic").show();
                $("." + c1).show().siblings().hide();
                page.c1Timer = setInterval(function () {
                    //console.log(111)
                    $("." + c1).find("img").eq(c1_num).show().siblings().hide();
                    c1_num++;
                    if (c1_num >= 2) {
                        c1_num = 0;
                    }
                }, 300)
            }
        },
        caidan: {
            init: function () {
                page.caidan.btn_click();
            },
            btn_click: function () {
                $(".caidan_btn").on("click", function () {
                    $('.video_guide_secend').hide();
                    createjs.Sound.play("click")
                    $(this).children(".btn1").hide();
                    $(this).children(".btn2").show();
                    $(".caidan_control").hide()
                    $(".video_box").show();
                    page.playVideo = 6;
                    page.caidan.NotEnd = true;
                    page.video1.currentTime = page.videoTime[6][0] / 1000;
                    page.caidan.video_run();
                })
                $(".caidan_end_btn1").one("click", function () {
                    createjs.Sound.play("kuaizou");
                    $(this).children(".btn1").hide();
                    $(this).children(".btn2").show();
                })
            },
            video_run: function () {
                page.video1.play();
            }

        },

        video_center: function () {
            if (pageH > pageW) {
                $("video,.blur").css({
                    "height": "100%",
                    "width": "auto"
                })
                page.v_height = $("video").height();
                $("video,.blur").css({
                    "left": "50%",
                    "top": 0,
                    "margin-top": 0,
                    "margin-left": -(page.v_height / 2) + "px"
                })
            } else {
                $("video,.blur").css({
                    "width": "100%",
                    "height": "auto"
                })
                page.v_height = $("video").height();
                $("video,.blur").css({
                    "top": "50%",
                    "left": 0,
                    "margin-left": 0,
                    "margin-top": -(page.v_height / 2) + "px"
                })
            }
            console.log(123)

        },
        //打板集合
        daban: function () {
            $(".loading_left").anim({
                "width": "150px"
            }, 0.9, "ease-in-out", function () {
                page.video1.play();
            })
            page.ban.anim({
                "transform": "translateX(-300px)"
            }, 0.2, "ease-in-out", function () {

                setTimeout(function () {
                    createjs.Sound.play("daban");
                    page.ban.find("img").eq(0).hide().siblings().show();
                    $(".blur").css("filter", "blur(0px)");
                }, 300)

                setTimeout(function () {
                    page.ban.anim({
                        "transform": "translateX(0px)"
                    }, 0.2, "ease-in-out", function () {
                        page.ban.find("img").eq(1).hide().siblings().show();
                    })
                    $(".video1_btn").hide();

                    page.openpage.show();
                    page.closepage.hide();

                }, 700)
            })

        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $(".page1").width(pageW).height(pageH);
            if (pageH > pageW) {
                $(".page").width(pageH).height(pageW);
                $(".page_Box").css('-webkit-transform', 'translate(' + pageW + 'px,0px) rotateZ(90deg)')
            } else {
                $(".page_Box").css('-webkit-transform', '');
                $("#errorScreen").hide()
            }
        }
    };
    page.init();
});
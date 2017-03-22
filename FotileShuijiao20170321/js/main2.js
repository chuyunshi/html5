$(document).ready(function() {
    var pageH, pageW;
    page = {
        init: function () {
            $('body').on("touchmove", function (e) {
                //e.preventDefault();
            });
            window.addEventListener("touchstart", function (e) {
                //e.preventDefault();
            });
            page.url = "http://wechat.fotile.com/worldwaterday/public/index.php/api/"
            $(window).resize(function () {
                page.resize();
            });
            page.imgW = 531;
            page.imgH = 1817;
            page.imgW1 = 750;
            page.imgH1 = 1334;
            page.MV = document.getElementById("video0");
            page.BGM = document.getElementById("bgm");
            page.DIE = document.getElementById("die");
            $("#video1,#video2").hide();
            _video = 0;
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
            }
            page.resize();
            page.loading.init();
            page.p1.init();
            page.p2.init();
            page.p3.init();
            page.video.init();
            /*  $.getScript( "js/font.js",function(){

             console.log("success")

             } );*/
        },
        loading: {
            init: function () {
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
            _preload: function () {
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
                queueBe.on("progress", function () {
                    var progress = queueBe.progress * 100;
                    progress = Math.floor(progress);
                    // progress=40/progress;
                    //  $(".playing").css("-webkit-animation-duration",progress+"s")
                });
                queueBe.on("complete", function () {
                    setTimeout(function () {
                        //$(".loading").hide();
                        //$(".p1").show();
                    }, 2000)
                });
                queueBe.loadManifest(manifest);
            },
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
            playAni1: function (key, id, fps, num) {
                if (fps == undefined) {
                    fps = 25;
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
            tick: function () {
                page.stage[page.aniKey].update();
                page.num_0++;
                console.log(page.num_0);
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
            tick1: function () {
                page.num++;
                page.stage[page.aniKey].update();
                if(page.num==113){
                    $(".p2_center").show();
                }
                if (page.num == page.len) {
                    $(".p2_logo2").show();
                    $(".p2_btn").show();
                }
            }
        },
        p1: {
            init: function () {
                page.p1.btn_click();
                page.p1._popup_click();
                page.yes = 1;
            },
            focus: function () {
                $("#errorScreen").css("z-index", "-1");
            },
            blur: function () {
                $("#errorScreen").css("z-index", "10000");
            },
            _test: function (s) {
                var patrn = /^[\u4E00-\u9FA5]+$/;
                if (patrn.exec(s)) {
                    console.log("是")
                    page.yes = 1;
                    page.p1._five();
                } else {
                    console.log("否");
                    $(".p1_popup").show().find("img").eq(3).show();
                    page.yes = 0;
                    return false
                }
            },
            _kong: function () {
                if (page.p1.subName) return false;
                page.p1.subName = true;
                var _value = document.getElementById("test").value;
                if (_value == "") {
                    console.log("不能为空");
                    $(".p1_popup").show().find("img").eq(4).show();
                    page.yes = 0;
                    return false
                } else {
                    if (_value.length > 0) {
                        page.p1._test(_value)
                    }
                }
            },
            _five: function () {
                var _value = document.getElementById("test").value;
                if (_value.length > 5) {
                    $(".p1_popup").show().find("img").eq(1).show();
                    page.yes = 0;
                    return false
                } else {
                    page.p1._ajax();
                }
            },
            _fangtai_yes: function () {
                var _value = document.getElementById("test").value;
                if (_value == "水槽洗碗机") {
                    $(".my1").hide();
                    $(".my2").show();
                    $(".woshi").html("我是方太");
                    var entity={
                        AccessKey:'a59d53f7bbff47908015c24c37e97e05',
                        Content:"我是方太"
                    };
                    $youzikuClient.getFontFace(entity, function (result) {
                        $(".woshi").html("我是方太");
                    });
                    page.MV = document.getElementById("video1");
                    $("#video0").hide();
                    $("#video1").show();
                    _video = 1;
                    $.getScript('js/share.js', function () {
                        console.log('重新加载');
                    });
                }
            },
            _shanghairen: function () {
                var _value = document.getElementById("test").value;
                if (_value == "上海人") {
                    page.MV = document.getElementById("video2");
                    $("#video1").hide();
                    $("#video2").show();
                    _video = 2;
                    $.getScript('js/share.js', function () {
                        console.log('重新加载');
                    });
                }
            },
            btn_click: function () {
                page.p1.subName = false;
                $(".p1_btn").on("click", page.p1._kong)
            },
            _ajax: function () {
                var _value = document.getElementById("test").value;
                var _length = _value.length;
                var _valueq = ''; //存储去除所有水的字符,所有加空格
                var _valuew = ''; //去除第一个水，一个空格
                var _valuee = ''; //存储去除所有水的字符,一个加空格
                var word_num = 0; //判断是否已经有一个带水的字符了
                var canvas_num = 2; //判断几点水
                var words_index = 6; //判断第一个有水的下标
                var word = ''; //存储每个字符
                var worde = ''; //存储每个字符
                var words = ''; //存储去除所有水的字符
                $.ajax({
                    type: "post",
                    url: page.url + "split/" + _value,
                    dataType: "json",
                    success: function (data) {
                        if (data.err == 11) {
                            $(".p1_popup").show().find("img").eq(2).show();
                            page.yes = 0;
                        }
                        ;
                        _code = data.data.code;
                        console.log(data.data.code);
                        for (var i = 0; i < _length; i++) {
                            if (data.data[i].split == undefined) {
                                word = data.data[i].source;
                                worde = data.data[i].source;
                            } else if (data.data[i].state == 0) {
                                word = " " + data.data[i].split;
                                worde = data.data[i].split;
                            } else {
                                word = data.data[i].source;
                                worde = data.data[i].source;
                            }
                            words = words + word;
                            _valuee = _valuee + worde;
                            if (data.data[i].state == 0 && data.data[i].type == 0 && word_num == 0) {
                                _index = i;
                                $("#c0").css("left", (2.5 * i - 1) + "rem");
                                canvas_num = 0;
                                word_num = 1;
                                words_index = i
                            }
                            if (data.data[i].state == 0 && data.data[i].type == 1 && word_num == 0) {
                                _index = i;
                                $("#c1").css("left", (2.5 * i - 1) + "rem");
                                canvas_num = 1;
                                word_num = 1;
                                words_index = i
                            }
                        }
                        if (words_index < 5) {
                            _valuew = _value.replace(_value[words_index], " " + data.data[words_index].split);
                            //_valuee = _valuee.replace(_valuee[words_index]," "+data.data[words_index].split);
                            _valuee = _valuee.split('');
                            _valuee.splice(words_index, 1, " " + data.data[words_index].split);
                            _valuee = _valuee.join('');
                        } else {
                            $(".p1_popup").show().find("img").eq(0).show();
                            page.yes = 0;
                        }
                        _valueq = words;
                        console.log(_valuee);
                        _shareName = $.trim(words);
                        _shareName = _valuee;
                        _num = canvas_num;
                        _post = 1;
                        $.getScript('js/share.js', function () {
                            //console.log('重新加载');
                        });
                        if (_index == 0) {
                            $(".zzz").css("margin-left", "1rem");
                            $(".video_name").css("margin-left", "0.5rem");
                        }


                        //$(".zzz").html(_valuee);
                        //$(".video_name").html(_valueq);
                        var entity={
                            AccessKey:'a59d53f7bbff47908015c24c37e97e05',
                            Content:_valuee
                        };
                        $youzikuClient.getFontFace(entity, function (result) {
                            $(".zzz").html(_valuee);
                        });
                        $(".video_name").html(_valueq);

                        //changeword(document.getElementById("zzz"));
                        //changeword(document.getElementById("zzzz"));
                        //$(".zzz").html(_valuee);
                        //$(".video_name").html(_valueq);
                        if (page.yes == 1 && canvas_num == 0 || page.yes == 1 && canvas_num == 1) {
                            page.p1._btn_true();
                            page.p1._canvas_play(canvas_num)
                        }
                    }
                });
                page.p1._fangtai_yes();
                page.p1._shanghairen();
            },
            _btn_true: function () {
                $(".p1_btn").hide();
                $(".p1_bottom,.right_bottom").hide();

                $(".cd").anim({
                    "top": "8.5rem"
                }, 2);
                $("._input,.red_line").hide();
               /* $.getScript("js/font.js", function () {
                    console.log("success")
                });*/
            },
            _canvas_play: function (num) {
                var p1_timer = setInterval(function () {
                    if (true) {
                        clearInterval(p1_timer);
                            $("canvas").show();
                            page._canvas.playAni('p' + num, 'c' + num, 25, 0);
                            // page._canvas.playAni('p1', 'c1', 25, 1);
                            createjs.Ticker.on("tick", function () {
                                page.stage["p" + num].update();
                            });
                            setTimeout(function () {
                                createjs.Ticker.reset();
                                $(".zzz").css("opacity", "1");
                            }, 40);
                            setTimeout(function () {
                                page._canvas.playAni('p' + num, 'c' + num, 25, 0);
                                // page._canvas.playAni('p1', 'c1', 25, 1);
                                createjs.Ticker.on("tick", function () {
                                    //page.stage["p0"].update();
                                });
                            }, 3000);
                        /*setTimeout(function () {
                            createjs.Ticker.reset();
                            $(".p1").hide();
                            $(".video").show();

                        }, 6000)*/
                    }
                }, 100)
            },
            _popup_click: function () {
                $(".p1_popup").on("click", function () {
                    $(this).hide().find("img").hide();
                    page.p1.subName = false;
                })
            },
        },
        p2: {
            init: function () {
                page.p2._btn_click();
            },
            _btn_click: function () {
                $(".btn_9").on("click", function () {
                    createjs.Ticker.reset();
                    $(".p2").hide();
                    $(".p3").show();
                    page.p3.wave1();
                    page.p3.wave2();
                    page.p3.wave3();
                    page.p3._active_num();
                    //page.device.init2();
                })
                $(".btn_10").on("click", function () {
                    $(".pub_popup").show();
                    page.p2._share_pic()
                })
            },
            _share_pic: function () {
                var share_pic = $(".pub_popup").find("img");
                var i = 0;
                page.poptimer = setInterval(function () {
                    share_pic.eq(i).show().siblings().hide();
                    i++;
                    if (i > 1) {
                        i = 0
                    }
                }, 200);
            }
        },
        p3: {
            init: function () {
                page.p3._btn_click();
                /* page.p3.wave1();

                 page.p3.wave2();

                 page.p3.wave3();

                 page.p3._active_num();

                 page.p3._active_list();*/
            },
            _active_num: function () {
                var active_num = 0;
                page.active_percent = 0;
                $.post("http://wechat.fotile.com/worldwaterday/public/index.php/api/activity/num", function (data) {
                    var obj = eval('(' + data + ')');
                    console.log(obj.data);
                    active_num = obj.data.total;
                    $("#_active_num").html(active_num);
                    $("#_other_num").html(1000000 - active_num);
                    $("#p3_wx").html(obj.data.wx);
                    $("#p3_wb").html(obj.data.wb);
                    page.active_percent = Math.floor(obj.data.scale * 100);
                    console.log(page.active_percent)
                    //page.active_percent =100
                    page.p3.wave_up();
                    if (page.active_percent < 9) {
                        page.active_percent = "0" + page.active_percent;
                    }
                    $("#_active_percent").html(page.active_percent);
                })
            },
            _active_list: function () {
                page.LoadPage = 1;
                page.LoadMoreDom = $('#loadMore');
                page.isLoadMore = false;
                page.p3.loadMoreList();
                page.LoadPages = [1];
                window.onscroll = function () {
                    if (page.isLoadMore) {
                        return false;
                    }
                    //监听事件内容
                    if ($(window).height() + $(window).scrollTop() > $('.p3_bg_move').height()) {
                        page.LoadPage++;
                        if (page.LoadPages.indexOf(page.LoadPage) > 0) {
                            page.LoadPage--;
                            return false;
                        }
                        page.LoadPages.push(page.LoadPage);
                        page.p3.loadMoreList();
                    }
                }
            },
            loadMoreList: function () {
                page.isLoadMore = true;
                page.LoadMoreDom.show();
                $.post('http://wechat.fotile.com/worldwaterday/public/index.php/api/getlist/' + page.LoadPage, function (data) {
                    setTimeout(function () {
                        page.isLoadMore = false;
                    }, 1000);
                    page.LoadMoreDom.hide();
                    if (data.err != undefined && data.err == 0) {
                        var list = data.data;
                        var len = list.length;
                        if (len == 0) {
                            page.LoadPage--;
                        } else {
                            var html = '';
                            for (var i = 0; i < len; i++) {
                                var obj = list[i],
                                    tmpHtml = '<li>';
                                for (var j = 0; j < obj.length; j++) {
                                    if (obj[j].type == -1 || obj[j].state == 1) {
                                        tmpHtml += obj[j].source;
                                    } else {
                                        if (obj[j].split == undefined) {
                                            continue;
                                        }
                                        tmpHtml += '&nbsp;' + obj[j].split;
                                    }
                                }
                                tmpHtml += '</li>';
                                html += tmpHtml;
                            }
                            $('#userList').append(html);
                        }
                    }
                }, 'json')
            },
            _bitmap: function (w, h, id, url) {
                var canvas = document.getElementById(id);
                canvas.width = w;
                canvas.height = h;
                page.stage = new createjs.Stage(id);
                var container = new createjs.Container(); //绘制外部容器
                page.stage.addChild(container);
                //加载图片
                var image = new Image();
                image.src = url;
                image.onload = handlerImageLoad;

                function handlerImageLoad(event) {
                    var bitmap = new createjs.Bitmap(event.target);
                    bitmap.x = 0;
                    container.addChild(bitmap);
                    createjs.Ticker.on("tick", function () {
                        page.stage.update();
                    })
                }
            },
            wave1: function () {
                var canvas = document.getElementById('canvas1');
                var num = 0;
                canvas.width = 2712;
                canvas.height = 950;
                page.stage = new createjs.Stage('canvas1');
                var container = new createjs.Container(); //绘制外部容器
                page.stage.addChild(container);
                //加载图片
                var image = new Image();
                image.src = "./img/p3/13.png";
                image.onload = handlerImageLoad;

                function handlerImageLoad(event) {
                    var bitmap = new createjs.Bitmap(event.target);
                    bitmap.x = 0;
                    container.addChild(bitmap);
                    page.stage.update();
                    createjs.Ticker.setFPS(60);
                    createjs.Ticker.on("tick", function () {
                        num -= 3;
                        bitmap.x = num;
                        if (num == -1356) {
                            num = 0;
                        }
                    });
                }
            },
            wave2: function () {
                var canvas = document.getElementById('canvas2');
                var num = 0;
                canvas.width = 2712;
                canvas.height = 950;
                page.stage2 = new createjs.Stage('canvas2');
                var container = new createjs.Container(); //绘制外部容器
                page.stage2.addChild(container);
                //加载图片
                var image = new Image();
                image.src = "./img/p3/14.png";
                image.onload = handlerImageLoad;

                function handlerImageLoad(event) {
                    var bitmap = new createjs.Bitmap(event.target);
                    bitmap.x = 0;
                    container.addChild(bitmap);
                    page.stage2.update();
                    createjs.Ticker.setFPS(60);
                    createjs.Ticker.on("tick", function () {
                        num -= 6;
                        bitmap.x = num;
                        if (num == -1356) {
                            num = 0;
                        }
                    });
                }
            },
            wave3: function () {
                var canvas = document.getElementById('canvas3');
                var num = 0;
                canvas.width = 2712;
                canvas.height = 950;
                var stage = new createjs.Stage('canvas3');
                var container = new createjs.Container(); //绘制外部容器
                stage.addChild(container);
                //加载图片
                var image = new Image();
                image.src = "./img/p3/15.png";
                image.onload = handlerImageLoad;

                function handlerImageLoad(event) {
                    var bitmap = new createjs.Bitmap(event.target);
                    bitmap.x = 0;
                    container.addChild(bitmap);
                    stage.update();
                    createjs.Ticker.setFPS(60);
                    createjs.Ticker.on("tick", function () {
                        num -= 12;
                        bitmap.x = num;
                        if (num == -1356) {
                            num = 0;
                        }
                        stage.update();
                        page.stage.update();
                        page.stage2.update();
                    });
                }
            },
            wave_up: function () {
                var _height = -13.5;
                var _top = 11.5;
                var _max = _top - (_top * page.active_percent) / 100;
                var timer = setInterval(function () {
                    _height += 0.1;
                    _top -= 0.1;
                    $(".canvas_box").css("bottom", _height + "rem");
                    $(".p3_already").css("top", _top + "rem")
                    if (_top <= _max) {
                        clearInterval(timer);
                        page.p3._active_list();
                        setTimeout(function () {
                            page.device.init2();
                        }, 1000);
                    }
                }, 10);
            },
            _btn_click: function () {
                $(".p3_btn").on("click", function () {
                    $(".pub_popup").show();
                    page.p2._share_pic()
                });
                $(".pub_popup").on("click", function () {
                    $(this).hide();
                    clearInterval(page.poptimer);
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
            init: function () {
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
            },
            init2: function () {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                }
                var x = 0,
                    y = 0,
                    lx = 0,
                    ly = 0,
                    speed = 0.2,
                    p2Move1 = $(".p3_move_1"),
                    p2Move2 = $(".p3_move_2"),
                    p2Move3 = $(".p3_move_3"),
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
            },
        },
        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('.canvas_pub').attr('width', page.imgW).attr('height', page.imgH)
        }
    };
    page.init();
});
/**
 * Created by ShiHongZi on 2016/11/12.
 */

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
temp = getUrlParam('temp');
temp = temp == null ? 8 : temp;

source = getUrlParam('source');

source = source == null ? 0 : source;

$(document).ready(function(){
    var pageH,pageW;
    var num=20 * (pageW / 320);//用于rem跟px值之间的转换，pageW=undefined,后面重新赋值

    var arr1 = ["SFRSEFSFRQUFSRUNIS",
                "TFRUFBREFSRYFSRAER",
                "SFIFSDRCPFSFEOUSEF",
                "INFSPDSFRSHPARDSEF",

                "HFGTDGGADINFUARSDJ",
                "MSDGHEIAJSNARTHDEB",
                "GENAMGNFAROUNHKIDE",


                "MCOIPOPRETRNNESEES",
                "RORESVSHCFAEHERIKJ",
                "STEHIBLYFARPONSEHJ",
                "KJASRARVEFROREEDSL",
                "FLYBEAUATULONFITEF"
                ];
    var arr2 = [["U","N","I","Q","U","E"],
                ["B","E","A","U","T","Y"],
                ["P","R","E","C","I","O","U","S"],
                ["H","A","P","P","I","N","E","S","S"],

                ["G","U","A","R","D","I","N","G"],
                ["H","E","A","R","T"],
                ["M","A","R","K","I","N","G"],


                ["O","N","E","P","E","R","C","E","N","T"],
                ["F","O","R","E","V","E","R"],

                ["R","E","S","P","O","N","S","I","B","L","Y"],
                ["R","A","R","E"],
                ["B","E","A","U","T","I","F","U","L"]
                ];
    //定义上一个人封存的钻石是，
    //9是默认选中的钻石；

    //定义通道，假设0代表官网链接打开，1代表微信分享打开；

    var string_word;
    //移动距离
    var x_move;
    //封存的钻石下标，最后传给temp；
    var num_length;

    page= {
        init: function () {
            //阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            $(window).resize(function () {
                window.location.reload();
                page.resize();
            });
            //音乐播放

            page.BGM = $('.bgm')[0];

            setTimeout(function(){
                $(window).scrollTop(1);
            },0);

            page.BGM.play();

            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    page.BGM.play();
                });
            }, false);


            //音乐开始/暂停
           /* page.MusicICO = $('.music_btn');
            page.MusicICO.addClass('playing');
            page.MusicICO.on('touchstart', page.bgm);*/
            page._sound.init();
            page.resize();
            page._road.init();
            page._select.init();
            page._preload.init();
            //page._crack.init();
            //page._prompt.init();
            //page._success.init();
            page._unsuccess.init();
            page._save.init();
            page._save_success.init();
            page._tvc.init();
        },
        //判断微信分享页打开的，还是官网链接打开的
        _road:{
            init: function () {
                page._road._link_road();
            },
            _link_road: function(){
                if(source==1){
                    //将上一个人封存的钻石下标赋值给data-index;
                    $(".diam_c").data("index",temp);
                    //隐藏两边可选钻石，
                    $(".diam_l,.diam_r").hide();
                    //更换提示语；
                    $(".select_1").show();
                    $(".select_3").hide();

                    $(".success_save").hide();
                    $(".find_forever").show();
                }else{

                }
            },
        },
        _sound:{
            init:function(){
                createjs.Sound.alternateExtensions = ["mp3"];
                //createjs.Sound.on("fileload", page._sound.playSound, this);
                createjs.Sound.registerSound("./img/music/0.mp3", "s0");
                createjs.Sound.registerSound("./img/music/1.mp3", "s1");
                createjs.Sound.registerSound("./img/music/2.mp3", "s2");
                createjs.Sound.registerSound("./img/music/3.mp3", "s3");
                createjs.Sound.registerSound("./img/music/5.mp3", "s4");
                createjs.Sound.registerSound("./img/music/7.mp3", "s5");
                createjs.Sound.registerSound("./img/music/5.mp3", "s6");
                createjs.Sound.registerSound("./img/music/4.mp3", "s7");
                createjs.Sound.registerSound("./img/music/5.mp3", "s8");
                createjs.Sound.registerSound("./img/music/6.mp3", "s9");
                createjs.Sound.registerSound("./img/music/7.mp3", "s10");
                createjs.Sound.registerSound("./img/music/8.mp3", "s11");
                createjs.Sound.registerSound("./img/music/bell.mp3", "bell");
                createjs.Sound.registerSound("./img/music/click.mp3", "click");
                createjs.Sound.registerSound("./img/music/page.mp3", "page");
            },
            playSound : function (event) {
                if (event.id == 's2') {
                    page.BGM = createjs.Sound.play("s2");
                    page.BGM.loop = -1;
                    page.BGM.paused = true;
                }
            },
        },
        _preload: {
            init: function () {
                var timer;
                var _num = 0;


                timer = setInterval(function () {
                    $(".addNum").css({
                        "width":_num+"%"
                    });
                    $(".percent").html(_num+"%");
                    _num++;
                    if (_num == 100){
                        $(".loading").hide();
                        $(".select").show();
                        page.BGM.pause();
                        clearInterval(timer);
                    }
                }, 50);
                //利用preload.js预加载
                var manifest = [
                    './img/music/6.mp3',
                    './css/animate.min.css','./css/main.css','./css/my_animate.css','./js/zepto.min.js',
                    './img/bg.jpg', './img/logo.png', './img/loading/loading_box.png', './img/crack/1.png', './img/crack/book.png', './img/crack/book1.png', './img/crack/c.png', './img/crack/c_r.png', './img/crack/l.png', './img/crack/l_r.png', './img/crack/openbook.png', './img/crack/r.png', './img/crack/r_r.png', './img/crack/word.png', './img/prompt/book.png', './img/prompt/box_big.png', './img/prompt/box_small.png', './img/prompt/c.png', './img/prompt/input.png', './img/prompt/l.png', './img/prompt/lookBook.png', './img/prompt/r.png', './img/save/save_pic.png', './img/select/1.png', './img/select/3.png', './img/select/box.png', './img/select/down.png', './img/select/logo.png', './img/select/no1.png', './img/select/no2.png', './img/select/no3.png', './img/select/ready.png', './img/select/start.png', './img/select/title.png', './img/select/yes.png', './img/select/yes1.png', './img/select/yes2.png', './img/select/yes3.png', './img/success/success.png', './img/success/success_save.png', './img/success/success_tvc.png', './img/tvc/diam_road.png', './img/tvc/return.png',
                    './img/music/bell.mp3','./img/music/click.mp3','./img/music/page.mp3',
                    './js/share.js'
                ];
                for(var a=1;a<=4;a++){
                    //manifest[manifest.length] = './img/loading/' + a + '.png';
                }
                for (var i = 0; i <= 8; i++) {
                    manifest[manifest.length] = './img/save/' + i + '.png';
                    manifest[manifest.length] = './img/password/' + i + '.png';
                    manifest[manifest.length] = './img/success/' + i + '.png';
                    manifest[manifest.length] = './img/music/' + i + '.mp3';
                }
                for (var j = 0; j < 25; j++) {
                    manifest[manifest.length] = './img/word/' + String.fromCharCode((65 + j)) + '.png';
                    manifest[manifest.length] = './img/word/' + String.fromCharCode((65 + j)) + 1 + '.png';

                }
                var queue = new createjs.LoadQueue(false);

                // 关键！----设置并发数
                queue.setMaxConnections(100);
                // 关键！---一定要将其设置为 true, 否则不起作用
                queue.maintainScriptOrder = true;

                queue.on("complete", function () {
                    //完成后操作
                    console.log("加载完成")

                });
                queue.on("progress", function () {
                    var progress = queue.progress * 100;

                    progress = Math.floor(progress);


                });
                queue.loadManifest(manifest);
            }
        },
        //钻石选择页操作
        _select: {
            init: function () {
                page._select._click();
                //第三个按钮随机匹配单词
                $(".diam_r").data("index",Math.floor(Math.random()*3)+9);
            },
            _click: function () {
                var _index;
                $(".diam_box").on("click", function () {
                    if($(this).hasClass("this")){

                    } else {
                        createjs.Sound.play("page");
                    }

                    $(this).addClass("yes");
                    if($(".diam_box").hasClass("yes")){
                        source = 1;
                    }else{
                        source = 0;
                    }
                    $(this).find(".select_diam_box").show();
                    $(this).siblings().find(".select_diam_box").hide();
                    $(this).addClass("this").siblings().removeClass("this")
                    $(this).find(".diamm").eq(1).show();
                    //$(this).find("img").eq(0).hide();
                    $(this).siblings().find(".diamm").eq(1).hide();
                    $(this).siblings().find(".diamm").eq(3).hide();
                   // $(".select_diam_box").show();
                    //获取选中的钻石，得到需要传入的数组下标；
                    _index = $(this).data("index");
                    $(".select_btn").addClass("click");
                    $(".select_btn").find("img").eq(1).show().siblings().hide();
                    //控制选中框位置

                    /*if (_index == 4) {
                        $(".select_diam_box").css({
                            "left": "2.2rem"
                        })
                    } else if (_index == 5) {
                        $(".select_diam_box").css({
                            "left": "6.2rem"
                        })
                    } else {
                        $(".select_diam_box").css({
                            "left": "10.2rem"
                        })
                    }*/
                });

                $(".select_btn").on("click", function () {
                    if ($(this).hasClass("click")) {
                        source = 1;
                        $(".select").hide();
                        $(".crack,.prompt").show();
                        //得到最终选中的那个钻石的data-index
                        _index = $(".this").data("index");
                        //console.log(_index);
                        //传给temp
                        temp = _index;
                        console.log(temp)
                        $.getScript('js/jweixin-1.0.0.js', function () {
                            $.getScript("js/share.js");
                        });

                        page._crack.init();
                        page._prompt.init();
                        page._success.init();

                        $(".password").addClass("fadeIn");

                        setTimeout(function(){
                            $(".crack_pic").anim({
                                "top":"4.8rem",
                            },1)
                            $(".music_bg").addClass("fadeOut")
                        },4000);

                        setTimeout(function(){
                            createjs.Sound.play("s"+temp);
                            $(".password").anim({
                                "width":"6.9565rem",
                            },3);
                            $(".music_bg img").anim({
                                "right":"-5rem",
                            },4)
                        },1000)
                    }
                });
            },
        },
        //解码页操作
        _crack: {
            init: function () {
                page._crack._setOutHtml();
                page._crack._setInHtml();
                page._crack._click_to();
                page._crack._openBook();
                page._crack._click_btn();

                //page.BGM = $('.bgm')[temp];
            },
            //输入框滑动操作
            _swiper: function () {
                var el = $(".box_line");
                //x_move需定义全局变量
                x_move = 0;
                var touch, x_start, x_length;
                num = 20 * (pageW / 320)
                el.on("touchstart", function (e) {
                    touch = e.touches[0];
                    x_start = touch.pageX - x_move;
                });
                el.on("touchmove", function (e) {
                    touch = e.touches[0];
                    x_move = touch.pageX - x_start;
                    //将得到的移动距离px值转化为rem值；
                    x_length = x_move / num;
                    console.log(x_length);
                    //阻止右滑极限
                    if (x_length >= 0) {
                        x_length = 0;
                        x_move = 0;
                        $(".right_btn").show();
                        $(".left_btn").hide();
                    }
                    //阻止左滑极限
                    if (x_length <= (7 - string_word.length) * 2) {
                        x_length = (7 - string_word.length) * 2;
                        x_move = (7 - string_word.length) * 2 * num
                        $(".right_btn").hide();
                        $(".left_btn").show();
                    }
                    //元素随手指滑动
                    el.css("left", x_length + "rem");

                })

            },
            //重置输入框的html
            _setInHtml: function () {
                var tage_c = '';
                //得到传入的字符串，以求的.length,

                string_word = arr2[temp];
                //只有当字母长度大于7的时候，才能够滑动输入框，同时显示右边提示按钮；
                if (string_word.length > 7) {
                    $(".right_btn").show();

                    page._crack._swiper();
                }
                //当字母小于等于7个的时候，使输入框居中；
                if (string_word.length <= 7) {
                    $(".box_lr").hide();
                    $(".box_line,.box_line2").css({
                        "left": 7 - string_word.length + "rem",
                    })
                    $(".input").css({
                        "left": 8 - string_word.length + "rem",
                    })
                }
                //给输入框限定宽，便于操作
                $(".box_line,.box_line2").css({"width": +2 * string_word.length + "rem"});
                //左输入框
                var tage_l = "<div class='in_l in no num_1 re' data-num='0' data-back='0'>" +
                    "</div>";
                //右输入框
                var tage_r = "<div class='in_r in no num_" + string_word.length + " re' data-back='0' data-num=" + (string_word.length - 1) + ">" +
                    "</div>";
                //中间输入框
                for (var a = 1; a <= string_word.length - 2; a++) {
                    tage_c += "<div class='in_c in no num_" + (a + 1) + " re' data-back='0' data-num=" + a + ">" +
                        "</div>";
                }
                $(".box_line").html(tage_l + tage_c + tage_r)
                //密码图片框，依据选择钻石不同而传入不同图片
                $(".password").html(
                    " <img src='img/password/" + temp + ".png'/>"
                )
            },
            //重置输出框的html
            _setOutHtml: function () {
                var tage = '';
                //获取18个字母
                var string_word = arr1[temp];
                console.log(string_word);
                for (var a = 1; a <= 18; a++) {
                    tage += "<div class='out to1 to  _num_" + a + " ab' data-num=\'" + a + "\' data-word=\'" + string_word[a - 1] + "\'>" +
                        "<img src='img/word/" + string_word[a - 1] + 1 + ".png'/>" +
                        "</div>"
                }
                $(".word_out").html(tage);
                //重置输出框的css
                for (var i = 0; i <= 3; i++) {
                    for (var j = 1; j <= 6; j++) {
                        $("._num_" + (i * 6 + j)).css({
                            "left": 2.4 * (j - 1) + "rem",
                            "top": 2.4 * i + "rem"
                        })
                    }
                }

            },
            //点击输入
            _click_to: function () {
                var _word;
                var _num = 0;
                var _index;
                var _input_string = [];
                var string_word = arr2[temp];
                $(".out").on("click", function () {
                    if ($(this).hasClass("to")) {
                        var index = $(this).data("num");
                        var _no = $(".no").eq(0);
                        $(this).hide();
                        createjs.Sound.play("click");
                        //通过data-word获取输入的字母
                        _word = $(this).data("word");
                       // console.log(_word);
                        //传入对应字母的图片
                        _no.html(
                            "<img  src='img/word/" + _word + ".png'/>"
                        );
                        //用来判断单次输入是否正确；
                        _index = _no.data('num');
                        _input_string[_index] = _word;
                       // console.log(_input_string);
                        //正确也要重新传入对应输入格的背景，因为错误修改
                        if (_word == string_word[_index]) {
                            if (_no.hasClass("in_l")) {
                                _no.css({
                                    "background": "url(./img/crack/l.png) center",
                                    "background-size": "100% 100%"
                                })
                            } else if (_no.hasClass("in_r")) {
                                _no.css({
                                    "background": "url(./img/crack/r.png) center",
                                    "background-size": "100% 100%"
                                })
                            } else {
                                _no.css({
                                    "background": "url(./img/crack/c.png) center",
                                    "background-size": "100% 100%"
                                })
                            }
                        } else {
                            if (_no.hasClass("in_l")) {
                                _no.css({
                                    "background": "url(./img/crack/l_r.png) center",
                                    "background-size": "100% 100%"
                                })
                            } else if (_no.hasClass("in_r")) {
                                _no.css({
                                    "background": "url(./img/crack/r_r.png) center",
                                    "background-size": "100% 100%"
                                })
                            } else {
                                _no.css({
                                    "background": "url(./img/crack/c_r.png) center",
                                    "background-size": "100% 100%"
                                })
                            }
                            //给错误的添加class使得错误的能够修改
                            _no.addClass("back");
                            //重传data-back,便于错误修改的时候，输出框对应字母按钮重现
                            _no.data("back", index);

                        }
                        //移除输入框对应格子的class，
                        _no.removeClass("no");
                        //记录输入了几个格子了；
                        _num++;
                        //只有当字母大于7个的时候，输入的对应格子下标小于5的时候整个输入框左移，大于等于5的时候整个输入框右移动，目的就是增加操作体验度。
                        if (_index >= 5 && string_word.length > 7) {
                            $(".box_line").anim({
                                "left": (7 - string_word.length) * 2 + "rem",
                            }, (string_word.length - 7) / 5)
                            $(".right_btn").hide();
                            $(".left_btn").show();
                            x_move = (7 - string_word.length) * 2 * num;
                        } else if (_index < 5 && string_word.length > 7) {
                            $(".box_line").anim({
                                "left": "0rem",
                            }, (string_word.length - 7) / 5)
                            $(".right_btn").show();
                            $(".left_btn").hide();
                            x_move = 0;
                        }


                        //确认最终输入是否正确
                        if (_num >= arr2[temp].length && _input_string.join('') == arr2[temp].join("")) {
                            console.log("success!!!");
                            //加个延时，体验度
                            setTimeout(function () {
                                $(".success").show();
                                $(".crack").hide();
                                //$('.bgm')[11].play();
                                createjs.Sound.play("bell");
                                page._success._pic_show();
                            }, 1000);
                            setTimeout(function () {

                            }, 1500);


                        } else if (_num >= arr2[temp].length) {
                            console.log("unsuccess!!!");
                            setTimeout(function () {
                                $(".unsuccess").show();
                                createjs.Sound.play("bell");
                                save_diam=0;
                                $.getScript('js/jweixin-1.0.0.js', function () {
                                    $.getScript("js/share.js");
                                });
                            }, 1000);

                        }
                    }
                    //记录次数，达到输入框个数，阻止键盘输入
                    if (_num >= arr2[temp].length) {
                        $(".out").removeClass("to");
                    } else {

                    }

                });
                //错误修改
                $(".in").on("click", function () {
                    if ($(this).hasClass("back")) {
                        var index = $(this).data("back");
                        //对应修改的按钮显示
                        $("._num_" + index).show();
                        //使得该输入格能够被重新输入
                        $(this).addClass("no");
                        //记录输入了几个格子了
                        _num--;
                        $(".out").addClass("to");

                        if ($(this).hasClass("in_l")) {
                            $(this).css({
                                "background": "url(./img/crack/l.png) center",
                                "background-size": "100% 100%"
                            })
                        } else if ($(this).hasClass("in_r")) {
                            $(this).css({
                                "background": "url(./img/crack/r.png) center",
                                "background-size": "100% 100%"
                            })
                        } else {
                            $(this).css({
                                "background": "url(./img/crack/c.png) center",
                                "background-size": "100% 100%"
                            })
                        }
                        //删除输入格的内容
                        $(this).html("");
                        //移除class阻止被再次点击
                        $(this).removeClass("back");
                    }

                })

            },
            //打开关闭莫斯密码本
            _openBook: function () {
                var _temp = 0;
                $(".book_btn,.openbook").on("click", function () {
                    createjs.Sound.play("page");
                    if (_temp == 0) {
                        $(".book_btn").find('img').eq(0).hide();
                        $(".book_btn").find('img').eq(1).show();
                       // $(".openbook").show();
                        $(".openbook").anim({
                            "opacity":"1",
                            "top":"62%",
                            "right":"0.9rem",
                            "width":"14.3rem",
                            "height":"8.9rem"
                        })
                        _temp = 1;
                    } else {
                        $(".book_btn").find('img').eq(1).hide();
                        $(".book_btn").find('img').eq(0).show();
                       // $(".openbook").hide();
                        $(".openbook").anim({
                            "opacity":"0",
                            "top":"7rem",
                            "right":"1rem",
                            "width":"1.288rem",
                            "height":"1.288rem"
                        })

                        _temp = 0;
                    }
                })
            },
            //输入框左右两侧按钮操作
            _click_btn: function () {
                $(".right_btn").on("click", function () {
                    console.log(string_word.length)
                    $(".box_line").anim({
                        "left": (7 - string_word.length) * 2 + "rem",
                    }, (string_word.length - 7) / 5)
                    $(this).hide();
                    $(".left_btn").show();
                    //x_start = (7-string_word.length)*num;
                    //设置记录x_move值，再次滑动的时候，不会错位
                    x_move = (7 - string_word.length) * 2 * num;

                });

                $(".left_btn").on("click", function (){
                    $(".box_line").anim({
                        "left": "0rem",
                    }, (string_word.length - 7) / 5)
                    $(this).hide();
                    $(".right_btn").show();
                    x_move = 0;
                })
            },

        },
        //提示浮层页操作
        _prompt: {
            init: function () {
                page._prompt._click();
                page._prompt._setHtml();
            },
            _setHtml: function () {
                var _c;
                string_word = arr2[temp];
                var _l = "<div class='input input_l'>" +
                    "</div>";
                var _r = "<div class='input input_r'>" +
                    "</div>";
                for (var a = 1; a <= string_word.length - 2; a++) {
                    _c += "<div class='input input_c'>" +
                        "</div>"
                }
                $(".box_line2").html(_l + _c + _r);
            },

            _click: function () {
                $(".prompt").on("click", function () {
                    $(this).hide();
                })
            },
        },

        _success: {
            init: function () {
                page._success._click();
                page._success._setHtml();
            },
            _setHtml: function () {
                $(".success_change").html(
                    "<img src='img/success/" + temp + ".png'/>"
                );
            },
            _pic_show: function(){
                var i=0;
                var timer1 = setInterval(function(){
                    $(".success_pic ul li").eq(i).show().siblings().hide();
                    i++;
                    if(i==5){
                        clearInterval(timer1);
                    }
                },100);


            },
            _click: function () {
                $(".success_save").on("click", function () {
                    $(".success").hide();
                    $(".save").show();
                });
                $(".success_tvc").on("click", function () {
                    $(".success").hide();
                    //从哪里来，到哪里去
                    $(".tvc-return").removeClass("this");
                    $(".tvc").show();
                    $("#errorScreen").remove();
                });

                $(".find_forever").on("click",function(){

                /*    $(".diam_l,.diam_r").show();
                    $(".select_1").hide();
                    $(".select_3").show();
                    $(".success_save").show();
                    $(".find_forever").hide();
                    $(".success").hide();
                    $(".select").show();
                    $(".diam_c").data("index",5);*/


                })
            },
        },
        _unsuccess: {
            init: function () {
                page._unsuccess._click();
            },
            _click: function () {
                $(".unsuccess").on("click", function () {
                    $(this).hide();
                    save_diam=1;
                    $.getScript('js/jweixin-1.0.0.js', function () {
                        $.getScript("js/share.js");
                    });

                })
            },
        },
        _save: {
            init: function () {
                page._save._touchmove();
                page._save._click();
            },
            _touchmove: function () {
                var y_start;
                var y_move = 0;
                var _top = 4;
                var touch;
                var _index = 0;
                var y_length = 0;
                num_length = 2;
                var num1, num2, num3, num4;
                var num = 20 * (pageW / 320);
                var el = $(".save_box");
                var el_1 = $(".save_box_1");
               /* el_1.find("p").eq(2).addClass("op2");
                 el_1.find("p").eq(1).addClass("op1");*/
                el_1.find("p").eq(0).addClass("big");
                el_1.find("p").eq(1).addClass("op1");
                el_1.find("p").eq(2).addClass("op2");
                el_1.find("p").eq(3).addClass("op2");
                el_1.find("p").eq(4).addClass("op2");
                el_1.find("p").eq(5).addClass("op2");
                el_1.find("p").eq(6).addClass("op2");

                $(".save_change").html("<img src='img/save/" + _index + ".png'/>")
                el.on("touchstart", function (e) {
                    touch = e.touches[0];
                    y_start = touch.pageY - y_move;

                });
                el.on("touchmove", function (e) {

                    touch = e.touches[0];
                    y_move = touch.pageY - y_start;
                    y_length = y_move / num;
                    if (y_length >= 0) {
                        y_length = 0;
                        y_move = 0 * num;
                    }
                    if (y_length <= -12) {
                        y_length = -12;
                        y_move = -12 * num;
                    }
                    el_1.css({
                        "top": y_length + "rem"
                    })
                    num_length = Math.round((_top - y_length) / 2);

                    console.log(num_length);
                    /*el_1.find("p").eq(num_length - 4).removeClass("big op1").addClass("op2");
                    el_1.find("p").eq(num_length - 3).removeClass("op2 big").addClass("op1");
                    el_1.find("p").eq(num_length-2).removeClass("op1 op2").addClass("big");
                    el_1.find("p").eq(num_length - 1).removeClass("op2 big").addClass("op1");*/
                    el_1.find("p").eq(num_length - 4).anim({
                        "transform": "scale(0.8)",
                        "opacity": "0.2"
                    },0.4);
                    el_1.find("p").eq(num_length - 3).anim({
                        "transform": "scale(1)",
                        "opacity": "0.5"
                    },0.4);
                    el_1.find("p").eq(num_length-2).anim({
                        "transform": "scale(1.5)",
                        "opacity": "1"
                    },0.4);
                    el_1.find("p").eq(num_length - 1).anim({
                        "transform": "scale(1)",
                        "opacity": "0.5"
                    },0.4);
                    el_1.find("p").eq(num_length).anim({
                        "transform": "scale(0.8)",
                        "opacity": "0.2"
                    },0.4);

                })
                el.on("touchend", function (e){
                    //$('.bgm')[12].pause();
                    createjs.Sound.play("page");
                    y_length = Math.floor(y_length);
                    if (y_length % 2 != 0) {
                        y_length += 1;
                    }
                    //console.log(y_length);
                    _index = (_top - y_length) / 2;
                    el_1.anim({
                        "top": y_length + "rem"
                    }, 0.2);
                    $(".save_change").html("<img src='img/save/" + (_index-2) + ".png'/>")
                })
            },
            _click: function () {
                $(".save_diam").on("click", function () {
                    $(".save").hide();
                    $(".save_success").show();
                    temp = num_length-2;
                    $(".password_pic").html("<img src='img/success/"+(num_length-2)+".png'/>")


                    $.getScript('js/jweixin-1.0.0.js', function () {
                        $.getScript("js/share.js");
                    });

                })
            },
        },
        _save_success: {
            init: function () {
                page._save_success._click();
            },
            _click: function () {
                $(".save_success_tvc").on("click", function () {
                    $(".save_success").hide();
                    $(".tvc-return").addClass("this");
                    $(".tvc").show();
                    $("#errorScreen").remove();
                    //return false;
                });
               /* $(".save_success").on("click", function () {
                    $(".save_success").hide();
                    return false;
                });*/
            },
        },
        _tvc: {
            init: function () {
                page._tvc._click();
            },
            _click: function () {
                var play=1;
                $(".tvc_video").on("click",function(){
                    if(play==1){
                       // $(".tvc_video video")[0].play();
                        play=0;
                    }else{
                       // $(".tvc_video video")[0].pause();
                        play=1;
                    }
                });

                $(".tvc-return").on("click", function () {
                    $(".tvc").hide();
                    if ($(this).hasClass("this")) {
                        $(".save_success").show();
                    } else {
                        $(".success").show();
                    }
                   // $(".tvc_video video")[0].pause();
                    play=1;
                });


                $(".tvc-road").on("click", function () {
                   // $(".tvc_video video")[0].pause();
                    play=1;
                });
            },
        },
        /*bgm: function () {
            var _t = page.MusicICO;
            if (_t.hasClass('playing-stop')) {
                _t.removeClass('playing-stop');
                page.BGM1.play();
            } else if (_t.hasClass('playing')) {
                _t.addClass('playing-stop');
                page.BGM1.pause();
            } else {
                _t.addClass('playing');
                page.BGM1.play();
            }
        },*/
        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".p-bg,.prompt,.save_success,.unsuccess,.save_success").width(pageW).height(pageH);
        }
    }
    page.init();
})

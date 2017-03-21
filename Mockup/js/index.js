$(document).ready(function(){
    var pageH,pageW;
    var timer_piao;
    var timer_btn;
    page= {
        init: function () {
            ////阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            $(window).resize(function () {
                page.resize();
            });
            //播放动画对象数组
            page.imgW = 750;
            page.imgH = 1334;
            page.aniImgs = {'load' : [],'into01' : [], 'into02' : [], 'into03' : [],  'into04' : [], 'p1' : [], 'p2' : [], 'p3' : [], 'p4' : [], 'p5' : []};
            page.BGM = $('.bgm')[0];

            page.resize();
            page.loading.init();
            page._piao.init();

        },
        loading: {
            init: function () {
                page.loading._preload();
            },
            _preload:function(){
                //先绘制一张图
                page.stage = {};

                var manifest = [
                    './img/turn.png'
                ], str;
                for(var j=1; j<=8;j++){
                    str = './img/load/l_' + j + '.jpg';
                    manifest[manifest.length] = str;
                }
                var queueBe = new createjs.LoadQueue(true);

                queueBe.setMaxConnections(10);//设置并发数
                queueBe.maintainScriptOrder = true;

                queueBe.on('fileload', function (target) {
                    var src = target.item.src;
                    var key = src.substr(6);
                    key = key.substr(0, key.indexOf('/'));
                    if (key == 'load') {
                        page.loading.initBitmap(key, page.aniImgs[key].length, src);
                    }
                });
                queueBe.on("complete", function () {
                    //完成后操作
                    page.playAni('load', 'loadV', 6);
                    //先加载音乐
                    page._sound.init();
                });
                queueBe.loadManifest(manifest);

            },
            initBitmap : function(key,i, strurl) {
                var img = new Image();
                img.src = strurl;
                page.aniImgs[key][i] = img;
            }
        },
        _sound:{
            init:function(){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.on("fileload", page._sound.playSound, this);
                createjs.Sound.registerSound("./img/media/sound/bgm.mp3", "bgm");
                createjs.Sound.registerSound("./img/media/sound/click.mp3", "click");
                page.visualProgress = 0;
                page.visualtimer = setInterval(function () {
                    page.visualProgress++;
                    $(".loading_num").html(page.visualProgress + "%");
                    if (page.visualProgress >= 100) {
                        clearInterval(page.visualtimer);
                        page.start();
                    }
                }, 1000);
            },
            playSound : function (event) {
                if (event.id == 'bgm') {
                    page.MusicICO = $('.music-ico');
                    page.MusicICO.show();
                    page._sound.music = 1;
                    page.MusicICO.on('tap', page._sound.bgm);

                    //利用preload.js预加载
                    var manifest = [];
                    for (var i = 1; i <=6;i++) {
                        manifest[manifest.length] = './img/into01/into010' + i + '.jpg';
                    }
                    for (var b = 1; b <=9;b++) {
                        manifest[manifest.length] = './img/into02/into02000' + b + '.jpg';
                    }
                    for (var c = 1; c <=9;c++) {
                        manifest[manifest.length] = './img/into03/into03000' + c + '.jpg';
                        manifest[manifest.length] = './img/into04/index000' + c + '.jpg';
                    }
                    for (var d = 0; d <= 9; d++) {
                        manifest[manifest.length] = './img/p1/page1000' + d + '.jpg';
                        manifest[manifest.length] = './img/p2/page2000' + d + '.jpg';
                        manifest[manifest.length] = './img/p3/page3000' + d + '.jpg';
                        manifest[manifest.length] = './img/p4/page4000' + d + '.jpg';
                        manifest[manifest.length] = './img/p5/page5000' + d + '.jpg';
                    }


                    var queue = new createjs.LoadQueue(true);

                    queue.setMaxConnections(10); //设置并发数
                    queue.maintainScriptOrder = true;

                    queue.on("complete", function () {
                        //完成后操作
                        page.start();
                    });
                    queue.on("progress", function () {
                        var progress = queue.progress * 100;
                        progress = Math.floor(progress);
                        if (progress > page.visualtimer) {
                            clearInterval(page.visualtimer);
                            $(".loading_num").html(progress + "%");
                        }
                    });
                    queue.on('fileload', function (target) {
                        var src = target.item.src;
                        var key = src.substr(6);
                        key = key.substr(0, key.indexOf('/'));
                        page.loading.initBitmap(key, page.aniImgs[key].length, src);
                    });
                    queue.loadManifest(manifest);
                }
            },
            bgm : function () {
                if(page._sound.music==1){
                    $(this).find("img").eq(0).hide();
                    $(this).find("img").eq(1).show();
                    page.BGM.pause();
                    page._sound.music=0;
                }else{
                    $(this).find("img").eq(1).hide();
                    $(this).find("img").eq(0).show();
                    page.BGM.play();
                    page._sound.music=1
                }
            }
        },
        start : function () {
            if (page.IsStart == undefined) {
                page.IsStart = true;
                $(".loading").addClass("animated fadeOut").one('webkitAnimationEnd', function () {
                    $(this).remove();
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

                page.p1.init(); //修改了初始化位置
            }
        },
        playAni : function (key, id, fps) {
            if(fps == undefined){
                fps = 6;
            }

            page.aniKey = key;
            if (page.stage[key] == undefined) {
                var len = page.aniImgs[key].length;
                page.stage[key] = new createjs.Stage(id);
                var  container = new createjs.Container();
                page.stage[key].canvas.width = page.imgW;
                page.stage[key].canvas.height = page.imgH;

                var data = {
                    "images":page.aniImgs[key],
                    "frames":{width: page.imgW, height:page.imgH, count:len, regX:0 , regY:0},

                    "animations":{
                        run : [0, len - 1]
                    }
                }
                var spriteSheet = new createjs.SpriteSheet(data);
                var animation = new createjs.Sprite(spriteSheet, "run");
                container.addChild(animation);
                page.stage[key].addChild(container);
            }
            createjs.Ticker.reset();
            createjs.Ticker.setFPS(fps);
            createjs.Ticker.on("tick", page.tick);
        },
        tick : function () {
            page.stage[page.aniKey].update();
        },
        btn_click_yes:function(){
            clearTimeout(page.timer_btn);
            $(".btn_pub").removeClass("this");
            page.timer_btn = setTimeout(function(){
                $(".btn_pub").addClass("this");
            },7000);
        },
        p1:{
            init:function(){
                page.Pages = [];
                for (var i = 1; i <= 9; i++) {
                    page.Pages[i] = $('#page' + i);
                }
                page.Pages[1].addClass('show animated fadeIn fadeLong').one('webkitAnimationEnd', function () {
                    $(this).removeClass('animated fadeIn fadeLong');
                });
                page.playAni('into01', 'into01V');
                page.nextCanvas = 'into02';
                page.autoPlayTime = 1000 * 3;
                page.autoPlay1Stop = false;
                page.autoPlay1 = setTimeout(function () {
                    if (!page.autoPlay1Stop) {
                        page.ChangePage(page.Pages[1], page.Pages[2], 'up');
                    }
                }, page.autoPlayTime);
                if (page.p1.setEvent == undefined) {
                    page.p1.setEvent = true;
                    page.Pages[1].on('touchstart', {from:page.Pages[1], next:page.Pages[2]}, page.touchStartY);
                    $('.up_down1').tap(function (e) {
                        e.preventDefault();
                        page.ChangePage(page.Pages[$(this).data('p')], page.Pages[$(this).data('np')], 'up');
                        if($(this).data('p')==4){
                            page.btn_click_yes();
                        }
                    });
                }
            },
        },
        p2:{
            init:function(){
                page.upCanvas = 'into01';
                page.nextCanvas = 'into03';
                page.autoPlay2Stop = false;
                page.autoPlay2 = setTimeout(function () {
                    if (!page.autoPlay2Stop) {
                        page.ChangePage(page.Pages[2], page.Pages[3], 'up');
                    }
                }, page.autoPlayTime);
                if (page.p2.setEvent == undefined) {
                    page.p2.setEvent = true;
                    page.Pages[2].on('touchstart', {from:page.Pages[2], next:page.Pages[3]}, page.touchStartY);
                }
            },
        },
        p3:{
            init:function(){
                page.page4 = $('#page4');
                page.upCanvas = 'into02';
                page.nextCanvas = 'into04';
                page.autoPlay3Stop = false;
                page.autoPlay3 = setTimeout(function () {
                    if (!page.autoPlay3Stop) {
                        page.ChangePage(page.Pages[3], page.Pages[4], 'up');
                    }
                }, page.autoPlayTime);
                if (page.p3.setEvent == undefined) {
                    page.p3.setEvent = true;
                    page.Pages[3].on('touchstart', {from:page.Pages[3], next:page.Pages[4]}, page.touchStartY);
                }
            }
        },
        p4:{
            init:function(){
                page.upCanvas = 'into03';
                page.nextCanvas = 'p1';
                if (page.p4.setEvent == undefined) {
                    page.p4.setEvent = true;
                    page.Pages[4].on('touchstart', {from:page.Pages[4], next:page.Pages[5]}, page.touchStartY);
                }
            },
        },
        p5:{
            init:function(){
                page.upCanvas = 'p2';
                page.showCanvas = 1;
                page.nextCanvas = 'p4';
                page.showPage = 5;
                page.upPage = 9;
                page.nextPage = 6;
                $('.btn_pub2').show();
                if (page.p5.setEvent == undefined) {
                    page.p5.setEvent= true;
                    page.Pages[5].on('touchstart', {from: page.Pages[5], up:page.Pages[9], next:page.Pages[6]},  page.touchStartX);
                    $('.button-next').tap(function (e) {
                        e.preventDefault();
                        var nc = parseInt(page.nextCanvas.substr(1));
                        page.ChangePage(page.Pages[page.showPage], page.Pages[page.nextPage], 'left');
                        page.btn_click_yes();

                    });
                    $('.button-prev').tap(function (e) {
                        e.preventDefault();
                        var nc = parseInt(page.upCanvas.substr(1));
                        page.ChangePage(page.Pages[page.showPage], page.Pages[page.upPage], 'right');
                        page.btn_click_yes();
                    });
                }
            },
        },
        p6:{
            init:function(){
                page.upCanvas = 'p1';
                page.showCanvas = 4;
                page.nextCanvas = 'p3';
                page.showPage = 6;
                page.upPage = 5;
                page.nextPage = 7;
                if (page.p6.setEvent == undefined) {
                    page.p6.setEvent = true;
                    page.Pages[6].on('touchstart', {from:page.Pages[6], up: page.Pages[5], next:page.Pages[7]}, page.touchStartX);
                }
            },
        },
        p7:{
            init:function(){
                page.upCanvas = 'p4';
                page.showCanvas = 3;
                page.nextCanvas = 'p5';
                page.showPage = 7;
                page.upPage = 6;
                page.nextPage = 8;
                if (page.p7.setEvent == undefined) {
                    page.p7.setEvent = true;
                    page.Pages[7].on('touchstart', {from:page.Pages[7], up:page.Pages[6], next:page.Pages[8]}, page.touchStartX);
                }
            },
        },
        p8:{
            init:function(){
                page.upCanvas = 'p3';
                page.showCanvas = 4;
                page.nextCanvas = 'p2';
                page.showPage = 8;
                page.upPage = 7;
                page.nextPage = 9;
                if (page.p8.setEvent == undefined) {
                    page.p8.setEvent = true;
                    page.Pages[8].on('touchstart', {from:page.Pages[8], up:page.Pages[7], next:page.Pages[9]}, page.touchStartX);
                }
            },
        },
        p9:{
            init:function(){
                page.upCanvas = 'p5';
                page.showCanvas = 2;
                page.nextCanvas = 'p1';
                page.showPage = 9;
                page.upPage = 8;
                page.nextPage = 5;
                if (page.p9.setEvent == undefined) {
                    page.p9.setEvent = true;
                    page.Pages[9].on('touchstart', {from:page.Pages[9], up:page.Pages[8], next:page.Pages[5]}, page.touchStartX);
                }
            },
        },
        _piao:{
            init:function(){
                page._piao._click();
                page._piao._lingqu_click();
                page._piao._p6_click();
                page._piao._again_click();
            },
            _click:function(){
                var _num;
                $(".btn_pub").on("click",function(){
                    if($(this).hasClass("this")){
                        $(".piao").show();
                        $(".p0").hide();
                        _num =  $(this).data("num");
                        $(".lingqu").data("num",_num);
                        $(".piao").data("num",_num);
                        page.showCode = false;
                        page.timer_piao = setTimeout(function(){
                            if (!page.showCode) {
                                page.showCode = true;
                                page._piao.getCode(_num);
                                $(".piao" + _num).show();
                            }
                        },5000)
                    }
                });
            },
            _lingqu_click:function(){
                var _num;
                $(".lingqu,.piao").on("click",function(){
                    if (!page.showCode) {
                        page.showCode = true;
                        _num = $(this).data("num");
                        page._piao.getCode(_num);
                        $(".piao" + _num).show();
                        clearTimeout(page.timer_piao);
                    }
                })
            },
            getCode : function (num) {
                $.getJSON('http://wechat.fotile.com/2017newyear/ftnew/create.php', function(d) {
                    if (d.imgpath != undefined) {
                        $('.piao' + num + ' .codeimg').attr('src', d.imgpath)
                        $('.piao' + num + ' .words').text(d.code)
                    }
                })
            },
            _p6_click:function(){
                $("._info").on("click",function(){
                  //  createjs.Sound.play("click");
                    $(".information").show();
                });
                $(".information").on("click",function(){
                    $(this).hide();
                })
            },
            _again_click:function(){
                $(".again").on("click",function(){
                    $('.piao,.btn_pub2').hide();
                    $('.pageH.show').removeClass('show animated');
                    $(this).parents('.piao-c').addClass('fadeOut2 animated fadeLong fadeLongY').one('webkitAnimationEnd', function () {
                        $(this).removeClass('show animated fadeLong fadeOut2').hide();
                        $('.piao-c').hide();
                    });
                    page.Pages[4].addClass('fadeIn animated show fadeLong').one('webkitAnimationEnd', function (e) {
                        $(this).removeClass('fadeIn animated fadeLong');
                        page['p4'].init();
                    });
                })
            }
        },
        touchStartX : function (e) {
            $(this).on('touchmove', e.data, page.touchMoveX)
            $(this).one('touchend', page.touchEndX)
            page.X = e.changedTouches[0].clientX;
        },
        touchMoveX : function (e) {
            e.preventDefault();
            var x = e.changedTouches[0].clientX;
            if (x - page.X < -50) {
                $(this).off('touchmove', page.touchMoveX);
                if(e.data.next != undefined) {
                    page.ChangePage(e.data.from, e.data.next, 'left');
                }
                page.btn_click_yes();
            } else if (x - page.X > 50) {
                $(this).off('touchmove', page.touchMoveY);
                if(e.data.up != undefined) {
                    page.ChangePage(e.data.from, e.data.up, 'right');
                }
                page.btn_click_yes();
            }
        },
        touchEndX : function () {
            $(this).off('touchmove', page.touchMoveX);

        },
        touchStartY : function (e) {
            $(this).on('touchmove', e.data, page.touchMoveY)
            $(this).one('touchend', page.touchEndY)
            page.Y = e.changedTouches[0].clientY;
        },
        touchMoveY : function (e) {
            e.preventDefault();
            var y = e.changedTouches[0].clientY;
            if (y - page.Y < -50) {
                $(this).off('touchmove', page.touchMoveY);
                if(e.data.next != undefined) {
                    page.ChangePage(e.data.from, e.data.next, 'up');
                }
                page.btn_click_yes();
            } else if (y - page.Y > 50) {
                $(this).off('touchmove', page.touchMoveY);
                if(e.data.up != undefined) {
                    page.ChangePage(e.data.from, e.data.up, 'down');
                }
                page.btn_click_yes();
            }
        },
        touchEndY : function () {
            $(this).off('touchmove', page.touchMoveY);
        },
        /**
         * 滑动页面
         * @param from 新页
         * @param to   旧页
         * @param ori  方向 up|down|left|right
         * @constructor
         */
        ChangePage : function(from, to, ori) {
            if (page.IsAni) return false;

            page.IsAni = true;

            var fromAni = 'fadeOut2';
            var toAni = 'fadeIn';

            if (page.autoPlay1 != undefined) {
                page.autoPlay1Stop = true;
                clearTimeout(page.autoPlay1);
                page.autoPlay1 = undefined;
            }
            if (page.autoPlay2 != undefined) {
                page.autoPlay2Stop = true;
                clearTimeout(page.autoPlay3);
                page.autoPlay2 = undefined;
            }
            if (page.autoPlay3 != undefined) {
                page.autoPlay3Stop = true;
                clearTimeout(page.autoPlay3);
                page.autoPlay3 = undefined;
            }
            //切换之前,清楚Tick
            if (ori == 'up' || ori == 'left') {
                page.playAni(page.nextCanvas, page.nextCanvas + 'V');
            } else {
                page.playAni(page.upCanvas, page.upCanvas + 'V');
            }
            from.addClass(fromAni + ' animated fadeLong fadeLongY').one('webkitAnimationEnd', function () {
            });
            to.addClass(toAni + ' animated show fadeLong').one('webkitAnimationEnd', function (e) {
                page.IsAni = false;
                from.removeClass('show animated fadeLong ' + fromAni);
                to.removeClass(toAni +' animated fadeLong');
                var _id = to.attr('id');
                _id = _id.substr(4);
                page.Page = $('#page' + _id);
                //page.clear();
                page['p' + _id].init();
            });
        },
        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', page.imgW).attr('height', page.imgH).css({width: "16rem", height: "28.5rem"});
        }
    };
    page.init();
});
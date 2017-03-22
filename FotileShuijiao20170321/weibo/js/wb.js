/**
 * Created by admin on 2017/3/20.
 */
$(document).ready(function() {
    page = {
        init: function() {
            page._canvas.init();
        },
        _canvas:{
            init:function(){
                page._canvas.wave1();
                page._canvas.wave2();
                page._canvas.wave3();
                page._canvas.wave_num();
                page._canvas.btn_click();

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
            wave_num:function(){
                $.post("http://wechat.fotile.com/worldwaterday/public/index.php/api/activity/num", function (data) {
                    var obj = eval('(' + data + ')');
                    console.log(obj.data);
                    active_num = obj.data.total;
                    $(".yiyou_red").html(active_num);
                    $(".p1_red").html(1000000 - active_num);
                    $(".wx").html(obj.data.wx);
                    $(".wb").html(obj.data.wb);
                    page.active_percent = Math.floor(obj.data.scale * 100);
                    //page.active_percent =30;
                    if (page.active_percent <= 9) {
                        $(".right_percent").css("left","63px")
                    }
                    $(".right_num").html(page.active_percent);
                    page._canvas.wave_up();
                    if(page.active_percent>=100){
                        $(".right_percent").css("left","88px")
                    }
                })
            },
            wave_up:function(){
                var _bottom = -81;
                var _top=200;
                var _right_line = $(".right_line");
                var _canvas_box = $(".canvas_box");
                var _max = page.active_percent*2-81;
                console.log(_max)
                var timer = setInterval(function(){
                    _bottom +=2;
                    _top -=2.07;
                    _right_line.css("bottom",_bottom+"px");
                    _canvas_box.css("top",_top+"px");
                    if(_bottom>=_max){
                        clearInterval(timer)
                    }
                },10)
            },
            btn_click:function(){
                $(".btn").on("click",function(){
                    alert("1.复制范本文字，2.带入有‘氵’或‘冫’的名字，3.最后用@来提名三位名中有‘水’的好友")
                })
            }
        },
    };

    page.init();
});
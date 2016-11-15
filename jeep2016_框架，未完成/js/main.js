/**
 * Created by Administrator on 16-10-31.
 */
$(document).ready(function() {
    var pageH, pageW;

    page = {
        init: function () {
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            $(window).resize(function () {
               // window.location.reload();
                page.resize();
                page.interior.init();
            });
            //音乐播放
            page.BGM = $('#bgm')[0];
            page.BGM.play();
            //音乐开始/暂停
            page.MusicICO = $('.music-ico');
            page.MusicICO.addClass('playing');
            page.MusicICO.on('click', page.loadImg.bgm);


            page.resize();
            page.home.init();
            page.swiper.init();
            page.interior.init();
            page.rotate360.init();
            page.loadImg.init();
            page.control.init();
            page.engine.init();


        },
        loadImg: {
            init: function () {
                page.loadImg._preload();
            },
            bgm: function () {
                var _t = page.MusicICO;
                if (_t.hasClass('playing-stop')) {
                    _t.removeClass('playing-stop');
                    page.BGM.play();
                } else if (_t.hasClass('playing')) {
                    _t.addClass('playing-stop');
                    page.BGM.pause();
                } else {
                    _t.addClass('playing');
                    page.BGM.play();
                }
            },
            _preload: function () {
                var num = 0;
                var manifest = [
                    './img/home.jpg',
                    './img/close.png',
                    './img/bg.jpg'

                ];
                for (var i = 1; i <= 8; i++) {
                    manifest[manifest.length] = './img/rotate360/' + i + '.png';
                }
                for (var j = 1; j <= 50; j++) {
                    manifest[manifest.length] = './img/yan360/' + j + '.png';
                }
                var queue = new createjs.LoadQueue(false);
                // 关键！----设置并发数
                queue.setMaxConnections(100);
                // 关键！---一定要将其设置为 true, 否则不起作用
                queue.maintainScriptOrder = true;
                queue.on("complete", function () {
                    console.log("加载完成!!!");
                });
                queue.on("progress", function () {
                    var progress = queue.progress * 100;
                    progress = Math.floor(progress);
                    num++;
                    console.log(num + "-----" + progress);
                    $("#s_id").html(progress);
                });
                queue.loadManifest(manifest);
            },
        },
        home: {
            init: function () {
                page.home.menu_click();
                page.home.menu_link();
            },

            menu_click: function () {
                var temp = 0;
                var _num = 0;
                var x_start, x_move, x_length = 0;
                $('.swiper_box').on("touchstart", function (e) {
                    var touch = e.touches[0];
                    x_start = touch.pageX;
                });
                $('.swiper_box').on("touchmove", function (e) {
                    var touch = e.touches[0];
                    x_move = touch.pageX;
                    x_length = x_move - x_start;

                    console.log(x_length);
                    if (x_length < -50) {
                        $('.big').anim({
                            right: "98px",
                        }, 0.1);
                        $(".menu_btn").anim({
                            left: "-108px",
                        }, 0.1);
                        $(".menu_btn").css({
                            "transform": "rotateZ(0deg)"
                        });
                        temp = 1;
                    }else if(x_length > 50){
                        $('.big').anim({
                            right: "2px",
                        }, 0.1);
                        $('.small').anim({
                            right: "22px",
                        }, 0.1);
                        $(".menu_btn").anim({
                            left: "-10px;"
                        }, 0.1);
                        $(".menu_btn").css({
                            "transform": "rotateZ(180deg)"
                        });
                        $(".sanjiao").anim({
                            rotate: '0deg'
                        }, 0.1);
                        _num=0;
                        temp = 0;
                    }

                });
                $('.menu_btn').on("touchend", function () {
                    if (temp == 0) {
                        $('.big').anim({
                            right: "98px",
                        }, 0.1);
                        /*   $('.small').anim({
                         right:"95px",
                         },0.1);*/
                        $(".menu_btn").anim({
                            left: "-108px",
                        }, 0.1)
                        $(".menu_btn").css({
                            "transform": "rotateZ(0deg)"
                        });
                        //$(".menu_btn img").eq(1).hide().siblings().show();
                        temp = 1;
                    } else {
                        $('.big').anim({
                            right: "2px",
                        }, 0.1);
                        $('.small').anim({
                            right: "22px",
                        }, 0.1);
                        $(".menu_btn").anim({
                            left: "-10px;"
                        }, 0.1);
                        $(".menu_btn").css({
                            "transform": "rotateZ(180deg)"
                        });
                        $(".sanjiao").anim({
                            rotate: '0deg'
                        }, 0.1);
                        _num=0;
                        // $(".menu_btn img").eq(0).hide().siblings().show();
                        temp = 0;
                    }

                    return false;
                });
                $(".menu_link").on("click", function () {
                    if (_num == 0) {
                        $('.small').anim({
                            right: "98px",
                        }, 0.1);
                        $(".sanjiao").anim({
                            rotate: '90deg'
                        }, 0.1)
                        _num = 1;
                    } else {
                        $('.small').anim({
                            right: "22px",
                        }, 0.1);
                        $(".sanjiao").anim({
                            rotate: '0deg'
                        }, 0.1)
                        _num = 0;
                    }
                });
                $(".menu_link1").on('click', function () {
                    $('.menu_link1').css({
                        "background": "url('./img/home/2.png')",
                        "background-size": "cover"
                    })
                    $(this).css({
                        "background": "url('./img/home/1.png')",
                        "background-size": "cover"
                    });
                })

            },
            menu_link: function () {
                var _link = $('.menu_list ul li');

                _link.on('click', function () {
                    var _num = $(this).data("link");
                    $('.link' + _num).show().siblings().hide();
                })

            },

        },
        swiper: {
            init: function () {
                page.swiper._click();
                page.swiper._num();
            },
            _num: function () {
                $('.pub_num').on('click', function () {
                    var _num = $(this).data("num");
                    console.log(_num);
                    $('.par_' + _num).show();

                })
            },
            _click: function () {
                var num = 0;
                $(".right_btn").on("click", function () {
                    var _length = $(this).parent().find('.public_slide ul li').length;
                    console.log(_length)
                    $this = $(this);
                    var timer = setInterval(function () {
                        num += 5;
                        if (num >= 100 * (_length - 1)) {
                            num = 100 * (_length - 1);
                            clearInterval(timer);
                        }
                        if (num > 100 * (_length - 2)) {
                            $('.right_btn').hide();
                        }
                        if (num >= 0) {
                            $('.left_btn').show();
                        }

                        $this.parent().find('.public_slide').css('left', -num + "%");
                        if (num % 100 == 0) {
                            clearInterval(timer);
                        }
                    }, 10);
                });
                $(".left_btn").on("click", function () {
                    var _length = $(this).parent().find('.public_slide ul li').length;
                    $this = $(this);
                    var timer = setInterval(function () {
                        num -= 5;
                        if (num <= 0) {
                            num = 0;
                            clearInterval(timer);
                        }
                        if (num < 100) {
                            console.log(num);
                            $('.left_btn').hide();
                            console.log(2121);
                        }
                        if (num < 100 * (_length - 1)) {
                            $('.right_btn').show();
                        }

                        $this.parent().find('.public_slide').css('left', -num + "%");
                        if (num % 100 == 0) {
                            clearInterval(timer);
                        }
                    }, 10);
                });
                $(".delete_btn").on("click", function () {
                    $(this).parent().hide();
                    num = 0;
                    $('.left_btn').hide();
                    $('.right_btn').show();
                    $('.public_slide').css('left', "0%");

                });

            },


        },

        control: {
            init: function () {
                page.control._click();
            },
            _click: function () {
                $(".control_jia").on("click", function () {
                    $(".control_jia").hide();
                    $(".control_img1").hide();
                    $(".control_img2").show();
                    $(".control_jian").show();
                    $(".pub_kuang .pub_num").show();
                });
                $(".control_jian").on("click", function () {
                    $(".control_jia").show();
                    $(".control_img1").show();
                    $(".control_img2").hide();
                    $(".control_jian").hide();
                    $(".pub_kuang .pub_num").hide();
                })
            }
        },
        engine: {
            init: function () {
                page.engine._click();
            },
            _click: function () {
                $(".engine_jia").on("click", function () {
                    $(".engine_jia").hide();
                    $(".engine_img1").hide();
                    $(".engine_img2").show();
                    $(".engine_jian").show();
                    $(".engine_jia2").show();

                });
                $(".engine_jian").on("click", function () {
                    $(".engine_jia").show();
                    $(".engine_img1").show();
                    $(".engine_img2").hide();
                    $(".engine_jian").hide();
                    $(".engine_jia2").hide();
                })
            },
        },
        interior: {
            init: function () {
                page.interior.remove_magnifier();
                page.interior.icon_click();
            },
            icon_click: function () {
                var temp = 0;
                $('.interior_icon .hw20').on('click', function () {
                    if (temp == 0) {
                        $(".icon_jia").hide();
                        $(".icon_jian1").show();
                        $(".magnifier").show();
                        temp = 1;
                    } else {
                        $(".icon_jian1").hide();
                        $(".icon_jia").show();
                        $(".magnifier").hide();
                        temp = 0;
                    }
                })
            },
            remove_magnifier: function () {
                var imgH = $(".toushi").height();
                var imgW = $(".toushi").width();
                // console.log(imgH);
                // console.log(imgW);
                var el = $(".magnifier");
                var el_img = $(".magnifier .fang");
                el.css({
                    "width": 0.1664 * pageW + "px",
                    "height": 0.1664 * pageW + "px",
                    "right": -0.0832 * pageW + "px",
                    "top": -0.0832 * pageW + "px",

                })

                el_img.height(pageH * 1.5).width(pageW * 1.5);
                var x_start, x_move, x_length = 0;
                var y_start, y_move, y_length = 0;

                el.on("touchstart", function (e) {
                    var touch = e.touches[0];
                    x_start = touch.pageX - x_length;
                    y_start = touch.pageY - y_length;
                })
                el.on("touchmove", function (e) {
                    var touch = e.touches[0];
                    x_move = touch.pageX;
                    y_move = touch.pageY;
                    x_length = x_move - x_start;
                    y_length = y_move - y_start;
                    console.log(x_length + '--' + y_length);
                    if (x_length <= -pageW * 0.5) {
                        x_length = -pageW * 0.5;
                    } else if (x_length >= 0) {
                        x_length = 0;
                    }
                    if (y_length >= pageH * 0.5) {
                        y_length = pageH * 0.5
                    } else if (y_length <= 0) {
                        y_length = 0
                    }
                    el.css({
                        "right": -0.0832 * pageW - x_length + "px",
                        "top": -0.0832 * pageW + y_length + "px"
                    })
                    el_img.css({
                        "right": x_length * 2.584 + "px",
                        "top": -y_length * 2 + "px"
                    })


                })

            }


        },

        rotate360: {
            init: function () {
                page.rotate360._touchmove();


                var _img = $('.rotate360_pic .h');
                _img.eq(0).show().siblings().hide();
                $(".rotate360_color ul li").on('click', function () {
                    $(this).find("img").eq(1).show();
                    $(this).siblings().find("img").eq(1).hide();
                    var num = $(this).data('num') * 25;
                    page.rotate360._changecolor(num);
                    page.rotate360._touchmove();

                });

            },
            _changecolor: function (num) {
                for (var i = 1; i <= 25; i++) {
                    $('.pic' + i).html("<img src='img/yan360/" + (i + num) + ".png'/>")
                }
                var _img = $('.rotate360_pic .h');
                _img.eq(0).show().siblings().hide();

            },
            _touchmove: function () {
                var _img = $('.rotate360_pic .h');
                var el = $('.rotate360_pic');
                var x_move, x_start;
                var x_length = 0;
                var num = 0;
                el.on("touchstart", function (e) {
                    var touch = e.touches[0];
                    x_start = touch.pageX - x_length;
                });
                el.on("touchmove", function (e) {
                    var touch = e.touches[0];
                    x_move = touch.pageX
                    x_length = x_move - x_start;

                    num = x_length / 8;
                    num = parseInt(num);
                    if (num > 0) {
                        num = num % 25;
                        _img.eq(num).show().siblings().hide();
                    }
                    else {
                        //i = i - Math.floor(i / 25) * 25;
                        num = num % 25;
                        _img.eq(25 + num).show().siblings().hide();
                    }

                });

            }
        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").height(pageH).width(pageW);
            if (pageW > pageH) {
                //window.location.reload();
                //$('.jeep').show();
            }
        },

    }
    page.init();

});


$(document).ready(function () {
    var pageH,pageW;
    var page = {
        init : function() {
            page.resize();
            page.p0.init();
            page.p1.init();
        //音乐播放
            page.BGM = $('#bgm')[0];
            page.BGM.play();
        //音乐开始/暂停
            page.MusicICO = $('.music-ico');
            page.MusicICO.addClass('playing');
            page.MusicICO.on('click', page.p0.bgm);
        },

        p0:{
            init:function(){
             /*   setTimeout(function(){
                    $(".p1_1").hide();
                    $(".swiper-container").show();
                },7000);*/
        // 动画模拟加载；
                /*$('.wordLeft').one('webkitAnimationEnd', function() {
                    setTimeout(function () {
                        $(".p1_1").hide();
                        $(".swiper-container").show();
                    }, 1000);
                });*/
        //加载进度依据图片加载。
                /*var imgNum=$('img').length;
                var bg=[];
                var nowImgnum=0;
                var loadWidth=0;
                var _num=0;
                $('img').each(function(){
                    bg.push($(this).attr('src'));
                });
                for(var i=0;i<imgNum;i++){
                    var _img= new Image();
                    _img.src=bg[i];
                    _img.onload=function(){
                        nowImgnum++;
                        loadWidth=nowImgnum/imgNum;
                        loadWidth*=100;
                        _num = parseInt(loadWidth);
                        console.log(_num);
                        $(".img_p1_12").css("width",_num+"%");
                        if(loadWidth==100){
                            setTimeout(function(){
                                $(".p1_1").hide();
                                $(".swiper-container").show();
                            },2000);
                        }
                    }
                }
*/
        //利用preload.js预加载

                var manifest = [
                    './img/p5/1.png',
                    './img/sound/bgm.mp3',
                    './img/turn.gif',
                    './img/p0/bg.jpg',
                    './img/p1/0.png',
                    './img/p5/qiufen.png',
                    './index.html',
                    './js/jquery.js',
                    './css/animate.css',
                ];
                for (var i = 0; i <= 7; i++) {
                    manifest[manifest.length] = './img/p1/' + i + '.png';
                    manifest[manifest.length] = './img/p2/' + i + '.png';
                    manifest[manifest.length] = './img/p3/' + i + '.png';
                    manifest[manifest.length] = './img/p4/' + i + '.png';

                }
                var queue = new createjs.LoadQueue(true);
                queue.on("complete",function(){
                    setTimeout(function(){
                        $(".p1_1").hide();
                        $(".swiper-container").show();
                    },2000);
                });
                queue.on("progress",function(){
                    var progress = queue.progress * 100;
                    console.log(progress);
                    $(".img_p1_12").css("width",progress+"%");
                });
                queue.loadManifest(manifest);

            },


            bgm : function () {
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
            }
        },


        p1 : {
          init: function() {
              page.p1._swiper();
              page.p1._heat();
          },
        //热气效果
          _heat: function() {
            var imgNum = -1;
            setInterval( function () {
                $(".heat img").eq(imgNum).show().siblings().hide();
                $(".heat2 img").eq(imgNum).show().siblings().hide();
                imgNum++;
                if (imgNum == 2) {
                    imgNum =  -1;
                }
            },350);
          },
         //swiper滑动
            _swiper: function() {
                var _temp = 0;
                var _progress;
                var _num;
                if (mySwiper == undefined) {
                    var mySwiper = new Swiper('.swiper-container', {
                        direction: 'vertical',
                        followFinger: false,
                        observer: true,
                        onInit: function (swiper) {
                            //console.log("111");
                            swiperAnimateCache(swiper);
                            swiperAnimate(swiper);
                        },
                        onSlideChangeStart: function (swiper) {
                            $(".p1").removeClass("rollIn fadeInLeft");
                            $(".p2").removeClass("rollIn fadeInLeft");
                            $(".p3").removeClass("rollIn fadeInLeft");
                            $(".p4").removeClass("rollIn fadeInLeft");
                            $(".p5").removeClass("rollIn fadeInLeft");
                            //判断滑动方向
                            _progress=mySwiper.progress;
                            _num = _progress - _temp;
                            _temp = _progress;
                            console.log(_num);
                            var _index1 = swiper.activeIndex;
                            swiperAnimate(swiper);
                            if(_num > 0){

                            if (_index1 == 0) {
                                $(".p1").addClass("rollIn");
                            }
                            if (_index1 == 1) {
                                $(".p2").addClass("rollIn");
                            }
                            if (_index1 == 2) {
                                $(".p3").addClass("rollIn");
                                page.p3.init();
                            }
                            if (_index1 == 3) {
                                $(".p4").addClass("rollIn");
                            }
                            if (_index1 == 4) {
                                $(".p5").addClass("rollIn");
                            }
                            }else{

                                if (_index1 == 0) {
                                    $(".p1").addClass("fadeInLeft");
                                }
                                if (_index1 == 1) {
                                    $(".p2").addClass("fadeInLeft");
                                }
                                if (_index1 == 2) {
                                    $(".p3").addClass("fadeInLeft");
                                    page.p3.init();
                                }
                                if (_index1 == 3) {
                                    $(".p4").addClass("fadeInLeft");
                                }
                                if (_index1 == 4) {
                                    $(".p5").addClass("fadeInLeft");
                                }
                            }
                        }

                    });
                }

            },
        },
        p3 : {
          init : function() {
              page.p3._light();
          } ,

        //剑光效果
            _light : function(){
                var num = 0;
                var _timer = setInterval(function() {
                        $(".light img").eq(num).show().siblings().hide();
                     num++;
                     if (num == 5) {
                         num = 0;
                     }
                    }, 300 )
            },
        },

        resize : function() {
            pageW = $(window).width();
            pageH = $(window).height();
            $(".wrap,.swiper-container,.swiper-slide,.p1_1").width(pageW).height(pageH);
        }
    }
    page.init();
})
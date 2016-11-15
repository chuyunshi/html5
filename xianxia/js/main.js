var pageW,pageH;
var wel=$(".welcomepage")
$(document).ready(function () {
	

	var page = {
        init : function() {
            page.resize();
            page.p0.init(1);
            //page.BGM = $('#bgmusic')[0];
            //page.BGM.play();
            //page.MusicICO = $('.music-ico');
            //page.MusicICO.addClass('playing');
            //page.MusicICO.tap(page.p0.bgm);
            //new Hammer(page.MusicICO[0]).on('tap', page.p0.bgm);
            //page.Click = $('#auClick');
            page.IsAni = false;

            //请求路径，改为自身服务器地址
            page.URL = 'http://mgm.dzing.com.cn/';
            //page.URL = 'http://mg.app/';
        },
        p0 : {
            init : function(pnum) {
                //加载swiper
                //$.get('1.html', function (d) {
                //    $('#page2').html(d).data('load', 'ok');
                //}, 'html');
                //$.get('2.html', function (d) {
                //    $('#page3').html(d).data('load', 'ok');
                //}, 'html');
                //$.get('3.html', function (d) {
                //    $('#page4').html(d).data('load', 'ok');
                //}, 'html');
                //显示第几页
                var loadimg = 0;
                var isload = false;
                var imgNum=$('img').length;
                var bg = []; //需要加载的背景图片图片数组
                imgNum += bg.length;
                var nowImgNum = 0;
                var load = $('#loading .loadline')
                page.p0.LoadLine = $('#loading .loadline')
                page.p0.LoadNum = $('#loadNum');
                var loadwidth = 100;
                var waitTimes = 0;
                var isDown = false;
                var loadIn = setInterval(function () {
                    if (isDown) {
                        clearInterval(loadIn);
                        return false;
                    }
                    waitTimes++;
                    if (waitTimes > 40) {
                        loadwidth += 1;
                        if (loadwidth >= 100) {
                            isDown = true;
                            loadwidth = 100;
                            page.p0.changeWidth(loadwidth);
                            clearInterval(loadIn);
                            $('.page.show').removeClass('show');
                            page.Page = $('#page' + pnum);
                            page.Page.addClass('show');
                            //page['p' + pnum].init();
                            return false;
                        }
                        page.p0.changeWidth(loadwidth);
                    }
                }, 50);
                $('img').each(function () {
                    bg.push($(this).attr('src'));
                });
                imgNum = bg.length;
                for(var i = 0; i<imgNum;i++) {
                    var _img = new Image();
                    _img.src = bg[i];
                    _img.onload = function () {
                        waitTimes = 0;
                        nowImgNum++;
                        loadwidth = nowImgNum / imgNum;
                        loadwidth *= 100;
                        page.p0.changeWidth(loadwidth);
                        if(loadwidth > 95){
                            // 加载完成
                            if (isDown) {
                                return false;
                            } else {
                                isDown = true;
                                clearInterval(loadIn);
                                $('.page.show').removeClass('show');
                                page.Page = $('#page' + pnum);
                                page.Page.addClass('show');
                                page['p' + pnum].init();
                            }
                        }
                    };
                }
            },
            jump : function(pnum) {
                page.clear();
                $('.page.show').removeClass('show');
                page.Page = $('#page' + pnum);
                page.ChangePage($('.page.show'), page.Page, 'up')
                page.Page.addClass('show');

                page['p' + pnum].init();
            },
            bgm : function() {
                var _t = page.MusicICO;
                if (_t.hasClass('playing')) {
                    _t.removeClass('playing');
                    page.BGM.pause();
                } else {
                    _t.addClass('playing');
                    page.BGM.play();
                }
            },
            changeWidth: function (w) {
                w = parseInt(w);
                page.p0.LoadLine.width(w + '%');
                page.p0.LoadNum.text(w);
            }
        },
        clear: function () {
            /**
             * 清楚定时器
             */
        },
        p1 : {
            init : function() {

                //if (page.p1.hadEvent == undefined) {
                //    page.p1.hadEvent = true;
                    $('#page1 .btn1').tap(function () {
                        //page.Click[0].play();
                        //路线浏览
                        $('#page1').removeClass('show');
                        $('#page2').addClass('show');
                        if (page.p1.mySwiper1 == undefined) {
                            page.p1.mySwiper1 = new Swiper('#swiperArea1', {
                                direction: 'vertical',
                            });
                        } else {
                            page.p1.mySwiper1.slideTo(0, 0, false);
                        }
                    });
                    $('#page1 .btn2').tap(function () {
                        //page.Click[0].play();
                        //试驾流程
                        $('#page1').removeClass('show');
                        $('#page3 .choice').show();
                        $('#swiperAreaMT,#swiperAreaAT').hide();
                        $('#page3').addClass('show');
                    });
                    $('#page1 .btn3').tap(function () {
                        //page.Click[0].play();
                        //产品反馈
                        $('#page1').removeClass('show');
                        //page.p1.mySwiper1.slideTo(0, 0, false);
                        $('#page4 .choice').show();
                        $('.mtzan,.atzan').hide();
                        $('#page4').addClass('show');
                    });

                    $('.roadarea .return').tap(function () {
                        $('#page2').removeClass('show');
                        $('#page1').addClass('show');
                    });
                    $('.shijia .return').tap(function () {
                        $('#page3').removeClass('show');
                        $('#page1').addClass('show');
                    });
                    $('#page4 .return').tap(function () {
                        $('#page4').removeClass('show');
                        $('#page1').addClass('show');
                    });
                    //p3事件

                    $('#page3 .choice .mt').click(function () {  //点击MT的时候
                        $('#page3 .choice').hide();				//mt界面隐藏
                        $('#swiperAreaMT').show();				//mt内容显示
                        if (page.p1.mySwiperMm == undefined) {		//如果swiper没有定义
                            page.p1.mySwiperMm = new Swiper('#swiperAreaMT', {  //那么就定义一个swiper滚动
                                direction: 'vertical',							//滚动类型为上下滚动						
                                //followFinger: true,
                                onSlideChangeStart: function (aa) {				//滚动时触发函数事件
                                    var $ind = aa.activeIndex;					//ind变量值为页面的个数
                                    $ind++;										//ind为页面的个数+1
                                    var d = $('#swiperAreaMT .s' + $ind + ' .SpeedInRight') //找到类名为s1-s6的元素和所有名为SpeedInRight动画的元素
                                    var d2 = $('#swiperAreaMT .s' + $ind + ' .slideInUp')  //同上
                                    d.removeClass('SpeedInRight');					//删除动画类名
                                    d2.removeClass('slideInUp');					//删除动画类名
                                    setTimeout(function () {						//定时器自动添加动画类名
                                        d.addClass('SpeedInRight');
                                        d2.addClass('slideInUp');
                                    }, 10);
                                },
                            });
                        } else {											//如果已经定义过swiper container，那么让slide元素回到第一页
                            page.p1.mySwiperMT.slideTo(0, 0, false);
                        }
                    });
                    $('#page3 .choice .at').click(function () {
                        $('#page3 .choice').hide();
                        $('#swiperAreaAT').show();
                        if (page.p1.mySwiperAT == undefined) {
                            page.p1.mySwiperAT = new Swiper('#swiperAreaAT', {
                                direction: 'vertical',
                                //followFinger: true,
                                onSlideChangeStart : function (sw) {
                                    var $ind = sw.activeIndex;
                                    $ind++;
                                    var d = $('#swiperAreaAT .s' + $ind + ' .SpeedInRight')
                                    var d2 = $('#swiperAreaAT .s' + $ind + ' .slideInUp')
                                    d.removeClass('SpeedInRight');
                                    d2.removeClass('slideInUp');
                                    setTimeout(function () {
                                        d.addClass('SpeedInRight');
                                        d2.addClass('slideInUp');
                                    }, 10);
                                }
                            });
                        } else {
                            page.p1.mySwiperAT.slideTo(0, 0, false);
                        }
                    });
                    $('#page4 .choice .mt').click(function () {
                        $('#page4 .choice').hide();
                        $('#page4 .mtzan').show();
                    });
                    $('#page4 .choice .at').click(function () {
                        $('#page4 .choice').hide();
                        $('#page4 .atzan').show();
                    });
                    $('#page4 .btnzan').click(function () {
                        var id = $(this).data('id');
                        if ($(this).hasClass('active')) {
                            $(this).removeClass('active');
                            $.get('/h5_xianxia/del/' + id);
                        } else {
                            $(this).addClass('active');
                            $.get('/h5_xianxia/add/' + id);
                        }
                    });
                //}
                //$('#swiperArea').show();

            }
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
            } else if (y - page.Y > 50) {
                $(this).off('touchmove', page.touchMoveY);
                if(e.data.up != undefined) {
                    page.ChangePage(e.data.from, e.data.up, 'down');
                }
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

            var fromAni = 'moveToTop';
            var toAni = 'moveFromBottom';

            if (ori == 'down') {
                fromAni = 'moveToBottom';
                toAni = 'moveFromTop';
            } else if (ori == 'left') {
                fromAni = 'moveToLeft';
                toAni = 'moveFromRight';
            } else if (ori == 'right') {
                fromAni = 'moveToRight';
                toAni = 'moveFromLeft';
            }
            from.addClass(fromAni + ' animated').one('webkitAnimationEnd', function () {
                $(this).removeClass('show animated ' + fromAni);
            });
            to.addClass(toAni + ' animated show').one('webkitAnimationEnd', function (e) {
                page.IsAni = false;
                $(this).removeClass(toAni +' animated');
                var _id = to.attr('id');
                _id = _id.substr(4);
                page.Page = $('#page' + _id);
                page.clear();
                page['p' + _id].init();
            });
        },
        resize: function() {
            pageW = $(window).width();
            pageH = $(window).height();
            $('.wrap,.page,.welcomepage').height(pageH);
        }
    };
    page.init();

	setTimeout('wel.hide()',6000)
    
});




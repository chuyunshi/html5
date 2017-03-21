$(function () {
    var page = {
        init : function() {
            page.p2.init('3');
        },
        p2 : {
            init : function(pnum) {
                var _pdom = $('#page' + pnum);
                    var pkey = 'p' + pnum;
                    if (_pdom) {
                        if (pageHtml[pkey]) {
                            var _input = pageHtml[pkey]['input'];
                            for (var _i = 0; _i < _input; _i++) {
                                _pdom.find('.input-' + _i).html(pageHtml[pkey]['input-' + _i]);
                            }
                        }if (true) {
                            page.p2.jumpPage(pnum);
                            return false;
                        }
                    }
            },
            jumpPage : function (pnum) {
                page.p3.init();
            },
        },
        p3 : {
            init: function () {
                page.p3.dom = $('#page3');
                page.p3.dom.data('load', 'true');
                page.p3.dom.addClass('show');
                page.p3.isClose = true;
                page.p3.TGOpen = $('#page3 .tg-open');
                page.p3.TGClose = $('#page3 .tg-close');
                page.p3.MaxImg = 24;
                page.p3.nowCloseImg = page.p3.nowCloseImg ? page.p3.nowCloseImg : 1;
                page.p3.nowOpenImg = page.p3.nowOpenImg ? page.p3.nowOpenImg : 1;
                page.p3.changeTG();
                var ssX = 1,ssY = 1;
                var dom = $('#page3 .handmove')
            },
            initMenu: function (menuAreaDom) {
                page.p3.menuOpen = false;
                page.p3.menuArea = menuAreaDom;
            },
            changeTG: function () {
                    //关闭状态
                    page.p3.TGClose.on('touchstart', page.p3.touchStart);
                    page.p3.imgPrefix = '#close-img-';
            },
            touchStart : function(e) {
                var _t = e.originalEvent.changedTouches[0];
                page.p3.MoveX = _t.pageX;

                if (page.p3.isClose) {
                    page.p3.TGClose.on("touchmove", page.p3.touchMove);
                    page.p3.TGClose.one("touchend", page.p3.touchEnd);
                } else {
                    page.p3.TGOpen.on("touchmove", page.p3.touchMove);
                    page.p3.TGOpen.one("touchend", page.p3.touchEnd);
                }
            },
            touchMove : function(e) {
                var _t = e.originalEvent.changedTouches[0];
                page.p3.MoveX2 = _t.pageX;
                var val = page.p3.MoveX2 - page.p3.MoveX;
                var nowimg = page.p3.isClose ? page.p3.nowCloseImg : page.p3.nowOpenImg;
                if (val < -5) {
                    page.p3.MoveX = page.p3.MoveX2;
                    $(page.p3.imgPrefix + nowimg).hide();
                    nowimg = nowimg == page.p3.MaxImg ? 1 : nowimg + 1;
                    $(page.p3.imgPrefix + nowimg).show();
                } else if (val > 5) {
                    page.p3.MoveX = page.p3.MoveX2;
                    $(page.p3.imgPrefix + nowimg).hide();
                    nowimg = nowimg == 1 ?  page.p3.MaxImg : nowimg - 1;
                    $(page.p3.imgPrefix + nowimg).show();
                }
                if (page.p3.isClose) {
                    page.p3.nowCloseImg = nowimg;
                } else {
                    page.p3.nowOpenImg = nowimg;
                }
            }, 
        },
    };
    page.init();
});
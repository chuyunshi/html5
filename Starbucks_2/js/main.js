$(document).ready(function () {
    var pageW,pageH;
    var page = {
        init : function() {
            page.resize();
            //page.p0.init();
            page["p0"].init();
           // page.p2.init();
            page.IsAni = false;
        },
        sound : {
            init : function(){
               // createjs.Sound.alternateExtensions = ["mp3"];
               // createjs.Sound.on("fileload", page.sound.playSound, this);
               // createjs.Sound.registerSound("img/bgm.mp3", "bgm");

            },
            playSound : function (event) {
                // 这会引发针对每个已注册的声音。
               // if (event.id == 'bgm') {
                    page.BGM = $('#bgm')[0];//
                    page.BGM.play();//
                    page.MusicICO = $('.music-ico');
                    page.MusicICO.show();
                    page.MusicICO.addClass('playing');
                    page.MusicICO.on('tap', page.sound.bgm);
                    //page.BGM = createjs.Sound.play("bgm");  // 发挥使用ID。也可以使用完整的源路径或event.src。
                   // page.BGM.loop = -1;
                //}
            },
            bgm : function() {
                var _t = page.MusicICO;
                if (_t.hasClass('playing-stop')) {
                    _t.removeClass('playing-stop');
                    //page.BGM.paused = false;
                    page.BGM.play();//
                } else if (_t.hasClass('playing')) {
                    _t.addClass('playing-stop');
                   // page.BGM.paused = true;
                    page.BGM.pause();//
                } else {
                    _t.addClass('playing');
                   // page.BGM.paused = false;
                    page.BGM.play();//
                }
            }




        },

        p0 : {
            init : function() {
                //判断资源加载
                var manifest = [
                    './img/p1/bg.jpg',
                    './img/p1/font.png',
                    './img/p1/pai.png',
                    './img/p2/bg.jpg',
                    './img/p3/btn.png',
                    './img/p3/tip.png'
                ];
                var fi = 0;
                for (var i = 1; i<=11; i++) {
                    fi = i < 10 ? "0" + i : i;
                    manifest[manifest.length] = './img/p2/font' + fi + '.png';
                    manifest[manifest.length] = './img/p2/img' + fi + '.png';
                    manifest[manifest.length] = './img/p3/' + fi + '.jpg';
                }

                //预加载；
                var queue = new createjs.LoadQueue(true);
                queue.on("complete",function (e) {
                    $('.p0').removeClass('show');
                    page.p1.init();
                    //page.sound.init();
                    page.sound.playSound();//
                });
                var loadingImg = $('#loading');
                var loadingFor2 = true;
                var loadingFor3 = true;
                queue.on('progress', function () {
                    var progress = queue.progress * 100;
                    console.log(progress);
                    if (progress > 50 && loadingFor2) {
                        loadingFor2 = false;
                        loadingImg.attr('src', 'img/p0/2.png');
                    } else if (progress > 90 && loadingFor3) {
                        loadingFor3 = false;
                        loadingImg.attr('src', 'img/p0/3.png');
                    }
                });
                queue.loadManifest(manifest);
            }
        },

        p1 : {
            init : function() {
                $(".p1").addClass("show");
                $(".p1 .pai").tap(function(){
                   // $("#page1").addClass("animated fadeOut");
                   // $("#page2").addClass("show");
                    page.ChangePage($('#page1'), $('#page2'), 'fade');
                })
            }
        },
        p2 : {
          init : function() {
              $("#page2").addClass('show');
              if (page.p2.setEvent == undefined) {
                  page.p2.setEvent = true;
                  $('#page2 .mod').tap(function(){
                      //console.log(123)
                      var _t = $(this);
                      $("#page3 ").css("background","url(img/p3/" + _t.data('for') + ".jpg)").addClass("bigshow")
                  });
                  $("#page3").tap(function(){
                      $("#page3").removeClass("bigshow");
                  })
              }
          }
        },

        ChangePage : function(from, to, ori) {
            if (page.IsAni) return false;

            page.IsAni = true;

            var fromAni = 'moveToTop';
            var toAni = 'moveFromBottom';

            if (ori == 'fade') {
                fromAni = 'fadeOut changeAni';
                toAni = 'fadeIn changeAni'
            } else if (ori == 'up') {
                fromAni = 'moveToTop';
                toAni = 'moveFromBottom';
            } else if (ori == 'down') {
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
                var _id = to.attr('id');//page2
                console.log(_id);
                _id = _id.substr(4);//2;substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
                console.log(_id);
              //  page.Page = $('#page' + _id);

                //page.clear();
                page['p' + _id].init();


            });
        },

        resize: function() {
            pageW = $(window).width();
            pageH = $(window).height();
            $('.wrap').width(pageW).height(pageH);
            $('#page2').height(pageW / 320 * 2150);
        }
    };
    page.init();
});

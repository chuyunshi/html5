/**
 * Created by admin on 2017/4/18.
 */
$(function() {
    page={
        init:function(){
            page.busiNess.init();
        },
        busiNess:{
            init:function(){

                page.busiNess._link();
            },

            _link:function(){
                var _linkLeft = $(".linkLeft");
                var num;
                _linkLeft.on("click",function(){
                    _linkLeft.removeClass("bg_yellow");
                    $(this).addClass("bg_yellow");
                    num = $(this).data("link");
                    $(".page"+num).removeClass("hide").siblings().addClass("hide")
                })
            }

        }


    }
    page.init();


});
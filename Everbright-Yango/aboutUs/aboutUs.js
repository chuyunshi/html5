/**
 * Created by admin on 2017/4/18.
 */
$(function() {
    page={
        init:function(){
            page.aboutUs.init();
        },
        aboutUs:{
            init:function(){
                page.aboutUs.nav();
                page.aboutUs._link();
                page.aboutUs._btn_click();
                page.aboutUs._btn_click_p5();

            },
            nav:function(){
                var _link = $(".linkLeft");
                var a= 0,b= 1,c=1;
                $(".linkLeft1").on("click",function(){
                    if(a==0){
                        $(".link1").addClass("hide");
                        $(this).removeClass("bg_yellow")
                        a=1,b= 1,c=1;
                    }else{
                        $(".link1").removeClass("hide");
                        $(this).addClass("bg_yellow").siblings().removeClass("bg_yellow");
                        $(".link2,.link3").addClass("hide");
                        a=0,b= 1,c=1;
                    }
                });
                $(".linkLeft2").on("click",function(){
                    if(b==0){
                        $(".link2").addClass("hide");
                        $(this).removeClass("bg_yellow")
                        a=1,b= 1,c=1;
                    }else{
                        $(".link2").removeClass("hide");
                        $(this).addClass("bg_yellow").siblings().removeClass("bg_yellow");
                        $(".link1,.link3").addClass("hide");
                        a=1,b= 0,c=1;
                    }
                });
                $(".linkLeft3").on("click",function(){
                    if(c==0){
                        $(".link3").addClass("hide");
                        $(this).removeClass("bg_yellow")
                        a=1,b= 1,c=1;
                    }else{
                        $(".link3").removeClass("hide");
                        $(this).addClass("bg_yellow").siblings().removeClass("bg_yellow");

                        $(".link1,.link2").addClass("hide");
                        a=1,b= 1,c=0;
                    }
                });

            },
            _link:function(){
                var _linkRight = $(".linkRight");
                var num;
                _linkRight.on("click",function(){
                    _linkRight.removeClass("yellow");
                    $(this).addClass("yellow");
                    num = $(this).data("link");
                    console.log(num)
                    $(".page"+num).removeClass("hide").siblings().addClass("hide")
                })
            },
            _btn_click:function(){
                $(".page2Left").on("click",function(){
                    $(".linkTwopage1").removeClass("hide")
                    $(".linkTwopage2").addClass("hide")
                    $(".page2Num").html(1)
                })
                $(".page2right").on("click",function(){
                    $(".linkTwopage2").removeClass("hide")
                    $(".linkTwopage1").addClass("hide")
                    $(".page2Num").html(2)
                })
            },
            _btn_click_p5:function(){
                var num=1;
                $(".page5Left").on("click",function(){
                    num--;
                    num=num<=1? 1:num;
                    console.log(num)
                    $(".linkFivepage"+num).removeClass("hide").siblings().addClass("hide");
                    $(".page5Num").html(num)
                })
                $(".page5right").on("click",function(){
                    num++;
                    num=num>=3? 3:num;
                    console.log(num)
                    $(".linkFivepage"+num).removeClass("hide").siblings().addClass("hide");
                    $(".page5Num").html(num)
                })
            }

        }


    }
    page.init();


});
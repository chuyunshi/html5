/**
 * Created by ShiHongZi on 2016/11/12.
 */
$(document).ready(function(){
    var pageH,pageW;
    var num=20 * (pageW / 320);
    var arr2 =["opedrmfaberlxcbvfr"];
    var string = arr2[0];
    //保存按键位置；
    var arrleftBack=[];
    var arrtopBack=[];
    var temp=0;
    page={
        init:function(){
            page.resize();
            page._sethtml.init();
            page._move.init();
            


        },
        _sethtml:{
            init:function(){
                page._sethtml._set_box1_css();
                page._sethtml._set_box2_css();
            },
            _set_box1_css:function(){
                var tage="";
                var _string = 7;
                var _margin = (16-_string*2)/2;

                for(var i=0;i<_string;i++){
                    tage += "<div class='for_1 no num_"+i+" ab' data-num=\'"+i+"\'>"+
                                "<img src='img/box.png'/>"+
                            "</div>";
                }
                $(".box1").html(tage);
                for(var j=0;j<_string;j++){
                    $(".num_"+j).css({
                        'left':_margin+2*j+"rem",
                        "top":"40%",
                    })
                }
            },
            _set_box2_css:function(){

                var tage="";
                for(var a=1;a<=18;a++){
                    tage += "<div class=' for_2 to1 to _num_"+a+" ab' data-num=\'"+a+"\' data-word=\'"+string[a-1]+"\'>"+
                        "<img src='img/zimu/"+string[a-1]+".png'/>"+
                        "</div>";
                }
                $(".box2").html(tage);
                for(var i=0;i<=3;i++){
                    for(var j=1;j<=6;j++){

                        $("._num_"+(i*6+j)).css({
                            "left":0.8+2.5*(j-1)+"rem",
                            "top":16+2.5*i+"rem"
                        })
                    }
                }
            },

        },
        _move:{
            init:function(){
                page._move._moveTo();
                page._move._moveBack();

            },
            _moveTo:function(){
                var _left;
                var _leftBack,_topBack;
                var _num=0;
                $(".to").on("click",function(){
                    if($(this).hasClass("to")){
                        _leftBack = $(this).css("left");
                        _topBack = $(this).css("top");
                        arrleftBack.push(_leftBack);
                        arrtopBack.push(_topBack);
                        _left = $(".no").eq(0).css("left");

                        console.log(_num);

                        $(this).data("num",_num);

                        $(this).anim({
                            "left":_left,
                            "top":"40%",
                        },0.2)
                        var _left_next=$(".no").eq(1).css("left");
                        $(".no").eq(0).removeClass("no");
                        $(this).removeClass("to,to1").addClass("back");
                        temp++;
                        _num++;
                    }else if($(this).hasClass("back")){

                        var _num1 = $(this).data("num");

                        $(this).addClass("to,to1").removeClass("back");

                        $(".num_"+_num1).addClass("no");

                        $(this).anim({
                            "left":arrleftBack[_num1],
                            "top":arrtopBack[_num1]
                        },0.2)
                        temp--;
                        _num--;
                    }


                    if(temp>=7){
                        console.log("success!!!");
                        $(".to1").removeClass("to");
                    }else{
                        $(".to1").addClass("to");
                    }

                    //判断是否按键正确；
                    if(1){


                    }else{

                    }
                })

            },
            _moveBack:function(){

            }

        },
        resize:function(){
            pageH=$(window).height();
            pageW=$(window).width();
            $(".for").width(pageW).height(pageH);
        }
    }
    page.init();
})

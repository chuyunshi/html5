/**
 * Created by ShiHongZi on 2016/11/12.
 */
$(document).ready(function(){
    var pageH,pageW;
    var num=20 * (pageW / 320);
    var _margin;
    var arr1 =[['f','o','r','e','v','e','r'],
               ['l','o','v','e'],
               ['o','p','e','d','e','r'],
               ['f','a','b','e','r'],
               ['a','b','c']];
    var arr2 =[ "opedrmfaberlxcbvfr",
                "opefaberlxdrmcbvfr",
                "odrmcbvfrpefaberlx",
                "xfabdrmopecerlbvfr",
                "rcbvlxdopefabermfr"];

    //用来保存18个按键位置；
    var arrleftBack=[];
    var arrtopBack=[];
    //生成随机数，对应密码长度，以及不同按键组合；
    var _random = Math.floor(Math.random()*5);
    //_random = 2;
    var _string = arr1[_random].length;
    var string = arr2[_random];

    $(".for_p").html(arr1[_random].join(""));

    page={
        init:function(){
            page.resize();
            page._sethtml.init();
            page._move.init();
            page._click.init();
        },
        _sethtml:{
            init:function(){
                page._sethtml._set_box1_css();
                page._sethtml._set_box2_css();
            },
            _set_box1_css:function(){
                var tage="";
                //密码显示区离左边距离；
                 _margin = (16-_string*2)/2;
                //生成密码显示区html;
                for(var i=0;i<_string;i++){
                    tage += "<div class='for_1  no  num_"+i+" ab'>"+
                        "<img src='img/box.png'/>"+
                        "</div>";
                }
                $(".box1").html(tage);
                //生成密码显示区css;
                for(var j=0;j<_string;j++){
                    $(".num_"+j).css({
                        'left':_margin+2*j+"rem",
                        "top":"40%",
                    })
                }
            },
            _set_box2_css:function(){
                var tage="";
                //生成按键组区html;
                for(var a=1;a<=18;a++){
                    tage += "<div class='for_2 to1 to  _num_"+a+" ab' data-num=\'"+a+"\' data-word=\'"+string[a-1]+"\'>"+
                        "<img src='img/zimu/"+string[a-1]+".png'/>"+
                        "</div>";
                }
                $(".box2").html(tage);
                //生成按键组区css;
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
                page._move._moveToorBack();
                page._move._arrsave();

            },
            _arrsave:function(){
                //存储18个按键的left;top值，为了再次点击可返回原位置
                for(var i=0;i<18;i++){
                    arrleftBack[i]=$('._num_'+(i+1)).css("left");
                    arrtopBack[i]=$('._num_'+(i+1)).css("top");
                }
                console.log(arrleftBack);
            },
            _moveToorBack:function(){
                var _left;
                var _num
                var temp = 0;
                var _index;
                var arr_word=[];
                $(".to").on("click",function(){
                    //点击，输入密码；
                    if($(this).hasClass("to")){
                        //获取，data-num值
                        _num = $(this).data('num');
                        //空白区的第一个位置，
                        _left = $(".no").eq(0).css("left");
                        //给显示区，对应的位置绑定class
                        $(".no").eq(0).addClass("num1_"+_num).removeClass("no");;
                        //正则取数字部分，求index;
                        var _left1 = _left.replace(/[^0-9]+/g, '')
                        _index = (_left1-_margin)/2;
                       // console.log(_index);
                        //获取data-word值。知道点击的是哪个字母。
                        var word = $(this).data("word");
                        arr_word[_index]=word;
                       // console.log(arr_word[_index]);
                       // console.log(arr1[0][_index]);
                        //判断键入是否正确、
                        if(arr_word[_index]==arr1[_random][_index]){
                            //输入正确的不可再点击返回；
                            console.log("输入正确！！！");
                            $(this).removeClass("to").removeClass("to1");
                        }else{

                            console.log("输入错误！！！");
                            //图片不足，暂用一张图片代替；
                            $(this).html(
                                "<img src='img/falas.png'/>"
                            )
                            //输入错误的，添加class “back”，可点击返回；
                            $(this).removeClass("to").removeClass("to1").addClass("back");
                        }
                        //判断最终输入结果是否正确
                        if(arr_word.join('')==arr1[_random].join('')){
                           setTimeout(function(){
                             alert("success!!!")
                         },500)
                            console.log("success!!!");
                        }else{

                        }
                        //点击按键，将它位移到第一个空白区域；
                        $(this).anim({
                            "left":_left,
                            "top":"40%",
                        },0.2)
                        temp++;
                    //只有有class  .back 的才能被点击返回；
                    }else if($(this).hasClass("back")){

                        _num = $(this).data('num');
                        word = $(this).data("word");
                        $(this).html(
                            "<img src='img/zimu/"+word+".png'/>"
                        )
                        //点击返回后，添加class，将其设置为空白区；
                        $(".num1_"+_num).addClass("no").removeClass("num1_"+_num);
                        //将返回的，设置为普通按键，可再三被点击
                        $(this).removeClass("back").addClass("to").addClass("to1")
                        //返回到按键原来位置；
                        $(this).anim({
                            "left":arrleftBack[_num-1],
                            "top":arrtopBack[_num-1],
                        },0.2)
                        temp--;
                    }
                    //密码空白区被填满，剩余按键不可再被点击，未被填满，剩余部分可被点击；
                    if(temp>=_string){
                        $(".to").removeClass("to");
                    }else{
                        $(".to1").addClass("to");
                    }
                })
            },

        },
        _click:{
            init:function(){
                page._click._show_hide()
            },
            _show_hide:function(){
                var temp=0;
                var tag = 0;
                $(".for_btn").on("click",function(){
                    if(temp==0){
                        $(".prompt").anim({
                            "height":"100%",
                            "width":"100%",
                            "right":"0rem",
                            "top":"0rem",
                            "background":"pink"
                        },0.5);

                        $(this).anim({
                            "background":"yellow"
                        });
                        temp=1;
                    }else{
                        $(".prompt").anim({
                            "height":"1rem",
                            "width":"1rem",
                            "right":"1rem",
                            "top":"1rem",
                            "background":"yellow",
                        },0.5);

                        $(this).anim({
                            "background":"red"
                        });
                        temp=0;
                    }
                });
                $('.pic_color1').on("click",function(){
                    if(tag==0){
                        $(this).anim({
                            "opacity":"1",

                        },3);
                       setTimeout(function(){
                           $(".pic_color").anim({
                               "opacity":"1"
                           },3)
                       },3000);
                        tag=1;
                    }else{
                        $(this).anim({
                            "opacity":"0"
                        },3);
                        $(".pic_color").anim({
                            "opacity":"0"
                        },3)
                        tag=0;
                    }

                })
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

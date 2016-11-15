/**
 * Created by Administrator on 16-11-14.
 */

function weixinShareTimeline(title,desc,link,imgUrl){
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url":imgUrl,
        //"img_width":"640",
        //"img_height":"640",
        "link":link,
        "desc": desc,
        "title":title
    });
}
$(".for_p").on('click',function(){
    console.log(11212121)
    alert(123)
    weixinShareTimeline('forever',"砖石恒久远，一颗永流传",'chuyunshi.applinzi.com/forever','chuyunshi.applinzi.com/forever/img/1.png')
})
var siteUrl= urlPrefix + '/' ;
var ShareUrl = urlPrefix + '/index.html?temp='+temp+'&source='+source;
//console.log('ShareUrl', ShareUrl);
var shareWords = [  "我封存了神秘的电码给你，破译TA的关键字母为'U'",
                    "我封存了神秘的电码给你，破译TA的关键字母为'B'",
                    "我封存了神秘的电码给你，破译TA的关键字母为'P'",
                    "我封存了神秘的电码给你，破译TA的关键字母为'H'",


                    "我封存了神秘的电码给你，破译TA的关键字母为'G'",
                    "我封存了神秘的电码给你，破译TA的关键字母为'H'",
                    "我封存了神秘的电码给你，破译TA的关键字母为'M'",


                    "注意，你正在接收一段摩尔斯电码！-钻石恒久远，一颗永留传-",
                    "注意，你正在接收一段摩尔斯电码！-钻石恒久远，一颗永留传-",
                    "注意，你正在接收一段摩尔斯电码！-钻石恒久远，一颗永留传-",
                    "注意，你正在接收一段摩尔斯电码！-钻石恒久远，一颗永留传-",
                    "注意，你正在接收一段摩尔斯电码！-钻石恒久远，一颗永留传-",

                    "我破译不了这段神秘的摩尔斯电码，你能帮我吗？"
                    ]
var word_index;
if(save_diam==0){
    word_index=12;
}else{
    word_index=temp;
}

var wxContent={
    timeLink: ShareUrl,
    friendLink: ShareUrl,
    friendImage:siteUrl+'img/share.jpg',
    timeImage:siteUrl+'img/share.jpg',
    title: '探秘永恒',
    friend: shareWords[word_index],//'钻石恒久远，一颗永留传',  //发送朋友描述
    timeline: shareWords[word_index],  //发送朋友圈描述
};




//微信检测
function detectWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") return true;
    else return false;
}//end func
var isWeixin=detectWeixin();
if(isWeixin){
    weixin_sign();//微信公众号认证
}//end if

//--------------------------------微信分享设置
function weixin_sign(){
    var localUrl = window.location.href;
    $.ajax({
        //URL需要更换成JAVA版本的
        url:"http://wechatjssdk.seemse.com/jssdk",
        data:{url:localUrl},
        dataType:"json",
        type:"get",
        async:false,
        success:function(data){
            if(data && data.appId != undefined)
            {
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                });//end wx.config
                weixin_ready();//微信分享设置
            }
        }
    });//end ajax
}//end func

function weixin_ready(){
    wx.ready(function(){
        wx.showOptionMenu();//用微信“扫一扫”打开，optionMenu是off状态，默认开启
        wx_share();
    });//end wx.ready
}//end func

function wx_share(content){
    if(content){
        wxContent.timeLink=content.timeLink!=null?content.timeLink:wxContent.timeLink;
        wxContent.friendLink=content.friendLink!=null?content.friendLink:wxContent.friendLink;
        wxContent.image=content.image!=null?content.image:wxContent.image;
        wxContent.title=content.title!=null?content.title:wxContent.title;
        wxContent.friend=content.friend!=null?content.friend:wxContent.friend;
        wxContent.timeline=content.timeline!=null?content.timeline:wxContent.timeline;
    }//end if
    reloadShare();
}//end func

function reloadShare()
{
    setShareTimeline();
    setShareAppMessage();
}

function setShareTimeline()
{
    wx.onMenuShareTimeline({
        title: wxContent.timeline, // 分享标题
        link: wxContent.timeLink, // 分享链接
        imgUrl: wxContent.timeImage, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (PageOpenMTA) {
                MtaH5.clickStat('QingMing_TimeLine_Success');
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (PageOpenMTA) {
                MtaH5.clickStat('QingMing_TimeLine_Cancel');
            }
        }
    });
}

function setShareAppMessage()
{
    wx.onMenuShareAppMessage({
        title: wxContent.title, // 分享标题
        desc: wxContent.friend, // 分享描述
        link: wxContent.friendLink, // 分享链接
        imgUrl: wxContent.friendImage, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            if (PageOpenMTA) {
                MtaH5.clickStat('QingMing_Friend_Success');
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (PageOpenMTA) {
                MtaH5.clickStat('QingMing_Friend_Cancel');
            }
        }
    });
}

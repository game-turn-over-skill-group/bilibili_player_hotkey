// ==UserScript==
// @name         BiliBili一键开关弹幕/一键网页宽屏/全屏快捷键/速度控制快捷键
// @namespace    http://tampermonkey.net/
// @version      0.3.2
// @description  这个脚本是作者自己嫌在全屏播放时老是要鼠标点击开关弹幕太麻烦，于是就写了一个b站播放器的按键快捷控制
// @author       R君
// @match        *://*.bilibili.com/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

var 开关弹幕 = 103;//小键盘数字键7，可以自己更改
var 控制全屏 = 105;//小键盘数字键9，可以自己更改
var 打开宽屏 = 106;//小键盘“*”键，可以自己更改
var 控制速度 = 107;//小键盘“+”键，可以自己更改  播放速度设置在一个键上，按一下为1.25倍，按两下1.5呗，三下2倍，第四下回归正常速度
var 网页全屏 = 109;//小键盘“-”键，可以自己更改
var 暂停播放 = 101;//小键盘数字键5，可以自己更改


//以上每一个按键都可以自定义，可以按照自己的喜好自行对照键盘键位对应编码来修改，下面是提供参考的键盘编码表链接

//笔记本电脑或者是没有小键盘的同学，请参考下面的键盘编码表更改键位

// 对照修改的键盘编码表链接，复制右边的链接到地址栏打开  https://jingyan.baidu.com/article/fedf073780e16335ac8977a4.html





//下面的代码看不懂的小伙伴请不要修改

var video_speed = [1,1.25,1.5,2];
var video_speed_num = 0;

function set_video_speed(){

    var video = $(".bilibili-player-video video")[0];
    video_speed_num++;
    if(video_speed_num >= video_speed.length){
        video_speed_num = 0;
    }
    video.playbackRate = video_speed[video_speed_num];

}
function click_wide_screen(){

    $("i[name='widescreen']").click();
    $("span[data-text='宽屏模式'] svg").click();

}
function click_web_Full_screen(){

    var click_ = $("i[name='web_fullscreen']");
    if(click_.val() == undefined){
        $("i[data-text='网页全屏']").click();
    }else{
        click_.click();
    }
}
function click_Full_screen(){

    var click_ = $("i[name='browser_fullscreen']");
    if(click_.val() == undefined){
        $("i[data-text='进入全屏']").click();
    }else{
        click_.click();
    }
}
function click_Barrage(){

    var click_ = $(".bilibili-player-video-control-bottom-center .bui-checkbox");
    if(click_.val() == undefined){
        $(".bilibili-player-video-sendbar .bui-checkbox").click();
        $("i[data-text='打开弹幕']").click();
    }else{
        click_.click();
    }

}

$(document).ready(function() {
    $(document).keydown(function(event){
        switch(event.keyCode){
            case 开关弹幕:
                click_Barrage();
                break;
            case 打开宽屏:
                click_wide_screen();
                break;
            case 网页全屏:
                click_web_Full_screen();
                break;
            case 控制全屏:
                click_Full_screen();
                break;
            case 控制速度:
                set_video_speed();
                break;
            case 暂停播放:
                var e = jQuery.Event("keydown");
                e.keyCode = 32;
                e.which = 32;
                $('body').trigger(e);
                break;
        }
    });
});
/**
 * Created by nex on 4/30/16.
 */
var myApp = new Framework7({
    animateNavBackIcon: true,
    template7Pages: true,
    precompileTemplates: true
});
var unit;
var indexvideo, framerateindex, codecindex, indexch, indexkhz, indexbit;
var videos, codecs, framerates, chs, khzs, bits;
var resolutionratios;
var s = [videos, codecs, framerates, chs, khzs, bits];
var compressionRatios, colorSamplingRatios, videobits;
var bitrate;

compressionRatios = ["1", "26", "12", "8", "5.4", "5.4", "5", "35", "6.6", "13", "18", "22", "6.9", "6", "5", "5", "3", "4", "5", "6",
    "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "2.9", "7.2", "5"];
colorSamplingRatios = ["444", "422", "422", "422", "422", "4444", "4444", "4444", "420", "422",
    "422", "420", "422", "422", "422", "422", "444", "422", "422", "422", "422", "444", "422", "422", "422", "422", "422", "422", "422", "422", "422", "422", "422", "422",
    "422", "422", "422", "422", "422", "422", "422",];
videobits = ["8", "10", "10", "10", "10", "12", "12", "8", "8", "8", "8", "10", "10", "10", "10", "10"
    , "10", "10", "10", "10", "10", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16", "16"];
unit = ["SCEDONS", "MINUTES", "HOURS"];
videos = ["720P", "1080P", "2K", "DCI&nbsp;2K&nbsp;1.85", "DCI&nbsp;2K&nbsp;2.39", "UHD", "DCI&nbsp;4K&nbsp;1.85", "DCI&nbsp;4K&nbsp;1.9", "DCI&nbsp;4k&nbsp;2.39", "RED&nbsp;2K&nbsp;2.4",
    "RED&nbsp;3K&nbsp;2.4", "RED&nbsp;3K&nbsp;1.9", "RED&nbsp;4K&nbsp;2.4", "RED&nbsp;4.5K&nbsp;2.4", "RED&nbsp;4.5K&nbsp;1.9", "RED&nbsp;5K&nbsp;2.4", "RED&nbsp;5K&nbsp;1.9", "RED&nbsp;6K&nbsp;2.4", "RED&nbsp;6K&nbsp;1.9", "ARRI&nbsp;2.8K", "ARRI&nbsp;3.2K", "ARRI&nbsp;OG"];
framerates = ["13.8", "14.98", "15", "24", "25", "29.97", "30", "48", "50", "59.94", "60", "96", "100", "120", "240", "400"];
codecs = ["Uncompressed", "ProRes&nbsp;422&nbsp;Proxy", "ProRes&nbsp;422&nbsp;LT", "ProRes&nbsp;422", "ProRes&nbsp;422&nbsp;HQ", "ProRes&nbsp;4444", "ProRes&nbsp;4444&nbsp;XQ",
    "AVCHD", "XAVC&nbsp;I", "XAVC&nbsp;L", "XAVC&nbsp;S", "DNxHD&nbsp;LB", "DNxHD&nbsp;SQ", "DNxHD&nbsp;HQ", "DNxHD&nbsp;HQX", "DNxHD&nbsp;444", "DHxHR&nbsp;LB", "DHxHR&nbsp;SQ", "DHxHR&nbsp;HQ", "DHxHR&nbsp;HQX", "DHxHR&nbsp;444",
    "REDCODE&nbsp;3:1", "REDCODE&nbsp;4:1", "REDCODE&nbsp;5:1", "REDCODE&nbsp;6:1", "REDCODE&nbsp;7:1", "REDCODE&nbsp;8:1", "REDCODE&nbsp;9:1", "REDCODE&nbsp;10:1", "REDCODE&nbsp;11:1", "REDCODE&nbsp;12:1", "REDCODE&nbsp;13:1",
    "REDCODE&nbsp;14:1", "REDCODE&nbsp;15:1", "REDCODE&nbsp;16:1", "REDCODE&nbsp;17:1", "REDCODE&nbsp;18:1", "Canon&nbsp;RAW", "Sony&nbsp;RAW", "ARRI&nbsp;RAW"];
chs = ["0ch", "1ch", "2ch", "4ch", "6ch", "8ch", "12ch", "16ch"];
khzs = ["44.1khz", "48khz", "88.2khz", "96khz", "176.4khz", "192khz"];
bits = ["8bit", "16bit", "24bit", "32bit"];

resolutionratios = ["1280*720", "1920*1080", "2048*1152", "1998*1080", "2048*858", "2048*1080", "3840*2160",
    "3996*2160", "4096*2160", "4096*1716", "2048*864", "3072*1296", "3072*1620", "4096*1728", "4608*1944", "4608*2412", "5120*2160",
    "5120*2700", "6144*2592", "6144*3160", "2880*1620", "3200*1800", "3424*2202"];

var unit_div = document.getElementById("unit_div");
var piechartRatio = document.getElementById("piechartRatio");
var bitrate_p = document.getElementById("bitrate");
var time_input = document.getElementById("time_input");

function configration(video, framerate, codec, ch, khz, bit) {
    this.video = video;
    this.framerate = framerate;
    this.codec = codec;

    this.ch = ch;
    this.khz = khz;
    this.bit = bit;
}

function getIndex(name) {
    for (var i = 0; i < videos.length; i++) {
        var everyname = videos[i];
        if (everyname == name) {
            return i;
        }
    }
}


//定义一个全局的configration对象
var globalConfig = new configration('1080P', '14.98', 'ProRes&nbsp;422&nbsp;Proxy', '1ch', '48khz', '16bit');

//现在要思考一下怎么改变初始化的时候的swiper状态
//只需添加参数initialSlide:1即可
//想到一个问题:可不可以动态添加swiper的slide,这样可扩展性就打打提高

//伪代码:
//function onloaded(){
//    func:添加swiper的数据
//    func:渲染swiper
//}

//干脆放在后面来
var $$ = Framework7.$;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true,
    tapHold: true
});
//$$('.open-right-panel').on('click', function (e) {
//    // 'right' position to open Right panel
//    myApp.openPanel('right');
//});

//
//mainView.router.load({pageName:'help'});
//

//var pickerDevice = myApp.picker({
//    input: '#picker-device',
//    cols: [
//        {
//            textAlign: 'center',
//            values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
//        }
//    ]
//});
//
//pickerDevice.open();
//

//长按修改时间或者空间
//$$('.bottom-item').on('click' , function(){
//    alert("长按!");
//})

function turn2Help() {
    mainView.router.load({pageName: 'help'});
}

//function back2Home(){
//    mainView.router.load({pageName: 'home'});
//}


//<li class="swipeout" style="background-color: #88D7F4">
//    <div class="swipeout-content item-content" style="background-color: #88D7F4">
//    <!--<div class="item-media">点点滴滴</div>-->
//    <!--<div class="item-inner">士大夫士大夫</div>-->
//    <div class="card" style="margin: 0 auto;background-color: #88D7F4">
//    <div style="width: 50px;height: 180px;border-radius:8px 0 0 8px ;background-color: #425665;float: left"></div>
//    <div style="width: 290px;height: 180px;border-radius: 0 8px 8px 0;background-color: #ffffff;float: left"></div>
//    </div>
//
//    </div>
//    <div class="swipeout-actions-right">
//    <a href="#" class="swipeout-delete" style="background-color: #FFE036">Action 1</a>
//</div>
//</li>
//动态生成收藏卡片
function addFav() {
    //alert("kkk");
    //$('#cards_ul').appendChild("<li class='swipeout' style='background-color: #88D7F4'>"
    //    + "<div class='swipeout-content item-content' style='background-color: #88D7F4'>"
    //    + "<div class='card' style='margin:0 auto;background-color: #88D7F4'>"
    //    + "<div style='width: 50px;height:180px;border-radius:8px 0 0 8px ;background-color:#425665;float:left'></div>"
    //    + "<div style='width: 290px;height:180px;border-radius: 0 8px 8px 0;background-color:#ffffff;float:left'></div>"
    //    + "</div>"
    //    + "</div>"
    //    + "<div class='swipeout-actions-right'>"
    //    + "<a href=''#' class='swipeout-delete' style='background-color: #FFE036'>Action 1</a>"
    //    + "</div></li>"
    //);

    var el = document.createElement("li");
    el.class = "swipeout";
    el.style = "background-color: #88D7F4;padding-bottom: 16px";

    //el.innerHTML = "<div class='swipeout-content item-content' style='background-color: #88D7F4'>"
    //    + "<div class='card' style='margin:0 auto;background-color: #88D7F4'>"
    //    + "<div style='width: 50px;height:180px;border-radius:8px 0 0 8px ;background-color:#425665;float:left'></div>"
    //    + "<div style='width: 290px;height:180px;border-radius: 0 8px 8px 0;background-color:#ffffff;float:left'></div>"
    //    + "</div>"
    //    + "</div>"
    //    + "<div class='swipeout-actions-right'>"
    //    + "<a href=''#' class='swipeout-delete' style='background-color: #FFE036'>Action 1</a>"
    //    + "</div>";

    el.innerHTML = "<div class='swipeout-content item-content' style='background-color: #88D7F4;margin-left: -12px;'>"
        + "<div class='card' style='margin: 0 auto;background-color: #88D7F4'>"
        + "<div style='width: 50px;height: 180px;border-radius:8px 0 0 8px ;background-color: #425665;float: left'></div>"
        + "<div style='width: 290px;height: 180px;border-radius: 0 8px 8px 0;background-color: #ffffff;float: left'>"
        + "<h3 style='margin: 12px 0 -10px 16px;font-size: 22px'>CUSTOM 1</h3>"
        + "<div class='sixConfig' style='margin: 24px 0 0 16px;'>"
        + "<div class='distract01'>"
        + "<img src='img/card01.png' alt='' style='width: 40px;height: 32px;'>"
        + "<h4 style='margin: -30px 0 0px 51px;font-style: normal'>hhhhh</h4></div>"
        + "<div class='distract02'>"
        + "<img src='img/card04.png' alt='' style='width: 40px;margin-top: 5px;height: 32px;'>"
        + "<h4 style='margin: -30px 0 0 51px;font-style: normal'>hhhhh</h4></div>"
        + "<div class='distract01'>"
        + "<img src='img/card02.png' alt='' style='width: 40px;height: 32px;'>"
        + "<h4 style='margin: -30px 0 0 51px;font-style: normal'>hhhhh</h4></div>"
        + "<div class='distract02'>"
        + "<h4 style='margin: 46px 0 0 51px;font-style: normal'>hhhhh</h4></div>"
        + "<div class='distract01'>"
        + "<img src='img/card03.png' alt='' style='width: 40px;height: 32px;'>"
        + "<h4 style='margin: -30px 0 0 51px;font-style: normal'>hhhhh</h4></div>"
        + "<div class='distract02'>"
        + "<h4 style='margin: -27px 0 0 51px;font-style: normal'>hhhhh</h4></div>"
        + "</div></div></div></div>"
        + "<div class='swipeout-actions-right'>"
        + "<a href='#' class='swipeout-delete' style='background-color: #FFE036;width: 30px'>Action 1</a>"
        + "</div>";

    var body = document.getElementById("cards_ul");

    body.appendChild(el);


    //由于出现了上面的bug,不得不...目前想到的方法是dom缓存,点击显示
    //统计点击次数得到index,lis.eq(index).show();当然之前要拿到所有的控件并赋值
}

//<li class="swipeout" style="background-color: #88D7F4">
//        <div class="swipeout-content item-content" style="background-color: #88D7F4">
//        <div class="card" style="margin: 0 auto;background-color: #88D7F4">
//        <div style="width: 50px;height: 180px;border-radius:8px 0 0 8px ;background-color: #425665;float: left"></div>
//        <div style="width: 290px;height: 180px;border-radius: 0 8px 8px 0;background-color: #ffffff;float: left">
//        <h3 style="margin: 12px 0 -10px 16px;font-size: 22px">CUSTOM 1</h3>
//
//    <div class="sixConfig" style="margin: 31px 0 0 16px;">
//        <div class="distract01">
//        <img src="img/card01.png" alt="" style="width: 40px;height: 32px;">
//        <h4 style="margin: -30px 0 0px 51px;font-style: normal">hhhhh</h4>
//        </div>
//
//        <div class="distract02">
//        <img src="img/card04.png" alt=""
//    style="width: 40px;margin-top: 5px;height: 32px;">
//        <h4 style="margin: -30px 0 0 51px;font-style: normal">hhhhh</h4>
//        </div>
//
//        <div class="distract01">
//        <img src="img/card02.png" alt="" style="width: 40px;height: 32px;">
//        <h4 style="margin: -30px 0 0 51px;font-style: normal">hhhhh</h4>
//        </div>
//
//        <div class="distract02">
//        <h4 style="margin: 46px 0 0 51px;font-style: normal">hhhhh</h4>
//        </div>
//
//        <div class="distract01">
//        <img src="img/card03.png" alt="" style="width: 40px;height: 32px;">
//
//        <h4 style="margin: -30px 0 0 51px;font-style: normal">hhhhh</h4>
//        </div>
//
//        <div class="distract02">
//
//        <h4 style="margin: -27px 0 0 51px;font-style: normal">hhhhh</h4>
//        </div>
//        </div>
//        </div>
//        </div>
//        </div>
//        <div class="swipeout-actions-right">
//        <a href="#" class="swipeout-delete" style="background-color: #FFE036">Action 1</a>
//    </div>
//    </li>


//ok , 尝试了N次之后,终于成功了一次


//$("#cards_ul").append(el);

//现在决定使用template7来写
//var testHTML = Template7.templates.cardTemplate({
//    test:'success!'
//});
//
//alert(testHTML.toString);
//$("#cards_ul").html(testHTML);

//$("#cards_ul").html("<li class='swipeout' style='background-color: #88D7F4'>"
//    + "<div class='swipeout-content item-content' style='background-color: #88D7F4'>"
//    + "<div class='card' style='margin:0 auto;background-color: #88D7F4'>"
//    + "<div style='width: 50px;height:180px;border-radius:8px 0 0 8px ;background-color:#425665;float:left'></div>"
//    + "<div style='width: 290px;height:180px;border-radius: 0 8px 8px 0;background-color:#ffffff;float:left'></div>"
//    + "</div>"
//    + "</div>"
//    + "<div class='swipeout-actions-right'>"
//    + "<a href=''#' class='swipeout-delete' style='background-color: #FFE036'>Action 1</a>"
//    + "</div></li>");


//var KeyBoard = function(input){
//    var body
//}
function addSwiperSlide01() {
    //var swiper = $(".swiper-container > .swiper-wrapper");
    var swiperrrr = document.getElementById("wrapper01");
    //var el = document.createElement("li");
    //el.class = "swipeout";
    //el.style = "background-color: #88D7F4;padding-bottom: 16px";

    //swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>D</div></div>";

    for (var i = 2; i < videos.length; i++) {

        swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>" + videos[i] + "</div></div>";

    }
}


//var videos, dodecs, framerates, chs, khzs, bits;
function addSwiperSlide02() {
    //var swiper = $(".swiper-container > .swiper-wrapper");
    var swiperrrr = document.getElementById("wrapper02");
    //var el = document.createElement("li");
    //el.class = "swipeout";
    //el.style = "background-color: #88D7F4;padding-bottom: 16px";

    //swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>D</div></div>";

    for (var i = 2; i < framerates.length; i++) {

        swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>" + framerates[i] + "</div></div>";
    }
}


function addSwiperSlide03() {
    //var swiper = $(".swiper-container > .swiper-wrapper");
    var swiperrrr = document.getElementById("wrapper03");
    //var el = document.createElement("li");
    //el.class = "swipeout";
    //el.style = "background-color: #88D7F4;padding-bottom: 16px";

    //swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>D</div></div>";

    for (var i = 2; i < codecs.length; i++) {

        swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title' style='font-size: 15.5px;'>" + codecs[i] + "</div></div>";

    }
}

function addSwiperSlide04() {
    //var swiper = $(".swiper-container > .swiper-wrapper");
    var swiperrrr = document.getElementById("wrapper04");
    //var el = document.createElement("li");
    //el.class = "swipeout";
    //el.style = "background-color: #88D7F4;padding-bottom: 16px";
    //swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>D</div></div>";

    for (var i = 2; i < chs.length; i++) {

        swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>" + chs[i] + "</div></div>";

    }
}

function addSwiperSlide05() {
    //var swiper = $(".swiper-container > .swiper-wrapper");
    var swiperrrr = document.getElementById("wrapper05");
    //var el = document.createElement("li");
    //el.class = "swipeout";
    //el.style = "background-color: #88D7F4;padding-bottom: 16px";
    //swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>D</div></div>";

    for (var i = 2; i < khzs.length; i++) {

        swiperrrr.innerHTML += "<div class='swiper-slide' id='swiperItem01'><div class='title'>" + khzs[i] + "</div></div>";
    }
}

//计算时间以及空间


//计算比特率

function getBitrate() {

    var index = getIndex(globalConfig.video);
    var resolutionratio = resolutionratios[index];

    var lateralResolution = resolutionratio.substr(0, 4);
    var longitudinalResolution = resolutionratio.substr(5);
    //var fuckbit;
    //if (globalConfig.bit == "8bit") {
    //    fuckbit = globalConfig.bit.substring(0, 1);
    //} else {
    //    fuckbit = globalConfig.bit.substring(0, 2);
    //}
    //alert(globalConfig.framerate);
    //音频的计算公式是声道数＊采样率＊量化／1024/1024/8=Mb/s
    var fuckch;
    if (globalConfig.ch == "12ch" || globalConfig.ch == "16ch") {
        fuckch = globalConfig.ch.substring(0, 2);
    } else {
        fuckch = globalConfig.ch.substring(0, 1);
    }
    //var audioBitrate = globalConfig.ch


    var fuckkhz = globalConfig.khz.substring(0, globalConfig.khz.length - 3);


    var fuckbit = globalConfig.bit.substring(0, globalConfig.bit.length - 3);


    var fuckcolorSamplingRatios = colorSamplingRatios[codecIndexx];
    var multiplicator = 0;
    switch (fuckcolorSamplingRatios) {
        case "444":
            multiplicator = 1;
            break;
        case "422":
            multiplicator = 2 / 3;
            break;
        case "420":
            multiplicator = 1 / 3;
            break;
        case "4444":
            multiplicator = 3 / 4;
            break;
    }

    var videoBitrate = (Number(lateralResolution)) * (Number(longitudinalResolution))
        * (Number(globalConfig.framerate)) * (Number(videobits[codecIndexx])) * 3 * multiplicator / 8 / 1024 / 1024;

    var audioBitrate = Number(fuckbit) * Number(fuckch) * Number(fuckkhz) / 1024 / 1024 / 8;

    bitrate = videoBitrate + audioBitrate;

    bitrate_p.innerHTML = (videoBitrate + audioBitrate).toString().substring(0, 5);
}


//一共10个地方要用到计算方法:6swiper,3时间单位,1storageInput
function cacTime(room, unit) {
    //switch (input) {
    //    case time_input:
    //        //var timevalue = storage_input.value;
    //        //
    //        //storage_input.value = "44444444";
    //        break;
    //    case storage_input:
    //
    //        time_input.value = "2222222";
    //        break;
    //}
    //这10个场景都传入空间大小及时间单位
    var time_s = Number(room) * 1024 / bitrate;
    switch (unit) {
        case "SECONDS":
            time_input.value = time_s;
            break;
        case "MINUTES":
            time_input.value = time_s / 60;
            break;
        case "HOURS":
            time_input.value = time_s / 60 / 60;
            break;
    }
}

function cacStorage(time, unit) {
    var time_s;
    switch (unit) {
        case "SECONDS":
            time_s = time;
            break;
        case "MINUTES":
            time_s = time * 60;
            break;
        case "HOURS":
            time_s = time * 60 * 60;
            break;
    }

    var storage = time_s * bitrate/1024;

    storage_input.value = storage.toString();
}
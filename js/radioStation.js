/**
 * Created by Lai on 2017/7/1.
 */

//自运行函数，避免变量污染
(function(){

    var server = "http://musicapi.duapp.com/api.php";//服务器端api页面

    //异步请求api数据
    function getPlayLists(limit,callback){ //limit是请求的个数，callback执行数据请求成功之后的事情
        $('#loading').css({
            display:"block"
        });

        limit = limit || 9 ;//设置默认值

        //if(checkCache()){//调用判断访问缓存条件的方法
        //
        //    //【访问缓存】:使用统一的返回数据机制：回调函数;不要一会用return,一会用callback
        //    callback(JSON.parse(localStorage.playlists));//parse用于从一个字符串中解析出json对象（反序列化）
        //    console.log("现在正在访问缓存");
        //
        //}else{
            //【访问网络请求数据】
            $.ajax({
                type:"get",
                //http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=72&limit=6
                /*url:"http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=6",*/
                url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=72&limit="+limit,//请求服务器端api文件
                async:true,
                success:function(data){//
                    if(data.code==200){
                        $('#loading').css({
                            display:"none"
                        });
                        //缓存数据到本地存储 localStorage只能保存字符串
                        //JSON.stringify() 方法用于将对象转换为 JSON 字符串。（序列化）

                        data.playlists.catchTime = new Date().getTime();//记录时间的方法1：将时间储存在数据里面
                        localStorage.playlists = JSON.stringify(data.playlists);
                        //localStorage.cacheTime = new Date().getTime();//记录时间的方法2：将访问数据的时间（毫秒值）储存在本地存储的对象上
                        console.log("现在正在访问网络");
                        callback(data.playlists);//回调函数将数据扔出去
                    }
                }
            });
        //}
    }

    //判断访问缓存的条件：1.缓存存在硬盘，2.并且有效时间内
    function checkCache(){

        if(!localStorage.playlists)return false;

        //减法会自动数据类型转换，将localStorage.cacheTime转换成数字类型
        //需要将localStorage.playlist反序列化成对象，获取存储在对象上的时间
        if(new Date().getTime() - JSON.parse(localStorage.playlists).catchTime>=6*1000){
            return false;
        }

        return true;
    }

    //用数据构建html页面
    getPlayLists(12,function(data){//匿名函数，名字没有意义，所以使用匿名函数
        var songList = $("#radioList");

        var template = $('#radio_template').html();//因为html太长，所以写在home.html页面中，并且写成一个模板，display:none.

        //【json数据不能直接放进html，必须拼成html字符串才能放进去】

        for(var i=0;i<data.length;i++){

            /* $(template)//链式编程，需要在每次查找之后加上end()结束
             .find(".item div").html(data[i].playCount).end() //end()代表这次查找结束
             .find(".item img").attr()
             .appendTo(songList);*/

            var $template = $(template);
            $template.find("a").attr("href","#/detail?id="+data[i].id);
            $template.find("span").html(unitCon(data[i].playCount));
            $template.find("img").attr("src",data[i].coverImgUrl);
            $template.find("p").html(data[i].name);
            $template.appendTo(songList);

        }
        //单位换算。将超过一万的数字换成以万为单位
        function unitCon(n){
            if(n-10000>=0){
                var num = Math.floor(n/10000);
                return n=num+"万";
            }else{
                return n;
            }
        }

    });


    //-----------------------------------------------------------------


})();

piChange();

var timer;

function piChange() {


    var currentZIndex = 1;   // 代表当前最大的z-index
    var currentPicIndex = 0; // 代表当前焦点图片的索引
    var delay = 3000;   // 图片切换的延时


    clearInterval(timer);

    //初始化banner
    $("#banner-pic").find('a').first().css("zIndex", currentZIndex);

    //添加鼠标悬停按钮事件响应
    $("#home_banner").hover(
        function () {
            //停止图片播放-清除定时器
            clearInterval(timer);
        },
        function () {
            playBanner();//继续播放
        }
    );

    //动态生成导航按钮
    var navContent = "";

    //将生成的span添加到banner-nav中，并未第一个soan设置class=current
    $("banner-nav").children().first().addClass("current");


    //为导航按钮添加移入事件响应
    $("#banner-nav").find("span").each(function () {
        $(this).on("mouseenter", function (e) {

            $(this).removeClass().addClass("current").siblings().removeClass().addClass("normal");

            var index = $(this).index();

            $("#banner-pic").find("a").eq(index).css({
                left: "100vw",
                zIndex: currentZIndex++,
                opacity:0
            }).animate({left: "0vw",opacity:1},"slow");

            currentPicIndex = index;
            e.stopPropagation(); //阻止事件传播
        })
    });
    playBanner();


//轮播图片的方法
    function playBanner() {
        var picNum = $("#banner-pic").find('a').length;
        clearInterval(timer);
        timer = setInterval(move, delay);
        function move() {
            var nextIndex = currentPicIndex + 1;
            if (nextIndex == picNum) {
                nextIndex = 0;
            }

            //模拟触发数字按钮的mouseover--在匹配的对象上触发指定的事件
            $("#banner-nav").stop().find("span").eq(nextIndex).trigger("mouseenter");
            console.log(currentPicIndex+"-"+currentZIndex)
        }
    }
}

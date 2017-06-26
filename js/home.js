/**
 * Created by Lai on 2017/6/25.
 */


//自运行函数，避免变量污染
(function(){

    var server = "http://musicapi.duapp.com/api.php";//服务器端api页面

//异步请求api数据
    function getPlayLists(limit,callback){ //limit是请求的个数，callback执行数据请求成功之后的事情

        limit = limit || 9 ;//设置默认值

        if(checkCache()){//调用判断访问缓存条件的方法

            //【访问缓存】:使用统一的返回数据机制：回调函数;不要一会用return,一会用callback
            callback(JSON.parse(localStorage.playlists));//parse用于从一个字符串中解析出json对象（反序列化）
            console.log("现在正在访问缓存");

        }else{
            //【访问网络请求数据】
            $.ajax({
                type:"get",
                //http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=72&limit=6
                /*url:"http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=6",*/
                url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=72&limit="+limit,//请求服务器端api文件
                async:true,
                success:function(data){//
                    if(data.code==200){

                        //缓存数据到本地存储 localStorage只能保存字符串
                        //JSON.stringify() 方法用于将对象转换为 JSON 字符串。（序列化）

                        data.playlists.catchTime = new Date().getTime();//记录时间的方法1：将时间储存在数据里面
                        localStorage.playlists = JSON.stringify(data.playlists);
                        //localStorage.cacheTime = new Date().getTime();//记录时间的方法2：将访问数据的时间（毫秒值）储存在本地存储的对象上
                        console.log("现在正在访问网络");
                        callback(data.playlists);//回调函数将数据扔出去
                    }
                }
            })
        }
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


    getPlayLists(12,function(data){//匿名函数，名字没有意义，所以使用匿名函数
        var songList = $("#songlist");

        var template = $('template').html();//因为html太长，所以写在home.html页面中，并且写成一个模板，display:none.

        //【json数据不能直接放进html，必须拼成html字符串才能放进去】

        for(var i=0;i<data.length;i++){

           /* $(template)//链式编程，需要在每次查找之后加上end()结束
                .find(".item div").html(data[i].playCount).end() //end()代表这次查找结束
                .find(".item img").attr()
                .appendTo(songList);*/

            var $template = $(template);
            $template.find("a").attr("href","#/detail?id="+data[i].id);
            $template.find("div").html(data[i].playCount);
            $template.find("img").attr("src",data[i].coverImgUrl);
            $template.find("p").html(data[i].name);
            $template.appendTo(songList);

        }
    });
})();





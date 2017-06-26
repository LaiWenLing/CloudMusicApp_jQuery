/**
 * Created by Lai on 2017/6/26.
 */

//play方法需要被其他页面调用，但是作为全局函数，有其他附加的全局变量如server,会导致全局变量越来越对，
    //因此可以将这组全局函数和全局变量写成一个对象保存成一个全局变量。这样全局成员就只有一个全局变量了。
var audioController = {
    server : "http://musicapi.duapp.com/api.php",
    play: function(music){
        console.log(music);

        var audio_state=$("#audio_state");

        //http://musicapi.duapp.com/api.php?type=url&id=37092095
        //1.播放歌曲
        audio_state.html("歌曲加载中");

        $.ajax({
            type:"get",
            url:this.server+"?type=url&id="+music.id,//37092095
            // server应该叫this.server;this指audioController;如果不写this,那么指的是window.server.会报错
            async:true,
            success:function(data){
                if(data.code==200){
                    //callback(data.data[0]);不用回调，因为音频可以播放
                    //$("#audio").attr("src",)正确写法
                    //$("#audio").src 错误写法,因为jquery不能直接使用一些原生方法
                    //$("#audio").prop("src",data.data[0].url);正确写法

                    var audio = $("#audio")[0]; //将jquery对象转换成原生js对象，繁写：var audio = $("#audio").get(0);
                    audio.src = data.data[0].url;
                    audio.play();

                    audio_state.html("歌曲成功");

                }
            }
        });

        //2.显示歌曲,这段代码不能写在success里面。因为ajax是异步请求，只有数据加载完之后才会显示歌曲名字。
        $("#audio_name").html(music.name);
    }
};

/*//获取歌曲mps地址并且播放的方法,play方法要被其他页面调用，所以不能装进自运行函数
function play(music){
    //http://musicapi.duapp.com/api.php?type=url&id=37092095
    $.ajax({
        type:"get",
        url:server+"?type=url&id=37092095",//37092095
        async:true,
        success:function(data){
            if(data.code==200){
                //callback(data.data[0]);不用回调，因为音频可以播放
                //$("#audio").attr("src",)正确写法
                //$("#audio").src 错误写法,因为jquery不能直接使用一些原生方法
                //$("#audio").prop("src",data.data[0].url);正确写法

                var audio = $("#audio")[0]; //将jquery对象转换成原生js对象，繁写：var audio = $("#audio").get(0);
                audio.src = data.data[0].url;
                audio.play();

            }
        }
    })
}*/
/*
(function(){
    play();
})();*/

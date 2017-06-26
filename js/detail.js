/**
 * Created by Lai on 2017/6/26.
 */



(function(){
    function getPlayLists(id,callback){

        $.ajax({
           type:"get",
            url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,//635498296
            async:true,
            success:function(data){
                if(data.code==200){
                    callback(data.playlist);
                    console.log(data.playlist);
                }
            }
        });
    }

    var p=getUrlParams();//获取url参数，将id作为参数传递给getPlayList.

    getPlayLists(p.id,function(data){

        var $musicList = $("#musicList");
        var template = $("#templateMusic").html();

        for(var i=0;i<data.tracks.length;i++){
            var music = data.tracks[i];
            var $template = $(template);//必须要先创建一个对象
            $template.find(".music").html(music.name);
            $template.find(".artist").html(music.ar[0].name);
            $template.appendTo($musicList);

            //将data.tracks[i]的信息保存到每个template的”music“属性里
            $template.data("music",music).click(function(){
                var m=$(this).data("music");
                audioController.play(m);//调用audio.js的audioController对象里面的play()方法
                console.log("item clicked")
            });

        }
    })
})();
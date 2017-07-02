/**
 * Created by Lai on 2017/6/26.
 */



(function(){

    //返回上一页
    $("#a_link").click(function(){
        var url=document.referrer;
        window.location.href = url;
        localStorage.cTime = $("#audio")[0].currentTime;
    });

    //ajax异步请求
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
            },
            error:function(){
                $(".cd_name").html("震惊！数据被外星人劫持了！");
                $(".nickname").html("外星人007");
                $("#coverImg").attr("src","images/notdata.jpg");
                $(".creatorImg").attr("src","images/notdata.jpg");
                $(".bg_player").css(
                    "background-image","url(images/notdata.jpg)"
                );
                $('#musicList').html("数据无法加载")
            }
        });
    }

    //获取页面url的id,根据id加载数据
    var p=getUrlParams();//获取url参数，将id作为参数传递给getPlayList.

    //用数据构建页面
    getPlayLists(p.id,function(data){

        $("#coverImg").attr("src",data.coverImgUrl);
        $(".cd_name").html(data.name);
        $(".nickname").html(data.creator.nickname);
        $(".creatorImg").attr("src",data.creator.backgroundUrl);
        $(".bg_player").css(
           "background-image","url("+data.coverImgUrl+")"
        );


        var $musicList = $("#musicList");
        var template = $("#templateMusic").html();

        for(var i=0;i<data.tracks.length;i++){
            var music = data.tracks[i];
            var $template = $(template);//必须要先创建一个对象
            $template.find("span").html(i+1);
            $template.find(".music").html(music.name);
            $template.find(".artist").html(music.ar[0].name);
            $template.appendTo($musicList);

            //将data.tracks[i]的信息保存到每个template的”music“属性里
            $template.data("music",music).click(function(){

                $("#global").css({display:"block"});

                $('.play_pause').find('img').attr('src','images/playbar_btn_play.png');
                var m=$(this).data("music");
                localStorage.music =  JSON.stringify(m);
                audioController.play(m);//调用audio.js的audioController对象里面的play()方法

                console.log("item clicked")
            });
        }
    });

    //
    window.onscroll = function(){
        var d_title = $('.d_title');
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>=100){
            d_title.css({
                background:"#d2453c"
            })
        }else {
            d_title.css({
                background:"none"
            })
        }
    }


})();
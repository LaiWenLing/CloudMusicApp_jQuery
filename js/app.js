/**
 * Created by Lai on 2017/6/25.
 */
//【获取url后面的参数】:字符串切割方法，逐步获取参数
function getUrlParams(){
    var params = {};
    var url =  window.location.href;

    //1.先用#分割，如果分割成功，保留#后面的参数
    var p = url.split("#");
    if(p.length == 2){
        p= p[1];//保留#后面的一段
    }else{
        p = url;
    }
    //2.再用 ？分割，保存锚点
    p = p.split("?");
    if(p.length<2){//如果长度小于2.那么只有一段
        params.anchor = p[0];//保存锚点
        return params;
    }
    params.anchor = p[0];

    //3.再用 & 分割
    p = p[1].split("&");
    for(var i=0;i<p.length;i++){
        var kv = p[i].split("=");
        params[kv[0]] = kv[1];
    }
    return params;
}

//【路由：加载模块页面及相对应JS模块:使用jquery异步请求】
function route(m,container){  //container是容器

   // if(!container)container = $("#share");写法1：如果没有传第二个参数的情况下
    container = container || $("#share");//写法2

    $.ajax({
        url:"views/"+m+".html",
        success:function(data){

            //模块页面加载完毕之后。加载模块js
            container.html(data);

            //加载js
            loadJS(m);
        }
    });

    //加载js模块的函数
    function loadJS(m){
        $.ajax({
            type:"get",
            url:"js/"+m+".js",
            async:true,
            dataType:"script"//请求js必须说明类型为脚本
        })
    }
    //方法二：与$ajax()方法效果一样
    //$("#share").load("views/"+m+".html");
}
//调用路由函数： //因为传递了dom元素，所以只有加载完成网页才能生效

$(function(){

    //cookie早期本地存储，不安全。
    //localSrorage本地储存,保存的值只能是字符串
    if(!localStorage.count)localStorage.count=0;
    localStorage.count++;

    if(localStorage.count==1){
        route('hello');
    }else{
        route("tab");
       route("audio",$("#global"));
    }
    console.log(localStorage.count);


});





/**
 * Created by Lai on 2017/7/1.
 */

(function(){

    //异步请求
    function getChartsLists(callback){

        $.ajax({
            type:"get",
            url:"api/charts.json",
            async:true,
            success:function(data){
                if(data.code ==200){
                    callback(data.officialCharts);
                }
            }
        })

    }

    getChartsLists(function(data){
        var chartsList = $('#charts_list'); //获取容器
        var template = $('.music_list').html();

        for(var i=0;i<data.length-1;i++){
            var $tempalte = $(template);
            $tempalte.find('.cover').attr("src",data[i].picUrl);
            $tempalte.find('.charts_info li a').each(function(k){
                    $(this).html(data[i].list[k].num +"."+data[i].list[k].song+"-"+data[i].list[k].author);
            });
            $tempalte.appendTo(chartsList);
        }

    })

})();
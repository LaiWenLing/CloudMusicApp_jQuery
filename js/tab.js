/**
 * Created by Lai on 2017/6/26.
 */
(function(){
    route("home",$(".tabcontainer"));

    //鼠标点击菜单的效果
    $('#fix .nav').find('div').each(function(){
        $(this).on('click',function(){
            $(this).removeClass().addClass('active').siblings().removeClass().addClass('normal');
        })
    });

})();
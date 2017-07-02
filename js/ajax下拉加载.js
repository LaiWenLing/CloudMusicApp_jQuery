/**
 * Created by Lai on 2017/6/30.
 */
$(function() {
    var page = 1;
    var discount = $('#discount');
    var innerHeight = window.innerHeight;
    var timer2 = null;
    $.ajax({
        url: '/lightapp/marketing/verify/apply/list?page=1',
        type: 'GET',
        dataType: 'json',
        timeout: '1000',
        cache: 'false',
        success: function (data) {
            if (data.error_code === 0) {
                var arrText = [];
                for (var i = 0, t; t = data.list[i++];) {
                    arrText.push('<div class="consume-whole">');
                    arrText.push('<h3>' + t.title + '</h3>');
                    if (t.coupon_type == 1 ) {
                        arrText.push('<p>金额：￥' + t.amount + '</p>');
                    } else {
                        arrText.push('<p>优惠：' + t.amount + '</p>');
                    }
                    arrText.push('<p><span class="hx-user">用户：s账户飒飒是是是啊啊12' + t.user_name +'</span>' + '<span>核销时间：' + t.use_time + '</span></p>');
                    arrText.push('</div>');
                }
                discount.html(arrText.join(''));
            };
            var ajax_getting = false;


            $(window).scroll(function() {
                clearTimeout(timer2);
                timer2 = setTimeout(function() {
                    var scrollTop = $(document.body).scrollTop();
                    var scrollHeight = $('body').height();
                    var windowHeight = innerHeight;
                    var scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);
                    if (scrollWhole < 100) {
                        if (ajax_getting) {
                            return false;
                        } else {
                            ajax_getting = true;
                        }
                        discount.append('<div class="load"><img src="/lightapp/static/zhida-yunying/img/load.gif" width="6%" /></div>');
                        $('html,body').scrollTop($(window).height() + $(document).height());
                        page++;
                        $.ajax({
                            url: '/lightapp/marketing/verify/apply/list?page=' + page,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data.error_code === 0) {
                                    var arrText = [];
                                    for (var i = 0, t; t = data.list[i++];) {
                                        arrText.push('<div class="consume-whole"><a href="/lightapp/marketing/verify/page/info?rule_id=' + t.rule_id + '&coupon_id='+ t.coupon_id +'">');
                                        arrText.push('<h3>' + t.title + '</h3>');
                                        if (t.coupon_type == 1 ) {
                                            arrText.push('<p>金额：￥' + t.amount + '</p>');
                                        } else {
                                            arrText.push('<p>优惠：' + t.amount + '</p>');
                                        };
                                        arrText.push('<p><span class="hx-user">用户：账户飒111111111' + t.user_name +'</span>' + '<span>核销时间：' + t.use_time + '</span></p>');
                                        arrText.push('</a></div>');
                                    }
                                    discount.append(arrText.join(''));
                                    $(".load").remove();
                                } else {
                                    $(".load").remove();
                                    discount.append('<div class="no-data">没有更多数据。</div>');
                                    $(window).unbind('scroll');
                                };
                                ajax_getting = false;
                            }
                        });
                    };
                    $(".load").remove();
                }, 200);
            });




            if (data.error_code == 156006) {
                $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：未登录</p></div>')
            };
            if (data.error_code == 156003) {
                $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：权限不足~请补充</p></div>')
            };
            if (data.error_code == 156007) {
                $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：服务异常</p></div>')
            };
            if (data.error_code == 511) {
                $('.coupon').html('<div class="error"><h2>出错啦！</h2><p>原因：账号未开通直达号</p></div>')
            };
            if (data.error_code == 520) {
                $('.coupon').html('<div class="stays"><span></span><p>暂无核销记录</p></div>')
            }

        },



        error: function (data) {

        }
    });

    $(window).bind("orientationchange", function() {
        $('.sliders').css('left',$(window).width() / 2 +'px');
    })
});
import {Zepto} from './zepto/zepto.js';
import {fclick} from './plugins/fastclick.js';
import {lazyload} from './plugins/lazyload.js';
import {getUnit, eventUnit, cookieUnit} from './unit/unit.js';

!function(window, document){
    /**
     * fixed zepto 点透bug
     * **/
    fclick.attach(document.body);

    /**
     * loading动画
     */
    function Loading() {

    }
    Loading.prototype.start = function () {
        $('.m-loading').show();
        $('body').css("overflow","hidden");
    };
    Loading.prototype.end = function () {
        $('.m-loading').hide();
        $('body').css("overflow","auto");
    };
    var loading = new Loading();
    $.loading = loading;

    /**
     * 获取语言
     * **/
    let languages = cookieUnit.getCookie('languages');
    if(!languages){
        let nl = navigator.language;
        cookieUnit.setCookie('languages', nl, 365);
    }

    /**
     * 未登录阻止a链接跳转,跳转到登录页面
     * */
    $.fn.denyALink = function (msg) {
        var t = $(this),
            jumpUrl = './login.html'; // 登录页面的链接

        t.bind('tap click', function (e) {
            e.preventDefault();
            $.pop({
                type: 'tips',
                hideTimes: 2000,
                message: msg ? msg : '暂未登录,将跳转到登录页...',
                callback: function () {
                    window.location = jumpUrl;
                }
            });
        });
    };

    /**
     * 选择城市
     * **/
    $.ChooseListInit = function(btn, list, bool){
        let [chooseBtn, chooseLst] = [getUnit.id(btn), getUnit.id(list)];
        if(chooseBtn && chooseLst){
            eventUnit.addListener(chooseBtn, 'tap', function(){
                chooseLst.style.display='block';
            });
            eventUnit.addListener(chooseLst, 'tap', function(event){
                let ele = event.target || event.srcElement;
                const dataJs = ele.getAttribute('data-js');
                if(dataJs=='J_GoBack'){
                    chooseLst.style.display='none';
                }else if(dataJs=='J_ChooseItem'){
                    let dataId = ele.getAttribute('data-id');
                    if(bool){
                        let iner = ele.innerHTML;
                        $('.J_Location').text(iner);
                        cookieUnit.setCookie('cityId', ele.getAttribute('data-id'), 365);
                        if(window.localStorage){
                            window.localStorage.setItem('cityName', escape(iner));
                        }else{
                            cookieUnit.setCookie('cityName', iner, 365);
                        }
                        history.go(-1) || (location.href='index.html');
                    }else{
                        chooseBtn.value = ele.innerHTML;
                        chooseBtn.setAttribute('data-id', dataId);
                        chooseLst.style.display='none';
                    }
                }
                $(chooseBtn).parents('form').trigger('keyup');
            });

        }else{

        }
    };

    

    /**
     * 切换switch
     * **/
    $.fn.toggleSwitch = function(){
        var t = $(this);
        $(this).on('click', function () {
            if(t.hasClass('switch-open')){
                t.addClass('transition').removeClass('switch-open').attr('value', false);
            }else{
                t.addClass('transition').addClass('switch-open').attr('value', true);
            }
        })
    };

    /**
     * 切换标签页
     * **/
    $.fn.toggleTab = function(){
        var t = $(this),
            target = t.find('.tab-contents'),
            tw = target.width(),
            title = t.find('.tab-buttons');

        title.on('click', function(e){
            let ele = e.target,
                i = $(ele).index();
            if (ele == this) return;
            toTab(i);
        });

        var toTab = function(i){
            target.addClass('transition').css({
                "-webkit-transform":"translate(" + (-tw * i) + "px,0)",
                "transform":"translate(" + (-tw * i) + "px,0)"
            });
            toTitle(i);
        };

        var toTitle = function(i){
            if (title.length == 0) return;
            title.children().toggleClass("active", false).eq(i).toggleClass("active", true);
        };
    };

    /***
     * 全选反选
     * **/
    $.fn.checkAll = function(opt){
        var t = this, checkboxs = $('.' + opt.checkboxClassName);
        t.on('tap', function () {
            if($(this).is(':checked')){
                checkboxs.each(function(){
                    this.checked = true;
                });
            }else{
                checkboxs.each(function(){
                    this.checked = false;
                });
            }
        });
    };

    /**
     * 轮播
     * **/
    $.fn.carousel = function(opt){
        var t = $(this),
            target = t.find('.carousel-lists'),
            tw = target.width(),
            length = target.children('.carousel-list').length,
            ch = target.children('.carousel-list'),
            img = t.find('.carousel-list img'),
            dot = t.find('.carousel-dots'),
            m = { initX: 0, initY: 0, startX: 0, endX: 0, startY: 0, canmove: false },
            currentTab = 0;

        var imgBrowser = function () {
            target.on('tap', function(){
                if(target.parent().hasClass('m-carousel-brower')){
                    target.parent().removeClass('m-carousel-brower');
                    $('body').css("overflow","auto");
                }else{
                    target.parent().addClass('m-carousel-brower');
                    $('body').css("overflow","hidden");
                }
            });
        };

        if(opt.imgBrower == true){
            imgBrowser();
        }

        var num = target.find('.carousel-list').length;
        for(var j=0; j<num; j++){
            if(j == 0){
                dot.append('<li class="carousel-dot active"></li>');
            }else{
                dot.append('<li class="carousel-dot"></li>');
            }
        }

        var toTab = function(i){
            move(-tw * i);
            toDot(i);
            currentTab = i;
        };

        var toDot = function(i){
            if (dot.length == 0) return;
            dot.children().toggleClass("active", false).eq(i).toggleClass("active", true);
        };
        var move = function(dis){
            target.addClass('transition').css('margin-left', (m.endX = dis) + 'px');
        };

        t.on("touchstart", function(e) {
            var et = e.touches[0];
            if ($(et.target).closest(".carousel-lists").length != 0) {
                m.canmove = true, m.initX = m.startX = et.pageX;

                m.initY = et.pageY;
            }
        }).on("touchmove", function(e) {
            var et = e.touches[0];

            if (m.canmove && Math.abs(et.pageY - m.initY) / Math.abs(et.pageX - m.initX) < 0.6) {
                m.endX += et.pageX - m.startX;
                target.removeClass('transition').css('margin-left', m.endX + 'px');
                m.startX = et.pageX;
                e.preventDefault();
            }
        }).on('touchend', function(e){
            if( !m.canmove ) return ;
            target.addClass('transition');
            var bl = false,
                current = Math.abs(m.endX / tw);

            if (m.endX > 0) {
                current = m.endX = 0;
                bl = true;
                target.removeClass('transition').css('margin-left', -tw * length + 'px');
            } else if (m.endX < -tw * (target.children().length - 1)) {
                current = target.children().length - 1;
                bl = true;
            }
            if (!bl) {
                if (m.endX % tw != 0) {
                    var str = parseInt((current + "").split(".")[1][0]);
                    if (e.changedTouches[0].pageX > m.initX) {
                        current = str <= 9 ? Math.floor(Math.abs(current)) : Math.abs(Math.round(m.endX / tw));
                    } else {
                        current = str >= 1 ? Math.floor(Math.abs(current)) + 1 : Math.abs(Math.round(m.endX / tw));
                    }
                }
            }
            toTab(current);
            m.canmove = false;
        });
    };


    /**
     * 商品购买数目
     * */
    $.fn.purchaseNumber = function () {
        var box = $(this);
        box.children('.J_MinusNumber').on('tap', function () {
            var showNum = $(this).next();
            if (parseInt(showNum.html()) > 1) {
                showNum.html(parseInt(showNum.html()) - 1);
            }
        });
        box.children('.J_AddNumber').on('tap', function () {
            var showNum = $(this).prev();
            showNum.html(parseInt(showNum.html()) + 1);
        });
    };

    // 加入/删除 收藏
    $.fn.setFavorite = function (opt) {
        var btn = $(this),
            productId = $('.product-img751').attr('data-pid'),
            url = opt.url ? opt.url : false;
        if(!url){
            $.pop({
                type: 'tips',
                msg: '参数错误!'
            });
            return false;
        }
        btn.on('tap', function () {
            var setFavData = {
                method: btn.hasClass('icon-love') ? 'add' : 'del',
                productId: productId
            };
            $.ajax({
                url: url,
                type: 'POST',
                data: setFavData,
                success: function (data) {
                    data = JSON.parse(data);
                    if(data.code == 200){
                        if(btn.hasClass('icon-love')){
                            btn.removeClass('icon-love').addClass('icon-love-green');
                        }else{
                            btn.removeClass('icon-love-green').addClass('icon-love');
                        }
                    }else{
                        $.pop({
                            type: 'tips',
                            message: data.msg
                        });
                        return false;
                    }
                }
            });
        });
    };
}(window,window.document);

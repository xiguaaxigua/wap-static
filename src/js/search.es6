/**
 * Created by xiangran.kong on 16/08/12.
 */
import {getUnit, eventUnit, cookieUnit} from './unit/unit.js';

!function(window, document, $){

    /**
     * 读取搜索历史
     * */
    $.readSearchHistory = function (box) {
        if(!window.localStorage) return false;
        var sHis = '',
            html = '',
            sBox = $(box);
        if('sHis' in window.localStorage){
            sHis = window.localStorage.sHis;

            // 最新的记录在最上边
            sHis = sHis.split(" ").reverse();
            for(var i=0; i<sHis.length; i++){
                html += '<li><a href=\"search-result.html?searchText=' + sHis[i] + '\">' + sHis[i] + '</a></li>';
            }
        }else{
            html = '<li><span>暂无历史搜索!</span></li>'
        }
        sBox.append(html);
    };

    /**
     * 存储搜索历史,接收字符串,记录以字符串的形式存储在localStorage中,记录之间以空白间隔
     * */
    $.saveSearchHistory = function (text) {
        let sHis = ('sHis' in window.localStorage) ? window.localStorage.sHis : '';
        if(typeof text !== 'string') return false;
        let tempStr = text.replace(' ', '');
        tempStr = tempStr.replace(/<[^<>]+>/g, '');
        if(sHis.indexOf(' ') !== -1 || sHis !== ''){
            let tempSHis;
            tempSHis = sHis.split(' ');
            for(let i=0; i<tempSHis.length; i++){
                if(tempStr == tempSHis[i]) return false;
            }
        }
        tempStr = ' ' + tempStr;
        sHis = sHis + tempStr;
        sHis = sHis.replace(/(^\s*)/g, '');
        window.localStorage.sHis = sHis;
    };

    if(getUnit.cls('search-box751')){
        // 加载历史记录
        $.readSearchHistory('#J_searchHisShowBox');
        // 清除历史记录
        $('#J_clearSearchHistory').on('tap', function () {
            if(!window.localStorage || !('sHis' in window.localStorage)){
                $.pop({
                    type: 'tips',
                    hideTimes: 2000,
                    message: '清除失败!'
                });
            }
            window.localStorage.removeItem('sHis');
            if(!window.localStorage.sHis){
                // 弹出,清除成功
                $.pop({
                    type: 'tips',
                    hideTimes: 2000,
                    message: '搜索记录清除成功!'
                });
                setTimeout(function(){
                    window.location.reload();
                },2000);

            }else{
                $.pop({
                    type: 'tips',
                    hideTimes: 2000,
                    message: '清除失败!'
                });
            }
        });
    }

    if(getUnit.cls('search-box751') || getUnit.cls('search-result-box751')){
        // searchInput
        $('.J_searchInput').bind('keyup', function (e) {
            var searchText = $('.J_searchInput').val(),
                sugBox = $('.suggest751'),
                tabBox = $('.m-tab');
            // 回车,跳转搜索结果页面
            if(e.keyCode == '13'){
                var url = 'search-result.html?searchText=' + searchText;
                window.location = url;

                // 存历史记录
                $.saveSearchHistory(searchText);
            }else{
                // Ajax
                $.ajax({
                    url: searchHistoryUrl,
                    type: 'post',
                    data: {'search': searchText},
                    dataType: 'json', 
                    success: function (data) {
                        var html = '',
                            cate = '';
                        for(var i in data.keywords){
                            html += '<li><a href=\"search-result.html?searchText=' + data.keywords[i] + '\">' + data.keywords[i] + '</a></li>';
                        }

                        for(var j in data.category){
                            cate += '<li><a href=\"search-result.html?searchText=' + searchText + '&searchCategory=' + data.category[j] + '\">在<span>' + data.category[j]+ '</span>中搜索:' + searchText + '</a></li>';
                        }
                        sugBox.html(cate).append(html);
                    }
                });

                tabBox.hide();
                sugBox.show();
            }
        });
    }

}(window, window.document, Zepto);

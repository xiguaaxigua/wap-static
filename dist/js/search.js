/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by xiangran.kong on 16/08/05.
	 */
	/**
	 * 获取对象元件，来获取DOM元素
	 * get.id
	 * @param id string类型，返回DOM对象
	 * get.cls
	 * @param className strign类型，返回DOM元素组成的数组
	 * get.qs
	 * @param name string类型,通过querySelector来获取单个DOM元素；
	 * get.qsa
	 * @param name string类型，通过querySelectorAll来获取元素列表，返回数组；
	 * **/
	var getUnit = {
	    id: function id(_id) {
	        return typeof _id === 'string' ? document.getElementById(_id) : _id;
	    },
	    cls: function cls(className) {
	        if (typeof className !== 'string') {
	            //console.warn('传入的值类型不是字符串！请检查传入的值');
	            return false;
	        }
	        var classArray = [];
	        if (document.getElementsByClassName) {
	            var _classList = document.getElementsByClassName(className);
	            for (var j in _classList) {
	                _classList[j].nodeType && classArray.push(_classList[j]);
	            }
	        } else {
	            var allElement = document.getElementsByClassName(className);
	            for (var i in allElement) {
	                if (allElement[i].getAttribute('class') == className) {
	                    classArray.push(classList[i]);
	                }
	            }
	        }
	        return classArray;
	    },
	    qs: function qs(name) {
	        if (typeof name !== 'string') {
	            //console.warn('传入的值类型不是字符串！请检查传入的值');
	            return false;
	        }
	        if (document.querySelector) {
	            return document.querySelector(name);
	        } else {
	            //console.warn('您的浏览器不支持，请赶紧更新浏览器');
	            return [];
	        }
	    },
	    qsa: function qsa(name) {
	        if (typeof name !== 'string') {
	            //console.warn('传入的值类型不是字符串！请检查传入的值');
	            return false;
	        }
	        if (document.querySelectorAll) {
	            var classArray = [];
	            var list = document.querySelectorAll(name);
	
	            for (var i in list) {
	                if (list[i].getAttribute('class') == className) {
	                    classArray.push(list[i]);
	                }
	            }
	            return classArray;
	        } else {
	            //console.warn('您的浏览器不支持，请赶紧更新浏览器');
	            return [];
	        }
	    }
	};
	/**
	 * 事件绑定
	 *  addListener function,增加事件监听
	 * @param ele  DOM元素，需要绑定的元素
	 * @param type  string,事件类型
	 * @param handle  fun类型 元素绑定执行的函数
	 * removeListener function,移除事件绑定
	 * @param ele  DOM元素，需要移除绑定的元素
	 * @param type  string,移除事件类型
	 * @param handle  fun类型 元素移除；执行的函数
	 * **/
	var eventUnit = {
	    addListener: function addListener(ele, type, handle) {
	        if (ele.addEventListener) {
	            ele.addEventListener(type, handle, false);
	        } else if (ele.attachEvent) {
	            ele.attachEvent('on' + type, handle);
	        } else {
	            ele['on' + type] = handle;
	        }
	    },
	    removeListener: function removeListener(ele, type, handle) {
	        if (ele.remvoeEventListener) {
	            ele.remvoeEventListener(type, handle, false);
	        } else if (ele.detachEvent) {
	            ele.detachEvent('on' + type, handle);
	        } else {
	            ele['on' + type] = handle;
	        }
	    }
	};
	/**
	 * 操作Cookie
	 *  setCookie function,设置cookie
	 * @param name  string，cookie名称
	 * @param val  string,cookie中要存放的字符串
	 * @param day  number类型 元素绑定执行的函数
	 * getCookie function,获取指定cookie
	 * @param name  string，cookie名称
	 * delCookie function,删除指定cookie
	 * @param handle  fun类型 元素移除；执行的函数
	 * **/
	var cookieUnit = {
	    setCookie: function setCookie(name, val, day) {
	        var days = day || 30,
	            exp = new Date();
	        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	        document.cookie = name + "=" + escape(val) + ";expires=" + exp.toGMTString() + ";path=/";
	    },
	    getCookie: function getCookie(name) {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	    },
	    delCookie: function delCookie(name) {
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval = getCookie(name);
	        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
	    }
	};
	
	exports.getUnit = getUnit;
	exports.eventUnit = eventUnit;
	exports.cookieUnit = cookieUnit;
	
	//# sourceMappingURL=unit.js.map

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _unit = __webpack_require__(2);
	
	!function (window, document, $) {
	
	    /**
	     * 读取搜索历史
	     * */
	    $.readSearchHistory = function (box) {
	        if (!window.localStorage) return false;
	        var sHis = '',
	            html = '',
	            sBox = $(box);
	        if ('sHis' in window.localStorage) {
	            sHis = window.localStorage.sHis;
	
	            // 最新的记录在最上边
	            sHis = sHis.split(" ").reverse();
	            for (var i = 0; i < sHis.length; i++) {
	                html += '<li><a href=\"search-result.html?searchText=' + sHis[i] + '\">' + sHis[i] + '</a></li>';
	            }
	        } else {
	            html = '<li><span>暂无历史搜索!</span></li>';
	        }
	        sBox.append(html);
	    };
	
	    /**
	     * 存储搜索历史,接收字符串,记录以字符串的形式存储在localStorage中,记录之间以空白间隔
	     * */
	    $.saveSearchHistory = function (text) {
	        var sHis = 'sHis' in window.localStorage ? window.localStorage.sHis : '';
	        if (typeof text !== 'string') return false;
	        var tempStr = text.replace(' ', '');
	        tempStr = tempStr.replace(/<[^<>]+>/g, '');
	        if (sHis.indexOf(' ') !== -1 || sHis !== '') {
	            var tempSHis = void 0;
	            tempSHis = sHis.split(' ');
	            for (var i = 0; i < tempSHis.length; i++) {
	                if (tempStr == tempSHis[i]) return false;
	            }
	        }
	        tempStr = ' ' + tempStr;
	        sHis = sHis + tempStr;
	        sHis = sHis.replace(/(^\s*)/g, '');
	        window.localStorage.sHis = sHis;
	    };
	
	    if (_unit.getUnit.cls('search-box751')) {
	        // 加载历史记录
	        $.readSearchHistory('#J_searchHisShowBox');
	        // 清除历史记录
	        $('#J_clearSearchHistory').on('tap', function () {
	            if (!window.localStorage || !('sHis' in window.localStorage)) {
	                $.pop({
	                    type: 'tips',
	                    hideTimes: 2000,
	                    message: '清除失败!'
	                });
	            }
	            window.localStorage.removeItem('sHis');
	            if (!window.localStorage.sHis) {
	                // 弹出,清除成功
	                $.pop({
	                    type: 'tips',
	                    hideTimes: 2000,
	                    message: '搜索记录清除成功!'
	                });
	                setTimeout(function () {
	                    window.location.reload();
	                }, 2000);
	            } else {
	                $.pop({
	                    type: 'tips',
	                    hideTimes: 2000,
	                    message: '清除失败!'
	                });
	            }
	        });
	    }
	
	    if (_unit.getUnit.cls('search-box751') || _unit.getUnit.cls('search-result-box751')) {
	        // searchInput
	        $('.J_searchInput').bind('keyup', function (e) {
	            var searchText = $('.J_searchInput').val(),
	                sugBox = $('.suggest751'),
	                tabBox = $('.m-tab');
	            // 回车,跳转搜索结果页面
	            if (e.keyCode == '13') {
	                var url = 'search-result.html?searchText=' + searchText;
	                window.location = url;
	
	                // 存历史记录
	                $.saveSearchHistory(searchText);
	            } else {
	                // Ajax
	                $.ajax({
	                    url: 'searchData.php',
	                    type: 'post',
	                    data: { 'searchText': searchText },
	                    dataType: 'json',
	                    success: function success(data) {
	                        var html = '',
	                            cate = '';
	                        for (var i in data.keywords) {
	                            html += '<li><a href=\"search-result.html?searchText=' + data.keywords[i] + '\">' + data.keywords[i] + '</a></li>';
	                        }
	
	                        for (var j in data.category) {
	                            cate += '<li><a href=\"search-result.html?searchText=' + searchText + '&searchCategory=' + data.category[j] + '\">在<span>' + data.category[j] + '</span>中搜索:' + searchText + '</a></li>';
	                        }
	                        sugBox.html(cate).append(html);
	                    }
	                });
	
	                tabBox.hide();
	                sugBox.show();
	            }
	        });
	    }
	}(window, window.document, Zepto); /**
	                                    * Created by xiangran.kong on 16/08/12.
	                                    */
	
	//# sourceMappingURL=search.js.map

/***/ }

/******/ });
//# sourceMappingURL=search.js.map
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	exports.popup = popup;

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	/**
	 * Created by xiangran.kong on 16/08/03.
	 */
	var Popup = function () {
	    function Popup() {
	        _classCallCheck(this, Popup);

	        var that = this;
	        //初始化，传参数
	        this.init = function (opts) {
	            var type = opts.type;
	            switch (type) {
	                case 'tips':
	                    that._tips(opts);break;
	                case 'alert':
	                    that._alert(opts);break;
	                case 'wechat':
	                    that._wechat(opts);break;
	                default:
	                    that._tips(opts);break;
	            }
	            return 'end';
	        };
	    }

	    _createClass(Popup, [{
	        key: '_hideMask',
	        value: function _hideMask(ele) {
	            var maskDiv = ele || document.getElementById('J_Mask');
	            maskDiv.style.display = 'none';
	        }

	        /**
	         * 弹窗，提示窗，遮罩等
	         * @param type 指定弹窗的类型， 分为tips：提示窗； alert:弹窗，需要确认； mask: 蒙层,二维码等
	         * @param hideTimes 消失时间, 默认为2s
	         * @param message 提示消息
	         * **/

	    }, {
	        key: '_tips',
	        value: function _tips(options) {
	            var _options$hideTimes = options.hideTimes;
	            var ts = _options$hideTimes === undefined ? 2000 : _options$hideTimes;
	            var msg = options.message;
	            var that = this;

	            var callback = options.callback,
	                maskDiv = document.getElementById('J_Mask');
	            if (maskDiv) {
	                maskDiv.style.display = 'block';
	                maskDiv.innerHTML = '<p class=\"m-tips\">' + msg + '</p>';
	            } else {
	                var p = document.createElement('p');
	                p.className = 'm-tips', p.innerHTML = msg;
	                maskDiv = document.createElement('div');
	                maskDiv.className = 'm-mask', maskDiv.id = 'J_Mask';
	                maskDiv.appendChild(p);
	            }
	            $('body').append(maskDiv);
	            setTimeout(function () {
	                that._hideMask(maskDiv);
	                // 回调
	                if (callback) {
	                    callback();
	                }
	            }, ts);
	            // 点击提示窗,隐藏提示窗并立刻执行回调函数
	            that.on('tap', function () {
	                that._hideMask();
	                if (callback) {
	                    callback();
	                }
	            });
	        }

	        // 微信客服

	    }, {
	        key: '_wechat',
	        value: function _wechat(options) {
	            var html = '<div class=\"m-alert-mask\"><div class=\"m-mask-content\"><div class=\"m-mask-img\"><img src="' + options.imgUrl + '" alt=""><p>' + options.message + '</p></div></div></div>';
	            $('body').append(html);
	            $('.m-alert-mask').on('tap', function () {
	                $('.m-alert-mask').remove();
	            });
	        }
	    }]);

	    return Popup;
	}();

	/**
	 * 弹窗，提示窗，遮罩等
	 * @param type 指定弹窗的类型， 分为tips：提示窗； alert:弹窗，需要确认； mask: 蒙层,二维码等
	 * @param hideTimes 消失时间
	 * @param message 提示消息
	 * @param callback 回调函数
	 * **/

	var pop = new Popup();
	$.pop = pop.init;

	function popup(options) {
	    return pop.init(options);
	}

	//# sourceMappingURL=popup.class.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _zepto = __webpack_require__(7);

	var _fastclick = __webpack_require__(8);

	var _lazyload = __webpack_require__(9);

	var _unit = __webpack_require__(2);

	!function (window, document) {
	    /**
	     * fixed zepto 点透bug
	     * **/
	    _fastclick.fclick.attach(document.body);

	    /**
	     * loading动画
	     */
	    function Loading() {}
	    Loading.prototype.start = function () {
	        $('.m-loading').show();
	        $('body').css("overflow", "hidden");
	    };
	    Loading.prototype.end = function () {
	        $('.m-loading').hide();
	        $('body').css("overflow", "auto");
	    };
	    var loading = new Loading();
	    $.loading = loading;

	    /**
	     * 获取语言
	     * **/
	    var languages = _unit.cookieUnit.getCookie('languages');
	    if (!languages) {
	        var nl = navigator.language;
	        _unit.cookieUnit.setCookie('languages', nl, 365);
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
	                callback: function callback() {
	                    window.location = jumpUrl;
	                }
	            });
	        });
	    };

	    /**
	     * 选择城市
	     * **/
	    $.ChooseListInit = function (btn, list, bool) {
	        var chooseBtn = _unit.getUnit.id(btn);

	        var chooseLst = _unit.getUnit.id(list);

	        if (chooseBtn && chooseLst) {
	            _unit.eventUnit.addListener(chooseBtn, 'tap', function () {
	                chooseLst.style.display = 'block';
	            });
	            _unit.eventUnit.addListener(chooseLst, 'tap', function (event) {
	                var ele = event.target || event.srcElement;
	                var dataJs = ele.getAttribute('data-js');
	                if (dataJs == 'J_GoBack') {
	                    chooseLst.style.display = 'none';
	                } else if (dataJs == 'J_ChooseItem') {
	                    var dataId = ele.getAttribute('data-id');
	                    if (bool) {
	                        var iner = ele.innerHTML;
	                        $('.J_Location').text(iner);
	                        _unit.cookieUnit.setCookie('cityId', ele.getAttribute('data-id'), 365);
	                        if (window.localStorage) {
	                            window.localStorage.setItem('cityName', escape(iner));
	                        } else {
	                            _unit.cookieUnit.setCookie('cityName', iner, 365);
	                        }
	                        history.go(-1) || (location.href = 'index.html');
	                    } else {
	                        chooseBtn.value = ele.innerHTML;
	                        chooseBtn.setAttribute('data-id', dataId);
	                        chooseLst.style.display = 'none';
	                    }
	                }
	                $(chooseBtn).parents('form').trigger('keyup');
	            });
	        } else {}
	    };

	    /**
	     * 切换switch
	     * **/
	    $.fn.toggleSwitch = function () {
	        var t = $(this);
	        $(this).on('click', function () {
	            if (t.hasClass('switch-open')) {
	                t.addClass('transition').removeClass('switch-open').attr('value', false);
	            } else {
	                t.addClass('transition').addClass('switch-open').attr('value', true);
	            }
	        });
	    };

	    /**
	     * 切换标签页
	     * **/
	    $.fn.toggleTab = function () {
	        var t = $(this),
	            target = t.find('.tab-contents'),
	            tw = target.width(),
	            title = t.find('.tab-buttons');

	        title.on('click', function (e) {
	            var ele = e.target,
	                i = $(ele).index();
	            if (ele == this) return;
	            toTab(i);
	        });

	        var toTab = function toTab(i) {
	            target.addClass('transition').css({
	                "-webkit-transform": "translate(" + -tw * i + "px,0)",
	                "transform": "translate(" + -tw * i + "px,0)"
	            });
	            toTitle(i);
	        };

	        var toTitle = function toTitle(i) {
	            if (title.length == 0) return;
	            title.children().toggleClass("active", false).eq(i).toggleClass("active", true);
	        };
	    };

	    /***
	     * 全选反选
	     * **/
	    $.fn.checkAll = function (opt) {
	        var t = this,
	            checkboxs = $('.' + opt.checkboxClassName);
	        t.on('tap', function () {
	            if ($(this).is(':checked')) {
	                checkboxs.each(function () {
	                    this.checked = true;
	                });
	            } else {
	                checkboxs.each(function () {
	                    this.checked = false;
	                });
	            }
	        });
	    };

	    /**
	     * 轮播
	     * **/
	    $.fn.carousel = function (opt) {
	        var t = $(this),
	            target = t.find('.carousel-lists'),
	            tw = target.width(),
	            length = target.children('.carousel-list').length,
	            ch = target.children('.carousel-list'),
	            img = t.find('.carousel-list img'),
	            dot = t.find('.carousel-dots'),
	            m = { initX: 0, initY: 0, startX: 0, endX: 0, startY: 0, canmove: false },
	            currentTab = 0;

	        var imgBrowser = function imgBrowser() {
	            target.on('tap', function () {
	                if (target.parent().hasClass('m-carousel-brower')) {
	                    target.parent().removeClass('m-carousel-brower');
	                    $('body').css("overflow", "auto");
	                } else {
	                    target.parent().addClass('m-carousel-brower');
	                    $('body').css("overflow", "hidden");
	                }
	            });
	        };

	        if (opt.imgBrower == true) {
	            imgBrowser();
	        }

	        var num = target.find('.carousel-list').length;
	        for (var j = 0; j < num; j++) {
	            if (j == 0) {
	                dot.append('<li class="carousel-dot active"></li>');
	            } else {
	                dot.append('<li class="carousel-dot"></li>');
	            }
	        }

	        var toTab = function toTab(i) {
	            move(-tw * i);
	            toDot(i);
	            currentTab = i;
	        };

	        var toDot = function toDot(i) {
	            if (dot.length == 0) return;
	            dot.children().toggleClass("active", false).eq(i).toggleClass("active", true);
	        };
	        var move = function move(dis) {
	            target.addClass('transition').css('margin-left', (m.endX = dis) + 'px');
	        };

	        t.on("touchstart", function (e) {
	            var et = e.touches[0];
	            if ($(et.target).closest(".carousel-lists").length != 0) {
	                m.canmove = true, m.initX = m.startX = et.pageX;

	                m.initY = et.pageY;
	            }
	        }).on("touchmove", function (e) {
	            var et = e.touches[0];

	            if (m.canmove && Math.abs(et.pageY - m.initY) / Math.abs(et.pageX - m.initX) < 0.6) {
	                m.endX += et.pageX - m.startX;
	                target.removeClass('transition').css('margin-left', m.endX + 'px');
	                m.startX = et.pageX;
	                e.preventDefault();
	            }
	        }).on('touchend', function (e) {
	            if (!m.canmove) return;
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
	        if (!url) {
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
	                success: function success(data) {
	                    data = JSON.parse(data);
	                    if (data.code == 200) {
	                        if (btn.hasClass('icon-love')) {
	                            btn.removeClass('icon-love').addClass('icon-love-green');
	                        } else {
	                            btn.removeClass('icon-love-green').addClass('icon-love');
	                        }
	                    } else {
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
	}(window, window.document);

	//# sourceMappingURL=common.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by xiangran.kong on 16/08/02.
	 */
	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	;(function (undefined) {
	    if (String.prototype.trim === undefined) // fix for iOS 3.2
	        String.prototype.trim = function () {
	            return this.replace(/^\s+|\s+$/g, '');
	        };

	    // For iOS 3.x
	    // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
	    if (Array.prototype.reduce === undefined) Array.prototype.reduce = function (fun) {
	        if (this === void 0 || this === null) throw new TypeError();
	        var t = Object(this),
	            len = t.length >>> 0,
	            k = 0,
	            accumulator;
	        if (typeof fun != 'function') throw new TypeError();
	        if (len == 0 && arguments.length == 1) throw new TypeError();

	        if (arguments.length >= 2) accumulator = arguments[1];else do {
	            if (k in t) {
	                accumulator = t[k++];
	                break;
	            }
	            if (++k >= len) throw new TypeError();
	        } while (true);

	        while (k < len) {
	            if (k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t);
	            k++;
	        }
	        return accumulator;
	    };
	})();

	var Zepto = function () {
	    var undefined,
	        key,
	        $,
	        classList,
	        emptyArray = [],
	        _slice = emptyArray.slice,
	        _filter = emptyArray.filter,
	        document = window.document,
	        elementDisplay = {},
	        classCache = {},
	        getComputedStyle = document.defaultView.getComputedStyle,
	        cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
	        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	        rootNodeRE = /^(?:body|html)$/i,


	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
	        adjacencyOperators = ['after', 'prepend', 'before', 'append'],
	        table = document.createElement('table'),
	        tableRow = document.createElement('tr'),
	        containers = {
	        'tr': document.createElement('tbody'),
	        'tbody': table, 'thead': table, 'tfoot': table,
	        'td': tableRow, 'th': tableRow,
	        '*': document.createElement('div')
	    },
	        readyRE = /complete|loaded|interactive/,
	        classSelectorRE = /^\.([\w-]+)$/,
	        idSelectorRE = /^#([\w-]*)$/,
	        tagSelectorRE = /^[\w-]+$/,
	        class2type = {},
	        toString = class2type.toString,
	        zepto = {},
	        camelize,
	        uniq,
	        tempParent = document.createElement('div');

	    zepto.matches = function (element, selector) {
	        if (!element || element.nodeType !== 1) return false;
	        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
	        if (matchesSelector) return matchesSelector.call(element, selector);
	        // fall back to performing a selector:
	        var match,
	            parent = element.parentNode,
	            temp = !parent;
	        if (temp) (parent = tempParent).appendChild(element);
	        match = ~zepto.qsa(parent, selector).indexOf(element);
	        temp && tempParent.removeChild(element);
	        return match;
	    };

	    function type(obj) {
	        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	    }

	    function isFunction(value) {
	        return type(value) == "function";
	    }
	    function isWindow(obj) {
	        return obj != null && obj == obj.window;
	    }
	    function isDocument(obj) {
	        return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
	    }
	    function isObject(obj) {
	        return type(obj) == "object";
	    }
	    function isPlainObject(obj) {
	        return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype;
	    }
	    function isArray(value) {
	        return value instanceof Array;
	    }
	    function likeArray(obj) {
	        return typeof obj.length == 'number';
	    }

	    function compact(array) {
	        return _filter.call(array, function (item) {
	            return item != null;
	        });
	    }
	    function flatten(array) {
	        return array.length > 0 ? $.fn.concat.apply([], array) : array;
	    }
	    camelize = function camelize(str) {
	        return str.replace(/-+(.)?/g, function (match, chr) {
	            return chr ? chr.toUpperCase() : '';
	        });
	    };
	    function dasherize(str) {
	        return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	    }
	    uniq = function uniq(array) {
	        return _filter.call(array, function (item, idx) {
	            return array.indexOf(item) == idx;
	        });
	    };

	    function classRE(name) {
	        return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
	    }

	    function maybeAddPx(name, value) {
	        return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
	    }

	    function defaultDisplay(nodeName) {
	        var element, display;
	        if (!elementDisplay[nodeName]) {
	            element = document.createElement(nodeName);
	            document.body.appendChild(element);
	            display = getComputedStyle(element, '').getPropertyValue("display");
	            element.parentNode.removeChild(element);
	            display == "none" && (display = "block");
	            elementDisplay[nodeName] = display;
	        }
	        return elementDisplay[nodeName];
	    }

	    function _children(element) {
	        return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
	            if (node.nodeType == 1) return node;
	        });
	    }

	    // `$.zepto.fragment` takes a html string and an optional tag name
	    // to generate DOM nodes nodes from the given html string.
	    // The generated DOM nodes are returned as an array.
	    // This function can be overriden in plugins for example to make
	    // it compatible with browsers that don't support the DOM fully.
	    zepto.fragment = function (html, name, properties) {
	        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
	        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
	        if (!(name in containers)) name = '*';

	        var nodes,
	            dom,
	            container = containers[name];
	        container.innerHTML = '' + html;
	        dom = $.each(_slice.call(container.childNodes), function () {
	            container.removeChild(this);
	        });
	        if (isPlainObject(properties)) {
	            nodes = $(dom);
	            $.each(properties, function (key, value) {
	                if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
	            });
	        }
	        return dom;
	    };

	    // `$.zepto.Z` swaps out the prototype of the given `dom` array
	    // of nodes with `$.fn` and thus supplying all the Zepto functions
	    // to the array. Note that `__proto__` is not supported on Internet
	    // Explorer. This method can be overriden in plugins.
	    zepto.Z = function (dom, selector) {
	        dom = dom || [];
	        dom.__proto__ = $.fn;
	        dom.selector = selector || '';
	        return dom;
	    };

	    // `$.zepto.isZ` should return `true` if the given object is a Zepto
	    // collection. This method can be overriden in plugins.
	    zepto.isZ = function (object) {
	        return object instanceof zepto.Z;
	    };

	    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	    // takes a CSS selector and an optional context (and handles various
	    // special cases).
	    // This method can be overriden in plugins.
	    zepto.init = function (selector, context) {
	        // If nothing given, return an empty Zepto collection
	        if (!selector) return zepto.Z();
	        // If a function is given, call it when the DOM is ready
	        else if (isFunction(selector)) return $(document).ready(selector);
	            // If a Zepto collection is given, juts return it
	            else if (zepto.isZ(selector)) return selector;else {
	                    var dom;
	                    // normalize array if an array of nodes is given
	                    if (isArray(selector)) dom = compact(selector);
	                    // Wrap DOM nodes. If a plain object is given, duplicate it.
	                    else if (isObject(selector)) dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null;
	                        // If it's a html fragment, create nodes from it
	                        else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
	                            // If there's a context, create a collection on that context first, and select
	                            // nodes from there
	                            else if (context !== undefined) return $(context).find(selector);
	                                // And last but no least, if it's a CSS selector, use it to select nodes.
	                                else dom = zepto.qsa(document, selector);
	                    // create a new Zepto collection from the nodes found
	                    return zepto.Z(dom, selector);
	                }
	    };

	    // `$` will be the base `Zepto` object. When calling this
	    // function just call `$.zepto.init, which makes the implementation
	    // details of selecting nodes and creating Zepto collections
	    // patchable in plugins.
	    $ = function $(selector, context) {
	        return zepto.init(selector, context);
	    };

	    function extend(target, source, deep) {
	        for (key in source) {
	            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	                if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
	                if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
	                extend(target[key], source[key], deep);
	            } else if (source[key] !== undefined) target[key] = source[key];
	        }
	    }

	    // Copy all but undefined properties from one or more
	    // objects to the `target` object.
	    $.extend = function (target) {
	        var deep,
	            args = _slice.call(arguments, 1);
	        if (typeof target == 'boolean') {
	            deep = target;
	            target = args.shift();
	        }
	        args.forEach(function (arg) {
	            extend(target, arg, deep);
	        });
	        return target;
	    };

	    // `$.zepto.qsa` is Zepto's CSS selector implementation which
	    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	    // This method can be overriden in plugins.
	    zepto.qsa = function (element, selector) {
	        var found;
	        return isDocument(element) && idSelectorRE.test(selector) ? (found = element.getElementById(RegExp.$1)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : _slice.call(classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) : element.querySelectorAll(selector));
	    };

	    function filtered(nodes, selector) {
	        return selector === undefined ? $(nodes) : $(nodes).filter(selector);
	    }

	    $.contains = function (parent, node) {
	        return parent !== node && parent.contains(node);
	    };

	    function funcArg(context, arg, idx, payload) {
	        return isFunction(arg) ? arg.call(context, idx, payload) : arg;
	    }

	    function setAttribute(node, name, value) {
	        value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
	    }

	    // access className property while respecting SVGAnimatedString
	    function className(node, value) {
	        var klass = node.className,
	            svg = klass && klass.baseVal !== undefined;

	        if (value === undefined) return svg ? klass.baseVal : klass;
	        svg ? klass.baseVal = value : node.className = value;
	    }

	    // "true"  => true
	    // "false" => false
	    // "null"  => null
	    // "42"    => 42
	    // "42.5"  => 42.5
	    // JSON    => parse if valid
	    // String  => self
	    function deserializeValue(value) {
	        var num;
	        try {
	            return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
	        } catch (e) {
	            return value;
	        }
	    }

	    $.type = type;
	    $.isFunction = isFunction;
	    $.isWindow = isWindow;
	    $.isArray = isArray;
	    $.isPlainObject = isPlainObject;

	    $.isEmptyObject = function (obj) {
	        var name;
	        for (name in obj) {
	            return false;
	        }return true;
	    };

	    $.inArray = function (elem, array, i) {
	        return emptyArray.indexOf.call(array, elem, i);
	    };

	    $.camelCase = camelize;
	    $.trim = function (str) {
	        return str.trim();
	    };

	    // plugin compatibility
	    $.uuid = 0;
	    $.support = {};
	    $.expr = {};

	    $.map = function (elements, callback) {
	        var value,
	            values = [],
	            i,
	            key;
	        if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
	            value = callback(elements[i], i);
	            if (value != null) values.push(value);
	        } else for (key in elements) {
	            value = callback(elements[key], key);
	            if (value != null) values.push(value);
	        }
	        return flatten(values);
	    };

	    $.each = function (elements, callback) {
	        var i, key;
	        if (likeArray(elements)) {
	            for (i = 0; i < elements.length; i++) {
	                if (callback.call(elements[i], i, elements[i]) === false) return elements;
	            }
	        } else {
	            for (key in elements) {
	                if (callback.call(elements[key], key, elements[key]) === false) return elements;
	            }
	        }

	        return elements;
	    };

	    $.grep = function (elements, callback) {
	        return _filter.call(elements, callback);
	    };

	    if (window.JSON) $.parseJSON = JSON.parse;

	    // Populate the class2type map
	    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
	        class2type["[object " + name + "]"] = name.toLowerCase();
	    });

	    // Define methods that will be available on all
	    // Zepto collections
	    $.fn = {
	        // Because a collection acts like an array
	        // copy over these useful array functions.
	        forEach: emptyArray.forEach,
	        reduce: emptyArray.reduce,
	        push: emptyArray.push,
	        sort: emptyArray.sort,
	        indexOf: emptyArray.indexOf,
	        concat: emptyArray.concat,

	        // `map` and `slice` in the jQuery API work differently
	        // from their array counterparts
	        map: function map(fn) {
	            return $($.map(this, function (el, i) {
	                return fn.call(el, i, el);
	            }));
	        },
	        slice: function slice() {
	            return $(_slice.apply(this, arguments));
	        },

	        ready: function ready(callback) {
	            if (readyRE.test(document.readyState)) callback($);else document.addEventListener('DOMContentLoaded', function () {
	                callback($);
	            }, false);
	            return this;
	        },
	        get: function get(idx) {
	            return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
	        },
	        toArray: function toArray() {
	            return this.get();
	        },
	        size: function size() {
	            return this.length;
	        },
	        remove: function remove() {
	            return this.each(function () {
	                if (this.parentNode != null) this.parentNode.removeChild(this);
	            });
	        },
	        each: function each(callback) {
	            emptyArray.every.call(this, function (el, idx) {
	                return callback.call(el, idx, el) !== false;
	            });
	            return this;
	        },
	        filter: function filter(selector) {
	            if (isFunction(selector)) return this.not(this.not(selector));
	            return $(_filter.call(this, function (element) {
	                return zepto.matches(element, selector);
	            }));
	        },
	        add: function add(selector, context) {
	            return $(uniq(this.concat($(selector, context))));
	        },
	        is: function is(selector) {
	            return this.length > 0 && zepto.matches(this[0], selector);
	        },
	        not: function not(selector) {
	            var nodes = [];
	            if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
	                if (!selector.call(this, idx)) nodes.push(this);
	            });else {
	                var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
	                this.forEach(function (el) {
	                    if (excludes.indexOf(el) < 0) nodes.push(el);
	                });
	            }
	            return $(nodes);
	        },
	        has: function has(selector) {
	            return this.filter(function () {
	                return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
	            });
	        },
	        eq: function eq(idx) {
	            return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
	        },
	        first: function first() {
	            var el = this[0];
	            return el && !isObject(el) ? el : $(el);
	        },
	        last: function last() {
	            var el = this[this.length - 1];
	            return el && !isObject(el) ? el : $(el);
	        },
	        find: function find(selector) {
	            var result,
	                $this = this;
	            if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') result = $(selector).filter(function () {
	                var node = this;
	                return emptyArray.some.call($this, function (parent) {
	                    return $.contains(parent, node);
	                });
	            });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
	                return zepto.qsa(this, selector);
	            });
	            return result;
	        },
	        closest: function closest(selector, context) {
	            var node = this[0],
	                collection = false;
	            if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') collection = $(selector);
	            while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
	                node = node !== context && !isDocument(node) && node.parentNode;
	            }return $(node);
	        },
	        parents: function parents(selector) {
	            var ancestors = [],
	                nodes = this;
	            while (nodes.length > 0) {
	                nodes = $.map(nodes, function (node) {
	                    if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	                        ancestors.push(node);
	                        return node;
	                    }
	                });
	            }return filtered(ancestors, selector);
	        },
	        parent: function parent(selector) {
	            return filtered(uniq(this.pluck('parentNode')), selector);
	        },
	        children: function children(selector) {
	            return filtered(this.map(function () {
	                return _children(this);
	            }), selector);
	        },
	        contents: function contents() {
	            return this.map(function () {
	                return _slice.call(this.childNodes);
	            });
	        },
	        siblings: function siblings(selector) {
	            return filtered(this.map(function (i, el) {
	                return _filter.call(_children(el.parentNode), function (child) {
	                    return child !== el;
	                });
	            }), selector);
	        },
	        empty: function empty() {
	            return this.each(function () {
	                this.innerHTML = '';
	            });
	        },
	        // `pluck` is borrowed from Prototype.js
	        pluck: function pluck(property) {
	            return $.map(this, function (el) {
	                return el[property];
	            });
	        },
	        show: function show() {
	            return this.each(function () {
	                this.style.display == "none" && (this.style.display = null);
	                if (getComputedStyle(this, '').getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
	            });
	        },
	        replaceWith: function replaceWith(newContent) {
	            return this.before(newContent).remove();
	        },
	        wrap: function wrap(structure) {
	            var func = isFunction(structure);
	            if (this[0] && !func) var dom = $(structure).get(0),
	                clone = dom.parentNode || this.length > 1;

	            return this.each(function (index) {
	                $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
	            });
	        },
	        wrapAll: function wrapAll(structure) {
	            if (this[0]) {
	                $(this[0]).before(structure = $(structure));
	                var children;
	                // drill down to the inmost element
	                while ((children = structure.children()).length) {
	                    structure = children.first();
	                }$(structure).append(this);
	            }
	            return this;
	        },
	        wrapInner: function wrapInner(structure) {
	            var func = isFunction(structure);
	            return this.each(function (index) {
	                var self = $(this),
	                    contents = self.contents(),
	                    dom = func ? structure.call(this, index) : structure;
	                contents.length ? contents.wrapAll(dom) : self.append(dom);
	            });
	        },
	        unwrap: function unwrap() {
	            this.parent().each(function () {
	                $(this).replaceWith($(this).children());
	            });
	            return this;
	        },
	        clone: function clone() {
	            return this.map(function () {
	                return this.cloneNode(true);
	            });
	        },
	        hide: function hide() {
	            return this.css("display", "none");
	        },
	        toggle: function toggle(setting) {
	            return this.each(function () {
	                var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
	            });
	        },
	        prev: function prev(selector) {
	            return $(this.pluck('previousElementSibling')).filter(selector || '*');
	        },
	        next: function next(selector) {
	            return $(this.pluck('nextElementSibling')).filter(selector || '*');
	        },
	        html: function html(_html) {
	            return _html === undefined ? this.length > 0 ? this[0].innerHTML : null : this.each(function (idx) {
	                var originHtml = this.innerHTML;
	                $(this).empty().append(funcArg(this, _html, idx, originHtml));
	            });
	        },
	        text: function text(_text) {
	            return _text === undefined ? this.length > 0 ? this[0].textContent : null : this.each(function () {
	                this.textContent = _text;
	            });
	        },
	        attr: function attr(name, value) {
	            var result;
	            return typeof name == 'string' && value === undefined ? this.length == 0 || this[0].nodeType !== 1 ? undefined : name == 'value' && this[0].nodeName == 'INPUT' ? this.val() : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
	                if (this.nodeType !== 1) return;
	                if (isObject(name)) for (key in name) {
	                    setAttribute(this, key, name[key]);
	                } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
	            });
	        },
	        removeAttr: function removeAttr(name) {
	            return this.each(function () {
	                this.nodeType === 1 && setAttribute(this, name);
	            });
	        },
	        prop: function prop(name, value) {
	            return value === undefined ? this[0] && this[0][name] : this.each(function (idx) {
	                this[name] = funcArg(this, value, idx, this[name]);
	            });
	        },
	        data: function data(name, value) {
	            var data = this.attr('data-' + dasherize(name), value);
	            return data !== null ? deserializeValue(data) : undefined;
	        },
	        val: function val(value) {
	            return value === undefined ? this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function (o) {
	                return this.selected;
	            }).pluck('value') : this[0].value) : this.each(function (idx) {
	                this.value = funcArg(this, value, idx, this.value);
	            });
	        },
	        offset: function offset(coordinates) {
	            if (coordinates) return this.each(function (index) {
	                var $this = $(this),
	                    coords = funcArg(this, coordinates, index, $this.offset()),
	                    parentOffset = $this.offsetParent().offset(),
	                    props = {
	                    top: coords.top - parentOffset.top,
	                    left: coords.left - parentOffset.left
	                };

	                if ($this.css('position') == 'static') props['position'] = 'relative';
	                $this.css(props);
	            });
	            if (this.length == 0) return null;
	            var obj = this[0].getBoundingClientRect();
	            return {
	                left: obj.left + window.pageXOffset,
	                top: obj.top + window.pageYOffset,
	                width: Math.round(obj.width),
	                height: Math.round(obj.height)
	            };
	        },
	        css: function css(property, value) {
	            if (arguments.length < 2 && typeof property == 'string') return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property));

	            var css = '';
	            if (type(property) == 'string') {
	                if (!value && value !== 0) this.each(function () {
	                    this.style.removeProperty(dasherize(property));
	                });else css = dasherize(property) + ":" + maybeAddPx(property, value);
	            } else {
	                for (key in property) {
	                    if (!property[key] && property[key] !== 0) this.each(function () {
	                        this.style.removeProperty(dasherize(key));
	                    });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
	                }
	            }

	            return this.each(function () {
	                this.style.cssText += ';' + css;
	            });
	        },
	        index: function index(element) {
	            return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
	        },
	        hasClass: function hasClass(name) {
	            return emptyArray.some.call(this, function (el) {
	                return this.test(className(el));
	            }, classRE(name));
	        },
	        addClass: function addClass(name) {
	            return this.each(function (idx) {
	                classList = [];
	                var cls = className(this),
	                    newName = funcArg(this, name, idx, cls);
	                newName.split(/\s+/g).forEach(function (klass) {
	                    if (!$(this).hasClass(klass)) classList.push(klass);
	                }, this);
	                classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
	            });
	        },
	        removeClass: function removeClass(name) {
	            return this.each(function (idx) {
	                if (name === undefined) return className(this, '');
	                classList = className(this);
	                funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
	                    classList = classList.replace(classRE(klass), " ");
	                });
	                className(this, classList.trim());
	            });
	        },
	        toggleClass: function toggleClass(name, when) {
	            return this.each(function (idx) {
	                var $this = $(this),
	                    names = funcArg(this, name, idx, className(this));
	                names.split(/\s+/g).forEach(function (klass) {
	                    (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
	                });
	            });
	        },
	        scrollTop: function scrollTop() {
	            if (!this.length) return;
	            return 'scrollTop' in this[0] ? this[0].scrollTop : this[0].scrollY;
	        },
	        position: function position() {
	            if (!this.length) return;

	            var elem = this[0],


	            // Get *real* offsetParent
	            offsetParent = this.offsetParent(),


	            // Get correct offsets
	            offset = this.offset(),
	                parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

	            // Subtract element margins
	            // note: when an element has margin: auto the offsetLeft and marginLeft
	            // are the same in Safari causing offset.left to incorrectly be 0
	            offset.top -= parseFloat($(elem).css('margin-top')) || 0;
	            offset.left -= parseFloat($(elem).css('margin-left')) || 0;

	            // Add offsetParent borders
	            parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
	            parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

	            // Subtract the two offsets
	            return {
	                top: offset.top - parentOffset.top,
	                left: offset.left - parentOffset.left
	            };
	        },
	        offsetParent: function offsetParent() {
	            return this.map(function () {
	                var parent = this.offsetParent || document.body;
	                while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
	                    parent = parent.offsetParent;
	                }return parent;
	            });
	        }
	    };

	    // for now
	    $.fn.detach = $.fn.remove

	    // Generate the `width` and `height` functions
	    ;['width', 'height'].forEach(function (dimension) {
	        $.fn[dimension] = function (value) {
	            var offset,
	                el = this[0],
	                Dimension = dimension.replace(/./, function (m) {
	                return m[0].toUpperCase();
	            });
	            if (value === undefined) return isWindow(el) ? el['inner' + Dimension] : isDocument(el) ? el.documentElement['offset' + Dimension] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
	                el = $(this);
	                el.css(dimension, funcArg(this, value, idx, el[dimension]()));
	            });
	        };
	    });

	    function traverseNode(node, fun) {
	        fun(node);
	        for (var key in node.childNodes) {
	            traverseNode(node.childNodes[key], fun);
	        }
	    }

	    // Generate the `after`, `prepend`, `before`, `append`,
	    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	    adjacencyOperators.forEach(function (operator, operatorIndex) {
	        var inside = operatorIndex % 2; //=> prepend, append

	        $.fn[operator] = function () {
	            // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	            var argType,
	                nodes = $.map(arguments, function (arg) {
	                argType = type(arg);
	                return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
	            }),
	                parent,
	                copyByClone = this.length > 1;
	            if (nodes.length < 1) return this;

	            return this.each(function (_, target) {
	                parent = inside ? target : target.parentNode;

	                // convert all methods to a "before" operation
	                target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;

	                nodes.forEach(function (node) {
	                    if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();

	                    traverseNode(parent.insertBefore(node, target), function (el) {
	                        if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) window['eval'].call(window, el.innerHTML);
	                    });
	                });
	            });
	        };

	        // after    => insertAfter
	        // prepend  => prependTo
	        // before   => insertBefore
	        // append   => appendTo
	        $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
	            $(html)[operator](this);
	            return this;
	        };
	    });

	    zepto.Z.prototype = $.fn;

	    // Export internal API functions in the `$.zepto` namespace
	    zepto.uniq = uniq;
	    zepto.deserializeValue = deserializeValue;
	    $.zepto = zepto;

	    return $;
	}();

	window.Zepto = Zepto;
	'$' in window || (window.$ = Zepto);(function ($) {
	    function detect(ua) {
	        var os = this.os = {},
	            browser = this.browser = {},
	            webkit = ua.match(/WebKit\/([\d.]+)/),
	            android = ua.match(/(Android)\s+([\d.]+)/),
	            ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	            iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	            webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
	            touchpad = webos && ua.match(/TouchPad/),
	            kindle = ua.match(/Kindle\/([\d.]+)/),
	            silk = ua.match(/Silk\/([\d._]+)/),
	            blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
	            bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
	            rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
	            playbook = ua.match(/PlayBook/),
	            chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
	            firefox = ua.match(/Firefox\/([\d.]+)/);

	        // Todo: clean this up with a better OS/browser seperation:
	        // - discern (more) between multiple browsers on android
	        // - decide if kindle fire in silk mode is android or not
	        // - Firefox on Android doesn't specify the Android version
	        // - possibly devide in os, device and browser hashes

	        if (browser.webkit = !!webkit) browser.version = webkit[1];

	        if (android) os.android = true, os.version = android[2];
	        if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
	        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
	        if (webos) os.webos = true, os.version = webos[2];
	        if (touchpad) os.touchpad = true;
	        if (blackberry) os.blackberry = true, os.version = blackberry[2];
	        if (bb10) os.bb10 = true, os.version = bb10[2];
	        if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
	        if (playbook) browser.playbook = true;
	        if (kindle) os.kindle = true, os.version = kindle[1];
	        if (silk) browser.silk = true, browser.version = silk[1];
	        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
	        if (chrome) browser.chrome = true, browser.version = chrome[1];
	        if (firefox) browser.firefox = true, browser.version = firefox[1];

	        os.tablet = !!(ipad || playbook || android && !ua.match(/Mobile/) || firefox && ua.match(/Tablet/));
	        os.phone = !!(!os.tablet && (android || iphone || webos || blackberry || bb10 || chrome && ua.match(/Android/) || chrome && ua.match(/CriOS\/([\d.]+)/) || firefox && ua.match(/Mobile/)));
	    }

	    detect.call($, navigator.userAgent);
	    // make available to unit tests
	    $.__detect = detect;
	})(Zepto);(function ($) {
	    var $$ = $.zepto.qsa,
	        handlers = {},
	        _zid = 1,
	        specialEvents = {},
	        hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

	    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

	    function zid(element) {
	        return element._zid || (element._zid = _zid++);
	    }
	    function findHandlers(element, event, fn, selector) {
	        event = parse(event);
	        if (event.ns) var matcher = matcherFor(event.ns);
	        return (handlers[zid(element)] || []).filter(function (handler) {
	            return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
	        });
	    }
	    function parse(event) {
	        var parts = ('' + event).split('.');
	        return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
	    }
	    function matcherFor(ns) {
	        return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
	    }

	    function eachEvent(events, fn, iterator) {
	        if ($.type(events) != "string") $.each(events, iterator);else events.split(/\s/).forEach(function (type) {
	            iterator(type, fn);
	        });
	    }

	    function eventCapture(handler, captureSetting) {
	        return handler.del && (handler.e == 'focus' || handler.e == 'blur') || !!captureSetting;
	    }

	    function realEvent(type) {
	        return hover[type] || type;
	    }

	    function add(element, events, fn, selector, getDelegate, capture) {
	        var id = zid(element),
	            set = handlers[id] || (handlers[id] = []);
	        eachEvent(events, fn, function (event, fn) {
	            var handler = parse(event);
	            handler.fn = fn;
	            handler.sel = selector;
	            // emulate mouseenter, mouseleave
	            if (handler.e in hover) fn = function fn(e) {
	                var related = e.relatedTarget;
	                if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
	            };
	            handler.del = getDelegate && getDelegate(fn, event);
	            var callback = handler.del || fn;
	            handler.proxy = function (e) {
	                var result = callback.apply(element, [e].concat(e.data));
	                if (result === false) e.preventDefault(), e.stopPropagation();
	                return result;
	            };
	            handler.i = set.length;
	            set.push(handler);
	            element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	        });
	    }
	    function remove(element, events, fn, selector, capture) {
	        var id = zid(element);
	        eachEvent(events || '', fn, function (event, fn) {
	            findHandlers(element, event, fn, selector).forEach(function (handler) {
	                delete handlers[id][handler.i];
	                element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	            });
	        });
	    }

	    $.event = { add: add, remove: remove };

	    $.proxy = function (fn, context) {
	        if ($.isFunction(fn)) {
	            var proxyFn = function proxyFn() {
	                return fn.apply(context, arguments);
	            };
	            proxyFn._zid = zid(fn);
	            return proxyFn;
	        } else if (typeof context == 'string') {
	            return $.proxy(fn[context], fn);
	        } else {
	            throw new TypeError("expected function");
	        }
	    };

	    $.fn.bind = function (event, callback) {
	        return this.each(function () {
	            add(this, event, callback);
	        });
	    };
	    $.fn.unbind = function (event, callback) {
	        return this.each(function () {
	            remove(this, event, callback);
	        });
	    };
	    $.fn.one = function (event, callback) {
	        return this.each(function (i, element) {
	            add(this, event, callback, null, function (fn, type) {
	                return function () {
	                    var result = fn.apply(element, arguments);
	                    remove(element, type, fn);
	                    return result;
	                };
	            });
	        });
	    };

	    var returnTrue = function returnTrue() {
	        return true;
	    },
	        returnFalse = function returnFalse() {
	        return false;
	    },
	        ignoreProperties = /^([A-Z]|layer[XY]$)/,
	        eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	    };
	    function createProxy(event) {
	        var key,
	            proxy = { originalEvent: event };
	        for (key in event) {
	            if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
	        }$.each(eventMethods, function (name, predicate) {
	            proxy[name] = function () {
	                this[predicate] = returnTrue;
	                return event[name].apply(event, arguments);
	            };
	            proxy[predicate] = returnFalse;
	        });
	        return proxy;
	    }

	    // emulates the 'defaultPrevented' property for browsers that have none
	    function fix(event) {
	        if (!('defaultPrevented' in event)) {
	            event.defaultPrevented = false;
	            var prevent = event.preventDefault;
	            event.preventDefault = function () {
	                this.defaultPrevented = true;
	                prevent.call(this);
	            };
	        }
	    }

	    $.fn.delegate = function (selector, event, callback) {
	        return this.each(function (i, element) {
	            add(element, event, callback, selector, function (fn) {
	                return function (e) {
	                    var evt,
	                        match = $(e.target).closest(selector, element).get(0);
	                    if (match) {
	                        evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
	                        return fn.apply(match, [evt].concat([].slice.call(arguments, 1)));
	                    }
	                };
	            });
	        });
	    };
	    $.fn.undelegate = function (selector, event, callback) {
	        return this.each(function () {
	            remove(this, event, callback, selector);
	        });
	    };

	    $.fn.live = function (event, callback) {
	        $(document.body).delegate(this.selector, event, callback);
	        return this;
	    };
	    $.fn.die = function (event, callback) {
	        $(document.body).undelegate(this.selector, event, callback);
	        return this;
	    };

	    $.fn.on = function (event, selector, callback) {
	        return !selector || $.isFunction(selector) ? this.bind(event, selector || callback) : this.delegate(selector, event, callback);
	    };
	    $.fn.off = function (event, selector, callback) {
	        return !selector || $.isFunction(selector) ? this.unbind(event, selector || callback) : this.undelegate(selector, event, callback);
	    };

	    $.fn.trigger = function (event, data) {
	        if (typeof event == 'string' || $.isPlainObject(event)) event = $.Event(event);
	        fix(event);
	        event.data = data;
	        return this.each(function () {
	            // items in the collection might not be DOM elements
	            // (todo: possibly support events on plain old objects)
	            if ('dispatchEvent' in this) this.dispatchEvent(event);
	        });
	    };

	    // triggers event handlers on current element just as if an event occurred,
	    // doesn't trigger an actual event, doesn't bubble
	    $.fn.triggerHandler = function (event, data) {
	        var e, result;
	        this.each(function (i, element) {
	            e = createProxy(typeof event == 'string' ? $.Event(event) : event);
	            e.data = data;
	            e.target = element;
	            $.each(findHandlers(element, event.type || event), function (i, handler) {
	                result = handler.proxy(e);
	                if (e.isImmediatePropagationStopped()) return false;
	            });
	        });
	        return result;
	    }

	    // shortcut methods for `.bind(event, fn)` for each event type
	    ;('focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error').split(' ').forEach(function (event) {
	        $.fn[event] = function (callback) {
	            return callback ? this.bind(event, callback) : this.trigger(event);
	        };
	    });['focus', 'blur'].forEach(function (name) {
	        $.fn[name] = function (callback) {
	            if (callback) this.bind(name, callback);else this.each(function () {
	                try {
	                    this[name]();
	                } catch (e) {}
	            });
	            return this;
	        };
	    });

	    $.Event = function (type, props) {
	        if (typeof type != 'string') props = type, type = props.type;
	        var event = document.createEvent(specialEvents[type] || 'Events'),
	            bubbles = true;
	        if (props) for (var name in props) {
	            name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
	        }event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null);
	        event.isDefaultPrevented = function () {
	            return this.defaultPrevented;
	        };
	        return event;
	    };
	})(Zepto);(function ($) {
	    var jsonpID = 0,
	        document = window.document,
	        key,
	        name,
	        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	        scriptTypeRE = /^(?:text|application)\/javascript/i,
	        xmlTypeRE = /^(?:text|application)\/xml/i,
	        jsonType = 'application/json',
	        htmlType = 'text/html',
	        blankRE = /^\s*$/;

	    // trigger a custom event and return false if it was cancelled
	    function triggerAndReturn(context, eventName, data) {
	        var event = $.Event(eventName);
	        $(context).trigger(event, data);
	        return !event.defaultPrevented;
	    }

	    // trigger an Ajax "global" event
	    function triggerGlobal(settings, context, eventName, data) {
	        if (settings.global) return triggerAndReturn(context || document, eventName, data);
	    }

	    // Number of active Ajax requests
	    $.active = 0;

	    function ajaxStart(settings) {
	        if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
	    }
	    function ajaxStop(settings) {
	        if (settings.global && ! --$.active) triggerGlobal(settings, null, 'ajaxStop');
	    }

	    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	    function ajaxBeforeSend(xhr, settings) {
	        var context = settings.context;
	        if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

	        triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
	    }
	    function ajaxSuccess(data, xhr, settings) {
	        var context = settings.context,
	            status = 'success';
	        settings.success.call(context, data, status, xhr);
	        triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
	        ajaxComplete(status, xhr, settings);
	    }
	    // type: "timeout", "error", "abort", "parsererror"
	    function ajaxError(error, type, xhr, settings) {
	        var context = settings.context;
	        settings.error.call(context, xhr, type, error);
	        triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error]);
	        ajaxComplete(type, xhr, settings);
	    }
	    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	    function ajaxComplete(status, xhr, settings) {
	        var context = settings.context;
	        settings.complete.call(context, xhr, status);
	        triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
	        ajaxStop(settings);
	    }

	    // Empty function, used as default callback
	    function empty() {}

	    $.ajaxJSONP = function (options) {
	        if (!('type' in options)) return $.ajax(options);

	        var callbackName = 'jsonp' + ++jsonpID,
	            script = document.createElement('script'),
	            cleanup = function cleanup() {
	            clearTimeout(abortTimeout);
	            $(script).remove();
	            delete window[callbackName];
	        },
	            abort = function abort(type) {
	            cleanup();
	            // In case of manual abort or timeout, keep an empty function as callback
	            // so that the SCRIPT tag that eventually loads won't result in an error.
	            if (!type || type == 'timeout') window[callbackName] = empty;
	            ajaxError(null, type || 'abort', xhr, options);
	        },
	            xhr = { abort: abort },
	            abortTimeout;

	        if (ajaxBeforeSend(xhr, options) === false) {
	            abort('abort');
	            return false;
	        }

	        window[callbackName] = function (data) {
	            cleanup();
	            ajaxSuccess(data, xhr, options);
	        };

	        script.onerror = function () {
	            abort('error');
	        };

	        script.src = options.url.replace(/=\?/, '=' + callbackName);
	        $('head').append(script);

	        if (options.timeout > 0) abortTimeout = setTimeout(function () {
	            abort('timeout');
	        }, options.timeout);

	        return xhr;
	    };

	    $.ajaxSettings = {
	        // Default type of request
	        type: 'GET',
	        // Callback that is executed before request
	        beforeSend: empty,
	        // Callback that is executed if the request succeeds
	        success: empty,
	        // Callback that is executed the the server drops error
	        error: empty,
	        // Callback that is executed on request complete (both: error and success)
	        complete: empty,
	        // The context for the callbacks
	        context: null,
	        // Whether to trigger "global" Ajax events
	        global: true,
	        // Transport
	        xhr: function xhr() {
	            return new window.XMLHttpRequest();
	        },
	        // MIME types mapping
	        accepts: {
	            script: 'text/javascript, application/javascript',
	            json: jsonType,
	            xml: 'application/xml, text/xml',
	            html: htmlType,
	            text: 'text/plain'
	        },
	        // Whether the request is to another domain
	        crossDomain: false,
	        // Default timeout
	        timeout: 0,
	        // Whether data should be serialized to string
	        processData: true,
	        // Whether the browser should be allowed to cache GET responses
	        cache: true
	    };

	    function mimeToDataType(mime) {
	        if (mime) mime = mime.split(';', 2)[0];
	        return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
	    }

	    function appendQuery(url, query) {
	        return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	    }

	    // serialize payload and append it to the URL for GET requests
	    function serializeData(options) {
	        if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
	        if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data);
	    }

	    $.ajax = function (options) {
	        var settings = $.extend({}, options || {});
	        for (key in $.ajaxSettings) {
	            if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
	        }ajaxStart(settings);

	        if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host;

	        if (!settings.url) settings.url = window.location.toString();
	        serializeData(settings);
	        if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now());

	        var dataType = settings.dataType,
	            hasPlaceholder = /=\?/.test(settings.url);
	        if (dataType == 'jsonp' || hasPlaceholder) {
	            if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?');
	            return $.ajaxJSONP(settings);
	        }

	        var mime = settings.accepts[dataType],
	            baseHeaders = {},
	            protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	            xhr = settings.xhr(),
	            abortTimeout;

	        if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest';
	        if (mime) {
	            baseHeaders['Accept'] = mime;
	            if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
	            xhr.overrideMimeType && xhr.overrideMimeType(mime);
	        }
	        if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') baseHeaders['Content-Type'] = settings.contentType || 'application/x-www-form-urlencoded';
	        settings.headers = $.extend(baseHeaders, settings.headers || {});

	        xhr.onreadystatechange = function () {
	            if (xhr.readyState == 4) {
	                xhr.onreadystatechange = empty;
	                clearTimeout(abortTimeout);
	                var result,
	                    error = false;
	                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
	                    dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'));
	                    result = xhr.responseText;

	                    try {
	                        // http://perfectionkills.com/global-eval-what-are-the-options/
	                        if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
	                    } catch (e) {
	                        error = e;
	                    }

	                    if (error) ajaxError(error, 'parsererror', xhr, settings);else ajaxSuccess(result, xhr, settings);
	                } else {
	                    ajaxError(null, xhr.status ? 'error' : 'abort', xhr, settings);
	                }
	            }
	        };

	        var async = 'async' in settings ? settings.async : true;
	        xhr.open(settings.type, settings.url, async);

	        for (name in settings.headers) {
	            xhr.setRequestHeader(name, settings.headers[name]);
	        }if (ajaxBeforeSend(xhr, settings) === false) {
	            xhr.abort();
	            return false;
	        }

	        if (settings.timeout > 0) abortTimeout = setTimeout(function () {
	            xhr.onreadystatechange = empty;
	            xhr.abort();
	            ajaxError(null, 'timeout', xhr, settings);
	        }, settings.timeout);

	        // avoid sending empty string (#319)
	        xhr.send(settings.data ? settings.data : null);
	        return xhr;
	    };

	    // handle optional data/success arguments
	    function parseArguments(url, data, success, dataType) {
	        var hasData = !$.isFunction(data);
	        return {
	            url: url,
	            data: hasData ? data : undefined,
	            success: !hasData ? data : $.isFunction(success) ? success : undefined,
	            dataType: hasData ? dataType || success : success
	        };
	    }

	    $.get = function (url, data, success, dataType) {
	        return $.ajax(parseArguments.apply(null, arguments));
	    };

	    $.post = function (url, data, success, dataType) {
	        var options = parseArguments.apply(null, arguments);
	        options.type = 'POST';
	        return $.ajax(options);
	    };

	    $.getJSON = function (url, data, success) {
	        var options = parseArguments.apply(null, arguments);
	        options.dataType = 'json';
	        return $.ajax(options);
	    };

	    $.fn.load = function (url, data, success) {
	        if (!this.length) return this;
	        var self = this,
	            parts = url.split(/\s/),
	            selector,
	            options = parseArguments(url, data, success),
	            callback = options.success;
	        if (parts.length > 1) options.url = parts[0], selector = parts[1];
	        options.success = function (response) {
	            self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
	            callback && callback.apply(self, arguments);
	        };
	        $.ajax(options);
	        return this;
	    };

	    var escape = encodeURIComponent;

	    function serialize(params, obj, traditional, scope) {
	        var type,
	            array = $.isArray(obj);
	        $.each(obj, function (key, value) {
	            type = $.type(value);
	            if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']';
	            // handle data in serializeArray() format
	            if (!scope && array) params.add(value.name, value.value);
	            // recurse into nested objects
	            else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
	        });
	    }

	    $.param = function (obj, traditional) {
	        var params = [];
	        params.add = function (k, v) {
	            this.push(escape(k) + '=' + escape(v));
	        };
	        serialize(params, obj, traditional);
	        return params.join('&').replace(/%20/g, '+');
	    };
	})(Zepto);(function ($) {
	    $.fn.serializeArray = function () {
	        var result = [],
	            el;
	        $(Array.prototype.slice.call(this.get(0).elements)).each(function () {
	            el = $(this);
	            var type = el.attr('type');
	            if (this.nodeName.toLowerCase() != 'fieldset' && !this.disabled && type != 'submit' && type != 'reset' && type != 'button' && (type != 'radio' && type != 'checkbox' || this.checked)) result.push({
	                name: el.attr('name'),
	                value: el.val()
	            });
	        });
	        return result;
	    };

	    $.fn.serialize = function () {
	        var result = [];
	        this.serializeArray().forEach(function (elm) {
	            result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
	        });
	        return result.join('&');
	    };

	    $.fn.submit = function (callback) {
	        if (callback) this.bind('submit', callback);else if (this.length) {
	            var event = $.Event('submit');
	            this.eq(0).trigger(event);
	            if (!event.defaultPrevented) this.get(0).submit();
	        }
	        return this;
	    };
	})(Zepto);(function ($, undefined) {
	    var prefix = '',
	        eventPrefix,
	        endEventName,
	        endAnimationName,
	        vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
	        document = window.document,
	        testEl = document.createElement('div'),
	        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
	        transform,
	        transitionProperty,
	        transitionDuration,
	        transitionTiming,
	        animationName,
	        animationDuration,
	        animationTiming,
	        cssReset = {};

	    function dasherize(str) {
	        return downcase(str.replace(/([a-z])([A-Z])/, '$1-$2'));
	    }
	    function downcase(str) {
	        return str.toLowerCase();
	    }
	    function normalizeEvent(name) {
	        return eventPrefix ? eventPrefix + name : downcase(name);
	    }

	    $.each(vendors, function (vendor, event) {
	        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
	            prefix = '-' + downcase(vendor) + '-';
	            eventPrefix = event;
	            return false;
	        }
	    });

	    transform = prefix + 'transform';
	    cssReset[transitionProperty = prefix + 'transition-property'] = cssReset[transitionDuration = prefix + 'transition-duration'] = cssReset[transitionTiming = prefix + 'transition-timing-function'] = cssReset[animationName = prefix + 'animation-name'] = cssReset[animationDuration = prefix + 'animation-duration'] = cssReset[animationTiming = prefix + 'animation-timing-function'] = '';

	    $.fx = {
	        off: eventPrefix === undefined && testEl.style.transitionProperty === undefined,
	        speeds: { _default: 400, fast: 200, slow: 600 },
	        cssPrefix: prefix,
	        transitionEnd: normalizeEvent('TransitionEnd'),
	        animationEnd: normalizeEvent('AnimationEnd')
	    };

	    $.fn.animate = function (properties, duration, ease, callback) {
	        if ($.isPlainObject(duration)) ease = duration.easing, callback = duration.complete, duration = duration.duration;
	        if (duration) duration = (typeof duration == 'number' ? duration : $.fx.speeds[duration] || $.fx.speeds._default) / 1000;
	        return this.anim(properties, duration, ease, callback);
	    };

	    $.fn.anim = function (properties, duration, ease, callback) {
	        var key,
	            cssValues = {},
	            cssProperties,
	            transforms = '',
	            that = this,
	            _wrappedCallback,
	            endEvent = $.fx.transitionEnd;

	        if (duration === undefined) duration = 0.4;
	        if ($.fx.off) duration = 0;

	        if (typeof properties == 'string') {
	            // keyframe animation
	            cssValues[animationName] = properties;
	            cssValues[animationDuration] = duration + 's';
	            cssValues[animationTiming] = ease || 'linear';
	            endEvent = $.fx.animationEnd;
	        } else {
	            cssProperties = [];
	            // CSS transitions
	            for (key in properties) {
	                if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') ';else cssValues[key] = properties[key], cssProperties.push(dasherize(key));
	            }if (transforms) cssValues[transform] = transforms, cssProperties.push(transform);
	            if (duration > 0 && (typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object') {
	                cssValues[transitionProperty] = cssProperties.join(', ');
	                cssValues[transitionDuration] = duration + 's';
	                cssValues[transitionTiming] = ease || 'linear';
	            }
	        }

	        _wrappedCallback = function wrappedCallback(event) {
	            if (typeof event !== 'undefined') {
	                if (event.target !== event.currentTarget) return; // makes sure the event didn't bubble from "below"
	                $(event.target).unbind(endEvent, _wrappedCallback);
	            }
	            $(this).css(cssReset);
	            callback && callback.call(this);
	        };
	        if (duration > 0) this.bind(endEvent, _wrappedCallback);

	        // trigger page reflow so new elements can animate
	        this.size() && this.get(0).clientLeft;

	        this.css(cssValues);

	        if (duration <= 0) setTimeout(function () {
	            that.each(function () {
	                _wrappedCallback.call(this);
	            });
	        }, 0);

	        return this;
	    };

	    testEl = null;
	})(Zepto);(function ($, undefined) {
	    var document = window.document,
	        docElem = document.documentElement,
	        origShow = $.fn.show,
	        origHide = $.fn.hide,
	        origToggle = $.fn.toggle;

	    function anim(el, speed, opacity, scale, callback) {
	        if (typeof speed == 'function' && !callback) callback = speed, speed = undefined;
	        var props = { opacity: opacity };
	        if (scale) {
	            props.scale = scale;
	            el.css($.fx.cssPrefix + 'transform-origin', '0 0');
	        }
	        return el.animate(props, speed, null, callback);
	    }

	    function hide(el, speed, scale, callback) {
	        return anim(el, speed, 0, scale, function () {
	            origHide.call($(this));
	            callback && callback.call(this);
	        });
	    }

	    $.fn.show = function (speed, callback) {
	        origShow.call(this);
	        if (speed === undefined) speed = 0;else this.css('opacity', 0);
	        return anim(this, speed, 1, '1,1', callback);
	    };

	    $.fn.hide = function (speed, callback) {
	        if (speed === undefined) return origHide.call(this);else return hide(this, speed, '0,0', callback);
	    };

	    $.fn.toggle = function (speed, callback) {
	        if (speed === undefined || typeof speed == 'boolean') return origToggle.call(this, speed);else return this.each(function () {
	            var el = $(this);
	            el[el.css('display') == 'none' ? 'show' : 'hide'](speed, callback);
	        });
	    };

	    $.fn.fadeTo = function (speed, opacity, callback) {
	        return anim(this, speed, opacity, null, callback);
	    };

	    $.fn.fadeIn = function (speed, callback) {
	        var target = this.css('opacity');
	        if (target > 0) this.css('opacity', 0);else target = 1;
	        return origShow.call(this).fadeTo(speed, target, callback);
	    };

	    $.fn.fadeOut = function (speed, callback) {
	        return hide(this, speed, null, callback);
	    };

	    $.fn.fadeToggle = function (speed, callback) {
	        return this.each(function () {
	            var el = $(this);
	            el[el.css('opacity') == 0 || el.css('display') == 'none' ? 'fadeIn' : 'fadeOut'](speed, callback);
	        });
	    };
	})(Zepto);(function ($) {
	    var data = {},
	        dataAttr = $.fn.data,
	        camelize = $.camelCase,
	        exp = $.expando = 'Zepto' + +new Date();

	    // Get value from node:
	    // 1. first try key as given,
	    // 2. then try camelized key,
	    // 3. fall back to reading "data-*" attribute.
	    function getData(node, name) {
	        var id = node[exp],
	            store = id && data[id];
	        if (name === undefined) return store || setData(node);else {
	            if (store) {
	                if (name in store) return store[name];
	                var camelName = camelize(name);
	                if (camelName in store) return store[camelName];
	            }
	            return dataAttr.call($(node), name);
	        }
	    }

	    // Store value under camelized key on node
	    function setData(node, name, value) {
	        var id = node[exp] || (node[exp] = ++$.uuid),
	            store = data[id] || (data[id] = attributeData(node));
	        if (name !== undefined) store[camelize(name)] = value;
	        return store;
	    }

	    // Read all "data-*" attributes from a node
	    function attributeData(node) {
	        var store = {};
	        $.each(node.attributes, function (i, attr) {
	            if (attr.name.indexOf('data-') == 0) store[camelize(attr.name.replace('data-', ''))] = $.zepto.deserializeValue(attr.value);
	        });
	        return store;
	    }

	    $.fn.data = function (name, value) {
	        return value === undefined ?
	        // set multiple values via object
	        $.isPlainObject(name) ? this.each(function (i, node) {
	            $.each(name, function (key, value) {
	                setData(node, key, value);
	            });
	        }) :
	        // get value from first element
	        this.length == 0 ? undefined : getData(this[0], name) :
	        // set value on all elements
	        this.each(function () {
	            setData(this, name, value);
	        });
	    };

	    $.fn.removeData = function (names) {
	        if (typeof names == 'string') names = names.split(/\s+/);
	        return this.each(function () {
	            var id = this[exp],
	                store = id && data[id];
	            if (store) $.each(names, function () {
	                delete store[camelize(this)];
	            });
	        });
	    };
	})(Zepto);(function ($) {
	    var cache = [],
	        timeout;

	    $.fn.remove = function () {
	        return this.each(function () {
	            if (this.parentNode) {
	                if (this.tagName === 'IMG') {
	                    cache.push(this);
	                    this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	                    if (timeout) clearTimeout(timeout);
	                    timeout = setTimeout(function () {
	                        cache = [];
	                    }, 60000);
	                }
	                this.parentNode.removeChild(this);
	            }
	        });
	    };
	})(Zepto);(function ($) {
	    var zepto = $.zepto,
	        oldQsa = zepto.qsa,
	        oldMatches = zepto.matches;

	    function _visible(elem) {
	        elem = $(elem);
	        return !!(elem.width() || elem.height()) && elem.css("display") !== "none";
	    }

	    // Implements a subset from:
	    // http://api.jquery.com/category/selectors/jquery-selector-extensions/
	    //
	    // Each filter function receives the current index, all nodes in the
	    // considered set, and a value if there were parentheses. The value
	    // of `this` is the node currently being considered. The function returns the
	    // resulting node(s), null, or undefined.
	    //
	    // Complex selectors are not supported:
	    //   li:has(label:contains("foo")) + li:has(label:contains("bar"))
	    //   ul.inner:first > li
	    var filters = $.expr[':'] = {
	        visible: function visible() {
	            if (_visible(this)) return this;
	        },
	        hidden: function hidden() {
	            if (!_visible(this)) return this;
	        },
	        selected: function selected() {
	            if (this.selected) return this;
	        },
	        checked: function checked() {
	            if (this.checked) return this;
	        },
	        parent: function parent() {
	            return this.parentNode;
	        },
	        first: function first(idx) {
	            if (idx === 0) return this;
	        },
	        last: function last(idx, nodes) {
	            if (idx === nodes.length - 1) return this;
	        },
	        eq: function eq(idx, _, value) {
	            if (idx === value) return this;
	        },
	        contains: function contains(idx, _, text) {
	            if ($(this).text().indexOf(text) > -1) return this;
	        },
	        has: function has(idx, _, sel) {
	            if (zepto.qsa(this, sel).length) return this;
	        }
	    };

	    var filterRe = new RegExp('(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*'),
	        childRe = /^\s*>/,
	        classTag = 'Zepto' + +new Date();

	    function process(sel, fn) {
	        // quote the hash in `a[href^=#]` expression
	        sel = sel.replace(/=#\]/g, '="#"]');
	        var filter,
	            arg,
	            match = filterRe.exec(sel);
	        if (match && match[2] in filters) {
	            filter = filters[match[2]], arg = match[3];
	            sel = match[1];
	            if (arg) {
	                var num = Number(arg);
	                if (isNaN(num)) arg = arg.replace(/^["']|["']$/g, '');else arg = num;
	            }
	        }
	        return fn(sel, filter, arg);
	    }

	    zepto.qsa = function (node, selector) {
	        return process(selector, function (sel, filter, arg) {
	            try {
	                var taggedParent;
	                if (!sel && filter) sel = '*';else if (childRe.test(sel))
	                    // support "> *" child queries by tagging the parent node with a
	                    // unique class and prepending that classname onto the selector
	                    taggedParent = $(node).addClass(classTag), sel = '.' + classTag + ' ' + sel;

	                var nodes = oldQsa(node, sel);
	            } catch (e) {
	                console.error('error performing selector: %o', selector);
	                throw e;
	            } finally {
	                if (taggedParent) taggedParent.removeClass(classTag);
	            }
	            return !filter ? nodes : zepto.uniq($.map(nodes, function (n, i) {
	                return filter.call(n, i, nodes, arg);
	            }));
	        });
	    };

	    zepto.matches = function (node, selector) {
	        return process(selector, function (sel, filter, arg) {
	            return (!sel || oldMatches(node, sel)) && (!filter || filter.call(node, null, arg) === node);
	        });
	    };
	})(Zepto);(function ($) {
	    var touch = {},
	        touchTimeout,
	        tapTimeout,
	        swipeTimeout,
	        longTapDelay = 750,
	        longTapTimeout;

	    function parentIfText(node) {
	        return 'tagName' in node ? node : node.parentNode;
	    }

	    function swipeDirection(x1, x2, y1, y2) {
	        var xDelta = Math.abs(x1 - x2),
	            yDelta = Math.abs(y1 - y2);
	        return xDelta >= yDelta ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
	    }

	    function longTap() {
	        longTapTimeout = null;
	        if (touch.last) {
	            touch.el.trigger('longTap');
	            touch = {};
	        }
	    }

	    function cancelLongTap() {
	        if (longTapTimeout) clearTimeout(longTapTimeout);
	        longTapTimeout = null;
	    }

	    function cancelAll() {
	        if (touchTimeout) clearTimeout(touchTimeout);
	        if (tapTimeout) clearTimeout(tapTimeout);
	        if (swipeTimeout) clearTimeout(swipeTimeout);
	        if (longTapTimeout) clearTimeout(longTapTimeout);
	        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
	        touch = {};
	    }

	    $(document).ready(function () {
	        var now, delta;

	        $(document.body).bind('touchstart', function (e) {
	            now = Date.now();
	            delta = now - (touch.last || now);
	            touch.el = $(parentIfText(e.touches[0].target));
	            touchTimeout && clearTimeout(touchTimeout);
	            touch.x1 = e.touches[0].pageX;
	            touch.y1 = e.touches[0].pageY;
	            if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
	            touch.last = now;
	            longTapTimeout = setTimeout(longTap, longTapDelay);
	        }).bind('touchmove', function (e) {
	            cancelLongTap();
	            touch.x2 = e.touches[0].pageX;
	            touch.y2 = e.touches[0].pageY;
	            if (Math.abs(touch.x1 - touch.x2) > 10) e.preventDefault();
	        }).bind('touchend', function (e) {
	            cancelLongTap();

	            // swipe
	            if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) swipeTimeout = setTimeout(function () {
	                touch.el.trigger('swipe');
	                touch.el.trigger('swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
	                touch = {};
	            }, 0);

	            // normal tap
	            else if ('last' in touch)

	                    // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	                    // ('tap' fires before 'scroll')
	                    tapTimeout = setTimeout(function () {

	                        // trigger universal 'tap' with the option to cancelTouch()
	                        // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	                        var event = $.Event('tap');
	                        event.cancelTouch = cancelAll;
	                        touch.el.trigger(event);

	                        // trigger double tap immediately
	                        if (touch.isDoubleTap) {
	                            touch.el.trigger('doubleTap');
	                            touch = {};
	                        }

	                        // trigger single tap after 250ms of inactivity
	                        else {
	                                touchTimeout = setTimeout(function () {
	                                    touchTimeout = null;
	                                    touch.el.trigger('singleTap');
	                                    touch = {};
	                                }, 250);
	                            }
	                    }, 0);
	        }).bind('touchcancel', cancelAll);

	        $(window).bind('scroll', cancelAll);
	    });['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function (m) {
	        $.fn[m] = function (callback) {
	            return this.bind(m, callback);
	        };
	    });
	})(Zepto);

	exports.Zepto = Zepto;

	//# sourceMappingURL=zepto.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var fclick;
	;(function () {
	    'use strict';

	    /**
	     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	     *
	     * @codingstandard ftlabs-jsv2
	     * @copyright The Financial Times Limited [All Rights Reserved]
	     * @license MIT License (see LICENSE.txt)
	     */

	    /*jslint browser:true, node:true*/
	    /*global define, Event, Node*/

	    /**
	     * Instantiate fast-clicking listeners on the specified layer.
	     *
	     * @constructor
	     * @param {Element} layer The layer to listen on
	     * @param {Object} [options={}] The options to override the defaults
	     */

	    function FastClick(layer, options) {
	        var oldOnClick;

	        options = options || {};

	        /**
	         * Whether a click is currently being tracked.
	         *
	         * @type boolean
	         */
	        this.trackingClick = false;

	        /**
	         * Timestamp for when click tracking started.
	         *
	         * @type number
	         */
	        this.trackingClickStart = 0;

	        /**
	         * The element being tracked for a click.
	         *
	         * @type EventTarget
	         */
	        this.targetElement = null;

	        /**
	         * X-coordinate of touch start event.
	         *
	         * @type number
	         */
	        this.touchStartX = 0;

	        /**
	         * Y-coordinate of touch start event.
	         *
	         * @type number
	         */
	        this.touchStartY = 0;

	        /**
	         * ID of the last touch, retrieved from Touch.identifier.
	         *
	         * @type number
	         */
	        this.lastTouchIdentifier = 0;

	        /**
	         * Touchmove boundary, beyond which a click will be cancelled.
	         *
	         * @type number
	         */
	        this.touchBoundary = options.touchBoundary || 10;

	        /**
	         * The FastClick layer.
	         *
	         * @type Element
	         */
	        this.layer = layer;

	        /**
	         * The minimum time between tap(touchstart and touchend) events
	         *
	         * @type number
	         */
	        this.tapDelay = options.tapDelay || 200;

	        /**
	         * The maximum time for a tap
	         *
	         * @type number
	         */
	        this.tapTimeout = options.tapTimeout || 700;

	        if (FastClick.notNeeded(layer)) {
	            return;
	        }

	        // Some old versions of Android don't have Function.prototype.bind
	        function bind(method, context) {
	            return function () {
	                return method.apply(context, arguments);
	            };
	        }

	        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	        var context = this;
	        for (var i = 0, l = methods.length; i < l; i++) {
	            context[methods[i]] = bind(context[methods[i]], context);
	        }

	        // Set up event handlers as required
	        if (deviceIsAndroid) {
	            layer.addEventListener('mouseover', this.onMouse, true);
	            layer.addEventListener('mousedown', this.onMouse, true);
	            layer.addEventListener('mouseup', this.onMouse, true);
	        }

	        layer.addEventListener('click', this.onClick, true);
	        layer.addEventListener('touchstart', this.onTouchStart, false);
	        layer.addEventListener('touchmove', this.onTouchMove, false);
	        layer.addEventListener('touchend', this.onTouchEnd, false);
	        layer.addEventListener('touchcancel', this.onTouchCancel, false);

	        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	        // layer when they are cancelled.
	        if (!Event.prototype.stopImmediatePropagation) {
	            layer.removeEventListener = function (type, callback, capture) {
	                var rmv = Node.prototype.removeEventListener;
	                if (type === 'click') {
	                    rmv.call(layer, type, callback.hijacked || callback, capture);
	                } else {
	                    rmv.call(layer, type, callback, capture);
	                }
	            };

	            layer.addEventListener = function (type, callback, capture) {
	                var adv = Node.prototype.addEventListener;
	                if (type === 'click') {
	                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
	                        if (!event.propagationStopped) {
	                            callback(event);
	                        }
	                    }), capture);
	                } else {
	                    adv.call(layer, type, callback, capture);
	                }
	            };
	        }

	        // If a handler is already declared in the element's onclick attribute, it will be fired before
	        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	        // adding it as listener.
	        if (typeof layer.onclick === 'function') {

	            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
	            // - the old one won't work if passed to addEventListener directly.
	            oldOnClick = layer.onclick;
	            layer.addEventListener('click', function (event) {
	                oldOnClick(event);
	            }, false);
	            layer.onclick = null;
	        }
	    }

	    /**
	     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	     *
	     * @type boolean
	     */
	    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	    /**
	     * Android requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	    /**
	     * iOS requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	    /**
	     * iOS 4 requires an exception for select elements.
	     *
	     * @type boolean
	     */
	    var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	    /**
	     * iOS 6.0-7.* requires the target element to be manually derived
	     *
	     * @type boolean
	     */
	    var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

	    /**
	     * BlackBerry requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	    /**
	     * Determine whether a given element requires a native click.
	     *
	     * @param {EventTarget|Element} target Target DOM element
	     * @returns {boolean} Returns true if the element needs a native click
	     */
	    FastClick.prototype.needsClick = function (target) {
	        switch (target.nodeName.toLowerCase()) {

	            // Don't send a synthetic click to disabled inputs (issue #62)
	            case 'button':
	            case 'select':
	            case 'textarea':
	                if (target.disabled) {
	                    return true;
	                }

	                break;
	            case 'input':

	                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
	                if (deviceIsIOS && target.type === 'file' || target.disabled) {
	                    return true;
	                }

	                break;
	            case 'label':
	            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
	            case 'video':
	                return true;
	        }

	        return (/\bneedsclick\b/.test(target.className)
	        );
	    };

	    /**
	     * Determine whether a given element requires a call to focus to simulate click into element.
	     *
	     * @param {EventTarget|Element} target Target DOM element
	     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	     */
	    FastClick.prototype.needsFocus = function (target) {
	        switch (target.nodeName.toLowerCase()) {
	            case 'textarea':
	                return true;
	            case 'select':
	                return !deviceIsAndroid;
	            case 'input':
	                switch (target.type) {
	                    case 'button':
	                    case 'checkbox':
	                    case 'file':
	                    case 'image':
	                    case 'radio':
	                    case 'submit':
	                        return false;
	                }

	                // No point in attempting to focus disabled inputs
	                return !target.disabled && !target.readOnly;
	            default:
	                return (/\bneedsfocus\b/.test(target.className)
	                );
	        }
	    };

	    /**
	     * Send a click event to the specified element.
	     *
	     * @param {EventTarget|Element} targetElement
	     * @param {Event} event
	     */
	    FastClick.prototype.sendClick = function (targetElement, event) {
	        var clickEvent, touch;

	        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	        if (document.activeElement && document.activeElement !== targetElement) {
	            document.activeElement.blur();
	        }

	        touch = event.changedTouches[0];

	        // Synthesise a click event, with an extra attribute so it can be tracked
	        clickEvent = document.createEvent('MouseEvents');
	        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	        clickEvent.forwardedTouchEvent = true;
	        targetElement.dispatchEvent(clickEvent);
	    };

	    FastClick.prototype.determineEventType = function (targetElement) {

	        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
	        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
	            return 'mousedown';
	        }

	        return 'click';
	    };

	    /**
	     * @param {EventTarget|Element} targetElement
	     */
	    FastClick.prototype.focus = function (targetElement) {
	        var length;

	        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
	            length = targetElement.value.length;
	            targetElement.setSelectionRange(length, length);
	        } else {
	            targetElement.focus();
	        }
	    };

	    /**
	     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	     *
	     * @param {EventTarget|Element} targetElement
	     */
	    FastClick.prototype.updateScrollParent = function (targetElement) {
	        var scrollParent, parentElement;

	        scrollParent = targetElement.fastClickScrollParent;

	        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	        // target element was moved to another parent.
	        if (!scrollParent || !scrollParent.contains(targetElement)) {
	            parentElement = targetElement;
	            do {
	                if (parentElement.scrollHeight > parentElement.offsetHeight) {
	                    scrollParent = parentElement;
	                    targetElement.fastClickScrollParent = parentElement;
	                    break;
	                }

	                parentElement = parentElement.parentElement;
	            } while (parentElement);
	        }

	        // Always update the scroll top tracker if possible.
	        if (scrollParent) {
	            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	        }
	    };

	    /**
	     * @param {EventTarget} targetElement
	     * @returns {Element|EventTarget}
	     */
	    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

	        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	        if (eventTarget.nodeType === Node.TEXT_NODE) {
	            return eventTarget.parentNode;
	        }

	        return eventTarget;
	    };

	    /**
	     * On touch start, record the position and scroll offset.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchStart = function (event) {
	        var targetElement, touch, selection;

	        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	        if (event.targetTouches.length > 1) {
	            return true;
	        }

	        targetElement = this.getTargetElementFromEventTarget(event.target);
	        touch = event.targetTouches[0];

	        if (deviceIsIOS) {

	            // Only trusted events will deselect text on iOS (issue #49)
	            selection = window.getSelection();
	            if (selection.rangeCount && !selection.isCollapsed) {
	                return true;
	            }

	            if (!deviceIsIOS4) {

	                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
	                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
	                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
	                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
	                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
	                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
	                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
	                // random integers, it's safe to to continue if the identifier is 0 here.
	                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
	                    event.preventDefault();
	                    return false;
	                }

	                this.lastTouchIdentifier = touch.identifier;

	                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
	                // 1) the user does a fling scroll on the scrollable layer
	                // 2) the user stops the fling scroll with another tap
	                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
	                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
	                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
	                this.updateScrollParent(targetElement);
	            }
	        }

	        this.trackingClick = true;
	        this.trackingClickStart = event.timeStamp;
	        this.targetElement = targetElement;

	        this.touchStartX = touch.pageX;
	        this.touchStartY = touch.pageY;

	        // Prevent phantom clicks on fast double-tap (issue #36)
	        if (event.timeStamp - this.lastClickTime < this.tapDelay) {
	            event.preventDefault();
	        }

	        return true;
	    };

	    /**
	     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.touchHasMoved = function (event) {
	        var touch = event.changedTouches[0],
	            boundary = this.touchBoundary;

	        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
	            return true;
	        }

	        return false;
	    };

	    /**
	     * Update the last position.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchMove = function (event) {
	        if (!this.trackingClick) {
	            return true;
	        }

	        // If the touch has moved, cancel the click tracking
	        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
	            this.trackingClick = false;
	            this.targetElement = null;
	        }

	        return true;
	    };

	    /**
	     * Attempt to find the labelled control for the given label element.
	     *
	     * @param {EventTarget|HTMLLabelElement} labelElement
	     * @returns {Element|null}
	     */
	    FastClick.prototype.findControl = function (labelElement) {

	        // Fast path for newer browsers supporting the HTML5 control attribute
	        if (labelElement.control !== undefined) {
	            return labelElement.control;
	        }

	        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
	        if (labelElement.htmlFor) {
	            return document.getElementById(labelElement.htmlFor);
	        }

	        // If no for attribute exists, attempt to retrieve the first labellable descendant element
	        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	    };

	    /**
	     * On touch end, determine whether to send a click event at once.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchEnd = function (event) {
	        var forElement,
	            trackingClickStart,
	            targetTagName,
	            scrollParent,
	            touch,
	            targetElement = this.targetElement;

	        if (!this.trackingClick) {
	            return true;
	        }

	        // Prevent phantom clicks on fast double-tap (issue #36)
	        if (event.timeStamp - this.lastClickTime < this.tapDelay) {
	            this.cancelNextClick = true;
	            return true;
	        }

	        if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
	            return true;
	        }

	        // Reset to prevent wrong click cancel on input (issue #156).
	        this.cancelNextClick = false;

	        this.lastClickTime = event.timeStamp;

	        trackingClickStart = this.trackingClickStart;
	        this.trackingClick = false;
	        this.trackingClickStart = 0;

	        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
	        // is performing a transition or scroll, and has to be re-detected manually. Note that
	        // for this to function correctly, it must be called *after* the event target is checked!
	        // See issue #57; also filed as rdar://13048589 .
	        if (deviceIsIOSWithBadTarget) {
	            touch = event.changedTouches[0];

	            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
	            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
	            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	        }

	        targetTagName = targetElement.tagName.toLowerCase();
	        if (targetTagName === 'label') {
	            forElement = this.findControl(targetElement);
	            if (forElement) {
	                this.focus(targetElement);
	                if (deviceIsAndroid) {
	                    return false;
	                }

	                targetElement = forElement;
	            }
	        } else if (this.needsFocus(targetElement)) {

	            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
	            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
	            if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
	                this.targetElement = null;
	                return false;
	            }

	            this.focus(targetElement);
	            this.sendClick(targetElement, event);

	            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
	            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
	            if (!deviceIsIOS || targetTagName !== 'select') {
	                this.targetElement = null;
	                event.preventDefault();
	            }

	            return false;
	        }

	        if (deviceIsIOS && !deviceIsIOS4) {

	            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
	            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
	            scrollParent = targetElement.fastClickScrollParent;
	            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
	                return true;
	            }
	        }

	        // Prevent the actual click from going though - unless the target node is marked as requiring
	        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	        if (!this.needsClick(targetElement)) {
	            event.preventDefault();
	            this.sendClick(targetElement, event);
	        }

	        return false;
	    };

	    /**
	     * On touch cancel, stop tracking the click.
	     *
	     * @returns {void}
	     */
	    FastClick.prototype.onTouchCancel = function () {
	        this.trackingClick = false;
	        this.targetElement = null;
	    };

	    /**
	     * Determine mouse events which should be permitted.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onMouse = function (event) {

	        // If a target element was never set (because a touch event was never fired) allow the event
	        if (!this.targetElement) {
	            return true;
	        }

	        if (event.forwardedTouchEvent) {
	            return true;
	        }

	        // Programmatically generated events targeting a specific element should be permitted
	        if (!event.cancelable) {
	            return true;
	        }

	        // Derive and check the target element to see whether the mouse event needs to be permitted;
	        // unless explicitly enabled, prevent non-touch click events from triggering actions,
	        // to prevent ghost/doubleclicks.
	        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

	            // Prevent any user-added listeners declared on FastClick element from being fired.
	            if (event.stopImmediatePropagation) {
	                event.stopImmediatePropagation();
	            } else {

	                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	                event.propagationStopped = true;
	            }

	            // Cancel the event
	            event.stopPropagation();
	            event.preventDefault();

	            return false;
	        }

	        // If the mouse event is permitted, return true for the action to go through.
	        return true;
	    };

	    /**
	     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	     * an actual click which should be permitted.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onClick = function (event) {
	        var permitted;

	        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	        if (this.trackingClick) {
	            this.targetElement = null;
	            this.trackingClick = false;
	            return true;
	        }

	        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	        if (event.target.type === 'submit' && event.detail === 0) {
	            return true;
	        }

	        permitted = this.onMouse(event);

	        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	        if (!permitted) {
	            this.targetElement = null;
	        }

	        // If clicks are permitted, return true for the action to go through.
	        return permitted;
	    };

	    /**
	     * Remove all FastClick's event listeners.
	     *
	     * @returns {void}
	     */
	    FastClick.prototype.destroy = function () {
	        var layer = this.layer;

	        if (deviceIsAndroid) {
	            layer.removeEventListener('mouseover', this.onMouse, true);
	            layer.removeEventListener('mousedown', this.onMouse, true);
	            layer.removeEventListener('mouseup', this.onMouse, true);
	        }

	        layer.removeEventListener('click', this.onClick, true);
	        layer.removeEventListener('touchstart', this.onTouchStart, false);
	        layer.removeEventListener('touchmove', this.onTouchMove, false);
	        layer.removeEventListener('touchend', this.onTouchEnd, false);
	        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	    };

	    /**
	     * Check whether FastClick is needed.
	     *
	     * @param {Element} layer The layer to listen on
	     */
	    FastClick.notNeeded = function (layer) {
	        var metaViewport;
	        var chromeVersion;
	        var blackberryVersion;
	        var firefoxVersion;

	        // Devices that don't support touch don't need FastClick
	        if (typeof window.ontouchstart === 'undefined') {
	            return true;
	        }

	        // Chrome version - zero for other browsers
	        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

	        if (chromeVersion) {

	            if (deviceIsAndroid) {
	                metaViewport = document.querySelector('meta[name=viewport]');

	                if (metaViewport) {
	                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
	                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
	                        return true;
	                    }
	                    // Chrome 32 and above with width=device-width or less don't need FastClick
	                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
	                        return true;
	                    }
	                }

	                // Chrome desktop doesn't need FastClick (issue #15)
	            } else {
	                return true;
	            }
	        }

	        if (deviceIsBlackBerry10) {
	            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

	            // BlackBerry 10.3+ does not require Fastclick library.
	            // https://github.com/ftlabs/fastclick/issues/251
	            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
	                metaViewport = document.querySelector('meta[name=viewport]');

	                if (metaViewport) {
	                    // user-scalable=no eliminates click delay.
	                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
	                        return true;
	                    }
	                    // width=device-width (or less than device-width) eliminates click delay.
	                    if (document.documentElement.scrollWidth <= window.outerWidth) {
	                        return true;
	                    }
	                }
	            }
	        }

	        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
	        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
	            return true;
	        }

	        // Firefox version - zero for other browsers
	        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

	        if (firefoxVersion >= 27) {
	            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

	            metaViewport = document.querySelector('meta[name=viewport]');
	            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
	                return true;
	            }
	        }

	        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
	        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
	        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
	            return true;
	        }

	        return false;
	    };

	    /**
	     * Factory method for creating a FastClick object
	     *
	     * @param {Element} layer The layer to listen on
	     * @param {Object} [options={}] The options to override the defaults
	     */
	    FastClick.attach = function (layer, options) {
	        return new FastClick(layer, options);
	    };

	    exports.fclick = fclick = FastClick;
	})();
	exports.fclick = fclick;

	//# sourceMappingURL=fastclick.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _zepto = __webpack_require__(7);

	(function ($, window, document, undefined) {
	    var $window = $(window);

	    $.fn.lazyload = function (options) {
	        var elements = this;
	        var $container;
	        var settings = {
	            threshold: 0,
	            failure_limit: 0,
	            event: "scroll",
	            effect: "show",
	            container: window,
	            data_attribute: "original",
	            skip_invisible: true,
	            appear: null,
	            load: null,
	            placeholder: "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDYzYTY5ZTMtN2RmMy02ODRhLWEwYzQtZjJlODlmZGM2NWQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1NjJBMDEyNjA2QTExRTY5NzgxRjM0MzJDODI3MTBEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1NjJBMDExNjA2QTExRTY5NzgxRjM0MzJDODI3MTBEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGOENFNDBGNjA2QTExRTZBMjEzOEY0MUJCODNCQUY0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGOENFNDEwNjA2QTExRTZBMjEzOEY0MUJCODNCQUY0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAOgA6AwERAAIRAQMRAf/EAHsAAAICAwEAAAAAAAAAAAAAAAUGBAcAAQIDAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMBBAUHCAsBAAAAAAABAgMABAURITESBkFRIjITYXFSYoJDFPCBscHRojM0kaHxciNjg0SEFTVFEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC4bu/5gu+Z8hYWuTNjbWvG+uzgSONQSdANSdtBkOXykRBi5ksrw+hcqy6+0RsoDdhzFxyRwZKEWksp4YbhHElrK3QFlGxWPU1AaIIOh2GgG5TOW1gyQLG93fyjiisoRq5HpN6K+U0AG6zHMcraSZDH4lTui8RZJB5yOKgH5K95ns7E5CHPLewK4jcwMCFcjUBgVoHX4qXyfkPid3vfl0UCvewmDnDJIRp8dYzNGesmPU/rSgSk0KL5hQSLW7mtuIR6NDJsmt22xyDqYfXvFBYOIzo/0Us7EzPaqvgcR7Ugk7MSsfSDdhvNrQJORydy8s8SSk+IxN3Ouxp5Bv1O/gXci7tKAaFUbgBQGbZGflkWyjVr3JIiDr4U0P00FmfDJ1+6+G9mgCc0WFwy22Vs08S8xrcZiG+SE99f0UFfX9vHDPxwHjs59ZLWToKHbw/vJuYUEegNYu4kTHqoPZDTMf6SeKv3jQBF3Cg7RJJJFjjUvK54UQbyT0UDryvi/FubaXY1jig4jkHdmu5Nsjr1qndB8lA3UGwSNo30C5ncLhkLP4y2stweJrUp4screkIV7St6y6UCpJjLESEMpiHQRPGAfZkBYUEu1tIEhijjieWB/iPFn8aP+HxRhejs7tu2ggjGWmg4EkkPoi4t/wBtAewmIwssogkuBDK47VmA8csg6VMsnaZfImlA4xxRxRrFEgjjjHCkajRVA6AKDdAPzeUbH2qeAglvrlxBZQnc0jdLequ80Fd5TIyvcTRxzNJqSJ7rc87jedehNe6o2aUA3hHVQFrFCca2g3i5PzeGo+qgEhV03Cgk2940YEUwM1prq8JJ1HrRtvRx0EUD7y1mZnmbFXkvjTJGJrK7Owz27DUE+so30DBQKObuml5ju23piMfI8Y6pZF018/aoEdRooHVQdxxySSLFGpeRzwog3k9VA64TD8eEuXQCXhASDT3nhktMV8jMSq+agTLm3a3mMROo70b9DIe6woPOgOQXD2+OweUXY9pcy25P8sMG0+8aCy9Y+sbuP2Ougr68yNha8zZ+HIGRbe8DQccQDOuvCQQDQQFg5UY8MMuQun6Io4kUn5+1QHcVy1cT961/1Vgw0l4m47yZfRL+7U9OlA4RpHFGkcSiOOMBY0XYFUbgKBfzfLQnLTW0CXEbsXksmbwyGPee3kHcZulT2TQKs2LwcUhS6nvcc43x3MAcD20OhoOMvdYiLAwY2wuzeOk8lw8hQxgcS6BQDQWBxP5f+Xr7X20EfKfmf/O3D81+L89BPx3c/tf8X5bqCQaDVBlBq4/A93/kdygBp+YX/kd4bu9v+mgP/bQf/9k="
	        };

	        function update() {
	            var counter = 0;

	            elements.each(function () {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
	                    /* Nothing. */
	                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
	                    $this.trigger("appear");
	                    /* if we found an image we'll load, reset the counter */
	                    counter = 0;
	                } else {
	                    if (++counter > settings.failure_limit) {
	                        return false;
	                    }
	                }
	            });
	        }

	        if (options) {
	            /* Maintain BC for a couple of versions. */
	            if (undefined !== options.failurelimit) {
	                options.failure_limit = options.failurelimit;
	                delete options.failurelimit;
	            }
	            if (undefined !== options.effectspeed) {
	                options.effect_speed = options.effectspeed;
	                delete options.effectspeed;
	            }

	            $.extend(settings, options);
	        }

	        /* Cache container as jQuery as object. */
	        $container = settings.container === undefined || settings.container === window ? $window : $(settings.container);

	        /* Fire one scroll event per scroll. Not one scroll event per image. */
	        if (0 === settings.event.indexOf("scroll")) {
	            $container.bind(settings.event, function () {
	                return update();
	            });
	        }

	        this.each(function () {
	            var self = this;
	            var $self = $(self);

	            self.loaded = false;

	            /* If no src attribute given use data:uri. */
	            if ($self.attr("src") === undefined || $self.attr("src") === false) {
	                if ($self.is("img")) {
	                    $self.attr("src", settings.placeholder);
	                }
	            }

	            /* When appear is triggered load original image. */
	            $self.one("appear", function () {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />").bind("load", function () {

	                        var original = $self.attr("data-" + settings.data_attribute);
	                        $self.hide();
	                        if ($self.is("img")) {
	                            $self.attr("src", original);
	                        } else {
	                            $self.css("background-image", "url('" + original + "')");
	                        }
	                        $self[settings.effect](settings.effect_speed);

	                        self.loaded = true;

	                        /* Remove image from array so it is not looped next time. */
	                        var temp = $.grep(elements, function (element) {
	                            return !element.loaded;
	                        });
	                        elements = $(temp);

	                        if (settings.load) {
	                            var elements_left = elements.length;
	                            settings.load.call(self, elements_left, settings);
	                        }
	                    }).attr("src", $self.attr("data-" + settings.data_attribute));
	                }
	            });

	            /* When wanted event is triggered load original image */
	            /* by triggering appear.                              */
	            if (0 !== settings.event.indexOf("scroll")) {
	                $self.bind(settings.event, function () {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });

	        /* Check if something appears when window is resized. */
	        $window.bind("resize", function () {
	            update();
	        });

	        /* With IOS5 force loading images when navigating with back button. */
	        /* Non optimal workaround. */
	        if (/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)) {
	            $window.bind("pageshow", function (event) {
	                if (event.originalEvent && event.originalEvent.persisted) {
	                    elements.each(function () {
	                        $(this).trigger("appear");
	                    });
	                }
	            });
	        }

	        /* Force initial check if images should appear. */
	        $(document).ready(function () {
	            update();
	        });

	        return this;
	    };

	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

	    $.belowthefold = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top + $(settings.container).height();
	        }

	        return fold <= $(element).offset().top - settings.threshold;
	    };

	    $.rightoffold = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            //fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left + $(settings.container).width();
	        }

	        return fold <= $(element).offset().left - settings.threshold;
	    };

	    $.abovethetop = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $(settings.container).offset().top;
	        }

	        return fold >= $(element).offset().top + settings.threshold + $(element).height();
	    };

	    $.leftofbegin = function (element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            //fold = $window.scrollLeft();
	        } else {
	            fold = $(settings.container).offset().left;
	        }

	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };

	    $.inviewport = function (element, settings) {
	        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	    };

	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() or */
	    /* $("img").filter(":below-the-fold").something() which is faster */

	    $.extend($.expr[":"], {
	        "below-the-fold": function belowTheFold(a) {
	            return $.belowthefold(a, { threshold: 0 });
	        },
	        "above-the-top": function aboveTheTop(a) {
	            return !$.belowthefold(a, { threshold: 0 });
	        },
	        "right-of-screen": function rightOfScreen(a) {
	            return $.rightoffold(a, { threshold: 0 });
	        },
	        "left-of-screen": function leftOfScreen(a) {
	            return !$.rightoffold(a, { threshold: 0 });
	        },
	        "in-viewport": function inViewport(a) {
	            return $.inviewport(a, { threshold: 0 });
	        },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold": function aboveTheFold(a) {
	            return !$.belowthefold(a, { threshold: 0 });
	        },
	        "right-of-fold": function rightOfFold(a) {
	            return $.rightoffold(a, { threshold: 0 });
	        },
	        "left-of-fold": function leftOfFold(a) {
	            return !$.rightoffold(a, { threshold: 0 });
	        }
	    });
	})(_zepto.Zepto, window, document);

	//# sourceMappingURL=lazyload.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map

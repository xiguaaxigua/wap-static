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

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}(); /**
	      * Created by xiangran.kong on 16/08/09.
	      */
	
	var _unit = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}
	
	var AddCart = function () {
	    function AddCart($this, opts) {
	        _classCallCheck(this, AddCart);
	
	        this.$this = $this;
	        this.bindName = opts.bindName;
	        this.$status = opts.$status; //购物车状态，显示数量
	
	        this.productId = parseInt($this.attr('data-pid')); //产品id
	        this.number = parseInt(this.$addNumber || 1); //加入购物车数量，默认1
	        this._eventBind();
	    }
	
	    _createClass(AddCart, [{
	        key: '_eventBind',
	        value: function _eventBind() {
	            var that = this;
	            $(document).on('click', '.J_AddCart', function (e) {
	                if (that.productId && that.number > 0) {
	                    that._sendAjax(that.productId, that.number);
	                }
	            });
	        }
	    }, {
	        key: '_sendAjax',
	        value: function _sendAjax(proId, number) {
	            var that = this;
	
	            $.ajax({
	                url: '',
	                type: 'post',
	                data: { 'productId': proId, 'number': number },
	                beforeSend: function beforeSend() {
	                    if (!proId) {
	                        return false;
	                    }
	                },
	                success: function success(data) {
	                    data = {
	                        success: false,
	                        msg: '加入购物车失败',
	                        sum: 2
	                    };
	                    if (data.success) {
	                        $.pop({
	                            type: 'tips',
	                            hideTimes: 5000,
	                            message: data.msg
	                        });
	                        that.$status.text(data.sum);
	                    } else {
	                        $.pop({
	                            type: 'tips',
	                            hideTimes: 5000,
	                            message: data.msg
	                        });
	                    }
	                }
	            });
	        }
	    }]);
	
	    return AddCart;
	}();
	
	/**
	 * 加入购物车
	 * 加入购物车的按钮中要有class: J_AddCart, data-pid="27598"(产品pid)
	 * opts.$addNumber 要记入购物的数量，默认为1
	 * opts.$status  要显示购物车数量的jquery对象
	 * **/
	
	$.fn.addCart = function (opts) {
	    if (opts && opts.$status) {
	        var ac = new AddCart($(this), opts);
	    }
	};
	
	//# sourceMappingURL=addcart.class.js.map

/***/ },
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}(); /**
	      * Created by xiangran.kong on 16/08/11.
	      */
	
	var _unit = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}
	
	var AddFav = function () {
	    function AddFav($this, productId) {
	        _classCallCheck(this, AddFav);
	
	        var that = this;
	        this.ele = $this;
	        this.productId = productId;
	        //事件绑定
	        $this.on('touchstart', function () {
	            //判断是加入收藏，还是取消收藏
	            var className = $this.attr('class');
	            if (/icon\-love\-green/.test(className)) {
	                //取消收藏
	                that._cancelFav(productId);
	            } else {
	                //添加收藏
	                that._addFav(productId);
	            }
	            console.log(className);
	        });
	    }
	    /**
	     * 取消收藏
	     * **/
	
	    _createClass(AddFav, [{
	        key: '_cancelFav',
	        value: function _cancelFav(productId) {
	            var that = this;
	            $.ajax({
	                url: '',
	                type: 'post',
	                data: { 'productId': productId },
	                success: function success(data) {
	                    //假数据
	                    data = {
	                        success: true,
	                        msg: '失败，数据错误'
	                    };
	                    if (data.success) {
	                        that.ele.removeClass('icon-love-green').addClass('icon-love');
	                    } else {
	                        $.pop({
	                            type: 'tips',
	                            hideTimes: 5000,
	                            message: data.msg
	                        });
	                        return false;
	                    }
	                }
	
	            });
	        }
	
	        /**
	         * 添加收藏
	         * **/
	
	    }, {
	        key: '_addFav',
	        value: function _addFav(productId) {
	            var that = this;
	            $.ajax({
	                url: '',
	                type: 'post',
	                data: { 'productId': productId },
	                success: function success(data) {
	                    //假数据
	                    data = {
	                        success: true,
	                        msg: '失败，数据错误'
	                    };
	                    if (data.success) {
	                        that.ele.removeClass('icon-love').addClass('icon-love-green');
	                    } else {
	                        $.pop({
	                            type: 'tips',
	                            hideTimes: 5000,
	                            message: data.msg
	                        });
	                        return false;
	                    }
	                }
	
	            });
	        }
	    }]);
	
	    return AddFav;
	}();
	
	//收藏，绑定收藏元素
	
	
	$.fn.addFav = function (productId) {
	    return new AddFav($(this, productId));
	};
	
	//# sourceMappingURL=addFav.class.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=address.js.map
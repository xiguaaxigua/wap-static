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

	module.exports = __webpack_require__(11);


/***/ },

/***/ 5:
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

/***/ 11:
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
	      * Created by xiangran.kong on 16/08/02.
	      */
	
	var _popupClass = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}
	
	//验证
	var Verification = function () {
	    function Verification(options) {
	        _classCallCheck(this, Verification);
	
	        //验证是否有需要验证的表单
	        this.$ver = $(options.input);
	        this.$submitBtn = $(options.submitBtn);
	        this.length = this.$ver.length;
	        this.verifyValue = [];
	        if (this.length > 0) {
	            this._init();
	        } else {
	            //console.log('没有需要验证的表单!');
	        }
	    }
	
	    //初始化验证插件
	
	
	    _createClass(Verification, [{
	        key: '_init',
	        value: function _init() {
	            var mustFill = [];
	            var that = this;
	
	            for (var i = 0; i < this.length; i++) {
	                var verifyData = this._formatJson(this.$ver.eq(i).attr('data-verify'), this.$ver.get(i));
	                this.verifyValue.push(verifyData);
	                verifyData.required && mustFill.push(this.$ver.eq(i));
	            }
	            //必填的监听
	            this._unEmpty(mustFill);
	        }
	
	        //格式化字符串
	
	    }, {
	        key: '_formatJson',
	        value: function _formatJson(string, ele) {
	            var json = {};
	            var tmp = [];
	            var key = '';
	            var value = '';
	
	            tmp = string.trim().split(',');
	            for (var i = 0; i < tmp.length; i++) {
	                var vArr = tmp[i].split(':');
	                key = vArr[0].trim().replace(/{|}/, '');
	                value = vArr[1].trim().replace(/{|}/, '');
	                json[key] = value.trim();
	            }
	            json['ele'] = ele;
	            return json;
	        }
	
	        /**
	         * 验证表单,自动获取表单中的参数，参与验证
	         **/
	
	    }, {
	        key: 'check',
	        value: function check() {
	            var verifyValue = this.verifyValue,
	                passwordValue = void 0;
	            return verifyValue.every(function (item, index) {
	                //console.log(item);
	                var type = item.type;
	                var value = item.ele.value;
	                var result = true;
	                var msg = item.msg;
	
	                switch (type) {
	                    case 'userName':
	                        if (!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value) || /^[0-9]{11}$/.test(value))) {
	                            (0, _popupClass.popup)({
	                                type: 'tips',
	                                hideTimes: 2000,
	                                message: msg
	                            });
	                            result = false;
	                        }
	                        break;
	                    case 'tel':
	                        if (!/^[0-9]{11}$/.test(value)) {
	                            (0, _popupClass.popup)({
	                                type: 'tips',
	                                hideTimes: 2000,
	                                message: msg
	                            });
	                            result = false;
	                        }
	                        break;
	                    case 'email':
	                        if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
	                            (0, _popupClass.popup)({
	                                type: 'tips',
	                                hideTimes: 2000,
	                                message: msg
	                            });
	                            result = false;
	                        }
	                        break;
	                    case 'password':
	                        if (!/^[a-z0-9A-Z]{6,18}$/.test(value)) {
	                            (0, _popupClass.popup)({
	                                type: 'tips',
	                                hideTimes: 5000,
	                                message: msg
	                            });
	                            result = false;
	                        }
	                        passwordValue = value;
	                        break;
	                    case 'repassword':
	                        if (value != passwordValue) {
	                            (0, _popupClass.popup)({
	                                type: 'tips',
	                                hideTimes: 5000,
	                                message: msg
	                            });
	                            result = false;
	                        }
	                        break;
	                    default:
	                        break;
	                }
	                return result;
	            });
	        }
	
	        /**
	         * 查看密码
	         * @param btn 查看密码按钮
	         * @param ele password表单元素
	         * **/
	        // lookover (btn, ele){
	        //     btn.on('touchstart', function(){
	        //         ele.attr('type', 'text');
	        //     });
	        //     btn.on('touchend', function(){
	        //         ele.attr('type', 'password');
	        //     });
	        // }
	
	    }, {
	        key: 'lookover',
	        value: function lookover(btn, ele) {
	            var flag = true;
	            btn.on('tap', function () {
	                if (flag) {
	                    btn.removeClass('icon-eye-close').addClass('icon-eye-open');
	                    ele.attr('type', 'text');
	                } else {
	                    btn.removeClass('icon-eye-open').addClass('icon-eye-close');
	                    ele.attr('type', 'password');
	                }
	                flag = !flag;
	            });
	        }
	
	        //是否为空
	
	    }, {
	        key: '_unEmpty',
	        value: function _unEmpty(eleArray) {
	            var isSubmit = null;
	            var that = this;
	            var form = eleArray[0].parents('form').eq(0);
	
	            var mustItem = document.getElementById('J_ConfirmFieldsTerms');
	            if (eleArray.length <= 0) {
	                return false;
	            }
	            form.bind('keyup change', function (event) {
	                if (mustItem && !mustItem.checked) {
	                    that.$submitBtn.attr('disabled', 'disabled');
	                    return false;
	                }
	
	                if (event.target.nodeType == 1) {
	                    isSubmit = eleArray.every(function (item, index) {
	                        if (item[0].nodeName.toLocaleLowerCase() == 'select') {
	                            return item.val() != 0;
	                        } else {
	                            return item.val() != '';
	                        }
	                    });
	                    //if(event.target){}
	                }
	                if (isSubmit) {
	                    that.$submitBtn.removeAttr('disabled');
	                } else {
	                    that.$submitBtn.attr('disabled', 'disabled');
	                }
	            });
	        }
	    }]);
	
	    return Verification;
	}();
	
	/**
	 * 验证表单
	 * @param 要验证的className，在表单元素后面有验证格式
	 * @param 提交按钮idName,是否可以提交
	 * **/
	
	$.verify = new Verification({
	    input: '.J_Verify929',
	    submitBtn: '.J_SubmitBtn',
	    lookOver: '#J_LookOver'
	});
	
	//# sourceMappingURL=verification.class.js.map

/***/ }

/******/ });
//# sourceMappingURL=user.js.map
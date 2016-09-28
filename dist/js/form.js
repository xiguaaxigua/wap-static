/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	module.exports = __webpack_require__(10);


/***/ },

/***/ 9:
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
	                case 'mask':
	                    that._mask(opts);break;
	                default:
	                    that._tips(opts);break;
	            }
	            $('#J_Mask').on('touchstart', function () {
	                that._hideMask();
	            });
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
	         * @param hideTimes 消失时间
	         * @param message 提示消息
	         * **/

	    }, {
	        key: '_tips',
	        value: function _tips(options) {
	            var ts = options.hideTimes;
	            var msg = options.message;
	            var that = this;

	            var callback = options.callback;
	            var maskDiv = document.getElementById('J_Mask');
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
	                // tips消失后执行回调
	                callback();
	            }, ts);
	        }

	        /**
	         * 确认框 lzy
	         * @param type 必选,string
	         * @param msg 必选,string,提示信息
	         * @param cancelText 可选,string,左侧"取消"文字,默认为中文
	         * @param confirmText 可选,string,右侧"确认"文字,默认为中文
	         * @param cancelCallback 可选,function,点击"取消"后的操作,默认关闭确认框
	         * @param confirmCallback 可选,function,点击"确认"后的操作,默认不进行操作
	         * **/

	    }, {
	        key: '_alert',
	        value: function _alert(options) {
	            var msg = options.message;
	            var _options$cancelText = options.cancelText;
	            var cancelText = _options$cancelText === undefined ? '取消' : _options$cancelText;
	            var _options$confirmText = options.confirmText;
	            var confirmText = _options$confirmText === undefined ? '确认' : _options$confirmText;

	            var cancelCallback = options.cancelCallback,
	                confirmCallback = options.confirmCallback,
	                callback = options.callback,
	                html = '<div class=\"m-alert-mask\"><div class=\"m-mask-content\"><div class=\"m-mask-info\">' + msg + '</div><div class=\"m-mask-handle clearfix\"><span id=\"J_cancleAlert\">' + cancelText + '</span><span id=\"J_confirmAlert\">' + confirmText + '</span></div></div></div>';
	            $('body').append(html);
	            // 点击取消
	            $('#J_cancleAlert').bind('tap', function () {
	                if (cancelCallback) {
	                    cancelCallback();
	                } else {
	                    $('.m-alert-mask').remove();
	                }
	            });
	            // 点击确认
	            $('#J_confirmAlert').on('tap', function () {
	                if (confirmCallback) {
	                    confirmCallback();
	                }
	            });
	            // 回调
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: '_mask',
	        value: function _mask(options) {}
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

/***/ 10:
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

	var _popupClass = __webpack_require__(9);

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
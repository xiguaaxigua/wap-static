'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by xiangran.kong on 16/08/02.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _popupClass = require('./popup.class.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
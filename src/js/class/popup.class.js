'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.popup = popup;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
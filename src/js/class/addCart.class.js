'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by xiangran.kong on 16/08/09.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _unit = require('./../unit/unit.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
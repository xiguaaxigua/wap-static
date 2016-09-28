'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by xiangran.kong on 16/08/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _unit = require('./../unit/unit.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
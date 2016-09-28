/**
 * Created by xiangran.kong on 16/08/09.
 */
import {getUnit, eventUnit, cookieUnit} from './../unit/unit.js';

class AddCart {
    constructor ($this, opts){
        this.$this = $this;
        this.bindName = opts.bindName;
        this.$status = opts.$status;        //购物车状态，显示数量

        this.productId = parseInt($this.attr('data-pid'));  //产品id
        this.number = parseInt(this.$addNumber || 1) ;    //加入购物车数量，默认1
        this._eventBind();
    } 
    _eventBind (){
        let that = this;
        $(document).on('click', '.J_AddCart', function(e){
            if(that.productId && that.number>0){
                that._sendAjax(that.productId,that.number);
            }
        });
    }

    _sendAjax (proId, number){
        let [that]= [this];
        $.ajax({
            url: '',
            type:'post',
            data: {'productId': proId, 'number': number},
            beforeSend: function(){
                if(!proId){
                    return false;
                }
            },
            success: function(data){
                data = {
                    success: false,
                    msg: '加入购物车失败',
                    sum:2
                };
                if(data.success){
                    $.pop({
                        type: 'tips',
                        hideTimes: 5000,
                        message: data.msg
                    });
                    that.$status.text(data.sum);
                }else{
                    $.pop({
                        type: 'tips',
                        hideTimes: 5000,
                        message: data.msg
                    })
                }

            }
        });
    }
}

/**
 * 加入购物车
 * 加入购物车的按钮中要有class: J_AddCart, data-pid="27598"(产品pid)
 * opts.$addNumber 要记入购物的数量，默认为1
 * opts.$status  要显示购物车数量的jquery对象
 * **/
$.fn.addCart = function(opts){
    if(opts && opts.$status){
        let ac = new AddCart($(this), opts);
    }
};

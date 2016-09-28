/**
 * Created by xiangran.kong on 16/08/11.
 */
import {getUnit, eventUnit, cookieUnit} from './../unit/unit.js';

class AddFav {
    constructor ($this, productId){
        let that = this;
        this.ele = $this;
        this.productId = productId;
        //事件绑定
        $this.on('touchstart', function(){
            //判断是加入收藏，还是取消收藏
            const className = $this.attr('class');
            if(/icon\-love\-green/.test(className)){
                //取消收藏
                that._cancelFav(productId);
            }else{
                //添加收藏
                that._addFav(productId);
            }
            console.log(className);
        });

    }
    /**
     * 取消收藏
     * **/
    _cancelFav (productId){
        let that = this;
        $.ajax({
            url:'',
            type:'post',
            data: {'productId': productId},
            success:function(data){
                //假数据
                data={
                    success: true,
                    msg: '失败，数据错误'
                };
                if(data.success){
                    that.ele.removeClass('icon-love-green').addClass('icon-love');
                }else{
                    $.pop({
                        type: 'tips',
                        hideTimes: 5000,
                        message: data.msg
                    });
                    return false;
                }
            }

        })
    }

    /**
     * 添加收藏
     * **/
    _addFav (productId){
        let that = this;
        $.ajax({
            url:'',
            type:'post',
            data: {'productId': productId},
            success:function(data){
                //假数据
                data={
                    success: true,
                    msg: '失败，数据错误'
                };
                if(data.success){
                    that.ele.removeClass('icon-love').addClass('icon-love-green');
                }else{
                    $.pop({
                        type: 'tips',
                        hideTimes: 5000,
                        message: data.msg
                    });
                    return false;
                }
            }

        })
    };
}

//收藏，绑定收藏元素
$.fn.addFav = function(productId){
    return new AddFav($(this, productId));
};

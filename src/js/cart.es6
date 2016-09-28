/**
 * Created by xiangran.kong on 16/08/11.
 */ 
import {getUnit, eventUnit, cookieUnit} from './unit/unit.js';

let cart = {
    init (){
        this.numberHandle();
        this.settlement();
        this.delProduct();
    },

    //购物车数量操作
    numberHandle (){
        //减购物车数量
        $(document).on('click', '.J_MinusNumber',function(){
            let $item = $(this).parents('.J_CartItem'),
                $currentNumInput= $(this).siblings('.J_CurrentNumber'),
                pid = $item.attr('data-pid'),   //所操作产品的pid
                currentNum= $currentNumInput.text();    //所操作产品的数量

            $.ajax({
                url: '',
                type: 'post',
                data: {'pid': pid, 'num': currentNum},
                beforeSend: function(){
                    if(!pid || !currentNum){
                        $.pop({
                            type: 'tips',
                            hideTimes: 3000,
                            message: '数据错误，请刷新页面'
                        });
                        return false;
                    }
                },
                success: function(data){
                    data= {
                        success: true,
                        number: 6,
                        msg:'测试:库存不足'
                    };
                    if(data.success){
                        $currentNumInput.text(data.number);
                    }else{
                        $.pop({
                            type: 'tips',
                            hideTimes: 3000,
                            message: data.msg
                        });
                    }

                }
            });

        });
        //减购物车数量
        $(document).on('click', '.J_AddNumber',function(){
            let $item = $(this).parents('.J_CartItem'),
                $currentNumInput= $(this).siblings('.J_CurrentNumber'),
                pid = $item.attr('data-pid'),   //所操作产品的pid
                currentNum= $currentNumInput.text();    //所操作产品的数量

            $.ajax({
                url: '',
                type: 'post',
                data: {'pid': pid, 'num': currentNum},
                beforeSend: function(){
                    if(!pid || !currentNum){
                        $.pop({
                            type: 'tips',
                            hideTimes: 3000,
                            message: '数据错误，请刷新页面'
                        });
                        return false;
                    }
                },
                success: function(data){
                    data= {
                        success: false,
                        number: 5,
                        msg:'测试:库存不足'
                    };
                    if(data.success){
                        $currentNumInput.text(data.number);
                    }else{
                        $.pop({
                            type: 'tips',
                            hideTimes: 3000,
                            message: data.msg
                        });
                    }

                }
            });
        });
    },

    //结算
    settlement (){
        let sl = getUnit.id('J_Settlement');
        if(sl){
            eventUnit.addListener(sl, 'click', function(){
                let [productList, produtData] = [getUnit.cls('J_CartItem'), []];
                for(let i in productList){
                    let json = {
                        pid: productList[i].getAttribute('J_CartItem'),
                        number: $(productList[i]).find('.J_CurrentNumber').text()
                    };
                    produtData.push(json);
                }
                if(produtData.length>0){
                    $.ajax({
                        url:'',
                        type: 'post',
                        data: produtData,
                        success: function(data){
                            //根据后台数据进行微调
                            $.pop({
                                type:'tips',
                                hideTimes: 3000,
                                message: '测试弹窗'
                            });
                        }
                    })
                }
            });
        }
    },

    //删除
    delProduct (){
        let $cartItem = $('.J_CartItem');

        //显示/隐藏删除按钮
        $(document).on('swipeLeft', '.J_CartItem', function(){
            $(this).css({left:'-60px'});
        });
        $(document).on('swipeRight', '.J_CartItem', function(){
            $(this).css({left:'0'});
        });

        //删除产品

    }


};
cart.init();

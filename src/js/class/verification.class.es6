/**
 * Created by xiangran.kong on 16/08/02.
 */
import {popup} from  './popup.class.js';

//验证
class Verification {
    constructor (options){
        //验证是否有需要验证的表单
        this.$ver = $(options.input);
        this.$submitBtn = $(options.submitBtn);
        this.length = this.$ver.length;
        this.verifyValue = [];
        if(this.length>0){
            this._init();
        }else{
            //console.log('没有需要验证的表单!');
        }
    }

    //初始化验证插件
    _init (){
        let [ mustFill, that] = [ [], this];
        for(let i=0; i<this.length; i++){
            let verifyData = this._formatJson(this.$ver.eq(i).attr('data-verify'), this.$ver.get(i));
            this.verifyValue.push(verifyData);
            verifyData.required && mustFill.push(this.$ver.eq(i));
        }
        //必填的监听
        this._unEmpty(mustFill);
    }

    //格式化字符串
    _formatJson (string, ele){
        let [json, tmp, key, value] = [{}, [], '',''];
        tmp = string.trim().split(',');
        for(let i=0; i<tmp.length; i++){
            let vArr= tmp[i].split(':');
            key = vArr[0].trim().replace(/{|}/,'');
            value = vArr[1].trim().replace(/{|}/,'');
            json[key] = value.trim();
        }
        json['ele'] = ele;
        return json;
    }

    /**
     * 验证表单,自动获取表单中的参数，参与验证
     **/
    check(){
        let verifyValue = this.verifyValue, passwordValue;
        return verifyValue.every(function(item, index){
            //console.log(item);
            let [type, value, result, msg] = [item.type, item.ele.value, true, item.msg];
            switch (type){
                case 'userName':
                    if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value) || /^[0-9]{11}$/.test(value))){
                        popup({
                            type: 'tips',
                            hideTimes: 2000,
                            message: msg
                        });
                        result =false;
                    }
                    break;
                case 'tel':
                    if(!/^[0-9]{11}$/.test(value)){
                        popup({
                            type: 'tips',
                            hideTimes: 2000,
                            message: msg
                        });
                        result =false;
                    }
                    break;
                case 'email':
                    if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)){
                        popup({
                            type: 'tips',
                            hideTimes: 2000,
                            message: msg
                        });
                        result =false;
                    }
                    break;
                case 'password':
                    if(!/^[a-z0-9A-Z]{6,18}$/.test(value)){
                        popup({
                            type: 'tips',
                            hideTimes: 5000,
                            message: msg
                        });
                        result =false;
                    }
                    passwordValue=value;
                    break;
                case 'repassword':
                    if(value!=passwordValue){
                        popup({
                            type: 'tips',
                            hideTimes: 5000,
                            message: msg
                        });
                        result =false;
                    }
                    break;
                default : break;
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
    lookover (btn, ele){
        let flag = true;
        btn.on('tap', function(){
            if(flag){
                btn.removeClass('icon-eye-close').addClass('icon-eye-open');
                ele.attr('type', 'text');
            }else{
                btn.removeClass('icon-eye-open').addClass('icon-eye-close');
                ele.attr('type', 'password');
            }
            flag = !flag;
        });
    }

    //是否为空
    _unEmpty(eleArray){
        let [isSubmit, that, form] = [null, this, eleArray[0].parents('form').eq(0)];
        let mustItem = document.getElementById('J_ConfirmFieldsTerms');
        if(eleArray.length<=0){
            return false;
        }
        form.bind('keyup change', function(event){
            if(mustItem && !mustItem.checked){
                that.$submitBtn.attr('disabled', 'disabled');
                return false;
            }

            if(event.target.nodeType == 1){
                isSubmit = eleArray.every(function(item, index){
                    if(item[0].nodeName.toLocaleLowerCase() == 'select'){
                        return item.val()!=0;
                    }else{
                        return item.val()!='';
                    }
                });
                //if(event.target){}
            }
            if(isSubmit){
                that.$submitBtn.removeAttr('disabled');
            }else{
                that.$submitBtn.attr('disabled', 'disabled');
            }
        });
    }
}

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

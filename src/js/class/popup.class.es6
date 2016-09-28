/**
 * Created by xiangran.kong on 16/08/03.
 */
class Popup {
    constructor (){
        let that = this;
        //初始化，传参数
        this.init = function (opts){
            let type = opts.type;
            switch (type){
                case 'tips':  that._tips(opts);  break;
                case 'alert': that._alert(opts); break;
                case 'wechat': that._wechat(opts); break;
                default : that._tips(opts); break;
            }
            return 'end';
        }
    } 

    _hideMask (ele){
        let maskDiv = ele || document.getElementById('J_Mask');
        maskDiv.style.display='none';
    }

    /**
     * 弹窗，提示窗，遮罩等
     * @param type 指定弹窗的类型， 分为tips：提示窗； alert:弹窗，需要确认； mask: 蒙层,二维码等
     * @param hideTimes 消失时间, 默认为2s
     * @param message 提示消息
     * **/
    _tips (options){
        const [ts = 2000 ,msg, that] = [options.hideTimes, options.message, this];
        let callback = options.callback,
            maskDiv = document.getElementById('J_Mask');
        if(maskDiv){
            maskDiv.style.display='block';
            maskDiv.innerHTML = '<p class=\"m-tips\">'+msg+'</p>';
        }else{
            let p = document.createElement('p');
            p.className='m-tips', p.innerHTML = msg;
            maskDiv = document.createElement('div');
            maskDiv.className = 'm-mask', maskDiv.id = 'J_Mask';
            maskDiv.appendChild(p);
        }
        $('body').append(maskDiv);
        setTimeout(function () {
            that._hideMask(maskDiv);
            // 回调
            if(callback){
                callback();
            }
        }, ts);
        // 点击提示窗,隐藏提示窗并立刻执行回调函数
        that.on('tap', function () {
            that._hideMask();
            if(callback){
                callback();
            }
        });
    }

    // 微信客服
    _wechat (options){
        let html = '<div class=\"m-alert-mask\"><div class=\"m-mask-content\"><div class=\"m-mask-img\"><img src="' + options.imgUrl + '" alt=""><p>' + options.message + '</p></div></div></div>';
        $('body').append(html);
        $('.m-alert-mask').on('tap', function () {
            $('.m-alert-mask').remove();
        })
    }
}

/**
 * 弹窗，提示窗，遮罩等
 * @param type 指定弹窗的类型， 分为tips：提示窗； alert:弹窗，需要确认； mask: 蒙层,二维码等
 * @param hideTimes 消失时间
 * @param message 提示消息
 * @param callback 回调函数
 * **/

var pop = new Popup();
$.pop = pop.init;

export function popup(options){
    return pop.init(options);
}

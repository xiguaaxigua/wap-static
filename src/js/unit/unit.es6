/**
 * Created by xiangran.kong on 16/08/05.
 */
/**
 * 获取对象元件，来获取DOM元素
 * get.id
 * @param id string类型，返回DOM对象
 * get.cls
 * @param className strign类型，返回DOM元素组成的数组
 * get.qs
 * @param name string类型,通过querySelector来获取单个DOM元素；
 * get.qsa
 * @param name string类型，通过querySelectorAll来获取元素列表，返回数组；
 * **/  
let getUnit = {
    id(id){
        return typeof(id) === 'string' ? document.getElementById(id) : id;
    },
    cls (className){
        if(typeof(className)!=='string'){
            //console.warn('传入的值类型不是字符串！请检查传入的值');
            return false;
        }
        let classArray = [];
        if(document.getElementsByClassName){
            let classList = document.getElementsByClassName(className);
            for(let j in classList){
                classList[j].nodeType && classArray.push(classList[j]);
            }
        }else {
            let allElement = document.getElementsByClassName(className);
            for(var i in allElement){
                if(allElement[i].getAttribute('class') == className){
                    classArray.push(classList[i]);
                }
            }
        }
        return classArray;
    },
    qs (name){
        if(typeof(name)!=='string'){
            //console.warn('传入的值类型不是字符串！请检查传入的值');
            return false;
        }
        if(document.querySelector){
            return document.querySelector(name);
        }else{
            //console.warn('您的浏览器不支持，请赶紧更新浏览器');
            return [];
        }
    },
    qsa (name){
        if(typeof(name)!=='string'){
            //console.warn('传入的值类型不是字符串！请检查传入的值');
            return false;
        }
        if(document.querySelectorAll){let [classArray,list] = [[], document.querySelectorAll(name)];
            for(var i in list){
                if(list[i].getAttribute('class') == className){
                    classArray.push(list[i]);
                }
            }
            return classArray;
        }else{
            //console.warn('您的浏览器不支持，请赶紧更新浏览器');
            return [];
        }

    }
};
/**
 * 事件绑定
 *  addListener function,增加事件监听
 * @param ele  DOM元素，需要绑定的元素
 * @param type  string,事件类型
 * @param handle  fun类型 元素绑定执行的函数
 * removeListener function,移除事件绑定
 * @param ele  DOM元素，需要移除绑定的元素
 * @param type  string,移除事件类型
 * @param handle  fun类型 元素移除；执行的函数
 * **/
let eventUnit = {
    addListener (ele, type, handle){
        if(ele.addEventListener){
            ele.addEventListener(type, handle, false);
        }else if(ele.attachEvent){
            ele.attachEvent('on'+type, handle);
        }else{
            ele['on'+type] = handle;
        }
    },
    removeListener (ele, type, handle){
        if(ele.remvoeEventListener){
            ele.remvoeEventListener(type, handle, false);
        }else if(ele.detachEvent){
            ele.detachEvent('on'+type, handle);
        }else{
            ele['on'+type] = handle;
        }
    }
};
/**
 * 操作Cookie
 *  setCookie function,设置cookie
 * @param name  string，cookie名称
 * @param val  string,cookie中要存放的字符串
 * @param day  number类型 元素绑定执行的函数
 * getCookie function,获取指定cookie
 * @param name  string，cookie名称
 * delCookie function,删除指定cookie
 * @param handle  fun类型 元素移除；执行的函数
 * **/
let cookieUnit = {
    setCookie (name, val, day){
        let days = day || 30,
            exp = new Date();
        exp.setTime(exp.getTime() + days*24*60*60*1000);
        document.cookie = name + "="+ escape(val) + ";expires=" + exp.toGMTString()+";path=/";
    },
    getCookie (name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    },
    delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
    }
};

export {getUnit, eventUnit, cookieUnit};

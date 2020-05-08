/* ----------------------------------------------------------存储cookie----------------------------------------------------------- */
//  参数是 键 值 距离当前日期的过期天数(传数字) 路径 域名 变量小驼峰命名

function addCookie(key,value,day,path,domain) {
    // 1.处理默认保存的路径 window.location.pathname获取当前页面路径(含文件名故需截取)
    var index = window.location.pathname.lastIndexOf("/")
    var currentPath = window.location.pathname.slice(0, index);
    path = path || currentPath;
    // 2.处理默认保存的域名 document.domain获取当前页面域名
    domain = domain || document.domain;
    // 3.处理默认的过期时间
    if(!day){
        document.cookie = key+"="+value+";path="+path+";domain="+domain+";";
    }else{
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key+"="+value+";expires="+date.toUTCString()+";path="+path+";domain="+domain+";";
    }
}

/* ----------------------------------------------------------获取指定cookie----------------------------------------------------------- */
// 传入cookie键返回对应值
function getCookie(key) {
    var res = document.cookie.split(";");
    for(var i = 0; i < res.length; i++){
        var temp = res[i].split("=");                                       nnnnnn
        if(temp[0].trim() === key){
            return temp[1];
        }
    }
}

/* ----------------------------------------------------------删除指定cookie----------------------------------------------------------- */

// 原理是调用添加cookie方法设置同名 同value值 但时间为过期的 即可删除 因添加cookie不传path就是默认路径 则只可删除默认路径下的 若想删除其他路径的 需指定路径
function delCookie(key,path) {
    addCookie(key, getCookie(key), -1, path);
} 

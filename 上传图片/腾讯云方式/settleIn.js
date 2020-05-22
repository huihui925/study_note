(function () {
    

    setToken ();
    let token = window.localStorage.getItem('token')

    // baseURL
    let baseURL = 'http://app.qjbb5188.com/';
    // input dom
    let name = document.getElementById('name')
    let identityId = document.getElementById('identityId')
    let shopName = document.getElementById('shopName')
    /*----------------------file类型的input dom元素-------------------------*/
    let uploadInput = document.getElementById('uploadInput')
    let phone = document.getElementById('phone')
    let agree = document.getElementById('checkbox-input')
    // 提示 dom
    let nameTips = document.getElementById('name-tips')
    let identityIdTips = document.getElementById('identityId-tips')
    let shopNameTips = document.getElementById('shopName-tips')
    let uploadInputTips = document.getElementById('license-tips')
    let phoneTips = document.getElementById('phone-tips')
    let agreeTips = document.getElementById('agreement-tips')
    // 提交按钮
    let submitBtn = document.querySelector('.btn-settle');
    // img显示
    let imgDom = document.getElementById('upload-img');
    
    // 提交的数据
    let submitData = {};

    // 图片文件上传
    uploadInput.addEventListener('change', fileCheck); // 监听上传input的change事件
    // 上传文件对象
    let selectedFile
    // 上传文件名
    let filename
    function fileCheck() {
        // 上传文件对象
        selectedFile = uploadInput.files[0]
        // 上传文件名
        filename = selectedFile.name
        
        // console.log(selectedFile)

        // 图片验证大小和类型
        let type = filename.substr(filename.lastIndexOf('.') + 1)

        if (type !== 'png' && type !== 'jpg' && type !== 'jpeg') {
            uploadInputTips.innerText = '请上传jpg、jpeg、png类型图片!'
            return;
        }
        if (selectedFile.size >= 1024 * 2000) {
            uploadInputTips.innerText = '图片大小超过限制!'
            return;
        }

        // 图片验证通过 预览回显
        let tempUrl = getObjectURL(selectedFile);
        if (tempUrl) {
            imgDom.setAttribute('src', tempUrl);
            imgDom.className = 'prelook';
        }
        let guid = new GUID();
        let radom = guid.newGUID();
        /*正则处理一下，将中间的-去掉*/
        let strName = radom.replace(/-/g, "");
        filename = strName + '.' + type
        console.log(filename)
        // 验证通过上传腾讯云

        upload()
    }

    // console.log(COS)
    // 储存桶名称
    var Bucket = 'test-1250000000';
    // 储存桶地域名称
    var Region = 'ap-guangzhou';

    // 腾讯云上传
    function upload() {
        let Bucket,Region,SecretId,SecretKey
        axios({
            method: 'get',
            url:baseURL + 'app/index.php?c=entry&m=ewei_shopv2&do=mobile&r=video.index.cos_sign&i=111',
        })
        .then(data=>{
            console.log(data)
            let tmpdata = data.data.data
            console.log(tmpdata)
            Bucket =tmpdata.Bukkit
            Region = tmpdata.Region
            SecretId =tmpdata.SecretID
            SecretKey = tmpdata.SecretKey
            let cos = new COS({
                SecretId,
                SecretKey
            })
            cos.putObject({
                Bucket,
                Region,
                Key: filename,
                StorageClass: 'STANDARD',
                Body: selectedFile, // 上传文件对象
                onProgress: function (progressData) {
                    // console.log(JSON.stringify(progressData)); 
                }
            }, function (err, data) {
                console.log(err || data);
                // console.log(data.Location);
                submitData.business_license = data.Location
            })
        })
    }


    // 本地回显图片
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {    // mozilla(firefox)  
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome  
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    
    // 提交表单
    submitBtn.onclick = function () {
        let data = checkInput();
        if(data){
            data.token = token;
            // console.log(data)
            axios({
                method: 'post',
                url: baseURL + 'app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=shop.merch.apply',
                data: data ,
                transformRequest: [function (data) {
                    let ret = '';
                    for (let it in data) {
                        ret += "&" + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
                    }
                    return ret.slice(1)
                }]
            })
            .then (res=>{
                console.log(res)
                if(res.data.code === 1){
                    window.location.href = 'SettledSuc.html'
                    // 图片清除
                    imgDom.setAttribute('src', './img/upload.png'); 
                    imgDom.className = '';
                }
            })
        }
    }

    // 表单验证方法
    function checkInput() {
        if (!name.value) {
            nameTips.innerText = '请填写姓名！'
            return
        }
        submitData.realname = name.value;
        nameTips.style.display = 'none';

        let idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!identityId.value || idReg.test(identityId.value) === false) {
            identityIdTips.innerText = '身份证格式不正确'
            return
        }
        submitData.idcard = identityId.value;
        identityIdTips.style.display = 'none';


        if (!shopName.value) {
            shopNameTips.innerText = '请填写店铺名'
            return
        }
        submitData.storename = shopName.value;
        shopNameTips.style.display = 'none';

        if (!uploadInput.value) {
            uploadInputTips.innerText = '请上传营业执照'
            return
        }
        uploadInputTips.style.display = 'none';

        if (!phone.value) {
            phoneTips.innerText = '请填写手机号码'
            return
        }
        let phoneReg = /^1[3456789]\d{9}$/;
        if(!(phoneReg.test(phone.value))){ 
            phoneTips.innerText = '手机号码格式有误'
            return 
        }
        submitData.uname = phone.value;
        phoneTips.style.display = 'none';

        if (agree.checked == false) {
            agreeTips.innerText = '商家协议未确认'
            return
        }
        agreeTips.style.display = 'none';
        
        submitData.upass = '123456'
        return submitData
    }

    // 图片命名随机数
    function GUID() {
        this.date = new Date();
     
        /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
        if (typeof this.newGUID != 'function') {
            
            /* 生成GUID码 */
            GUID.prototype.newGUID = function() {
                this.date = new Date();
                var guidStr = '';
                    sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
                    sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
                for (var i = 0; i < 9; i++) {
                    guidStr += Math.floor(Math.random()*16).toString(16);
                }
                guidStr += sexadecimalDate;
                guidStr += sexadecimalTime;
                while(guidStr.length < 32) {
                    guidStr += Math.floor(Math.random()*16).toString(16);
                }
                return this.formatGUID(guidStr);
            }
            /*
             * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
             * 返回值：返回GUID日期格式的字条串
             */
            GUID.prototype.getGUIDDate = function() {
                return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
            }
     
            /*
             * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
             * 返回值：返回GUID日期格式的字条串
             */
            GUID.prototype.getGUIDTime = function() {
                return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero( parseInt(this.date.getMilliseconds() / 10 ));
            }
     
            /*
             * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
             * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
             * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
             */
            GUID.prototype.addZero = function(num) {
                if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
                    return '0' + Math.floor(num);
                } else {
                    return num.toString();
                }
            }
     
            /* 
             * 功能：将y进制的数值，转换为x进制的数值
             * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
             * 返回值：返回转换后的字符串
             */
            GUID.prototype.hexadecimal = function(num, x, y) {
                if (y != undefined) {
                    return parseInt(num.toString(), y).toString(x);
                } else {
                    return parseInt(num.toString()).toString(x);
                }
            }
            /*
             * 功能：格式化32位的字符串为GUID模式的字符串
             * 参数：第1个参数表示32位的字符串
             * 返回值：标准GUID格式的字符串
             */
            GUID.prototype.formatGUID = function(guidStr) {
                var str1 = guidStr.slice(0, 8) + '-',
                    str2 = guidStr.slice(8, 12) + '-',
                    str3 =  guidStr.slice(12, 16) + '-',
                    str4 = guidStr.slice(16, 20) + '-',
                    str5 = guidStr.slice(20);
                return str1 + str2 + str3 + str4 + str5;
            }
        }
    }
    


})();
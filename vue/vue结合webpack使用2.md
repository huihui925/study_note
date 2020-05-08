# 前言

vue脚手架已将vue全家桶都安装了,所以这里不需要再安装,若提到了安装仅了解.

建议直接用脚手架安装后再使用

# render

引入vue使用render, render是vue实例上的属性

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el:'#app'
  render: h => h(App)
}).$mount('#app')
```

```js
render(createElements){//createElements是一个方法,调用它可以将指定的组件模板渲染为html结构
    return createElements (login1) //return的结果,会将el选定的元素替换为login1指定的组件,里面的内容也全部替换
}
```

# vue-router

## 安装和注册

```js
//1. 安装
yarn add vue-router
//2. 使用
import Vue from 'vue'
import VueRouter from 'vue-router'

//3.必须要通过 Vue.use() 明确地安装路由功能, 如果使用全局的 script 标签，则无须如此 (手动安装)。
Vue.use(VueRouter)
```

然后其他创建router对象,挂载到实例上等等操作不变

## this.$route路由参数对象

> 在vue实例中通过this.$route获取,进一步得到路由路径参数.

## this.$router路由导航对象

### this.$router.push('path路径')

> 编程式导航，跳转到指定url,参数就是路由匹配规则中的path路径,这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

前面写了==name 在路由匹配规则中需写对应的==，这个name表示这个的名字,name匹配后会展示对应组件,name的更多用法自行百度

```js
  { path: '/',name: 'home',component: Home},
```

### this.$router.go(1)

参数是数值,1前进,若为-1则后退

> 更多api在它的原型上查看

# vue-resource

```js
//1.安装
yarn add vue-resource
//2.使用
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
```

# axios

> axios也是发ajax请求的 里面只有ajax功能
> 有get post 没有jsonp
> jsonp用得少 后续有其他代替
> 数据必须点data获取
>
> axios不是vue官方提供的 所以不能通过Vue.use(‘axios’)安装 如果想挂在Vue上 让任何组件都能直接调用 就把它挂在prototype上

```js
//安装
npm install axios --save

//引入axios
import axios from 'axios'
Vue.prototype.axios = axios;
```

# vue模板对象文件

```js
<template>
  <div class="home">
    123
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
  /*         里面还有/deep/知识          */
</style>

```

# vuex状态管理

vuex官网很详细,建议看官网https://vuex.vuejs.org/zh/

> 脚手架已经安装好了,基础的也写好了直接使用就行

```js
//1.安装
yarn add vuex

//2.引入并创建store将其导出
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    名字(state){
    }
  },
  getters: {
    名字(state){//键为名,值为方法,接收state作参数
      return xxx
    }
  },
})

//3. 将导出的store引入 并通过变量store接收 再挂载store 和router同级
new Vue({
  router,
  store,
  render: h => h(App)
})
```

### state

>类似vue实例中的data,这里放的是数据.

```js
//在组件中使用:
this.$store.state.数据名
```

### mutations

> 类似vue实例中的methods,通过调用这里面的方法改变state的数据,而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化。对象里键是方法名,值是函数,函数接收state作第一参数,所以第一参数固定

```js
//在组件中使用:
//一参是方法名,表调用此方法, 二参可以是任意形式的东西,意为给方法传参.注意只能传一个参,若想多个,可通过对象将其放对象里一起传过去,另一边通过点对象取出
this.$store.commit('increment')//不传参
this.$store.commit('increment',1)//传一个参
this.$store.commit('increment',{name:12.age:66})//传多个参
this.$store.commit('increment',1,2)//2不能传过去,因为顶多只能有一个坑传
```

### getters

> 类似vue实例中的computed,键是计算属性名,值是函数,return 值,所依赖的数据改变则执行对应函数,不可直接更改,依赖内部的变化而变化,接收state作第一参数,Getter 也可以接受其他 getter 作为第二个参数
>
> 通常是对state数据进行过滤或者包装后再return出去,组件直接使用包装后的结果

```js
//在组件中使用:
this.$store.getters.名字
```



# 查看隐藏的配置文件

## [使用 vue-cli-service inspect 来查看一个 Vue CLI 3 项目的 webpack 配置信息（包括：development、production）](https://www.cnblogs.com/cag2050/p/10523096.html)

### 使用 `vue-cli-service inspect` 来查看一个 Vue CLI 3 项目的 webpack 配置信息（包括：development、production）

1. --mode 指定环境模式 (默认值：development)
2. 运行命令，在终端输出：
     开发环境：`npx vue-cli-service inspect --mode development`
     生产环境：`npx vue-cli-service inspect --mode production`
3. 运行命令，将输出导入到 js 文件：
     开发环境：`npx vue-cli-service inspect --mode development >> webpack.config.development.js`
     生产环境：`npx vue-cli-service inspect --mode production >> webpack.config.production.js`
4. 在产生的 js 文件开头，添加：`module.exports =`，然后格式化即可查看。
5. 官方网址：https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-inspect

# [Vue-Cli4.x配置文件路径别名](https://www.cnblogs.com/zwnsyw/p/12316622.html)

提示：和package.json同级新建vue.config.js文件(可选文件，默认没有创建)。在vue.confg.js中添加如下代码

```js

const path = require('path');//引入path模块

function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@', resolve('src'))
				.set('@components', resolve('src/components'))
				.set('@static', resolve('src/static'))
        .set('@views',resolve('src/views'))
        .set('@assets',resolve('src/assets'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    }
}
```

# 封装axios,这里结合了vant消息提示功能

```js
/****** 引入axios、qs依赖, qs是axios内的,无需单独安装 ******/
import axios from "axios";
import qs from "qs";//序列化post类型的数据,post请求需要

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: 'http://192.168.11.114',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

/****** request拦截器==>对axios请求配置做统一处理 ******/
let axiosTime = 0
service.interceptors.request.use(config => {
  axiosTime++
  //vant提示功能,forbidClick禁用背景点击
  Toast.loading({
    message: '正在加载...',
    forbidClick: true
  });
  config.method === 'post'
    ? config.data = qs.stringify({ ...config.data })
    : config.params = { ...config.params };
  //从本地存储拿token,除了第一次登陆页面没有,其他都有,开发阶段默认写死token
  const token = window.localStorage.getItem('token') || 'f464b59f-3915-4328-acf8-36bae54db5ba'
  if (token) { // 若token存在，则每个http header都加上token
    config.headers.Authorization = token;//请求头加上token
  }
  return config;
}, err => {
  return Promise.reject(err)
});

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据 
    axiosTime--
    if (axiosTime == 0) {
      Toast.clear();//手动清除 Toast
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {  //响应错误处理
    axiosTime--
    if (axiosTime == 0) {
      Toast.clear()
    }
    return Promise.reject(error)
  }
);
/****** axios实例暴露出去 ******/
export default service;
```

```js
// 调用方法 在需要的页面导入就可以使用了,最后在主文件main.js导入,挂在Vue的prototype上
//post请求参数放在data里面，get请求参数放在params里。
const obj = {
  id: 1
};
service({
  url: '/person_pay/getpersoninfo',
  method: 'post',
  data: obj
})
service({
  url: '/person_pay/getpersoninfo',
  method: 'get',
  params: obj
})
```
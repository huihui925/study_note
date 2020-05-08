# 1 创建基本项目

```shell
vue create '项目名字'
```

> 自定义

```shell
? Please pick a preset:
  default (babel, eslint)
> Manually select features  
```

> Unit Testing单元测试,这里选择三项

```shell
? Please pick a preset: Manually select features
? Check the features needed for your project:
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 (*) CSS Pre-processors
 ( ) Linter / Formatter
>(*) Unit Testing
 ( ) E2E Testing  
```

> dart-sass是sass的实现版本, 意味着新功能早于其他版本,编译快.

```bash
? Pick a CSS pre-processor (PostCSS, Autoprefixer
and CSS Modules are supported by default): (Use ar
row keys)
> Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus     
```

> 选择单元测试方案：Jest 不能测试ui没法测试dom元素，而我们的单元测试需要测ui，所以选择Mocha + Chai

```shell
? Pick a unit testing solution: (Use arrow keys)
> Mocha + Chai #ui测试需要配合karma一起使用,这个vue自带配置里没有,需单独配置
  Jest  
```

> 配置文件放哪里?放在专门的配置文件还是包的json中.这里选择json中

```shell
? Where do you prefer placing config for Babel, ES
Lint, etc.? (Use arrow keys)
  In dedicated config files
> In package.json   
```

> 把它作为未来项目的预置,选择no

```shell
? Save this as a preset for future projects? (y/N)  
```

最后直接回车安装即可

# 2 基本准备

## 2.1 创建组件目录

在`src`下新建目录`packages`, 放所有组件.

`packages`目录介绍:

`index.js `: 所有组件入口文件.要把所有组件放全局下,那么逻辑在这个文件里写.

其他`.vue`文件是ui组件文件.

![image-20200506160547194](E:\zhouxiaohui\study_note\打造自己的ui组件库\打造ui组件库知识点.assets\image-20200506160547194.png)

## 2.2 设置为全局组件

> packages/index中写, 暴露install方法,方法里面放的就是把所有组件注册为全局组件

这里用到require.context,[详细用法参考链接](https://www.jianshu.com/p/c894ea00dfec),若链接失效参考文件(答疑图)

```js
const install = (Vue) => {
    //把所有组件设置为全局组件
    const requireComponent = require.context('.',true,/\.vue$/)
    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName).default
        Vue.component(config.name,config)
    });
}
/*--------------------------两种情况 兼容写法-------------------------------------*/
//如果Vue是通过script引入的,Vue放在window下,需我们手动调用install方法
if(typeof window.vue !== 'undefined'){
    install(Vue)
}
//一般是import导入的Vue,所以我们可export导出install,use时自动调用此方法
export default {
    install
}
```

> 在vue的main.js中引入,并use

```js
//引入 取名
import zfUi from './packages/index'

//Vue.use()默认自动调用install方法,执行install方法逻辑,会把'./packages/index'它下面所有组件,变成全局组件,相当于所有组件都可以使用
Vue.use(zfUi)
```

# 3 ui组件编写






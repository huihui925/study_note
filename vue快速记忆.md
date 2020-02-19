# vue中基本结构

```javascript
 	<div id="app">
    </div>
    <script src="./vue.js"></script>
    <script>
        //引入vuejs文件后有了Vue构造函数 通过new得出vue实例,el要控制的区域,data数据,methods方法
    let vm = new Vue({
            el: '#app',
            data: {
            },
            methods: {
            },
        })
    </script>
```

注意: 在实例中访问data数据或者methods方法必须通过this访问,data和methods是直接挂在实例上的

# 插值表达式{{}}

> 用插值表达式后 里面写的就是变量 可直接用data身上的数据

```javascript
<div id="app">
	{{msg}}
</div>

data: {
   msg:'嗯嗯'
},
```

# v-cloak

> cloak译斗篷 遮掩  人为给标签写上此属性 ,若插值表达式数据没渲染出来就有此属性,若渲染出来了会自动删除属性,可通过设置属性style解决闪烁问题(用得少)

```javascript
<style>
    [v-cloak]{
        display: none;
    }
</style>

<div id="app" v-cloak>
    {{msg}}
</div>
```

# v-text

> 覆盖标签所有内容 以文本字符串显示 不转化标签

```javascript
<div id="app" v-text='msg'>       
</div>

data: {
   	msg:'嗯嗯'
},
```

# v-html

> 覆盖标签所有内容 会转化标签

```javascript
<div id="app" v-html='msg'>       
</div>

data: {
   	msg:'<h1>嗯嗯</h1>'
},
```

# v-bind缩写( : )

> 绑定后,里面写的就是变量

```javascript
<input type="button" :value="msg">

data: {
   	msg:'嗯嗯'
},
```

# v-on缩写( @ )

> 事件绑定 内写function或表达式(表达式必须是实例身上的变量 其他console.log('ok')这种不行)

```javascript
<button @click='show'>按钮</button>
// 也可show( )等效 区别是后者可传参
methods: {
    show(){
        console.log('ok')
    }
},
```

```javascript
<button @click='flag=!flag'>按钮</button>

data: {
  flag:true
},
```

==注意: 方法可以只写名字,也可名字(),例show和show( )等效,唯一的区别是后者可以传参==

# v-model

> 数据双向绑定 ==仅限表单元素==可用
>
> 这里是v-model类似value 但是区别是可双向绑定 用户输入内容更改value值时data中msg也会改变

```javascript
<input type="text" v-model="msg">
```

# v-for 及 :key

> ==for循环 必须写key值(key只接受string或number) 两者配套==可循环如下:
>
> 1. 数组 (item,i)分别是值和下标
>
> 2. 对象(item,key,i) 分别是值 键 下标
> 3. 数字(item,i) 值和下标  值从1开始
>
> 以上下标都从0 开始

```javascript
<p v-for='(item,i) in list' :key='i'>{{item}}---{{i}}</p>

data: {
   list:[1,2,3]
},
```

# v-if 

> 通过删除和创建元素 达到显示和隐藏元素目的,有较高切换消耗 为true则显示 false隐藏

```javascript
<p v-if='flag'>123</p>
data: {
   flag:true
},
```

# v-else-if 及 v-else

>  v-else 和 v-else-if 元素必须紧跟在带 v-if 或者 v-else-if 的元素之后, 否则无法识别

==类似js中的`if`和`else if`和`else`判断语句,有一个判断正确其他的就不会被执行,而`else`是只要前面的都不满足就执行`else`的,而`else`自己不管是true或false都不影响==

![img](https://img-blog.csdn.net/20180921182246217?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)![img](https://img-blog.csdn.net/20180921182349362?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

# v-show

> 通过设置display:none来显示隐藏元素,有较高初始渲染消耗

```javascript
<p v-show='flag'>123</p>
data: {
   flag:true
},
```

# .stop事件修饰符

> 停止冒泡

```
<button @click.stop='show'>按钮</button>
```

# .prevent事件修饰符

> 阻止默认行为 例a链接默认跳转

```
<button @click.prevent='show'>按钮</button>
```

# .capture事件修饰符

> 开启捕获 在需要捕获的外层元素上设置
>
> 例: 点击按钮后会先触发div事件 再触发按钮事件

```
<div @click.capture='show'>
     <button @click='btn'>按钮</button>
</div>
```

# .once事件修饰符

> 事件只触发一次

```
<button @click.once='btn'>按钮</button>
```

注意 事件修饰符可写多个 从左往右执行

```
<button @click.once.prevent='btn'>按钮</button>
```

# .self事件修饰符

> 不会因冒泡或捕获触发事件 只会因自己触发才触发(只管自己 若冒泡到别人身上是管不了的 例123, 2是自己 点击1后 触发1 冒泡3 不触发2)

```
<div @click.self='show'>
    <button @click='btn'>按钮</button>
</div>
```

# :class绑定类

```javascript
//数组
<h1 :class="['red', 'thin']">这是一个邪恶的H1</h1>

//数组中使用三元表达式
<h1 :class="['red', 'thin', isactive?'active':'']">这是一个邪恶的H1</h1>

//数组中嵌套对象
<h1 :class="['red', 'thin', {'active': isactive}]">这是一个邪恶的H1</h1>

//直接使用对象
<h1 :class="{red:true, italic:true, active:true, thin:true}">这是一个邪恶的H1</h1>

```

# :style绑定行内样式

```javascript
//1.直接写对象
<h1 :style="{color: 'red', 'font-size': '40px'}">这是一个善良的H1</h1>
//2.数组内写多个对象
<h1 :style="[h1StyleObj, h1StyleObj2]">这是一个善良的H1</h1>
data: {
        h1StyleObj: { color: 'red', 'font-size': '40px', 'font-weight': '200' },
        h1StyleObj2: { fontStyle: 'italic' }
}
```

# 全局过滤器

> 作用: 对显示的数据内容进行处理
>
> 定义: 全局过滤器,所有实例都可使用.通过Vue.filter()过滤器定义 一参是过滤器名字,二参是function,返回处理后的数据即显示此内容,function的一参固定为管道分隔符前面要处理的数据,一参之后都是传递的数据例guolv( 123 )
>
> 使用: 只能在v-bind 和{{ }}表达式中使用, | 管道分隔符后写过滤器名字.

```javascript
<div id="app">
     {{msg | guolv(123)}}
</div>

Vue.filter('guolv',function(data,a){
	//data为msg数据  a为传的123
    return data.replace(/单纯/g,'邪恶')
})
data: {
    msg:'现在的我是一个单纯的少年'
},
```

==注意: 过滤器可同时使用多个,用 | 符号链接,每个过滤器处理的数据都是前面过滤器处理好的数据结果==

# 私有过滤器

> 全局过滤器是所有实例都可使用,若只想自己实例使用则定义私有过滤器
>
> 私有过滤器在实例内的filters上定义,其他不变.filters对象,内的键是过滤器名字,值为function即处理函数

```
 new Vue({
            filters: {
                guolv(data) {
                    return data.replace(/单纯/g, '美丽')
                }
            }
        })
```

# 字符串的padStart方法使用

> padStart是在前面补字符串内容,一参是补后的总长度(原长度+补的),二参是要补的字符串,若补后长度超过规定的长度,则截断到规定的长度,若满足总长度则不补
>
> str.padStart(补后的总长度,要补的字符串)

案例: 可用于进行补0操作,例时间为9秒时 使其为09秒

```
let str = '10'
console.log(str.padStart(2,0)) //10 不进行补

let str1 = '9'
console.log(str1.padStart(2,0)) //09 补0了
```



# 字符串的padEnd方法使用

> 和padStart类似 唯一的区别是从后面补字符串内容

# 按键修饰符

> 在事件后用按键修饰符 例.enter 或者.f2 都代表此事件后点击对应按键 才触发
>
> 例: 这里keyup事件不会直接触发,而是点击键盘的enter键后再触发,这就是按键修饰符作用,键盘的大部分键都可直接用

```
<input type="text" @keyup.enter='show' v-model='msg'>
```

# 自定义全局指令

**通过Vue.directive('指令名',{ })来自定义全局指令**

一参: 指令名,定义时不写`v-`,使用时必须写 `v-`这是规定

二参: 是`{ }`,对象里是指令函数**(指令函数接收第一个参数为绑定的元素,原生js对象,第二个参数是对象,对象身上的value属性获取传递的值),**类似钩子函数,特定时候自动调用

​			bind: 指令绑定到元素身上时调用,此时元素还未插入到dom中,只调用一次

​			inserted: 当元素插入到dom中调用,只调用一次

​			update: 被绑定元素所在的模板更新时调用,会调用多次

==总结: bind通常用于style样式设置,进行了样式设置哪怕此时未插入dom也不影响,会生效,==

​		  ==inserted通常用于行为,事件设置,若在bind中设置事件,此时压根就没插入dom中,事件不会生效==.

案例1: 所有函数第一个参数为绑定的元素(原生dom对象),使第一次进入页面, 文本框就自动获取焦点,原生js中有.focus()事件 自动获取焦点

```javascript
<input type="text" v-focus>
    
Vue.directive('focus', {
    bind(){

    },
    inserted(el){
        el.focus()
    },
    update(){

    }
})    
```

案例2: 可传参,通过第二个参数身上的value属性 获取传递的red值

```javascript
<input type="text" v-color="'red'">

bind(el,binding){
    el.style.backgroundColor = binding.value
},
```

# 自定义私有指令

>  在实例身上设置,其他不变

```javascript
new Vue({
    el: '#app',
    directives: {
        color: {
            bind(el, binding) {
                el.style.backgroundColor = binding.value
            }
        },
    }
})
```

# 指令的简写

> 可不写对象直接写函数,这样就相当于同时在bind和update函数中写,如果需要在inserted中写就不能用简写方式

```javascript
directives: {
     color(el, binding) {
         el.style.backgroundColor = binding.value
     }
 }
```

# 生命周期

![vue生命周期](D:\study_note\img\vue生命周期.png)

# vue-resource( 了解 )

> 之前用ajax发请求,但这是jquery内的,jquery主要是操作dom,vue不推荐 所以vue发请求用vue-resource或者axios,推荐用axios,这里对vue-resource做了解



```javascript
//vue-resource基于vue,需先引入vue再引入vue-resource,引入后会在vue实例上多一个$http属性 用此发请求
<script src="./vue.js"></script>
<script src="./vue-resource.js"></script>

//1. get请求 通过.then从形参.body获取数据
this.$http.get('https://nei.netease.com/api/apimock/da68599b1e25ca4e8c9c1cdddaef9761/user/current').then(res=>{
       console.log(res.body)
})

//2. post请求
//一参:url请求地址  二参:body为对象 传的数据  三参:option为对象 指定post提交编码 二三参可选项 三参一般不写,    在旧的使用中post请求,默认没表单数据格式,会报错,所以需option设置为{ emulateJSON: true }表指定为一般表单格式,如今已解决,不设置也不会报错
this.$http.post(url,body,option).then(res=>{
      console.log(res.body)
})

//3.jsonp
//跨域请求 使用方式同get请求相同
this.$http.jsonp(url地址).then(res=>{
     console.log(res.body)
})
```

# axios待写

# 动画

## 动画基本使用和修改v-前缀类名

![Transition Diagram](https://cn.vuejs.org/images/transition.png)

案例:

1. 用transition标签包裹需要动画的元素,transition标签是vue专门提供的.

2. 使用此标签包裹后,为其设置style样式,默认是v-开头的类名.
3. 所有被transition包裹的元素都是v-开头设置样式,全都能用,所以可通过name属性 设置v-前缀,例`<transition name='my'> </transition>`后需通过`.my-enter`设置样式 ,将`v-`改为`名字-`,设置后的对应元素需用特有命名设置样式,其他依旧v-,设置哪个就针对哪个.

```javascript
	<style>
        .v-enter,
        .v-leave-to{
            opacity: 0;
            transform: translateX(100px);
        }
        .v-enter-active,
        .v-leave-active{
            transition: all .8s ease;
        }
    </style>

    <div id="app">
        <button  @click='flag = !flag'>toggle</button>
        <transition>
            <p v-show="flag">我是动画元素</p>
        </transition>
    </div>

    <script>
        new Vue({
            el: '#app',
            data: {
                flag: false
            },
        })
    </script>
```

## 使用第三方库animate实现动画

> 1. 引入animate.css样式
>
> 2. 在transition上设置,
>
>    enter-active-class设置入场样式 leave-active-class设置出场样式,其中animated是固定必须写,后面的tada则是对应样式效果,
>    :duration设置样式时间默认毫秒,写4000表同时设置入场和出场时间,也可:duration={enter:2000,leave:3000}
>    ==注意:== duration设置时间有限制 只能设置动画默认时间之内的时间 大于默认时间的无效果

```javascript
<link rel="stylesheet" href="./animate.css">

<transition 
    enter-active-class="animated tada" 
    leave-active-class="animated bounceOutRight" 
    :duration='4000'
>
    <p v-show="flag">我是动画元素</p>
</transition>
```

## 动画生命周期函数

钩子函数如下: 相当于transition动画的钩子事件,指定对应函数,即为钩子函数

```javascript
<transition
  v-on:before-enter="beforeEnter"//动画开始前
  v-on:enter="enter"//动画开始后
  v-on:after-enter="afterEnter"//动画完成后
  v-on:enter-cancelled="enterCancelled"//动画取消,一般不用

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

案例:实现半场动画

```javascript
<transition 
    @before-enter='beforeEnter'
    @enter='enter'
    @after-enter='afterEnter'
    >
    <div class="ball" v-show='flag'></div>
</transition>

methods: {
    beforeEnter(el){
        el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
        el.offsetWidth
        el.style.transform = 'translate(200px,300px)'
        el.style.transition = 'all .8s ease'
        done()
    },
    afterEnter(el){
        this.flag = !this.flag
    }
},
```

el :是被控制的要动画的元素,是原生js dom对象

done: 是函数afterEnter的引用,表立即执行函数,若不调用,而让此函数自动调用,则会出现延迟情况

​			==(在enter,leave中都有第二参数done,必须手动调用,否则bug)==

==el.offsetWidth此话没特殊含义 但是会强制浏览器刷新动画== 如果不写 浏览器默认不刷新动画就==没有过渡效果(==在函数前面写el.offsetWidth  el.offsetHeight  el.offsetTop  el.offsetLeft 只要和offset相关的任意一个就行)

## transition-group

> 前面提到的transition标签只能实现单个元素动画,如果想实现多个元素动画,或者为v-for循环出来的元素设置动画 需使用transition-group标签,注意v-for的元素必须加:key属性

```javascript
<transition-group appear tag="div">
    <p v-for="(item,i) in list" :key="item.id" @click="show(i)">
        {{item.id}}-------{{item.name}}
    </p>
</transition-group>
```

1. `<transition-group></transition-group>`对多个元素实现动画

2. `appear`刚进入页面,实现元素入场动画

3. `transition-group`会渲染为`span`标签,可以用tag将其渲染为其他标签.

   注意: 只有`transition-group`会渲染成`span`标签,而`transition`不会渲染为其他任何标签.

   ​			==appear对`transition`也有效,tag对其无效==

## .v-move

实现元素移动时的动画,例一个元素被删除,其他元素会慢慢飘上来的效果

```javascript
.v-move{
     transition: all 0.8s ease;
}
.v-leave-active{
    position: absolute
}
```

这里`.v-move`和`.v-leave-active`需配套使用,

# vue组件

## 创建全局组件的三种方式（推荐第三种）

1. ```javascript
   <div id="app">
      <myh1></myh1>
   </div>
   <script>
   //创建模板对象
     const a = Vue.extend({
       template:"<h1>我是一个大大的h1</h1>"
     })
   //注册组件 前为组件名，后为模板对象
     Vue.component('myh1', a)
   </script>
   ```

2. ```javascript
   <div id="app">
       <myh1></myh1>
   </div>
   
   //模板对象可以直接写为字面量对象
   Vue.component('myh1', {
      template:"<h1>我是一个大大的h1-----------</h1>"
   })
   ```

3. ```javascript
   <div id="app">
     <myh1></myh1>
   </div>
    
   <template id="one">
     <div>
       <h1>哈哈</h1>
     </div>
   </template>
    
   <script>
     //在el控制区域外的template标签内写模板内容，注册组件时写对应的id名
     Vue.component('myh1', {
       template: "#one"
     })
   </script>
   ```

**推荐方式三，优点不用写字符串内，有代码提示和高亮。**

**==注意点：==**

​	==1. 组件命名时若全是小写，则使用时使用相同名字。==

​		==组件命名时若为小驼峰，则把驼峰大写字母变小写，两单词用 `-` 隔开。使用时不可直接小驼峰==

```javascript
  <div id="app">
    <my-h1></my-h1>
  </div>
  
  Vue.component('myH1', {
      template: "#one"
    })
```

   ==2. 模板对象只能有且仅有一个唯一根元素==

## 定义私有组件

> 在实例中定义 通过components定义,键为组件名,值为对象,内可写展示的模板内容或data或mehods

```javascript
	new Vue({
      el: '#app',
      components:{
        login:{
          template:"#one"
        }
      }
    })
```

## 组件的生命周期

实例相当于大组件,组件相当于小组件,所以组件有自己的`data`,`methods`和生命周期函数,例created等,和实例一样的使用方法

## 组件的data和methods

### 定义data

和实例中不同的是组件的data是一个函数,return一个对象 在模板中可直接使用

```javascript
    Vue.component('login', {
      template: "#one",
      data(){
        return {
          msg:'哈哈'
        }
      }
    })

  <template id="one">
    <h1>{{msg}}</h1>
  </template>
```

### 定义methods

和实例中一样的使用

```javascript
Vue.component('login', {
      template: "#one",
      data() {
        return {
          msg:1
        }
      },
      methods: {
        add(){
          this.msg ++
        }
      },
    })
```

## 组件的切换

​		component标签相当于占位符 :is内写组件名字就展示对应组件 注意:is的:是固定写法,所以写组件名字一定要加引号 否则会当作变量 从而报错

```javascript
	<component :is="'register'">
    </component>
```

案例 : 点击链接切换组件

```javascript
  <div id="app">
    <a href="" @click.prevent="flag = 'login'">login</a>
    <a href="" @click.prevent="flag = 'register'">register</a>

    <component :is="flag">
    </component>
  </div>

	new Vue({
      el: '#app',
      data: {
        flag:"login"
      },
    })
```

## 组件切换的过渡动画

> 用transition动画包裹组件,设置对应样式,组件切换和元素切换的相同

```javascript
  <style>
    .v-enter,
    .v-leave-to{
      opacity: 0;
      transform: translateX(90px);
    }
    .v-enter-active,
    .v-leave-active{
      transition: all .5s ease;
    }
  </style>

    <transition mode="out-in">
        <component :is="flag"></component>
    </transition>
```

## 设置mode模式

==注意点== : 直接这样会导致切换时两组件同时出现,一个退出一个进入这样不好,所以可通过`mode`设置模式,

`"out-in"`表示先出后进,`in-out`表示先进后出,

通常用前者这样就不会同时出现

## 父组件给子组件传值

> 通过属性绑定形式传值,子组件内通过props接收,值为数组[ ],内写绑定的属性名即可正常使用

==注意 : props是只读不可写的== 带`s`的只有`props`是数组,其他都是对象

```javascript
<div id="app">
    <login :msg="msg1"></login>
  </div>

Vue.component('login', {
      template:"<a>{{msg}}</a>",
      props:['msg']
    })
```

## 父组件给子组件传方法

> 传值用属性绑定,传方法用事件@绑定, 通过调用自己的方法,进一步方法内再通过this.$emit('绑定的方法名')来调用传递的方法
>
> `emit() `参数一为绑定的方法名,参数一之后都是传递的值,例`this.$emit("parent",123,456)`可传n个参

==注意 : 传方法时不能加()括号,加了就是立即调用,会把传递后的结果传递过去,而平时写事件时可加可不加==

```javascript
<div id="app">
    //show为父组件的方法
   <son @parent="show"></son>
  </div>

const son = {
      template:"<h1 @click='add'>点我</h1>",
      methods: {
        add(){
          this.$emit("parent","传递的值一","传值二")
        }
      },
    }
```



# ref获取dom元素和组件

> 通过ref传递, 用`this.$refs.绑定的名字`接收传递的dom元素,若为组件,则可通过此方法拿到组件引用,直接使用组件的数据或方法,

```javascript
  <div id="app">
   <h1 @click="show">点我</h1>
   <span ref="myspan">我是span的内容</span>
   <son ref="myson"></son>
  </div>

	methods:{
        show(){
          console.log(this.$refs.myspan.innerText)//我是span的内容
          console.log(this.$refs.myson)//得到组件 可直接使用组件数据或方法
        }
      },
```

# 路由

```javascript
//1.引入路由后会在全局window上挂一个构造函数 需在vue之后引入  
	<script src="./vue.js"></script>
	<script src="./vue-router.js"></script>

<body>
   
//5.使用 router-link会转为a标签,点击就会跳转路由,router-view是展示路由的坑 即占位符
  <div id="app">
    <router-link to='/login'>登录</router-link>
    <router-link to='/register'>注册</router-link>
    <router-view></router-view>
  </div>

  <script>
// 2.准备两个组件模板对象
    const login = {template: '<h1>登录页面</h1>'}
    const register = {template: '<h1>注册页面</h1>''}
    
//3.new VueRouter创建路由对象, routes:[]写路由匹配规则,内的每个对象就是一个路由规则,path是匹配的路径,component写展示的对应组件模板对象(变量 不加引号),注意是写模板对象,不是组件名
    const router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register },
      ]
    })

// 4. 实例上注册router,将router和实例关联,监听路由变化,属性名为router,值是new出来的路由对象故这里简写
    new Vue({
      el: '#app',
      router
    })
  </script>
</body>
```

## tag渲染指定标签

`router-link`默认渲染为`a`标签,可通过`tag`将其渲染为指定标签

```javascript
<router-link to='/login' tag='ul'>登录</router-link>
```

## redirect重定向

`redirect`网页重定向,使一进入网页`/`就直接跳转到`/login`

```javascript
{ path: '/', redirect: '/login' },
```

## linkActiveClass路由激活类

路由默认激活类名为`router-link-active`,可用构造函数中属性`linkActiveClass`更改激活类名,可为激活路由设置样式.

```javascript
const router = new VueRouter({
      linkActiveClass:'myactive',
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register },
      ]
    })
```

## 路由组件切换动画

用`transition`将`router-view`包裹,再设置样式

```javascript
   //style省略...
	<transition mode="out-in">
      <router-view></router-view>
    </transition>
```

## 获取路由参数的两种方式

### 方式一 : query

> 路由匹配规则不变,直接在`router-link`的`to`中拼接参数,可在钩子函数`created`内通过`this.$route.query`获取

```javascript
<router-link to='/login?name=zs&age=18'>登录</router-link>

const login = {
      template: '<h1>登录页面</h1>',
      created() {
        console.log(this.$route)//得出结果见下图
      },
    }

{ path: '/login', component: login },
```

如图可通过`this.$route.query得出对应参数`

![image-20200219143628097](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20200219143628097.png)

### 方式二 : params

通过`this.$route.params获取`

```javascript
<router-link to='/login/zs/18'>登录</router-link>

{ path: '/login/:name/:age', component: login }

```

![image-20200219144418453](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20200219144418453.png)

## 嵌套路由

> 1. 父路由正常写,子路由的的`router-link`和`router-view`写在父路由内

```javascript
<template id="account">
    <div> account 
      <router-link to='/account/login'>login</router-link>
      <router-link to='/account/register'>register</router-link>
      <router-view></router-view>
    </div>
 </template>
```

> 2.  写匹配规则时不是直接写同级的,而是父路由匹配规则中有`children`属性,写在这里面

注意 : ==`children`内的path不要加`/`只写`login`==,加了就是默认以根路径开始,不加就会默认接在父路由路径后面,相当于`/account/login`,所以子路由写规则时只写半截,不加`/`,==`link`中就要写全即`to='/account/login'`==

```javascript
routes: [
        {
          path: '/account',
          component: account,
          children: [
            { path: 'login', component: login },
            { path: 'register', component: register },
          ]
        },
      ]
```

## 路由的命名空间

> 前面提到的都是一个坑只展示一个组件,若想同时展示多个组件就需要用到命名空间

1. 平时都是`component`展示对应组件,若想同时展示多个组件则用`components`,它是对象,`default`表默认展示的组件,而属性名`left`表命名,值为要展示的组件模板对象.

2. 在`router-view`通过name属性,若不写则展示默认default,若写了,例left则展示属性名为left的.

```javascript
  <div id="app">
    <router-view></router-view>
    <router-view name='left'></router-view>
    <router-view name='main'></router-view>
  </div>
  
  
    const header = {
      template:"<h1>header</h1>"
    }
    const left = {
      template:"<h1>left</h1>"
    }
    const main = {
      template: "<h1>main</h1>",
    }

    const router = new VueRouter({
      routes: [
        {path: '/',components:{
          default:header,
          left:left,
          main:main
        }},
      ]
    })
```

# watch监听

> 绑定的属性为data中的数据,若数据更改则触发对应函数,不会初始化,不更改就不会执行,
>
> 主要是监听路由的改变

1. 监听`data`数据改变,属性省略`this`

```javascript
<input type="text" v-model='msg'>
    
 	data:{
        msg:123
      },
      watch: {
        msg(){
          console.log('msg改变了')
        }
      }
```

2. ==监听路由变化==

`watch`主要是监听路由变化的,同样不要绑定属性不写`this`. 可以直接写`$route`,而`$route.path`是对象下的一个属性,没区别

```javascript
watch: {
        '$route.path':function(){
          console.log(this.$route.path)
        }
      }
```

# computed计算属性

> 1. ==计算属性是自定义属性名然后直接使用,不需在data中定义==,值为`function`,函数内需`return`,使用时直接当属性使用,不能当函数调用
>
> 2. 函数内相关联的data数据若发生改变则会触发函数进行计算
> 3. 计算属性有缓存,若未改变,则直接使用上次的计算结果不会重新计算,利于性能
> 4. 计算属性有初始化,即第一次进入网页会默认计算一次

```javascript
	<input type="text" v-model='one'>+
    <input type="text" v-model='two'>=
    <input type="text" v-model="full">
    
     data:{
        one:'',
        two:''
      },
      computed: {
        full(){
          return this.one +'-'+ this.two
        }
      } 
```


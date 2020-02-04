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


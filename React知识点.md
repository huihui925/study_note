# **1. 起步-create-react-app使用**

**1.什么是create-react-app**

搭建react项目的脚手架 创建一项目文件夹my-app也可自定义其他 第一次安装速度慢 但是安装一次后再搭建就特别快 因为有缓存

**2.** `cd my-app`

进入到项目文件夹里

**3.**`npm run start/yarn start`<font color=red>(推荐)</font>

+ 运行项目 类似开启服务 如果启动后自动打开浏览器就表成功  推荐使用`yarn start`

+ 在打开网页时不能直接点击浏览器打开 要`yarn start`运行 打开

# **2. 虚拟DOM**

![image-20191229123223670](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229123223670.png)

# **3. 创建虚拟DOM元素**

如果没用脚手架需下载React和ReactDOM 如果用了脚手架直接引入即可

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```

**创建虚拟DOM元素**

+ `React.createElement()`至少三参 共n参

  + 一参:字符串DOM元素名字

  + 二参:是obj里面写属性和对应值 若多个则多个键值对 若没属性直接把obj换为null

  + 三参:是元素的子节点(其他虚拟DOM元素或文本节点)

n参:其他子节点 继续写

```javascript
const myh = React.createElement('h1',{id:'my'},'我是一个大大的h1')
ReactDOM.render(myh1,document.getElementById('root'))
```

```
const myh = React.createElement('h1',null,'我是一个大大的h1')
```



# 4. JSX 简介

1. ==jsx不是字符串 也不是html 是JavaScript的扩展语法 是符合xml规范的js语法, jsx本身就是一表达式,==

   ==在js中,混合写入类似于HTML的语法,叫jsx语法, 这里的x指xml,==

   ==xml语法比HTML语法严格,所有标签必须要闭合 例`<hr>`错误,`<hr/>`正确==

2. 在js中我们可以直接写 `const element = <h1>你好</h1>`

3. 上面的element是React元素对象,内部调用了 `React.createElement() `创建元素对象

4. 在jsx中可以使用插值表达式`{ } `里面可以放js表达式 例变量 对象点属性 函数执行等,`{ }`内部的代码会当js代码执行

   例:

   ```javascript
   const name = ‘张三’’
   
   const element = <h1>{name}</h1> //渲染为const element = <h1>张三</h1>
   ```

5. 当编译引擎在编译jsx时,如果遇到`<`会当html代码去编译,当遇到`{ }`会把内部代码当普通js代码编译

6. 在jsx上还可以写属性

   属性命名要求: <font color=red>属性必须小驼峰写法</font>

   在属性里若属性值为普通字符串 值用引号包裹 若为变量或其他 则用`{ }`写`{ }`里面

   注意`” ”`和`{ }`不能同时存在

7. **在jsx中添加class类名:** ==必须写为` className  `来替换`class`,用`htmlFor`替换lable中的`for`属性==,因为在js中它们都属于关键字 为了防止歧义所以用其他代替 class是类构造函数 for是for循环

8. jsx除了写给变量  还可以在if for循环 函数传参 函数返回值使用

9. jsx为了便于阅读 可以多行写 但是多行写时一定要用()括号将内容包裹起来 避免被自动加分号

   例 

   ```javascript
   const element = (
   	<div>
   		<h1>你也好</h1>
   	</div>
   )
   ```

10. 在js中看到`<h1>我是jsx</h1>`这种 不要想成变成 直接想成对象 因为这就是一个虚拟DOM即js对象

    + **数组里面可以直接放对象**

    ```javascript
    const arr = [<h1>你好</h1>, <div>哈哈</div>]
    ReactDOM.render(arr,document.getElementById('root'))
    ```

    渲染如下:

    ![image-20191229153027564](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229153027564.png)

    若数组里是多个jsx直接把数组放进去即可 会自动转换 必须给每一项加key值否则会报错

    + **数组里面直接放字符串 直接丢数组 就会把里面的每项渲染进去**

      + ```javascript
        const arr = ['你好','我很好']
        ReactDOM.render(arr,document.getElementById('root'))
        ```

        效果如下:

      ![image-20191229154018045](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229154018045.png)

    + **若想把字符串数组里的每个元素包裹一个h5标签再渲染**

      + 方法一:

        forEach循环每一项 包裹h5标签 组成新数组再渲染新数组即可

      + 方法二:

        map映射 循环数组每一项并把返回的结果组成新数组 不会改变原数组

        ```javascript
        const arr = ['你好','我很好']
        ReactDOM.render(arr.map(val=>val+123),document.getElementById('root'))
        ```

        

    ==注意:==

    ==1.直接丢数组和循环数组的都需要加key值作唯一标识符,否则和vue不加key时一样出现相同问题,==

    ==2.key值必须加给被Each map for循环直接控制的最外层元素,若元素是多层的 加给内层的元素依旧会报错==

11. <font color=red>jsx里只能有一个根元素</font>  可以包含很多子元素

12. 假如一个标签里面没有内容，你可以使用 /> 来闭合标签，就像 XML 语法一样：

    ![image-20191229124225152](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229124225152.png) 

    若div没内容 也可直接<div/>

13. 标签必须成对出现 单标签必须自闭合/>

14. jsx内部调用`React.createElement()`创建元素对象,jsx是JavaScript扩展语法 dom标签和组件<component />都是此语法 所以React元素可以是dom标签也可以是组件

15. **在jsx内写注释**,推荐使用`/*这是注释*/`

    ```jsx
    {/* 123 推荐这个注释用法 */}
    {//123 这会把后面的花括号也注释 花括号是成对出现注释了会报错 }
    {//123 只能换行才不注释 但会多占一行 所以推荐第一种
    }
    ```

    在jsx内js代码只能写到{}内部 所以哪怕是注释也只能写到{}内部,综上在jsx中推荐用`/**/`注释

   # **5. 元素渲染**

1. 和html dom元素不同, React元素是开销极小的普通对象,React元素是通过React DOM渲染为DOM的,React DOM会随时更新DOM来与React元素一致.即当React元素更新时 DOM也会实时更新

2. 通过React DOM将元素渲染为DOM

3. ```javascript
   const element = <div>你好</div>;
     ReactDOM.render(element,document.getElementById(‘root’))
   ```

4. 

5. 由id root获取到index.html内的根DOM节点,将element元素渲染进去

6. 通常React应用只有一个root根DOM节点,此节点内的所有内容由React DOM控制,如果有多个根节点 一般是React集成到已有应用

7. <font color=red>重点:React元素是不可变的</font> 一旦创建 其属性和子元素所有内容都不可改变,若想更新就是创建一全新React元素 重新render渲染

8. <font color=red>重点</font>:在4里面提到的创建全新元素且重新渲染,但是<font color=red>ReactDOM只会更新需要更新的部分</font>,即它会将React元素和子元素与它们之前的状态作对比,只更新需要更新的



# **6. 组件&props**

+ **组件:**接收唯一带有数据的props属性对象并返回React元素的叫组件

+ **组件分类:**有函数组件和类组件

+ **函数组件:**

![image-20191229124650876](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229124650876.png)

​	    此运行流程是:

1. 调用ReactDOM.render()并传入`<F/>`作为参数,这里也可以写`<F> </F>`不过因为前面说到没内容可以直接闭合 所以通常用的前者
2. 调用组件 并传入将{name:’小黄’}作为props属性对象 props是只读的
3. 返回React元素
4. 渲染DOM

+ **类组件**

![image-20191229124849409](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229124849409.png)

1. <font color=red>有组件的地方必须引入React 不管使不使用都必须引入 </font> 因为组件依赖React所以必须引入

2. React元素可以是dom标签 也可以是组件 例

   ![image-20191229125430496](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125430496.png)

3. jsx内部调用React.createElement()创建元素对象,jsx是JavaScript扩展语法 <font color=red>dom标签和组件<component />都是jsx语法 所以React元素可以是dom标签也可以是组件</font>

4. 使用组件时 必须把组件用jsx表现出来即<component /> 而不是component

5. <font color=red>组件的命名开头必须是大写</font>,React会把小写开头的当做dom标签,大写开头的当做组件

6. jsx接收的属性 会转为属性对象即`props`,在`function`是通过形参接收`props`,在class中不需要接收.直接通过`this.props`获取,<font color=red>在class内部第一层的this都是指向实例</font>

7. 如果不想渲染任何组件可直接`return null`,`render()`函数作用是渲染当前组件返回的虚拟dom元素

8. 组件可以在输出中引用其他组件

![image-20191229125629032](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125629032.png)

8. 组件的作用是可复用性,学会提取组件是必须的,最初看上去,提取组件可能是一种繁重的工作,但是在大型项目中构建可复用库完全值得,如果在UI中有一部分<font color=red>被多次使用或组件本身就比较复杂 那么它就是一个复用组件候选项</font>

**两种组件创建的对比方式**

1. function创建的组件,叫'' 无状态组件 ''(无状态组件今后用得不多)

2. class创建的组件,叫'' 有状态组件 ''

3. 本质区别就是: 有无state属性和有无生命周期函数

4. class创建的组件有自己的私有数据state和生命周期函数,function都没有

5. 什么情况使用不同组件?

   ==推荐父组件都使用有状态组件== 因为功能更强大 如果使用了无状态组件指不定哪天需要用有状态的到时候更换比较麻烦,==子组件都用无状态组件==因为子组件数据是通过父组件传递拿的,所以自己不需要私有数据

**`props`和`state/data`区别**

React的`state`相当于就是vue中的`data`,`props`相当于vue中的`props`

1. `props`是外界传来的数据
2. `state`是组件私有数据(通过ajax获取的数据一般都是私有数据)
3. `props`是只读的
4. `state`是可读可写的

**总结**:组件多次使用或者<font color=red>组件本身比较复杂就提取组件</font>

 如图此组件嵌套多 代码复杂 不利于维护 符合提取组件条件 所以将其提取出后为图二图三结果 注意<font color=red>当多层嵌套提取时 先提取最里面的再一层一层从内向外提取</font>

![image-20191229125809130](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125809130.png)

![image-20191229125815016](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125815016.png)

![image-20191229125821381](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125821381.png)

+ **纯函数:**

  + 函数不改变入参(传入的参数 例不执行赋值 ++ --这类),且当多次调用下入参相同时返回的结果相同,这样的函数叫纯函数

  + <font color=red>props只读 不可改变</font>

+ <font color=red>所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。</font>

# 7. 单独提取组件

+ **组件一般为jsx文件**

  + 除了入口组件外 其他的一个组件一个文件 都放到Components文件夹内

  + 组件文件后缀可以是`.js`或者`.jsx`但是通常组件都放到`.jsx`内 因为:

    + 这些代码准确来说是jsx语法 所以放入jsx文件比较好

    + 后缀为`.js`也可以,但是在此文件内输入div再tab键不会快捷出`<div></div>`如果换成`.jsx`后缀就有效

+ **使用组件必须引入React**

  + 组件依赖React,不管表面上有没有用都必须引入,否则报错

+ **巧妙导出组件**

  + 一般我们都先写组件,再单独写组件名导出,实际可以写的时候就直接导出

    ```jsx
    export default class index extends Component {
        render() {
            return (
                <div>
                   <h1>要开心</h1>
                </div>
            )
        }
    }
    ```

+ 引入组件一般文件后缀不可省略,通常我们都是省略了写的,因为脚手架在webpack内进行了配置

  和modules同级,用于引入文件时不写后缀名,会强制加后缀,查找顺序从左往右,左找不到再右

  ```js
  resolve:{
  	extensions：[‘.js’,’.css’,’.json’]
  }
  ```

  

+ **文件内必须引入React**

  + 虽然表面上没用到React但是组件依赖React 所以必须引入 否则报错

+ **巧妙导出**

  + 正常情况是直接写组件然后单独导出组件名字 但是可以换种方式 例:

    在写的时候同时导出 function也适用

    ```jsx
    export default class index extends Component {
        render() {
            return (
                <div>
                   <h1>要开心</h1>
                </div>
            )
        }
    }
    ```

+ **如何省略.jsx后缀名**

  导入文件时一般后缀名不可省略,但是大多时候我们都省略不写,因为脚手架对webpack进行了如下配置:

  用于引入文件时不写后缀名,和modules同级,有顺序要求从左

  ```	js
  resolve:{
  	extensions：[‘.js’,’.jsx’,’.json’]
  }
  ```

  

# 8. 在React中...扩展运算符的巧妙使用

+ obj的每一项分别通过属性传过去 而不是直接传obj

  ```jsx
  const obj = {
      name:'张三',
      age:18,
      sex:'男'
  }
  function F(props){
      console.log(props)//{name: "张三", age: 18, sex: "男"}
      return null
  }
  ReactDOM.render(<F {...obj} />,document.getElementById('root'))
  ```

+ 把一个obj内容放到另一个obj里

  ```jsx
  const obj = {
      name:'张三',
      age:18,
      sex:'男'
      
  }
  const obj1 = {
      student:'9999999',
      ...obj
  }
  console.log(obj1)//{student: "9999999", name: "张三", age: 18, sex: "男"}
  ```


# 9. style和class样式

### style

+ 在React中写行内样式,不能像平时这样写,会报错,例:

```jsx
<h5 style='color:red'>我是大标题</h5>//报错
```

+ 正确写法例:

```jsx
 <h5 style={{color:'red',fontWeight:'bold','font-size':'14px'}}>我是大标题</h5>//正确
```

+ 注意事项
  1. 最外层`{ }`代表里面要写js代码 里层代表obj对象,也可单独定义对象再把名字丢进去
  2. 值若是数字可不加引号,若为字符串必须引号,属性名若有`-`必须加引号,因js代码会解析为减号,若不写引号就小驼峰写法.

### class

#### 引入css文件

+ 一般不推荐写行内样式,所以通常是直接写样式文件,引入css文件.

+ 回顾vue组件中写样式`<style></style>`是在标签中写,这样写是全局生效,其他组件元素样式也会受影响,所以会写成`<style scoped></style>`这里的`scoped`会给HTML的DOM节点增加一个不重复的data属性,从而达到只对当前样式生效的效果.

+ 在React中若直接==引入css文件也是全局生效的.因====css没作用域==,打包后对整个项目都有效,js jsx这些都是有作用域的打包后不影响

+ 若不引入样式,打包不会打包css,所以只有引入.

+ **解决方案 ==( 重要 )==**

  1. 在webpack中配置,`css-loader`后`?`接固定参数'modules'表为普通css样式表启动模块化(模块有作用域) 脚手架已配置好不需手动配置(这里将css样式表模块化 但是对安装到node_moduls的第三方包不模块化 所以正常使用可不担心)

  ![image-20191230202804401](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191230202804401.png)

  2. css文件命名有要求,必须 `名字.module.css` 例`index.module.css`

  3. 模块化只对css样式表里的类选择器和id选择器生效,标签选择器无效(标签选择器依然针对全局)

     不能直接引入,需用变量接收模块化后的样式对象,打印变量知变量是obj,类名和id名用的一串随机码替代,使用时需要obj点原来的名

     注意:虽然都是obj.名 但是id依旧要写id里 class写class里 否则无效

     ```css
     //css样式表
     #ziti{
       font-size: 40px;
     }
     .biaoti{
       color:red
     }
     h3{
       color: blue;
     }
     ```

     ```jsx	
     //组件内引入样式
     import obj from'./index.module.css';
     //打印
     console.log(obj)
     //打印结果
     {ziti: "MyComponent_ziti__2QzQ-", biaoti: "MyComponent_biaoti__1pCPg"}
     //使用
     <h3 id={obj.ziti} className={obj.biaoti}>我是大标题</h3>//class和id名字要对应 
     ```

  4. 给类名写格式 脚手架已配置可不管,

     模块化的 css文件 有类名的会模块化 若个别类名或id不想模块化见图第4点

     ```css
     //css样式表
     :global(#ziti){
       font-size: 40px;
     }
     ```

     ```jsx
      <h3 id='ziti'>我是大标题</h3>//全局的 直接使用 不需obj.名
     ```

     

     ![image-20191230214005804](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191230214005804.png)

#### 写多个class类名

+ 一般类名写法:`<h1 class='lei1 lei2'></h1>` 用空格连接的

+ 在React中

  + 方法一  空格字符串拼接

     `<h1 className={变量+' lei2'}></h1>`

  + 方法二  数组 join变成空格链接的字符串

    `<h1 className={[变量,'leiming1'].join(' ')}></h1>`

引入包时,若包已安装到node_modules下 可不写前面的路径直接写包名 会自动到node_modules下找

# 10. React绑定事件的注意点

1. 事件都是React提供的,名字必须小驼峰写法 例`onClick` 、`onMouseOver`

2. 为事件提供的处理函数必须是如下格式:

   ```jsx
   onClick={function}
   ```

3. 用得最多的绑定形式是:

   ```jsx
   <button onClick={ ( ) => this.show('传参') }>按钮</button>
   //事件的处理函数,需定义为一个箭头函数再赋值给 函数名称
   show = (arg1) => {
   	console.log('show方法' + arg1)
   }
   ```

   

# 11. State & 生命周期

1. State组件的状态,props是不可改变的,State是可改变的.

2. 不能直接修改State,State只能在构造函数constructor中赋值 其他地方赋值会报错.其他地方只能用setState()来改变

<img src="C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125957914.png" alt="image-20191229125957914" style="zoom:150%;" />

3. State的状态改变是合并 添加或覆盖相同key的值 其他key不受影响

4. 当组件状态更新时,render函数会重新执行并渲染,若是挂载到同一DOM节点上 只会有唯一的class组件的实例被创建使用,之前的组件会卸载.

5. 两个生命周期函数

    5.1 componentDidMount(){}组件挂载到DOM后执行的函数 

    5.2 componentWillMount(){}组件删除卸载时执行的函数 此函数在挂载前调用

这里用到了挂载和卸载两个词 自己记一下

6. State的更新是异步的,如果在同一事件函数中多次调用setState()不会执行的时候就马上更新而是当事件函数执行结束后一次性渲染 所以setState()注意写的顺序 如果是相同key 后面的会覆盖前面的 且不要在setState()内部用this.State 因为此结果不会实时更新 放回调函数是因为执行结束(执行到函数最后一步)想一次性渲染也没办法 因为它是回调 你不知道什么时候执行完 就不会等待 进入回调队列中 轮到它就立即执行并渲染

   ![image-20191229130052528](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229130052528.png)

7. 如果想立即拿到State的值,可执行`setState({},callback)`第二个参数是回调,执行此函数时结果是最新的.

8. State是局部的 组件外部无法访问 父组件子组件都无法访问 除非是当前组件引用其他组件并将state传递过去 所以State是自上而下的 且 是单向的 是直接取值然后把值传过去

   ![image-20191229130146730](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229130146730.png)








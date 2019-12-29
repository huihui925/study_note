# **起步-create-react-app使用**

### **什么是create-react-app**

create-react-app是用于搭建react项目的脚手架。它的优势在于省略了很多涉及配置的地方，让新手能够更加容易上手，减低入门的门槛。

### **create-react-app如何使用**

前提需要在你的机器上安装 Node >= 6 和 npm >= 5.2

然后新建文件夹 在此文件夹执行如下命令

**1.** `npx create-react-app my-app  `

搭建react项目的脚手架 创建一项目文件夹my-app也可自定义其他 第一次安装速度慢 但是安装一次后再搭建就特别快 因为有缓存

**2.** `cd my-app`

进入到项目文件夹里

**3.**`npm run start/yarn start`<font color=red>(推荐)</font>

运行项目 类似开启服务 如果启动后自动打开浏览器就表成功  推荐使用`yarn start`

在打开网页时不能直接点击浏览器打开 要`yarn start`运行 打开

# **虚拟DOM**

![image-20191229123223670](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229123223670.png)

# **创建虚拟DOM元素**

如果没用脚手架需下载React和ReactDOM 如果用了脚手架直接引入即可

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```

**创建虚拟DOM元素**

`React.createElement()`至少三参 共n参

一参:字符串DOM元素名字

二参:是obj里面写属性和对应值 若多个则多个键值对

三参:是元素的子节点(其他虚拟DOM元素或文本节点)

n参:其他子节点 继续写

```javascript
const myh = React.createElement('h1',{id:'my'},'我是一个大大的h1')
ReactDOM.render(myh1,document.getElementById('root'))
```

# JSX 简介

1. 在js中我们可以直接写 `const element = <h1>你好</h1>`

   jsx不是字符串 也不是html 是JavaScript的扩展语法 jsx本身就是一表达式

2. 上面的element是React元素对象,内部调用了 `React.createElement() `创建元素对象

3. 在jsx中可以使用插值表达式{} 里面可以放js表达式 例变量 对象点属性 函数执行等

    例:

   ```javascript
   const name = ‘张三’’
   
   const element = <h1>{name}</h1> //渲染为const element = <h1>张三</h1>
   ```

4. 在jsx上还可以写属性

   属性命名要求: <font color=red>属性必须小驼峰写法</font>

   在属性里若属性值为普通字符串 就是值用引号包裹 若为变量或其他 则用{}写{}里面

   注意””和{}不能同时存在

5. jsx除了写给变量  还可以在if for循环 函数传参 函数返回值使用

6. jsx为了便于阅读 可以多行写 但是多行写时一定要用()括号将内容包裹起来 避免被自动加分号

   例 

   ```javascript
   const element = (
   	<div>
   		<h1>你也好</h1>
   	</div>
   )
   ```

7. <font color=red>jsx里只能有一个根元素</font>  可以包含很多子元素

8. 假如一个标签里面没有内容，你可以使用 /> 来闭合标签，就像 XML 语法一样：

   ![image-20191229124225152](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229124225152.png) 

   若div没内容 也可直接<div/>

9. jsx内部调用`React.createElement()`创建元素对象,jsx是JavaScript扩展语法 dom标签和组件<component />都是此语法 所以React元素可以是dom标签也可以是组件

   # **元素渲染**

1. 和html dom元素不同, React元素是开销极小的普通对象,React元素是通过React DOM渲染为DOM的,React DOM会随时更新DOM来与React元素一致.即当React元素更新时 DOM也会实时更新

2. 通过React DOM将元素渲染为DOM

   ```javascript
   const element = <div>你好</div>;
     ReactDOM.render(element,document.getElementById(‘root’))
   ```

   

   由id root获取到index.html内的根DOM节点,将element元素渲染进去

3. 通常React应用只有一个root根DOM节点,此节点内的所有内容由React DOM控制,如果有多个根节点 一般是React集成到已有应用

4. <font color=red>重点:React元素是不可变的</font> 一旦创建 其属性和子元素所有内容都不可改变,若想更新就是创建一全新React元素 重新render渲染

5. <font color=red>重点</font>:在4里面提到的创建全新元素且重新渲染,但是<font color=red>ReactDOM只会更新需要更新的部分</font>,即它会将React元素和子元素与它们之前的状态作对比,只更新需要更新的.

   # **组件&props**

**组件:**接收唯一带有数据的props属性对象并返回React元素的叫组件

**组件分类:**有函数组件和类组件

**函数组件:**

![image-20191229124650876](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229124650876.png)

此运行流程是:

1. 调用ReactDOM.render()并传入<F/>作为参数
2. 调用组件 并传入将{name:’小黄’}作为props属性对象
3. 返回React元素
4. 渲染DOM

**类组件**

![image-20191229124849409](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229124849409.png)

1. <font color=red>有组件的地方必须引入React 不管使不使用都必须引入</font>

2. React元素可以是dom标签 也可以是组件 例

   ![image-20191229125430496](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125430496.png)

3. jsx内部调用React.createElement()创建元素对象,jsx是JavaScript扩展语法 <font color=red>dom标签和组件<component />都是jsx语法 所以React元素可以是dom标签也可以是组件</font>

4. 使用组件时 必须把组件用jsx表现出来即<component /> 而不是component

5. <font color=red>组件的命名开头必须是大写</font>,React会把小写开头的当做dom标签,大写开头的当做组件

6. jsx接收的属性 会转为属性对象即props 传入组件内容

7. 组件可以在输出中引用其他组件

![image-20191229125629032](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125629032.png)

8. 组件的作用是可复用性,学会提取组件是必须的,最初看上去,提取组件可能是一种繁重的工作,但是在大型项目中构建可复用库完全值得,如果在UI中有一部分<font color=red>被多次使用或组件本身就比较复杂 那么它就是一个复用组件候选项</font>

**总结**:组件多次使用或者<font color=red>组件本身比较复杂就提取组件</font>

 如图此组件嵌套多 代码复杂 不利于维护 符合提取组件条件 所以将其提取出后为图二图三结果 注意<font color=red>当多层嵌套提取时 先提取最里面的再一层一层从内向外提取</font>

![image-20191229125809130](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125809130.png)

![image-20191229125815016](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125815016.png)

![image-20191229125821381](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229125821381.png)

**纯函数:**

函数不改变入参(传入的参数 例不执行赋值 ++ --这类),且当多次调用下入参相同时返回的结果相同,这样的函数叫纯函数

<font color=red>props只读 属性值不可改</font>

<font color=red>所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。</font>

# State & 生命周期

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

7. State是局部的 组件外部无法访问 父组件子组件都无法访问 除非是当前组件引用其他组件并将state传递过去 所以State是自上而下的 且 是单向的 是直接取值然后把值传过去

   ![image-20191229130146730](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20191229130146730.png)





<font color=red></font>
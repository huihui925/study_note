# 0.第0项老师写的,我只复制

> * 同时添加react-redux组件和redux组件( 这里react-redux是对redux的部分封装,但是redux也需要用到,所以两个都下载 )
>
> * 完整使用
>
>   ==这里是整个流程,写得简陋,适合快速记忆,如果看不懂就看下面自己写的,内容多详细==
>
>   #### ==实际用的就是==
>
>   ```js
>   //创建store对象
>   redux中: createStore(reducer)  
>   //connect一参和二参是函数 函数分别接收state和dispath为形参
>   react-redux: <Provider>, connect()() 
>   ```
>
>   ```javascript
>   //初始化
>   function reducers(state, action) {
>   }
>   
>   //创建store  createStore()方法来源于redux
>   //createStore方法的参数为所有的reducers函数
>   const store = createStore(reducers);
>   //将Provider作为整个应用的根组件
>   //Provider组件来源于react-redux
>   <Provider store={store}>
>     <App />
>   </Provider>
>   
>   //2. 使用
>   //组件需要用到存储到store中的数据
>   //2.1 导入connect函数
>   import {connect} from 'react-redux'
>   function Component1(){
>   }
>   //连接组件和store
>   //连接的目的就是注入一个dispatch函数或者监听store中的数据的改变
>   export default connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component1);
>   
>   //2.2 修改数据(触发action)
>   //当我们通过dispatch函数触发action的时候,redux会自动调用创建store的时候注解的reducers函数
>   //2.2.1 在组件中通过dispatch函数触发action,并传递数据
>   dispatch({
>     //用于区分不同的操作
>     type: 'test-action',
>     //将所有要传递的数据放到一个属性中
>     payload: {
>       name: 'zhangsan',
>       age: 20
>     }
>   })
>   //2.2.2在reducer函数中,需要有对应的处理逻辑来修改数据
>   const {type, payload} = action;
>   if (type === 'test-action') {
>     //如果触发的是test-action
>     //处理test-action操作所需要修改的数据
>     //返回的是整个state
>     return {
>       ...state,//将原来的数据展开
>       student: {
>         ...payload
>       }
>     }
>   }
>   
>   //在组件中获取state中的数据
>   ```
>
>   

# 一. 介绍

**Redux是什么:**

​		 `Redux`是专门做状态管理的独立第三方`js`库,不是`React`插件,例如`angular vue`都能使用 只是使用起来相对麻烦, 而它与`React`匹配度高,所以一般和`React`一起使用

​		类似vuex ,状态管理仓库,简单来说就是管理状态 ,且提供了管理状态的方法 增加 修改 删除 ,就这么简单

**作用:**

​		对应用中状态进行集中式的管理(写/读),所有组件都能直接使用此状态并且修改状态, React只适用于简单的项目 React主要针对单页面UI做视图层的  不是数据方面 大型项目就需要`React`和`Redux`(管理数据状态)一起使用

**什么时候用:**

+ 现在一般进入公司都会用,所以不用想着什么时候用, 直接用就行了.
+ 当多个组件都需要用到某状态时
+ 一个组件想更改另一个组件状态
+ 多数据
+ 多交互(根据用户操作 修改状态 就是多交互)

# 二. 安装

`React`脚手架没安装`Redux`, 所以安装脚手架后需要手动安装`Redux`, 运行命令

```javascript
npm install --save redux
//或者
yarn add redux
```

# 三. redux工作流程

![img](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

+ #### 读状态

  组件可以直接从`Store`中读取状态

+ #### 更新状态

  > 更新状态的流程相对于读取状态要麻烦写
  >
  >  后续会对这一系列做详细说明 这里只了解流程

  + 组件通过`dispatch(action)`分发事件,通知`Store`要更新状态,
  + 通知后会自动触发`Reducers(oldData,action)`,它接收两个参数旧的`State`和`action`返回一个新的`state`状态给`Store`,而`Store`会用新的`state`来`setstate`设置,因为在React中`state`状态不能直接更改 只能通过`setState`
  + 根据新状态实现页面`render`重新渲染`subscribe(listener)`

# 四. redux相关API

```
redux中包含: createStore(), applyMiddleware(), combineReducers()
store对象: getState(), dispatch(), subscribe()
react-redux: <Provider>, connect()()
```

+ **redux中包含:**
  + **createStore():** 创建一个`Store`仓库,创建时传入`reduser`,关联起来,当分发事件通知`Store`需要更新时,`Store`会自动调用`reduser`函数,此函数接收旧的`state`和`action` 返回新的`state`给`Store`,`Store`会通过`setState`设置,(在React中`state`状态不能直接更改 只能通过`setState`)
  + **applyMiddleware():** 
  + **combineReducers():**
+ **store对象:**见下面 5.3 store
+ **react-redux:**
  + **\<Provider>,** 
  + **connect()()**



getState()

# 五. redux核心概念(3个)

```
action  reducer   store
```

#### 5.1 action

通常我们需要更新状态时候需要用`dispatch(action)`分发事件(分发事件就是触发事件),通知Store需要更新状态了,传递的action是一个对象 `{type: 'xxx', data: value}`,因为更新状态也分类型 有增加 删除  变更. 所以type属性名是固定的 写类型 说明我们要进行哪种操作.data属性名自定义 但是一般我们都写data 传递的数据.

#### 5.2 reducer

+ 接收参数老的state和指定的action, 根据两个参数返回一个新的state
+ 不能修改老的state(因为React就是用新旧虚拟DOM树对比 这个同理)
+ 前面`dispatch(action)`通知Store需要更新状态后,Store会调用`reducer`函数并传入旧的`state`和`action`,此函数会返回一个新的`state`, 而Store会用新的`state`来`setstate`设置,因为在React中`state`状态不能直接更改 只能通过`setState`
+ 也可以说成分发事件`dispatch(action)`会直接触发`reducer`函数,`dispatch(action)`是自己写,`reducer`函数也是自己写(里面写的东西就是根据旧的state和type renturn新的state),前者是手动调用,后者是Store自动调用.

#### 5.3 store

+ **作用:** redux库最核心的管理对象

+ **它内部维护着:** `state`和`reducer`(前者是`state`状态 后者是一旦收到分发事件的通知就自动调用此函数 此函数会返回新的`state`, store会拿着新的` state`来`setState`)

+ **核心方法:** getState(), dispatch(action), subscribe(listener)

+ **编码:**

  + **store.getState()** 

    获取state

  + **store.dispatch({type:'INCREMENT',data})**, 

    分发事件通知更新状态

  + **store.subscribe(render)**

    订阅监听 更新后需要`store.subscribe(render)`来重新`render`渲染页面,接收的参数是一个函数,参数函数自定义,里面的内容是render渲染页面的代码,当`state`更新会自动触发`subscribe`函数实现更新

# 六. 基本使用

**案例: 简单的加减计数器**

+ **1. 创建目录redux 所有有关redux的写在此文件夹里**

```
redux文件夹(里面有这四个文件 名字都固定的): 
	action-types.js             
	actions.js //此名字是固定的
	reducers.js
	store.js
```

+ **2.建文件`action-types.js`**

  因多处要用到type名 防止重复和写错 所以直接用文件导出的方式 这样可以避免写错

  ```javascript
  export const INCREMENT = 'INCREMENT'
  export const DECREMENT = 'DECREMENT'
  ```

+ **3.建文件`reducers.js`**

  reducer函数是自己写  所以写此文件然后导出对应函数 文件名带s是因为里面可以写很多个reducer函数,需要进行什么操作就导出对应操作的函数,因有多个reducer函数 所以不用`export default` 这里其中一个函数是acount计算 实现数字加减操作

  ==注意 : 设置了默认值不代表state就有值，所以初始时就需将state return出去，否则初始化调用函数拿不到值 默认返回undefined==

  ```javascript
  import {INCREMENT,DECREMENT} from './action-types'
  //当第一次创建store时就会调用此函数 此时没有dispatch 所以return state;  作用初始化state此时state默认值为0 所以需要设置默认值以便初始化
  export function acount(state = 0, action) {
      switch (action.type) {
          case INCREMENT:
              return state + action.data;
          case DECREMENT:
              return state - action.data;
          //当没有匹配的类型时就用default  返回state
          default:
              return state;
      }
  }
  ```

+ **4.在主入口文件写**

  `createStore(acount)`创建store时就会执行`renducer`函数, 也就是这里的`acount`函数,作用初始化`state`,此时`state`为我们设置的默认值0

  ```javascript
  //1.引入
  import { createStore } from "redux";
  import {acount} from './redux/reducers'
  //2. 创建store 这里的reducer函数 名为acount 传递进去 进行关联
  const store = createStore(acount)
  
  function render(){
  //3.将store作为属性传递进去 内部组件通过this.props.store获取
      ReactDOM.render(<App store={store} />, document.getElementById('root'));
  }
  //4.初始化就要render 渲染页面
  render()
  
  //5.订阅监听 state更新会触发此函数  传递的参数作用是重新渲染页面 如果不写 哪怕数据最新也不会重新渲染
  store.subscribe(render)
  ```

+ **5.组件内部写**

  ```javascript
  import React, { Component } from 'react'
  //引入type名 dispatch的时候用这个 防止写错
  import {INCREMENT} from '../redux/action-types'
  
  export default class Test extends Component {
      constructor(props) {
          super(props)
          this.mySelect = React.createRef()
      }
      add = () => {
          const store = this.props.store
          //获取选择框的值
          const number = this.mySelect.current.value*1
          // 更新
          store.dispatch({type:INCREMENT,data:number})
      }
  
      render() {
          return (
              <div>
                  <h1>此时number值为: {store.getState().number}</h1>
                  <select ref = {this.mySelect}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
                  <button onClick={this.add}>增加</button>
              </div>
          )
      }
  }
  ```

+ ==**6. 对以上代码优化**==

  + **6.1 actions.js**

    > 按照redux思想 官方希望我们将` store.dispatch({type:INCREMENT,data:value})`中的`action`用工厂函数创建出来,而不是自己写.

    + **建文件`actions.js`** 

    > `action`分不同类型的所以要此文件内需导出多个工厂函数,data的值不固定所以用变量,调用函数时传入.

    ```javascript
    import {INCREMENT,DECREMENT} from './action-types'
    //注意: 这里是return 所以要用( ) 如果不写括号会当做函数体
    export const increment = number => ({type:INCREMENT,data:number})
    export const decrement = number => ({type:DECREMENT,data:number})
    ```

    - 使用

    ```jsx
    import {increment} from '../redux/actions'
    
    store.dispatch(increment(number))
    ```

  + **6.2 store.js**

    > 将store抽离出来

    + 建文件 ` store.js`

    ```javascript
    import { createStore } from "redux";
    import {acount} from './reducers'
    const store = createStore(acount)
    export default store
    ```

    + 使用

    ```javascript
    import store from './redux/store'
    ```

  ### **问题:**

  ​	redux和react耦合度过高

  ​    代码不够简洁

  >  从上面代码可以看出这两个问题,所谓耦合度过高就是依赖性太强,比如组件内部许多地方都用到了store,这样并不好,想降低依赖性就要用到react-redux插件

# 七. react-redux插件

#### 7.1 了解

是react插件库

专门简化react应用中使用redux 降低耦合度

#### 7.2 安装

运行命令

```
npm i react-redux -S
//或者
yarn add react-redux
```

#### 7.3 React-Redux将所有组件分为两大类

+  **UI组件**
   + 只负责UI的呈现 不带有任何业务逻辑
   + 通过props接收数据(一般数据和函数)
   + 不使用任何Redux的API
   + 一般保存在`components`文件夹下
+  **容器组件**
   + 负责数据和业务逻辑 不负责UI的呈现
   + 使用Redux的API
   + 一般保存在`containers`文件夹下

#### 7.4 使用

+ 建立文件夹`containers`,新建文件任意名这里是Counter.js,此文件夹下的文件是容器组件 不负责UI呈现 专门处理数据业务逻辑 使用Redux

> 如果`connect()(App)`中如左什么都不传,默认组件内部可通过`props`接收dispatch为参数,若传了则不能接收,仅了解,因`dispatch`一般不会在组件内用都是在`connect`中用

```jsx
import React from 'react'
//引入
import {connect} from 'react-redux'
import App from '../components/App'
import {increment,decrement} from '../redux/actions'

/*connect的作用是将组件App包装后返回包装后的App组件 会向App组件传递一般数据和方法 以便App组件内部接收
 

第一次调用 :
一参函数 返回对象 此函数接收参数store的数据即state 返回的对象键是传递给App的属性名 值是state数据
二参 同理
*/
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: (args) => dispatch(increment(args)),
        decrement: (args) => dispatch(decrement(args))
    }
};
export default connect(
    (state)=>({number:state}),
    mapDispatchToProps
)(App)
```

+ APP组件内负责UI呈现 不涉及Redux和业务逻辑 直接使用即可 

```jsx
import React, { Component } from 'react'
//需要下载此包 并引入 用于类型校验
import PropTypes from 'prop-types'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.mySelect = React.createRef()
    }
    static propTypes = {
        //进行了前面的操作后在props上就有了一个state和两个action工厂函数方法
        //通常我们进行类型校验 如果不传则不会报错 加了isRequired表示必须传
        //所以我们在这里对state和action进行校验 严谨点
        number:PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired
    }
    add = () => {
        //获取选择框的值
        const number = this.mySelect.current.value*1
// 更新 之前我们是dispatch  在这里我们直接调用action的工厂函数即可 相当于也会dispatch 通知更新
        this.props.increment(number)
    }
    render() {
        return (
            <div>
                <h1>此时number值为: {this.props.number}</h1>
                <select ref = {this.mySelect}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <button onClick={this.add}>增加</button>
            </div>
        )
    }
}
```

+ UI组件写了东西 容器组件也已经包装了 此时引入的就是包装后的组件即容器组件而不是原有APP组件 

```jsx
//在index.js内写的
//引入Provider 这是个组件
import {Provider} from 'react-redux'
import Counter from './containers/Counter'

//用Provider将App组件包裹起来后就不用单独再写subscribe这类的操作 会自动处理更新
//给Provider传递属性store 此时就不是传给App了 而是把状态给Provide
ReactDOM.render(<Provider store={ store }><Counter /></Provider>, document.getElementById('root'));

```

**到此结束,react-redux插件用到的就是如下东西 : **

+ **Provider**
  让所有组件都可以得到state数据

+ **connext**
  包装UI组件生成容器组件

+ **mapStateToprops()**
  connext的一参 将外部的数据 即state对象转换为UI组件的标签属性

+ **mapDispatchToprops**

  将分发的action的函数转换为UI组件的标签

  简洁语法可以直接指定为actions对象或包含多个action方法的对象

# 八. redux异步编程(不用看了,umi封装好了)

> 我们经常通过ajax请求数据, 是在react内发异步请求进行异步操作,但是正常来说异步请求应该在redux中做.但是redux不支持异步操作 如果我们想进行此操作就要用到插件

#### 8.1 下载redux插件(异步中间件)

这是redux的插件,不是react的,所谓中间件就是扩展当前库功能的插件.

```js
npm i redux-chunk -S
```

#### 8.2 基本使用

在store.js中

==注意:这里安装后引入redux-chunk 使用却会报错  原因待查==

```js
//redux内还可引入applyMiddleware表应用中间件 这是个函数
import { createStore,applyMiddleware } from "redux";
import chunk from 'redux-chunk'
//引入后创建store的第二个参数传函数执行 参数是chunk 本来redux不支持异步操作的但是这么写后就支持异步操作了 也必须这么写
export default createStore(handleTodo,applyMiddleware(chunk))
```

在actions.js中

```javascript
//同步的action返回一个对象
//异步的action返回一个函数
export const addAsync = title => {
//return的函数内进行异步操作 再dispatch分发事件 每一个异步action最好都有一个同步action 异步操作是等到异步完成再通知 而同步是立即通知
    return (dispatch) => {
        setTimeout(() => {
            dispatch(add(title))
        }, 1000)
    }
}
```

# 九. 暴露多个reducer(不用看了,umi封装好了)

```javascript
import { createStore } from "redux";
import {acount} from './reducers'
const store = createStore(acount)
```

创建store的时候会为createStore传的第一个参数是reducer函数,一个应用只能有一个store 那么当有多个reducer的时候怎么办 ?

在redux中还可引入combineReducers 它是一个函数 combine译整合 即将多个reducer整合到一起

>reducers.js中写

```jsx
//1.引入
import { combineReducers } from 'redux'
//2.在reducer中就不分开导出函数了 而是暴露如下 传入对象 把reducer函数名字丢进去 属性值和属性名最好一致防止出错
export default combineReducers({
    handleTodo,
    Todo
})
```

>store.js写

```javascript
//此时传的就是整合后的 这样导致的结果是直接getState()获取到的state是一个对象 而对象属性名是函数名 值就是对应reducer调用后返回的新state
//简单来说如果再用state 就必须state.reducer的函数名获取对应值state
import reducers from './reducers'
const store = createStore(reducers)
```

```javascript
//再获取时就要从对象取 例
export default connect(
    (state)=>({number:state.handleTodo}),  //这里也可以直接解构{number:{handleTodo}}
)(App)
```



# 十. 使用redux调试工具

#### **10.1 谷歌安装扩展**

![image-20200108103417586](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20200108103417586.png)

> 若直接使用显示如下

![image-20200226235109585](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20200226235109585.png)

#### **10.2 还需操作 中间件**

> 中间件有很多种,这里只写两种,每种效果不同

**方法一:** ==(推荐)==

> 以图表方式显示

​	使用方法: 在reducer后面加上这句话即可

```js
export default createStore(
  reducers,
  //加上下面这句话就可以使用此工具了
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

效果:diff可以看到差异和不同,比如修改了哪些,进行对比

![image-20200227000253173](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20200227000253173.png)



**方法二:**

> 会将进行的操作打印到控制台中,没有图表 ,效果没有方法一好

[redux-logger中间件官网]: https://github.com/LogRocket/redux-logger

```js
//1.在项目中安装
yarn add redux-logger

//2.使用  引入redux自带的applyMiddleware 和 刚安装的redux-logger 再应用中间件
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'

const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```

​	效果展示:

![image-20200227001547106](C:\Users\35614\AppData\Roaming\Typora\typora-user-images\image-20200227001547106.png)


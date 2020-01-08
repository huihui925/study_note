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

`React`脚手架没安装`Redux`, 所以需要手动安装, 运行命令

```js
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
+ **容器组件**
  + 负责数据和业务逻辑 不负责UI的呈现
  + 使用Redux的API
  + 一般保存在`containers`文件夹下

#### 7.4 使用

+ 建立文件夹`containers`,新建文件任意名这里是Counter.js,此文件夹下的文件是容器组件 不负责UI呈现 专门处理数据业务逻辑 使用Redux

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

到此结束

+ **Provider**
  让所有组件都可以得到state数据

+ **connext**
  包装UI组件生成容器组件

+ **mapStateToprops()**
  connext的一参 将外部的数据 即state对象转换为UI组件的标签属性

+ **mapDispatchToprops**

  将分发的action的函数转换为UI组件的标签

  简洁语法可以直接指定为actions对象或包含多个action方法的对象








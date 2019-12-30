#### **基本使用**

| `imp→`  | `import moduleName from 'module'`             |
| ------- | --------------------------------------------- |
| `imn→`  | `import 'module'`                             |
| `imd→`  | `import { destructuredModule } from 'module'` |
| `exp→`  | `export default moduleName`                   |
| `anfn→` | `(params) => { }`                             |
| `nfn→`  | `const functionName = (params) => { }`        |
| `sti→`  | `setInterval(() => { }, intervalTime`         |
| `sto→`  | `setTimeout(() => { }, delayTime`             |

#### React

| `imr→`  | `import React from 'react'`                |
| ------- | ------------------------------------------ |
| `imrd→` | `import ReactDOM from 'react-dom'`         |
| `imrc→` | `import React, { Component } from 'react'` |
|         |                                            |

| `rconst→` | `constructor(props) with this.state`          |
| --------- | --------------------------------------------- |
| `est→`    | `this.state = { }`                            |
| `cdm→`    | `componentDidMount = () => { }`               |
| `cwun→`   | `componentWillUnmount = () => { }`            |
| `ren→`    | `render() { return( ) }`                      |
| `sst→`    | `this.setState({ })`                          |
| `ssf→`    | `this.setState((state, props) => return { })` |
| `props→`  | `this.props.propName`                         |
| `state→`  | `this.state.stateName`                        |

#### 组件

### `rcc`

```jsx
import React, { Component } from 'react'

export default class FileName extends Component {
  render() {
    return <div>$2</div>
  }
}
```

### `rfc`

```jsx
import React from 'react'

export default function $1() {
  return <div>$0</div>
}
```

### `rce`

```jsx
import React, { Component } from 'react'

export class FileName extends Component {
  render() {
    return <div>$2</div>
  }
}

export default $1
```

### `rafc`

```jsx
import React from 'react'

const $1 = () => {
  return <div>$0</div>
}

export default $1
```


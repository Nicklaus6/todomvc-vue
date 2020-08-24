# todomvc-vue 项目总结
### 一、项目初始化

**1.下载模板**

在存放该项目的目录下执行：

   ```
git clone  https://github.com/tastejs/todomvc-app-template.git
   ```

**2. 安装依赖**

进入项目目录

```
cd todomvc-vue
```
在项目目录下安装依赖

```
yarn
```

**3. 引入vue**

安装vue

```
yarn add vue
```

在 `index.html` 中引入 vue

```javascript
<script src="node_modules/vue/dist/vue.js"></script>
```

在 `app.js`中创建vue对象

```javascript
(function (Vue) {
    new Vue({
        el:"#todoapp",
    })
})(Vue)
```

并在`index.html`中将其挂载到 DOM 元素 (`#todoapp`)

```html
<section class="todoapp" id="todoapp">...</section>
```



完成以上操作后，用浏览器打开 `index.html` ，若界面是以下这样就说明项目初始化*成功*了。



### 二、功能实现和思考

**1. 列表数据渲染**

+  创建数据并加入Vue实例中的 `data` 对象

  ```javascript
  let todos = [
      // 先写两条假数据测试一下
      { id: 1, content: "阿巴阿巴", completed: true },
      { id: 2, content: "马卡马卡", completed: false }
  ]
  
   new Vue({
      ...
      data () {
        return {
          todos: todos
        }
      },
    })
  ```

  

+ 无数据时

  `.main` 和 `.footer` 隐藏 : `v-if` 条件渲染

  ```html
  <section class="main" v-if="todos.length">...</section>
  
  <section class="footer" v-if="todos.length">...</section>
  ```

  

  **思考**：为什么这里使用 `v-if` 而不是 `v-show` 呢？他们的区别是？

  

  **共同点** : 他们的功能都是 *条件渲染* 。

  **不同点** :  `v-show` 的原理是修改 `css` 的display属性，并没有操作 `dom`元素。

  ​		 	 `v-if` 的原理是根据条件，动态地销毁或添加 `dom`元素。但 `v-if` 也是 **惰性**

  ​			   的，如果初始条件为 `false` ，则什么都不做，等到条件为 `true` 了再开始渲染。

  **因此**，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。如果需要频繁切换，建议使用 `v-show`，如果不需要频繁切换，则可以使用 `v-if` 。而这里`.main` 和 `.footer`并不会频繁切换状态，所以使用 `v-if`。

  ​	



+ 有数据时 

  + 动态渲染数据列表 : `v-for` 列表渲染
  
  + 绑定相应状态下的 class : `:class` class 的绑定
  
  + checkbox 选中状态切换 : `v-model` 双向数据绑定
  
  + label 内容渲染 : `Mustache` 语法
  
  ```html
  <ul class="todo-list">
          <li v-for="(item,index) in todos"
              :key="item.id"
              :class="{completed:item.completed}">
            <div class="view">
              <input class="toggle"
                     type="checkbox"
                     v-model="item.completed">
              <label>{{ item.content }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
          </li>
  </ul>
  ```
  
  **思考** :
  
  1. 为什么在使用 `v-for` 时 还要使用 `:key` ？
  
     Vue在更新使用 `v-for` 渲染的列表元素时，会采用一种 **就地复用** 策略，尽可能的尝试就地修改/复用相同类型元素。而 `:key` 给了每个节点一个 **唯一标识**，让虚拟 DOM 中的 Diff 算法正确识别节点，从而重用和重新排序现有元素，从而更加 **高效地更新虚拟 DOM**。
  
     
  
  2. `v-model` 的原理？
  
     `v-model` 用于表单数据的双向绑定，本质上是语法糖。
  
     它背后做了两个操作 : 
  
     `v-bind` 绑定一个 value 属性，`v-on` 给当前元素绑定 input 事件。
  
     ```html
     <input v-model="something"></input>
     以上操作等价于
     <input :value="something" @input="something = $event.target.value"></input>
     先绑定一个 something 属性，在通过监听 input 事件，当用户改变输入框数据时，通过设置当前事件的目标dom的value，从而实现双向数据绑定的效果。
     ```
  
     

**2. 添加新的 todo**

+ 按下回车，输入内容不为空，添加一条 `todo`  : 

  + `@keyup.enter` 监听键盘回车事件并在 vue 的 `methods `中添加相应方法
  + 内容为空则什么都不做 
  + 添加完后输入框内容清空 

  ```html
  <input class="new-todo"
         placeholder="What needs to be done?"
         autofocus
         @keyup.enter="addTodo">
  </input>
  ```

  ```javascript
  methods: {
        addTodo ($event) {
          // 创建 newTodo 对象，获取数据
          const newTodo = {
            id: this.todos.length + 1,
            content: $event.target.value.trim(),
            completed: false
          }
          // 如果内容为空，什么都不做
          if (!newTodo.content.length) return
          // 如果内容不为空，将 newTodo 加入 todos 中
          this.todos.push(newTodo)
          // 清空输入框内容
          $event.target.value = ''
        }
      }
  ```

  


**3. 删除 todo**

+ 点击 `.destroy`，删除所在的 `todo` : 

  + `@click` 监听按钮点击事件并在 vue 的 `methods `中添加相应方法

  + 数组的 `splice` 方法删除 `todo`
  
    ```html
     <button class="destroy" @click="destroyTodo(index)"></button>
    ```
  
    ```javascript
    methods: {
          ...
          destroyTodo (index) {
            // 用 splice 方法通过参数 index 来找到要删除的 todo，删除一项
            this.todos.splice(index, 1)
          }
    }
    ```
  
    



​    

**4. 编辑 todo**

+ 双击 `label` ，进入编辑模式

  + `@dblclick`  监听 `label` 双击事件

  + `:class` 给所在的 `li`绑定 class `.editing`

  这里设置一个中间变量 `currentEditing` （就像一种状态），当监听到 `label` 双击事件时，`currentEditing = item`，而当 `item === currentEditing` 时，就给所在的 `li`绑定 class

  ```html
  <li v-for="(item,index) in todos" :key="item.id"
      :class="{ completed: item.completed , editing: item === currentEditing }">
  </li>
  ```

  ```
  <label @dblclick="currentEditing = item">{{ item.content }}</label>
  ```
  
  + 局部自定义指令 `directives` 让输入框自动获取焦点
  
    ```html
    <input class="edit" 
           :value="item.content"
           v-editing-focus="item === currentEditing">
    </input>
    ```
  ```javascript
    
    directives:{
      // update 在所有组件的 VNode(虚拟节点) 更新时调用，但可能发生在其子 VNode 更新之前。
    	update(el,binding){
        // el : 用来操作元素 DOM
        // binding.value : 指令的绑定值 这里即 item === currentEditing
    		if(binding.value){
    			el.focus()
    		}
    	}
    }
  ```
  
    


+ 输入内容后回车或失焦，将原本的 `todo`内容替换为输入的内容
  + `@keyup.enter` 监听键盘回车事件；`@blur` 监听失焦事件
  
    ```html
    <input class="edit"
           :value="item.content"
           v-editing-focus="item === currentEditing"
           @keyup.enter="saveEditing(item,index,$event)"        		 	                      @blur="saveEditing(item,index,$event)">
    ```
    
  
    
  + 在vue 的 `methods `中添加相应方法
  
    ```javascript
    saveEditing (item, index, $event) {
            // 将输入的内容保存到 newContent 变量中
            const newContent = $event.target.value.trim()
            // 如果内容为空 就删除 todo 
            if (!newContent) this.destroyTodo(index)
            //将原本容替换为输入的内容
            item.content = newContent
            //通过设置 currentEditing ，移除掉 .editing ，退出编辑模式。
            this.currentEditing = null
          }
    ```
  
    
  
  + `:value` 给 `input`绑定内容
  
    ```html
    <input class="toggle"
           type="checkbox"
           v-model="item.completed"
           :value="item.content">
    ```
  
    
  
+ 按下 esc，退出编辑模式
  
  
  + `@keyup.esc` 监听键盘回车事件
  
    ```html
    <input class="edit"
           :value="item.content"
           v-editing-focus="item === currentEditing"
           @keyup.enter="saveEditing(item,index,$event)"        		 	                      @blur="saveEditing(item,index,$event)"
           @keyup.esc="quitEditing">
    ```
  + 并在vue 的 `methods `中添加相应方法
    ```javascript
    quitEditing () {
            // 通过设置 currentEditing 移除掉 .editing 退出编辑模式
            this.currentEditing = null
          }
    ```
  
    



**5. 标记所有任务完成或者未完成**

+ 点击 `.toggle-all` ，将所有的 `todos` 的完成状态 和 `.toggleAll` 的勾选状态 绑定

  + `@click` 监听按钮点击事件并在 vue 的 `methods `中添加相应方法

    ```html
    <input id="toggle-all" class="toggle-all" type="checkbox"
           @click="toggleAll">
    ```

    ```javascript
    methods: {
          toggleAll ($event) {
            // 获取 .toggleAll 的勾选状态
            let isToggled = $event.target.checked
            // 将所有的 todos 的完成状态 和 .toggleAll 的勾选状态 绑定
            this.todos.forEach(item => item.completed = isToggled);
          },  		
    }
    ```

    

+ 将  `.toggleAll` 的勾选状态 和  `todos` 是否全选绑定

  + 给 `.toggle-all`  的`checked` 属性绑定一个的计算属性来监听单选框选中情况的改变并在 vue 的 `computed `中添加相应方法

    ```html
    <input id="toggle-all" class="toggle-all" type="checkbox"
           @click="toggleAll"
           :checked="isAllChecked">
    <!-- 也可以写 v-model="isAllChecked" 因为 checkbox 使用 checked property 和 change 事件 -->
    ```

    ```javascript
    computed: {
          isAllChecked () {
            return !this.todos.find(item => !item.completed)
          }
        },
    ```

**思考：**

 1. `computed` vs `methods`  ? `computed`  vs `watch` ?

    `computed` vs `methods` ：

    **计算属性是基于它们的响应式依赖进行缓存的**。只有相关响应式依赖发生改变时，他们才会重新求值。而**方法**会在每次重新渲染时调用函数，**不占用缓存但是会消耗一定时间**。

    `computed` vs `watch` ：

    虽然**计算属性在大多数情况下更合适**，但是当需要在**数据变化时执行异步或开销较大的操作**时，使用**侦听器**更合适。

    

 2. `v-model` 在内部为 checkbox 使用的 property`和抛出的事件？

    checkbox 和 radio 使用 `checked` property 和 `change` 事件。什么是 `change` 事件？其实就是 HTML 的 `onchange` 事件。它是元素值被改变（用户改变，用代码内部改变无效）且表单失焦时触发的事件。

    所以此时 `v-model`的原理是：

    ```html
    <input type="checkbox" v-model="something"></input>
    以上操作等价于
    <input type="checkbox" 
           :checked="something" @change="something = $event.target.checked">
    </input>
    ```

    同理，select 字段将 `value` 作为 prop 并将 `change` 作为事件。

    ```html
     <select name="" id="" v-model="something">
                <option disabled value="">请选择</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
    </select>
    以上操作等价于
     <select name="" id="" :value="something" @change="something = $event.target.value">
                <option disabled value="">请选择</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
    </select>
    ```

    

**6. 计数**



**7. 清除所有完成项**



**8. 三种状态数据过滤**



**9. 数据持久化**
(function (Vue) {

  // let todos = [
  //   // 先写两条假数据测试一下
  //   { id: 1, content: "阿巴阿巴", completed: true },
  //   { id: 2, content: "马卡马卡", completed: false }
  // ]

  let STOREAGE_KEY = "todo-items"

  // 定义数据存储对象
  const todoStorage = {
    // 获取本地数据 localStorage.getItem("key")
    fetch: function () {
      // 返回获取的本地数据的数组对象 ,如果为空，则是空数组 || '[]',
      return JSON.parse(localStorage.getItem(STOREAGE_KEY) || '[]')
    },
    // 保存数据到本地 localStorage.setItem("key","value")
    save: function (todos) {
      // 以 JSON 字符串形式存储 todos 数据
      localStorage.setItem(STOREAGE_KEY, JSON.stringify(todos))
    }
  }

  window.app = new Vue({
    el: "#todoapp",
    data () {
      return {
        todos: todoStorage.fetch(),
        currentEditing: null,
        filterState: 'all'
      }
    },
    directives: {
      editingFocus: {
        // update 在所在组件的 VNode(虚拟节点) 更新时调用，但是可能发生在其子 VNode 更新之前。
        update (el, binding) {
          // el : 操作元素 DOM
          // binding.value : 指令的绑定值 这里即 item === currentEditing
          if (binding.value) {
            el.focus()
          }
        }
      },
    },
    watch: {
      // 监听 todos 变化
      todos: {
        deep: true, // 监听对象内部值的变化
        handler (newTodos) {
          todoStorage.save(newTodos)
        }
      }
    },
    computed: {
      isAllChecked () {
        return !this.todos.find(item => !item.completed)
      },
      todoCount () {
        return this.todos.filter(item => !item.completed).length
      },
      hasCompleted () {
        // 当至少有一项完成项才显示
        return this.todos.filter(item => item.completed > 0).length > 0
      },
      filterTodos () {
        switch (this.filterState) {
          case 'active':
            return this.todos.filter(item => !item.completed);
            break
          case 'completed':
            return this.todos.filter(item => item.completed);
            break
          default:
            return this.todos;
            break
        }
      }
    },
    methods: {
      addTodo ($event) {
        // 创建 newTodo 对象 , 获取数据
        const newTodo = {
          id: this.todos.length + 1,
          content: $event.target.value.trim(),
          completed: false
        }
        // 如果内容为空 什么都不做
        if (!newTodo.content.length) return
        // 如果内容不为空 将 newTodo 加入 todos 中
        this.todos.push(newTodo)
        // 清空输入框内容
        $event.target.value = ''
      },
      destroyTodo (index) {
        //用 splice 方法通过参数 index 来找到要删除的 todo，删除一项
        this.todos.splice(index, 1)
      },
      saveEditing (item, index, $event) {
        // 将输入的内容保存到 newContent 变量中
        const newContent = $event.target.value.trim()
        // 如果内容为空 就删除 todo 
        if (!newContent) this.destroyTodo(index)
        // 将原本容替换为输入的内容
        item.content = newContent
        // 通过设置 currentEditing 移除掉 .editing 退出编辑模式
        this.currentEditing = null
      },
      quitEditing () {
        // 通过设置 currentEditing 移除掉 .editing 退出编辑模式
        this.currentEditing = null
      },
      toggleAll ($event) {
        // 获取 .toggleAll 的勾选状态
        let isToggled = $event.target.checked
        // 将所有的 todos 的完成状态 和 .toggleAll 的勾选状态 绑定
        this.todos.forEach(item => item.completed = isToggled);
      },
      clearCompleted () {
        this.todos = this.todos.filter(item => !item.completed)
      }
    },
  });

  // 路由状态切换
  // 当 一个窗口的 hash （URL 中 # 后面的部分）改变时就会触发 hashchange 事件
  window.onhashchange = function () {
    // 获取当前点击状态的路由 hash  获取的 location.hash 是 #/all 这样的数据
    const hash = window.location.hash.substr(2) || 'all'
    // 将路由状态赋给 过滤状态
    window.app.filterState = hash
    console.log(window.app.filterState)
  }
  // 页面第一次进来保持状态
  window.onhashchange()

})(Vue);

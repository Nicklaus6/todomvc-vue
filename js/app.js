(function (Vue) {

  let todos = [
    // 先写两条假数据测试一下
    { id: 1, content: "阿巴阿巴", completed: true },
    { id: 2, content: "马卡马卡", completed: false }
  ]

  new Vue({
    el: "#todoapp",
    data () {
      return {
        todos: todos,
        currentEditing: null
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
        console.log(todos)
        // 清空输入框内容
        $event.target.value = ''
      },
      destroyTodo (index) {
        //用 splice 方法通过参数 index 来找到要删除的 todo，删除一项
        this.todos.splice(index, 1)
        console.log(this.todos)
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
      }

    },



  })



})(Vue);

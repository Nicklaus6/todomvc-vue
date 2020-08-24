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
        currentEditing: null,

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

    computed: {
      // isSelectedAll () {
      //   if (!this.todos.length) return false
      //   console.log('isSelectedAll' + !this.todos.find(item => !item.completed))
      //   return !this.todos.find(item => !item.completed)
      // }
      isAllChecked () {
        // if (!this.todos.length) return false
        // console.log(this.todos.every(item => item.completed))
        // return this.todos.every(item => item.completed)
        return !this.todos.some(item => !item.completed)
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
      },
      toggleAll ($event) {
        // 获取 .toggleAll 的勾选状态
        let isToggled = $event.target.checked
        // 将所有的 todos 的完成状态 和 .toggleAll 的勾选状态 绑定
        this.todos.forEach(item => item.completed = isToggled);

        // console.log(this.isAllChecked)
        // if (this.isAllChecked) { // 全选了 就全取消选中
        //   this.todos.forEach(item => item.completed = false);
        // } else { //没有全选中 就全选中
        //   this.todos.forEach(item => item.completed = true)
        // }

      },
      // listenAllChecked (item) {
      //   // 监听所有单选框 全选中了就 全选框勾选 有一个没选中 全选框就不勾选
      //   console.log(item.completed)
      //   console.log('1')
      // }

      // toggleAllChecked () {
      //   if (this.isSelectedAll) { //全选
      //     console.log(this.isSelectedAll)
      //     this.todos.forEach(item => item.completed = false);
      //   } else { //没有全选中
      //     console.log(this.isSelectedAll)
      //     this.todos.forEach(item => item.completed = true)
      //   }
      // }
    },



  })



})(Vue);

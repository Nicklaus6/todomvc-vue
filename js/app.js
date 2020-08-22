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
        todos: todos
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
        console.log(todos)
        // 清空输入框内容
        $event.target.value = ''
      },
      destroyTodo (index) {
        //用 splice 方法通过参数 index 来找到要删除的 todo，删除一项
        this.todos.splice(index, 1)
        console.log(this.todos)
      }
    }

  })



})(Vue);

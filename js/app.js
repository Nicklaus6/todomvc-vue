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

  })



})(Vue);

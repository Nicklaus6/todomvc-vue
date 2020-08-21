# todomvc-vue项目总结
### 一、项目初始化

**1.下载模板**

在存放该项目的目录下执行：

   ```
git clone  https://github.com/tastejs/todomvc-app-template.git
   ```

**2. 安装依赖**

进入项目目录

```
cd todomvc-app-template
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
<body>
	<section class="todoapp" id="todoapp">...</section>
</body>
```



+ 完成以上操作后，用浏览器打开 `index.html` ，若界面是以下这样就说明项目初始化成功了。

  

### 二、功能实现和思路

**1. 列表数据渲染**



**2. 添加新的 todo**



**3. 删除 todo**



**4. 编辑 todo**



**5. 状态切换**



**6. 计数**



**7. 清除所有完成项**



**8. 三种状态数据过滤**



**9. 数据持久化**
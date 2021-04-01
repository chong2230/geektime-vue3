# Note

1. 在组件的setup(props, ctx)中，取不到ctx的值

2. 在单文件组件里，scoped 的样式不会应用在 v-html 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 v-html 的内容设置带作用域的 CSS，你可以替换为 CSS modules 或用一个额外的全局 <style> 元素手动设置类似 BEM 的作用域策略。

3. 路由history模式打包页面一片空白，现采用hash模式

(Vue项目打包后页面一片空白的解决方法)[https://blog.csdn.net/liuhailong2014/article/details/90898339]

4. 打包路径不对，需在vite.config.js中配置base: './'

5. 打包后，ctx.$api为undefined

6. 怎么配置开发环境和生产环境的server

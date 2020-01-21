# canvas-utils
Canvas utils

## 演示
[https://codepen.io/laziji/pen/ZEYVWMe](https://codepen.io/laziji/pen/ZEYVWMe)


# 使用

```html
<script src="https://unpkg.com/canvas-djs/dist/canvas-d.js"></script>
<script>
  CanvasUtils.dim(canvas, 1, 3);
</script>
```

```js
// 原型
// dim(canvas, pixel, radius);
// canvas 画布对象
// pixel 像素块大小 1 ~
// radius 模糊半径 1 ~ , 从当前像素开始计算
// 纯马赛克 dim(canvas, 3, 1);
// 纯模糊 dim(canvas, 1, 3);
const { dim } = require("../src/index");
dim(canvas, 3, 5);
```
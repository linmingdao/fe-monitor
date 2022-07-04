# 前端监控

## 一、前端监控目标

### 1、稳定性

* js错误（js执行错误、promise异常）
* 资源异常（script、link等资源加载异常）
* 接口错误（ajax、fetch请求接口异常）
* 白屏

### 2、用户体验

* TTFB(time to first byte，首字节时间)
  + 是指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包含了网络请求时间、后端处理时
* FP(First Paint，首次绘制)
  + 首次绘制包括了任何用户自定义的背景绘制，它是将第一个像素点绘制到屏幕的时刻
* FCP(First Content Paint，首次内容绘制)
  + 首次内容绘制是浏览器将第一个DOM渲染到屏幕的时间，可以是任何文本，图像，SVG等的时间
* FMP(First Meaningfulpaint，首次有意义绘制)
  + 首次有意义绘制是页面可用性的量度标准
* FID(First Input Delay，首次输入延迟)
  + 用户首次和页面交互到页面响应交互的时间
* 卡顿：超过50ms的长任务

### 3、业务

* PV(page view)：页面浏览量或者点击量
* UV：访问某个站点不同IP地址人数
* 页面停留时间：用户在每一个页面的停留时间

## 二、前端监控流程

埋点 -> 数据采集 -> 数据建模存储 -> 数据传输(时时、批量) -> 数据统计(分析、挖掘) -> 数据可视化 | 报告告警

## 三、埋点方案

### 1、代码埋点

### 2、可视化埋点

### 3、无痕埋点(全埋点)

## 四、核心技术点

### 1、P1_1, 开始 ~ 结束, 监控js错误

#### 当异常出现时，获取用户交互的最后一个事件

[MDN: EventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E7%9A%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD)

[UI Events, event-flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

[preventDefault, stopPropagation](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)

[introduction-to-dom-events](https://dom.spec.whatwg.org/#introduction-to-dom-events)

[events_order](https://www.quirksmode.org/js/events_order.html#link4)

[DOM0、DOM1、DOM2、DOM3, DOM0级事件、DOM2级事件，JavaScript高级程序设计](https://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-html.html)

[DOM0、DOM1、DOM2、DOM3, DOM0级事件、DOM2级事件](https://juejin.cn/post/6844903846431424525)

```JavaScript
// 技巧，不妨碍用户交互，比如滚动、点击等操作 -> 配置 passive 为 true
// 为了一定可以获取事件对象，要设置 capture 为 true，因为用户可能会把事件阻止冒泡，导致冒泡阶段无法记录交互事件
document.addEventListener(
    eventType,
    (event) => {
        // 记录event
    }, {
        capture: true, // 捕获阶段执行
        passive: true, // 默认不阻止默认事件（使用 passive 改善的滚屏性能）
        // https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
        // once, signal,
    }
);
```

#### 监控js异常

```JavaScript
window.addEventListener("error", function(event) {
    // 从event上拿到错误信息
})
```

#### 监控promise异常

```JavaScript
window.addEventListener("unhandledrejection", function(event) {
    // 从event上拿到错误信息
});
```

#### 监控资源加载错误

```JavaScript
window.addEventListener("error", function(event) {
    // 从event上拿到资源加载错误的信息
})
```

```JavaScript
// 有个坑注意一下：HtmlWebpackPlugin加载script的一个策略
new HtmlWebpackPlugin({
    // <script defer src=""></script>
    // https://www.w3school.com.cn/tags/att_script_defer.asp
    // https://github.com/jantimon/html-webpack-plugin#options
    scriptLoading: "blocking" // 不配置该选项默认值是：defer
})
```

### 2、P2_2, 开始 ~ 00:40:50, 日志上报到阿里SSl服务

### 3、监控Ajax错误

### 4、P3_3, 00:27:25 ~ 00:27:25, 监控白屏原理

#### 读取样例

[elementsFromPoint api 采样](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementsFromPoint)

#### onload

控制取样执行的时机

## 五、统计时间

### 1、P3_3, 01:06:28 地址输入url地址浏览器做了什么

## 六、如何统计卡顿

## 七、统计pv、uv、页面停留时间

## 如何可视化展示

* 如何写各种各样的查询语句出那些最实用的报表
* 设备占比
* 浏览器占比
* pv、uv停留时间
* pv增长情况，今天比昨天增加多少
* SLS

## 报警

* 设置各种各样的条件触发邮件、短信报警

## 主流开源产品

* sentry
* 顶塔

商业神策

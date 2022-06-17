export function injectJsError() {
  // 监听全局未捕获的js错误
  window.addEventListener("error", function (event) {
    console.log(event);
    // 上报日志的数据结构
    let log = {
      king: "stability", // 监控指标的大类
      type: "error", // 小类型，这是一个错误
      errorType: "jsError", // JS执行错误
      url: "", // 访问哪个路径报错
      message: event.message, // 报错信息
      filename: event.filename, // 报错的文件
      position: `${event.lineno}:${event.colno}`, // 报错的位置
      stack: event.error.stack, // 报错的堆栈信息
      selector: "", // 报错的元素信息
    };
    console.log(log);
  });
}

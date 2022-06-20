import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";

export function injectPromiseError() {
  // 监控promise异常
  window.addEventListener("unhandledrejection", function (event) {
    // console.log(event);
    const lastEvent = getLastEvent();
    let message;
    let filename;
    let lineno;
    let colno;
    let stack;
    let reason = event.reason;
    if (typeof reason === "string") {
      message = reason;
    } else if (typeof reason === "object") {
      // 解析：at http://localhost:8080/:26:32
      if (reason.stack) {
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        filename = matchResult[1];
        lineno = matchResult[2];
        colno = matchResult[3];
        stack = reason.stack;
      }
      message = reason.message;
    }
    // 上报日志
    console.log({
      king: "stability", // 监控指标的大类
      type: "error", // 小类型，这是一个错误
      errorType: "promiseError", // JS执行错误
      url: location.href, // 访问哪个路径报错
      message, // 报错信息
      filename, // 报错的文件
      position: `${lineno}:${colno}`, // 报错的位置
      stack, // 报错的堆栈信息
      selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后一个操作的元素（报错的元素信息）
    });
  });
}
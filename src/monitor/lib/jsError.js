import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import isResourceElement from "../utils/isResourceElement";
import trackter from "../utils/trackter";

// onerror vs addEventListener -> https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
export function injectJsError() {
  // 监听全局未捕获的js错误
  window.addEventListener(
    "error",
    function (event) {
      if (isResourceElement(event)) return;
      let lastEvent = getLastEvent();
      // 上报日志的数据结构
      trackter.send({
        king: "stability", // 监控指标的大类
        type: "error", // 小类型，这是一个错误
        errorType: "jsError", // JS执行错误
        message: event.message, // 报错信息
        filename: event.filename, // 报错的文件
        position: `${event.lineno}:${event.colno}`, // 报错的位置
        stack: event.error.stack, // 报错的堆栈信息
        selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后一个操作的元素（报错的元素信息）
      });
    },
    true
  );
}

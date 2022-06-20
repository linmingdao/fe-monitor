import getSelector from "../utils/getSelector";
import isResourceElement from "../utils/isResourceElement";
import trackter from "../utils/trackter";

// onerror vs addEventListener -> https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
export function injectResourceError() {
  // 监听全局未捕获的资源加载错误
  window.addEventListener(
    "error",
    function (event) {
      if (!isResourceElement(event)) return;
      // 上报日志
      trackter.send({
        king: "stability", // 监控指标的大类
        type: "error", // 小类型，这是一个错误
        errorType: "resourceError", // 资源加载错误
        url: location.href, // 访问哪个路径报错
        message: "资源加载错误", // 报错信息
        filename: event.target.src || event.target.href, // 报错的文件
        tagName: event.target.tagName.toLowerCase(),
        selector: getSelector(event.target), // 代表最后一个操作的元素（报错的元素信息）
      });
    },
    true
  );
}

import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import onload from "../utils/onload";
import trackter from "../utils/trackter";

export function injectTiming() {
  let FMP, LCP;

  // 增加一个性能条目的观察者-观察页面中的元素
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observer.disconnect();
  }).observe({ entryTypes: ["element"] });

  // 观察页面中的有意义元素
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries();
    LCP = perfEntries[0];
    observer.disconnect();
  }).observe({
    entryTypes: ["largest-contentful-paint"],
  });

  // FID，观察用户的第一次交互：点击页面或者输入等等用户行为
  new PerformanceObserver((entryList, observer) => {
    let lastEvent = getLastEvent();
    let firstInput = entryList.getEntries()[0];
    if (firstInput) {
      // 开始处理的时间 - 开始点击的时间 = 处理的延迟
      let inputDelay = firstInput.processingStart - firstInput.startTime;
      //   处理的耗时
      let duration = firstInput.duration;
      if (inputDelay > 0 || duration > 0) {
        trackter.send({
          kind: "experience", // 用户体验指标
          type: "firstInputDelay", // 首次输入延迟
          inputDelay, // 延迟时间
          duration, // 处理时间
          startTime: firstInput.startTime,
          selector: lastEvent
            ? getSelector(lastEvent.path || lastEvent.target)
            : "",
        });
      }
    }
    observer.disconnect();
  }).observe({ type: "first-input", buffered: true });

  onload(function () {
    setTimeout(() => {
      // 获取时间节点数据
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = performance.timing;

      // 计算时间指标
      trackter.send({
        kind: "experience", // 用户体验指标
        type: "timing", // 统计每个阶段的时间
        connectTime: connectEnd - connectStart, // 链接时间
        ttfbTime: responseStart - requestStart, // 首字节时间
        responseTime: responseEnd - responseStart, // 响应读取时间
        parseDOMTime: loadEventStart - domLoading, // DOM解析时间
        domContentLoadedTime:
          domContentLoadedEventEnd - domContentLoadedEventStart,
        timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
        loadTime: loadEventStart - fetchStart, // 完整的加载时间
      });

      let FP = performance.getEntriesByName("first-paint")[0];
      let FCP = performance.getEntriesByName("first-contentful-paint")[0];
      //   console.log(FMP);
      //   console.log(LCP);
      //   console.log(FP);
      //   console.log(FCP);
      trackter.send({
        kind: "experience", // 用户体验指标
        type: "paint", // 统计绘制时间,
        "firstPaint:FP": FP.startTime,
        "firstContentfulPaint:FCP": FCP.startTime,
        "firstMeaningfulPaint:FMP": FMP.startTime,
        "largestContentfulPaint:LCP": LCP.startTime,
      });
    }, 3000);
  });
}

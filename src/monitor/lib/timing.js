import onload from "../utils/onload";
import trackter from "../utils/trackter";

export function injectTiming() {
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
    }, 3000);
  });
}

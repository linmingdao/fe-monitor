import onload from "../utils/onload";
import trackter from "../utils/trackter";

export function injectBlankScreen() {
  let emptyPoints = 0;

  function getSelector(element) {
    if (element.id) {
      return `#${element.id}`;
    } else if (element.className) {
      return `.${element.className
        .split(" ")
        .filter((item) => !!item)
        .join(".")}`;
    } else {
      return element.nodeName.toLowerCase();
    }
  }

  function isWrapper(element) {
    const selector = getSelector(element);
    const wrapperSelectors = [
      "html",
      "body",
      ".content",
      ".container",
      ".main",
    ];
    if (wrapperSelectors.includes(selector)) {
      ++emptyPoints;
    }
  }

  onload(function () {
    // 采样
    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (i * window.innerWidth) / 10,
        window.innerHeight / 2
      );
      const yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (i * window.innerHeight) / 10
      );
      isWrapper(xElements[0]);
      isWrapper(yElements[0]);
    }

    // 判断是否白屏
    if (emptyPoints >= 15) {
      let centerElement = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      trackter.send({
        king: "stability", // 监控指标的大类
        type: "blank",
        emptyPoints, // 采样的空白点
        screen: `${window.screen.width}x${window.screen.height}`, // 屏幕分辨率
        viewPort: `${window.innerWidth}x${window.innerHeight}`, // 视口大小
        selector: getSelector(centerElement[0]),
      });
    }
  });
}

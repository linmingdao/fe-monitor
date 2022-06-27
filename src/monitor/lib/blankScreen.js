import onload from "../utils/onload";

export function injectBlankScreen() {
  let emptyPoints = 0;
  function getSelector() {}
  function isWrapper() {}
  onload(function () {
    // 采样
    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint();
      const yElements = document.elementsFromPoint();
    }
  });
}

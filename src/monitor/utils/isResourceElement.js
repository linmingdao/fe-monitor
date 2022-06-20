export default function (event) {
  let target = event.target;
  return (
    target instanceof HTMLScriptElement ||
    target instanceof HTMLLinkElement ||
    target instanceof HTMLImageElement
  );
}

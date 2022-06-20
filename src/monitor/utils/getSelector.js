function getSelectors(path) {
  return path
    .reverse()
    .filter((element) => element !== document && element !== window)
    .map((element) => {
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === "string") {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        return element.nodeName.toLowerCase();
      }
    })
    .join(" ");
}

export default function (pathsOrTarget) {
  if (Array.isArray(pathsOrTarget)) {
    return getSelectors(pathsOrTarget);
  } else {
    let paths = [];
    while (pathsOrTarget) {
      paths.push(pathsOrTarget);
      pathsOrTarget = pathsOrTarget.parentNode;
    }
    return getSelectors(paths);
  }
}

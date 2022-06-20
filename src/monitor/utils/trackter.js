// let host = "cn-beijing.log.aliyuncs.com";
// let project = "monitor";
// let logStore = "monitor-store";
let userAgent = require("user-agent");

function getExtraData() {
  return {
    title: document.title,
    url: location.href, // 访问哪个路径报错
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent),
  };
}

class SendTrackter {
  constructor() {
    // this.url = `${project}.${host}/logstores/${logStore}/track`; // 上报的路径
    // this.xhr = new XMLHttpRequest();
  }
  send(data = {}) {
    const log = { ...getExtraData(), ...data };
    console.log("trackter上报日志：", log);

    // http写入日志服务
  }
}

export default new SendTrackter();

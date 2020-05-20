const port = chrome.extension.connect({
  name: 'App-Communication',
});

port.onMessage.addListener(function (message) {
  console.log(message);
  if (message.eventName === 'background-get-permission') {
    const message = {
      eventName: 'get-permission',
      eventType: 'click',
    };
    port.postMessage(message);
  } else if (message.eventName === 'background-get-stream') {
    const rtc = new webRtcHandler();
    rtc.createAnswer(message.sdp, function (answer) {
      if (answer.stream) {
        const videoElem = document.createElement('video');
        document.body.appendChild(videoElem);
        videoElem.srcObject = answer.stream;
        videoElem.play();
      } else if (answer.sdp) {
        const message = {
          eventName: 'create-answer',
          sdp: answer,
        };
        port.postMessage(message);
      }
    });
  }
});

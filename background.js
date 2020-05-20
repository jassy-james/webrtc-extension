let currentPort, rtc;

chrome.runtime.onConnect.addListener(function (port) {
  currentPort = port;

  port.onMessage.addListener((message) => {
    if (message.sdp) {
      console.log(message.sdp);
      if (!rtc || !rtc.peer) return;
      rtc.setRemoteDescription(message.sdp);
      return;
    }
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab);
  window.navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      onGettingLocalStream(stream);
    })
    .catch((error) => {
      console.log(error);
      chrome.tabs.create({
        url: chrome.runtime.getURL('permission.html'),
      });
      //   const message = {
      //     eventName: 'background-get-permission',
      //   };
      //   currentPort.postMessage(message);
    });
});

function onGettingLocalStream(stream) {
  //   console.log(stream);
  rtc = new webRtcHandler();
  rtc.createOffer(stream, function (offer) {
    // console.log(offer);
    const message = {
      eventName: 'background-get-stream',
      sdp: offer,
    };
    currentPort.postMessage(message);
  });
}

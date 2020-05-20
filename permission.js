document.addEventListener('DOMContentLoaded', function () {
  window.navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  // .then((stream) => {
  //   console.log(stream);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
});

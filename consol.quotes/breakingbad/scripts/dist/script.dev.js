"use strict";

! --hide; //-->

var options = {
  appId: "1a99abaee80c4c468496d0302e3ecdb2",
  certificate: "010f2fd44ee244998fd9854b82063389",
  channel: "weChat",
  token: "0061a99abaee80c4c468496d0302e3ecdb2IAAxwekX4nz3OOxChnI9b93PbtSKQcMJoT1WREM8wD52NG/m3BIAAAAAEAB7rfAfDSe1YQEAAQALJ7Vh",
  AppIdentifier: "CN3FgFK2Eeywi4c7t7IxHQ/vdazrgOo95MIhg"
}; //-->

var rtc = {
  client: null,
  localAudioTrack: null,
  localVideoTrack: null
};
var btnCam = document.getElementById("btnCam");
var btnMic = document.getElementById("btnMic");
var btnStart = document.getElementById("btnStart");
var btnStop = document.getElementById("btnStop");
var me = document.getElementById("me");
var remote = document.getElementById("remote");

var join = function join() {
  return regeneratorRuntime.async(function join$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rtc.client = AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8"
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(rtc.client.join(options.appId, options.channel, options.token, null));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

function startBasicCall() {
  return regeneratorRuntime.async(function startBasicCall$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          join().then(function () {
            startVideo();
            startAudio();
            rtc.client.on("user-published", function _callee(user, mediaType) {
              var remoteVideoTrack, remoteAudioTrack;
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (rtc.client._users.length > 1) {
                        roomFull();
                      }

                      _context2.next = 3;
                      return regeneratorRuntime.awrap(rtc.client.subscribe(user, mediaType));

                    case 3:
                      remote.classList.remove("waiting");

                      if (mediaType === "video") {
                        remoteVideoTrack = user.videoTrack;
                        remoteVideoTrack.play("remote");
                      }

                      if (mediaType === "audio") {
                        remoteAudioTrack = user.audioTrack;
                        remoteAudioTrack.play();
                      }

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
          });
          btnStop.classList.remove("hidden");
          btnStart.classList.add("hidden");

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

btnStop.addEventListener("click", function () {
  leave();
});
btnStart.addEventListener("click", function () {
  startBasicCall();
});
btnCam.addEventListener("click", function () {
  btnCam.classList.contains("active") ? stopVideo() : startVideo();
});
btnMic.addEventListener("click", function () {
  btnMic.classList.contains("active") ? stopAudio() : startAudio();
});

var roomFull = function roomFull() {
  leave();
  remote.classList.add("full");
};

var leave = function leave() {
  stopVideo();
  stopAudio();
  rtc.client.leave();
  btnStop.classList.add("hidden");
  btnStart.classList.remove("hidden");
};

var stopAudio = function stopAudio() {
  rtc.localAudioTrack.close();
  rtc.client.unpublish(rtc.localAudioTrack);
  btnMic.classList.remove("active");
};

var startAudio = function startAudio() {
  return regeneratorRuntime.async(function startAudio$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(AgoraRTC.createMicrophoneAudioTrack());

        case 2:
          rtc.localAudioTrack = _context4.sent;
          rtc.client.publish(rtc.localAudioTrack);
          btnMic.classList.add("active");

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var stopVideo = function stopVideo() {
  rtc.localVideoTrack.close();
  rtc.client.unpublish(rtc.localVideoTrack);
  btnCam.classList.remove("active");
};

var startVideo = function startVideo() {
  return regeneratorRuntime.async(function startVideo$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          me.classList.add("connecting");
          _context5.next = 3;
          return regeneratorRuntime.awrap(AgoraRTC.createCameraVideoTrack());

        case 3:
          rtc.localVideoTrack = _context5.sent;
          rtc.client.publish(rtc.localVideoTrack);
          me.classList.remove("connecting");
          rtc.localVideoTrack.play("me");
          btnCam.classList.add("active");

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};
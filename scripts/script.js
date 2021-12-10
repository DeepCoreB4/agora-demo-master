<!--hide
const options = {
  appId: "1a99abaee80c4c468496d0302e3ecdb2",
  certificate:"010f2fd44ee244998fd9854b82063389",
  channel: "weChat",
  token: "0061a99abaee80c4c468496d0302e3ecdb2IAAxwekX4nz3OOxChnI9b93PbtSKQcMJoT1WREM8wD52NG/m3BIAAAAAEAB7rfAfDSe1YQEAAQALJ7Vh",
  AppIdentifier: "CN3FgFK2Eeywi4c7t7IxHQ/vdazrgOo95MIhg",
};
//-->
let rtc = {
  client: null,
  localAudioTrack: null,
  localVideoTrack: null,
};

const btnCam = document.getElementById("btnCam");
const btnMic = document.getElementById("btnMic");
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const me = document.getElementById("me");
const remote = document.getElementById("remote");

const join = async () => {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  return await rtc.client.join(
    options.appId,
    options.channel,
    options.token,
    null
  );
};

async function startBasicCall() {
  join().then(() => {
    startVideo();
    startAudio();

    rtc.client.on("user-published", async (user, mediaType) => {
      if (rtc.client._users.length > 1) {
        roomFull();
      }

      await rtc.client.subscribe(user, mediaType);
      remote.classList.remove("waiting");

      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play("remote");
      }

      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
    });
  });
  btnStop.classList.remove("hidden");
  btnStart.classList.add("hidden");
}

btnStop.addEventListener("click", () => {
  leave();
});
btnStart.addEventListener("click", () => {
  startBasicCall();
});
btnCam.addEventListener("click", () => {
  btnCam.classList.contains("active") ? stopVideo() : startVideo();
});
btnMic.addEventListener("click", () => {
  btnMic.classList.contains("active") ? stopAudio() : startAudio();
});

const roomFull = () => {
  leave();
  remote.classList.add("full");
};

const leave = () => {
  stopVideo();
  stopAudio();
  rtc.client.leave();
  btnStop.classList.add("hidden");
  btnStart.classList.remove("hidden");
};

const stopAudio = () => {
  rtc.localAudioTrack.close();
  rtc.client.unpublish(rtc.localAudioTrack);
  btnMic.classList.remove("active");
};

const startAudio = async () => {
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  rtc.client.publish(rtc.localAudioTrack);
  btnMic.classList.add("active");
};

const stopVideo = () => {
  rtc.localVideoTrack.close();
  rtc.client.unpublish(rtc.localVideoTrack);
  btnCam.classList.remove("active");
};
const startVideo = async () => {
  me.classList.add("connecting");
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  rtc.client.publish(rtc.localVideoTrack);
  me.classList.remove("connecting");
  rtc.localVideoTrack.play("me");
  btnCam.classList.add("active");
};

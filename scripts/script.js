const options = {
  appId: "db9d640e75354588af20871d2981fef0",
  certificate:"cc2d6bebdeda43a89731fb12742b411d",
  channel: "V-Call",
  token: "006db9d640e75354588af20871d2981fef0IABXe3aqXIhegGFSFwcEvKIVGw6ch5OBobuOSna0uQudouD+vB8AAAAAEAA+DPg7vGSvYQEAAQC8ZK9h",
};


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
  rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
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
    // 4 personen erlaub im Chat...
    rtc.client.on("user-published", async (user, mediaType) => {
      if (rtc.client._users.length >4) {
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

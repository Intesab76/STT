const textBody = document.querySelector("textarea");

var speechRecognition = window.webkitSpeechRecognition;
//
var micOn;

// Used for Visualizations....
let context = window.AudioContext || window.webkitAudioContext;
let audioCtx = new context();

let distortion = audioCtx.createWaveShaper();
let gainNode = audioCtx.createGain();
let biquadFilter = audioCtx.createBiquadFilter();
let analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;

analyser.fitSize = 256;

var mic = document.querySelector("#startStt");
var isListening = false;
var tracks = [];

if (!navigator.mediaDevices.getUserMedia) {
  alert("Not supported on this browser ...");
}

// requestAnimationFrame(function log() {
//   let bufferLength = analyser.frequencyBinCount;
//   let dataArray = new Uint8Array(bufferLength);
//   analyser.getByteFrequencyData(dataArray);
//   const level = Math.max.apply(null, dataArray);
//   document.querySelector("#startStt").textContent = level;
//   mic.style.setProperty("--border", `${level / 5}px`);
//   requestAnimationFrame(log);
//   console.log("Inside Req anima......");
//   isListening = false;
// });
let stream;
let req;
mic.addEventListener("click", async () => {
  console.log("before Var check ---... " + isListening);
  if (!isListening) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      isListening = true;
    } catch (e) {}
  }
  console.log("Listening Var ...." + isListening);
  if (isListening === true) {
    try {
      // tracks = stream.getTracks();
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(analyser);
      // analyser.connect(audioCtx.destination);
      console.log(micOn);
    } catch (e) {
      console.log("Some error Occurred ..." + e);
    }
  } else {
    isListening = false;
    tracks.forEach((track) => {
      track.stop();
    });
  }
});

//

// For TTS...
// var synth = window.speechSynthesis;

var recognition = new speechRecognition();

var textbox = $("#textbox");
console.log(textbox);

var instructions = $("#instructions");

var content = "";

recognition.continuous = false;
// recognition.interimResults = true;

// if (recognition.continuous === true) {
//   requestAnimationFrame(function log() {
//     let bufferLength = analyser.frequencyBinCount;
//     let dataArray = new Uint8Array(bufferLength);
//     analyser.getByteFrequencyData(dataArray);
//     const level = Math.max.apply(null, dataArray);
//     document.querySelector("#startStt").textContent = level;
//     mic.style.setProperty("--border", `${level / 5}px`);
//     requestAnimationFrame(log);
//   });
// }
// recognition.interimResults = true;
console.log("Interim Results ..." + recognition.interimResults);

recognition.onstart = () => {
  function reqAnim() {
    requestAnimationFrame(function log() {
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      const level = Math.max.apply(null, dataArray);
      document.querySelector("#startStt").textContent = level;
      mic.style.setProperty("--border", `${level / 5}px`);
      req = requestAnimationFrame(log);
      console.log("Inside Req anima......");
      isListening = false;
      // cancelAnimationFrame(req);
    });
  }
  reqAnim();
  // requestAnimationFrame(requestAnimationFrame);
  console.log("started");
  micOn = true;

  instructions.text("Speech Recognition Started...");
  // textBody.style.
  // console.log(instructions)
  //   instructions.text("Voice Recognition is on...");
};
recognition.onspeechend = () => {
  recognition.stop();
  cancelAnimationFrame(req);
  console.log("Stopejfsgf");
  // micOn = false;

  instructions.text("Speech Recognition stopped....");
};

recognition.onerror = () => {
  instructions.text("Try again , some error occurred ...");
};

recognition.onresult = (event) => {
  var curr = event.resultIndex;

  var transcript = event.results[curr][0].transcript;

  content = transcript;

  textbox.val(content);
  // console.log(content);

  //   console.log(recognition.interimResults);
};

// $("#startStt").click((event) => {
document.querySelector("#startStt").addEventListener("click", async (event) => {
  if (content.length) {
    content += "";
  }

  recognition.start();
});

// textbox.on("input", () => {
//   content = $(this).val;
// });

if ("speechSynthesis" in window) {
  var synth = window.speechSynthesis;
} else {
  console.log("Error Occurred or the browser does not support....");
}

synth.lang = "en";

if (content !== "") {
  const speak = new SpeechSynthesisUtterance(content);
  speak.onend = (event) => {
    console.log("Done Speaking ...");
  };

  Speaker.onerror = (event) => {
    console.log("Some error occurred ...");
  };
}

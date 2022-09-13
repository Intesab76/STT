window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = false;

const textArea = document.querySelector("#textbox");
const instructions = document.querySelector("#instructions");

recognition.onstart = () => {
  instructions.textContent = "Speech Recognition Started ...";
  console.log("STT Started ...");
};

recognition.onspeechend = () => {
  instructions.textContent = "Speech Recognition Ended ...";
  recognition.stop();
  console.log("STT ended ...");
};

recognition.onerror = () => {
  instructions.textContent = "Error occurred ...";
};

var content = "";

recognition.onresult = (event) => {
  console.log("Before ..." + event);
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  content = transcript;
  textArea.textContent = content;
};
var mic;

function setup() {
  createCanvas(1600, 800);
  // background(0);
  mic = new p5.AudioIn();
  mic.start();
}
function touchStarted() {
  getAudioContext().resume();
}
var vol;
// var waveform = FFT.waveform();
var photo;
function imagePreload() {
  photo = loadImage("./mic.jpg");
}
function draw() {
  vol = mic.getLevel();
  //   console.log(vol);
  // (x,y,w,h);
  // image(photo, 0, 0);
  // maskImg = createGraphics(300, 300);
  let h = map(vol, 0, 1, height, 0);
  ellipse(840, 80, vol * 1000, vol * 1000);
  // photo.mask(maskImg);
  // image(photo, 300, 0);

  // ---------------------------------------------------

  // console.log("Height" + height);
  // console.log("Width" + width);
  // ellipse(90, 100, vol * 500, vol * 300);
  // waveform([64], [45]);
}

document.querySelector("#startStt").addEventListener("click", async () => {
  if (content.length) {
    content += "";
  }

  var vol = mic.getLevel();
  background(224);
  // let h = map(vol, 0, 1, height, 0);
  // ellipse(width / 2, h - 25, 50, 50);

  // console.log(ellipse());

  console.log("Volume-----" + vol);
  recognition.start();
  // document.querySelector("#startStt").removeEventListener("click", () => {});
});

import p5 from "p5";
var mic;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  var vol = mic.getLevel();
  console.log(vol);
}

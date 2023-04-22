let button_image = document.getElementById("button_image");
function audio() {
  if (!btn_audio.paused) {
    btn_audio.pause();
  }
  else {
    btn_audio.play();
  }
  button_image.classList.toggle("ON");
  // let btn = document.getElementsByClassName("btn")[0];
  // console.log(btn);
  // if (btn.imageContent === "おん！！") {
  //   btn.textContent = "おふ！！";
  // } else {
  //   btn.textContent = "おん！！";
  // }

}

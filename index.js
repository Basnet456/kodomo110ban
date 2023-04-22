const music = new Audio("start.mp3");
new Vivus(
  "svg866", //2）で付与したID名を書く
  {
    type: "oneByOne", //1パスずつ書く
    start: "autostart", //ビューポート内に表示されたらスタート
    duration: 600, //速さ
    animTimingFunction: Vivus.EASE_OUT, //イージング
  }
);
function nextpage() {
  music.currentTime = 0;
  music.play();
  setTimeout(() => {
    window.location.href = "./main.html";
  }, 3000);
}

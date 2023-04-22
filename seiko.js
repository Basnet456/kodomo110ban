var latitude;
var longitude;
var ans;

//ボタン
const buttonSave = document.getElementById("buttonSave");
const ButtonReturn = document.getElementById("buttonReturn");

const music = new Audio("a.mp3");
let targetSync = new Vivus(
  "svg5",
  {
    duration: 30,
    start: "autostart",
    type: "sync", //アニメーション変更箇所
  },
  function (obj) {
    obj.el.classList.add("finished");
  }
);
window.addEventListener("load", (event) => {
  setTimeout(() => {
    music.play();

    // window.location.href = "./zahyou.html";
    // }, 5000);
  }, 3000);
});
//座標を取得
function test() {
  navigator.geolocation.getCurrentPosition(test2);
}

function test2(position) {
  //my code
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function dataSave() {
  db.collection("users")
    .where("points", "==", latitude + "," + longitude)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ans = doc.data();
      });
      if (ans) {
        alert(`このばしょはとうろくされているよ`);
      } else {
        db.collection("users").add({
          answers: "",
          points: latitude + "," + longitude,
        });
        alert(`ここのばしょをとうろくしました`);
        refreshPage();
      }
    });
}

test();
buttonSave.addEventListener("click", function () {
  dataSave();
});

function refreshPage() {
  setTimeout(function () {
    //  href = "https://formtest12-19.web.app/".location.reload();
    window.location.href = "./main.html";
  }, 1000);
}
ButtonReturn.addEventListener("click", function () {
  window.location.href = "./main.html";
});

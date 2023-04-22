var latitude;
var longitude;
var array;
var letter = [];
var markers = [];
var arraytest = "";
var word = "";
var finalanswer;
var placeCount = [];
var formAnswer;
var infowindow;
var queryString;
var value1;
var khajana;
var map;
var marker;
var directionsDisplay;
var directionsService;
var response;
var pinImage_red = new google.maps.MarkerImage(
  "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
);
var pinImage_blue = new google.maps.MarkerImage(
  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
);
var MarkerArray = new google.maps.MVCArray();

//const docRef = firestore.doc("samples").ref();
const saveButton = document.getElementById("saveButton");

//座標を取得
function test() {
  navigator.geolocation.getCurrentPosition(test2);
}

function test2(position) {
  //my code
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log(latitude);
  console.log(longitude);
}

//test();

//get all data where statement
db.collection("users")
  .where("answers", "==", "")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });

//refersh page
function refresh() {
  setTimeout(function () {
    location.reload();
  }, 2000);
}

//get all data from firebase

db.collection("users")
  .get()
  .then((snapshot) => {
    snapshot.docs.map((doc) => {
      arraytest = doc.data().points;

      placeCount.push(arraytest);
      word += arraytest + ":";
    });
    test();
    initMap();
  });
//マップ生成？
function initMap() {
  // Map option

  var options = {
    center: { lat: 35.1725302, lng: 136.8865799 },
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  //New Map
  map = new google.maps.Map(document.getElementById("map"), options);

  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      //strokeColor: '#FF0000',
      strokeColor: "#1e90ff",
      strokeWeight: 6,
      strokeOpacity: 0.6,
    },
  });
  //listen for click on map location

  //for
  for (i = 0; i < placeCount.length; i++) {
    var answer = word.split(/:/)[i];

    finalanswer = answer;
    var finalanswer = finalanswer.split(/,|\s/);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(finalanswer[0], finalanswer[1]),
      map: map,

      //draggable:true,
      //icon:'/scripts/img/logo-footer.png'
    });
    marker.addListener("click", function (e) {
      // data form firebase
      var touchPoint = e.latLng.lat() + "," + e.latLng.lng();

      //urlで座標を別のページに送る
      value1 = e.latLng.lat() + "," + e.latLng.lng();
      queryString = "?para1=" + value1;

      db.collection("users")
        .where("points", "==", touchPoint)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            formAnswer = doc.data().answers;
          });
          if (formAnswer && formAnswer.length > 0) {
            //座標に入っているアンケート結果を表示す

            var contentString_Show = `<h2>あんけーとのけっか</h2> <h3>おうちにいるひ</h3>
            <li>${formAnswer}</li>`;
            var infoWindow_Show = new google.maps.InfoWindow({
              content: contentString_Show,
            });

            infoWindow_Show.open(map, this);
          } else {
            // "&para2=" + value2;
            // window.location.href =
            //   "https://formtest12-19.web.app/form.html" + queryString;

            //アンケートが未回答なのでinfoWindow_Formを表示してアンケート画面に誘導

            infoWindow_Form.open(map, this);
          }
        });

      var contentString_Form = `<h1 id="firstHeading" class="firstHeading">あんけーとがめん</h1>
        <a href="./form.html?${queryString}" >にゅうりょく</a>`;

      var infoWindow_Form = new google.maps.InfoWindow({
        content: contentString_Form,
      });
    });
  }
  directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      //strokeColor: '#FF0000',
      strokeColor: "#1e90ff",
      strokeWeight: 6,
      strokeOpacity: 0.6,
    },
  });
  directionsDisplay.setMap(map);

  // createMarker関数の呼び出し
  createMarker();
}
//ルート検索
function searchRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;

  var rendererOptions = {
    draggable: true,
    preserveViewport: false,
  };

  directionsService = new google.maps.DirectionsService();
  var request = {
    origin: start,
    destination: end,
    waypoints: waypoints === null ? start : waypoints,
    travelMode: google.maps.DirectionsTravelMode.WALKING, // 自動車でのルート
    unitSystem: google.maps.DirectionsUnitSystem.METRIC, // 単位km表示
    optimizeWaypoints: true, // 最適化された最短距離にする
    avoidHighways: true, // 高速道路を除外
    avoidTolls: true, // 有料道路を除外
  };

  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    }
  });
  map = new google.maps.Map(document.getElementById("map_canvas"), response);
  directionsDisplay.setMap(map);
  //createMarker();
}

let waypoints = [];
//createMarker関数
function createMarker() {
  // mapをクリックしたときのイベントを設定
  google.maps.event.addListener(map, "click", maplistener);

  // mapをクリックしたときの処理
  function maplistener(event) {
    // marker作成
    marker = new google.maps.Marker({
      map: map,
      draggable: true, // ドラッグを可能にする
      icon: pinImage_blue,
    });
    // markerの位置を設定
    // event.latLng.lat()でクリックしたところの緯度を取得
    marker.setPosition(
      new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
    );
    MarkerArray.push(marker);
    //配列の宣言？
    let points = {};
    //pointsのlocationに緯度と経度を入れる
    points.location = `${marker.getPosition().lat()}, ${marker
      .getPosition()
      .lng()}`;

    //waypointsに配列pointをpushする
    waypoints.push(points);
    searchRoute();
  }
}
//deleteMarkers関数
function deleteMarkers() {
  MarkerArray.forEach(function (marker, idx) {
    marker.setMap(null);
  });
  MarkerArray = []; // marker配列の初期化
}
//csvOutput関数
function csvOutput() {
  MarkerArray.forEach(function (marker, idx) {
    var pos = marker.getPosition();
    var lat = pos.lat();
    var lng = pos.lng();
    $("#csv").append(lat + "," + lng + "<br />");
  });
}
//csvDelete関数
function csvDelete() {
  $("#csv").empty();
}
//invisibleMarkers関数
function invisibleMarkers() {
  markers.forEach(function (marker, idx) {
    marker.setVisible(false);
  });
}
//visibleMarkers関数
function visibleMarkers() {
  markers.forEach(function (marker, idx) {
    marker.setVisible(true);
  });
}

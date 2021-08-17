var map;
function initMap() {
    let target = document.getElementById('map');
    let empire = {lat: 35.6809591, lng: 139.7673068};
    //Empire State Bldg の緯度（latitude）と経度（longitude）
    map = new google.maps.Map(target, {
        center: empire,
        zoom: 16
    });

    var infoWindow = new google.maps.InfoWindow;

    //geolocationに対応しているかを確認
    if (!navigator.geolocation) {
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent('geolocationに対応していません。');
        infoWindow.open(map);
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('現在地を取得しました。');
            infoWindow.open(map);
            map.setCenter(pos);
            
            empire.lat = pos.lat;
            empire.lng = pos.lng;
            const form = document.getElementById('form');
            let latitude = document.createElement('input');
            let longitude = document.createElement('input');
            makeInput(latitude, 'lat', empire.lat);
            makeInput(longitude, 'lng', empire.lng);
        }, () => {
            infoWindow.setPosition(map.getCenter());
            infoWindow.setContent('Error: geolocationが無効です。');
            infoWindow.open(map);
        });
    }

}

function makeInput(latlng, id, value) {
    latlng.setAttribute('type', 'hidden');
    latlng.setAttribute('id', id);
    latlng.value = value;
    latlng.name = id;
    form.appendChild(latlng);
}


// 検索距離を取得
const range = document.getElementById('range');
const target = document.getElementById('range_target');
range.addEventListener('input', (e) => {
    target.textContent = range.value + 'm';
});
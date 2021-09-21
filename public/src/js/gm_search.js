"use strict";


let params = (new URL(document.location)).searchParams;

let user_lat;
let user_lng;
let range;
let keywords;
let zoom_level;
let type = [];
let types = [
    '',
    'convenience_store',
    'meal_takeaway',
    'atm',
    'train_station',
    'bus_station',
    'taxi_stand',
    'restaurant',
    'cafe',
    'bakery',
];
let result_num = document.querySelector('.result_num');
result_num.textContent = 0;

if (params) {
    user_lat = parseFloat(params.get('lat'), 10);
    user_lng = parseFloat(params.get('lng'), 10);
    range    = parseInt(params.get('range'), 10);
    if (range <= 200) {
        zoom_level = 16;
    } else if (200 < range && range <= 500) {
        zoom_level = 15;
    } else if (500 < range && range <= 1000) {
        zoom_level = 14;
    } else if (1000 < range && range <= 2000 ) {
        zoom_level = 13;
    }

    keywords  = params.get('keyword').replaceAll('　', ' ').split(' ');
    if (parseInt(params.get('type')) !== 0) {
        type = types[params.get('type')];
    } else {
        type = [''];
    }
} else {
    user_lat = 35.6809591;
    user_lng = 139.7673068;
    range = 500;
}


function initMap() {
    const target = document.getElementById('map');
    const place = {lat:user_lat, lng:user_lng}; // 現在地を指定
    const map = new google.maps.Map(target, {
        center: place,
        zoom: zoom_level,
    });

    // ポップアップの情報インスタンスの生成
    let infowindow = new google.maps.InfoWindow();

    let service = new google.maps.places.PlacesService(map);    
    
    if (!navigator.geolocation) {
        infowindow.setPosition(map.getCenter());
        infowindow.setContent('geolocationにが対応していません。');
        infowindow.open(map);
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        let mapOptions = {
            zoom: zoom_level,
            center: pos,
        }
        var myLocation = new google.maps.Marker({
            map: map,
            position: mapOptions.center,
            animation: google.maps.Animation.DROP,
            title: '現在地',
            icon: {
                url: '/src/img/my_location.svg',
                scaledSize: new google.maps.Size(32, 32),
            },
        });
        infowindow.setPosition(pos);
        infowindow.setContent('現在地を取得しました。');
        infowindow.open(map);
        map.setCenter(pos);

        service.nearbySearch({
            location: pos,
            radius: range,
            type: type,
            name: keywords,
        }, callback);

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const list = document.getElementById('results');
                result_num.textContent = results.length;
                for (let i=0;i<results.length;i++) {
                    createMarker(results[i], results[i].name);
                    let li = document.createElement('li');
                    li.innerHTML = '<a href="https://maps.google.co.jp/maps?q=' + results[i].name + results[i].vicinity + '">' + results[i].name + '</a>'
                    list.appendChild(li);
                }
            }
        }
    }, function () {
        infowindow.setPosition(map.getCenter());
        infowindow.setContent('Error: geolocationが無効です。');
        infowindow.open(map);
    });

    function createMarker(item, name) {
        var marker = new google.maps.Marker({
            map: map,
            position: item.geometry.location,
            animation: google.maps.Animation.DROP,
            title: name,
        });
        marker.addListener('click', function () {
            infowindow.setContent(item.name);
            infowindow.open(map, this);
        });
    }
}

// (() => {
//     var ul = document.getElementById('results');
//     var items= [
//         'ローソン 高崎中泉町店',
//         'セブンイレブン　高崎中泉町店',
//         'セブンイレブン　高崎大八木町店',
//         'ミニストップ 高崎大八木店',
//         '葉面酒場　Naruze',
//         'ENISHI',
//         'Restaurant Olivier',
//         'Casa Familiar',
//         'ローソン 高崎中泉町店',
//         'セブンイレブン　高崎中泉町店',
//         'セブンイレブン　高崎大八木町店',
//         'ミニストップ 高崎大八木店',
//         '葉面酒場　Naruze',
//         'ENISHI',
//         'Restaurant Olivier',
//         'Casa Familiar',
//         'ローソン 高崎中泉町店',
//         'セブンイレブン　高崎中泉町店',
//         'セブンイレブン　高崎大八木町店',
//         'ミニストップ 高崎大八木店',
//         '葉面酒場　Naruze',
//         'ENISHI',
//         'Restaurant Olivier',
//         'Casa Familiar',
//     ];
//     for (let i=0;i<items.length;i++) {
//         let item = document.createElement('li');
//         item.innerHTML = '<a href="#">' + items[i] + '</a>'
//         ul.appendChild(item);
//     }
// })();
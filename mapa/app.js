var map;
var markers2 = [];
async function showPosition(position) {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: position.coords.latitude, lng: position.coords.longitude },
		zoom: 15
	});

	// 	respJson.forEach((marker) => {
	// 		//console.log(marker);
	//
	// 		let pos = new google.maps.Marker({
	// 			position: coords,
	// 			title: marker.Name
	// 		});
	// 		pos.setMap(map)
	// 	});
	//
	// let markers = [
	// 	[ 47.1639626, 27.581539 ],
	// 	[ 47.1649816, 27.5812048 ],
	// 	[ 47.1581982, 27.5822707 ],
	// 	[ 47.1644219, 27.5684218 ],
	// 	[ 47.1590315, 27.5924191 ]
	// ];

	markers2.forEach((marker) => {
		let pos = new google.maps.Marker({ position: marker.coords, title: marker.name, map: map });
	});
}
async function initMap() {
	if (navigator.geolocation) {
		let resp = await fetch('https://us-central1-foodtalk-272618.cloudfunctions.net/getRestaurants ');
		let respJson = await resp.json();
		respJson.forEach((marker) => {
			lat = parseFloat(marker.Latitude);
			long = parseFloat(marker.Longitude);
			console.log(lat);
			console.log(long);
			let coords = new google.maps.LatLng(long, lat);
			markers2.push({ coords: coords, name: marker.Name });
		});
		await navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = 'Geolocation is not supported by this browser.';
	}
}

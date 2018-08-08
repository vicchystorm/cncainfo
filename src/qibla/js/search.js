function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.setCenter(place.geometry.location);
    document.querySelector("body").classList.remove('mapSat');
    //map.setZoom(15);
    setQibla(place.geometry.location.lat(), place.geometry.location.lng());
    //formatted_address:
    document.getElementById('geoLocality').innerHTML = place.formatted_address;
    document.getElementById('geoCountry').innerHTML = "";
    document.getElementById('geoCity').href = 'geo:'+place.geometry.location.lat()+','+place.geometry.location.lng();  

    hideSearch();
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
  }

}

function hideSearch(){
	seaching = false;
	document.querySelector("body").classList.remove('searching');
	watchID = navigator.compass.watchHeading(onSuccess, onError, optionsHeading);
	console.log(watchID + " hideSearch");

	document.querySelector("#search").classList.remove('show');
    document.querySelector("#citySearch").value = "";


}
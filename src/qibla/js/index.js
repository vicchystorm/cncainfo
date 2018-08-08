/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var geocoder;
var mapType = "ROADMAP";
var watchID;
var seaching = false;

window.onresize = function(event) {
            document.querySelector("body").style.height = window.innerHeight + "px";
    };

var app = {
    // Application Constructor
    initialize: function() {
        document.querySelector("body").style.height = window.innerHeight + "px";
        this.bindEvents();

        var compassNumber = 0;
        // paint compass
        for(var i=0;i<180;i++){
            compassNumber = i*2;
            compassNumber = (compassNumber==0)?"N":compassNumber;
            compassNumber = (compassNumber==90)?"E":compassNumber;
            compassNumber = (compassNumber==180)?"S":compassNumber;
            compassNumber = (compassNumber==270)?"W":compassNumber;

            document.getElementById('ring').innerHTML += '<span style="-webkit-transform: rotate('+i*2+'deg) translateX(10em);">'
                                                            +'<span class="compassNumber">'+compassNumber+'</span>'
                                                        +'</span>';
        }

        document.getElementById('searchGeoloc').onclick = function(){  
            window.navigator.geolocation.getCurrentPosition(function(position) {  			
				var geocoder = new google.maps.Geocoder();
				setCityFromLatLng(position.coords.latitude,position.coords.longitude, true);
				hideSearch();
				}, function(error) {
			   console.log("Erreur de géoloc N°"+error.code+" : "+error.message);
			   console.log(error);
			 });
        };
		
		

		window.navigator.geolocation.getCurrentPosition(function(position) {
			var geocoder = new google.maps.Geocoder();
						setCityFromLatLng(position.coords.latitude,position.coords.longitude, true);
						hideSearch();

		 }, function(error) {
		   console.log("Erreur de géoloc N°"+error.code+" : "+error.message);
		   console.log(error);
		 });


		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

        document.getElementById('getGeo').onclick = function(){
            seaching = true;
            document.querySelector("body").classList.add('searching');
            window.scrollTo(0,0);
            document.querySelector("#search").classList.add('show');
            document.querySelector("#citySearch").focus();
            navigator.compass.clearWatch(watchID);
            console.log(watchID + " clearWatch getGeo onclick");
        };

        document.getElementById('hideSearch').onclick = function(){
            hideSearch();
        };

        document.getElementById('citySearch').onblur = function(){
            //hideSearch();
        };



        document.getElementById('mapOut').onclick = function() {
                map.setZoom(map.getZoom()-1);
        };

        /*document.getElementById('mapMan').onclick = function() {
                map.setZoom(16);
        };*/

        document.getElementById('mapIn').onclick = function() {
                map.setZoom(map.getZoom()+1);
        };

        document.getElementById('mapSat').onclick = function() {
            if(mapType == "ROADMAP"){
                map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                mapType = "SATELLITE";
                document.querySelector("body").classList.add('mapSat');
            }else{
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                mapType = "ROADMAP";
                document.querySelector("body").classList.remove('mapSat');

            }
        };


    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		watchID = navigator.compass.watchHeading(onSuccess, onError, optionsHeading);
        console.log(watchID + " onDeviceReady watchHeading");
		navigator.geolocation.getCurrentPosition(onSuccessGeo, onErrorGeo);

        document.querySelector("body").classList.remove('notready');
        document.querySelector("body").classList.add('ready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:inline-block;');

        //log('Received Event: ' + id);
    }
};

var headingOld = 0, headingTmp = 0;
function onSuccess(heading) {

    /* console.log('magneticHeading: ' + heading.magneticHeading 
						+ '<br/>trueHeading: '+ heading.trueHeading
						+ '<br/>headingAccuracy: '+ heading.headingAccuracy
						+ '<br/>timestamp: '+ heading.timestamp); */

    headingTmp = Math.floor(heading.trueHeading+0.5);
    //headingTmp = heading.trueHeading.toFixed(1);
    
    /*document.getElementById('headingAccuracy').innerHTML = "headingTmp: "+ headingTmp + "°<br/>"
                                                             + "magneticHeading: "+heading.magneticHeading + "°<br/>"
                                                       		 + "trueHeading: "+heading.trueHeading + "°<br/>"
                                                        	 + "headingAccuracy: "+heading.headingAccuracy + "°";	*/
	//if(headingOld<360 && heading.trueHeading>0)

    if(seaching == false){
		
        document.getElementById('compass').style.webkitTransform = "rotate(-"+headingTmp+"deg)";
        document.getElementById('geoMapInner').style.webkitTransform = "rotate(-"+headingTmp+"deg)";
        document.getElementById('center').style.webkitTransform = "rotate("+headingTmp+"deg)";
        document.getElementById('info').style.webkitTransform = "rotate("+headingTmp+"deg)";

        document.querySelector("#ring > :nth-child(1) .compassNumber").style.webkitTransform = "rotate("+(headingTmp+90)+"deg)";
        document.querySelector("#ring > :nth-child(46) .compassNumber").style.webkitTransform = "rotate("+(headingTmp+0)+"deg)";
        document.querySelector("#ring > :nth-child(91) .compassNumber").style.webkitTransform = "rotate("+(headingTmp+270)+"deg)";
        document.querySelector("#ring > :nth-child(136) .compassNumber").style.webkitTransform = "rotate("+(headingTmp+180)+"deg)";

        document.getElementById('headingNumber').innerHTML = parseInt(headingTmp,10) + "°";

    }	

    // pour une meilleur transition entre les valeurs avant et aprés zéro
    headingOld = heading.trueHeading;
	
};

function onError(compassError) {
    log('Compass error: ' + compassError.code);
};

var optionsHeading = { frequency: 300 }; //ms


// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates


function setCityFromLatLng(lat,lng, fromGeoloc){
    document.getElementById('geoCity').href = 'geo:'+lat+','+lng;                           
    document.getElementById('geoLocality').innerHTML = parseFloat(lat).toFixed(2)+','+parseFloat(lng).toFixed(2);  
    document.getElementById('geoCountry').innerHTML = '';    
    /*document.getElementById('geoMapInner').style.backgroundImage = 'url(http://maps.google.com/maps/api/staticmap?center='+lat+','+lng+'&markers=%7C21.422515,39.826175&size=500x500&scale=2&style=gamma:2&zoom=16&key=AIzaSyBk8ZqXadQlSHZlqlKu4OR5MfveoA-hatQ)';*/
    
    //qibla
    setQibla(lat, lng);

    initializeMap(lat,lng);

    getCityNameFromGPS(lat,lng, fromGeoloc);
}

function log(txt){
    console.log(txt);
    document.getElementById('log').innerHTML = txt+"<br/>"+document.getElementById('log').innerHTML;
}

   
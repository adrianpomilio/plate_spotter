
var SPOTTER = ( function(_s, $){
	"use strict";

	var _locObj, _mySpots = {plates:[]}, _watchPositionId;
	
	// initializer if needed
	_s.init = function(){
		
		if(dealBreaker() !== false) {
			
	    	initializeLocation();
			initializeStorage();
			reportPlateView(states);
			displaySpotsView();
	    }else{
	    	document.querySelector('body').innerHTML = '<h1>Sorry, upgrade your browser to play.</h1><p>You current browser does not support the required HTML5 elements.</p>';
	    }

	};

	// setSpot function available publicly
	_s.setSpot = function(state){
		
			var _obj = {};
			_obj.id = Math.floor(Math.random() * (1 - 10000 + 1) + 10000); // not the best way
			_obj.state = state;
			_obj.yourLocation = _locObj;
			_obj.date = new Date();
			
			_mySpots.plates.push(_obj);

			setLocalStorageData('my_plates',_mySpots);
			displaySpotsView();

		
	};

	// removeSpot available publically
	_s.removeSpot = function(id){
		var i = 0, len = _mySpots.plates.length;
		for(i; i < len; i = i + 1){
			if(id == _mySpots.plates[i].id){
				_mySpots.plates.splice(i,1);
				setLocalStorageData('my_plates',_mySpots);
				displaySpotsView();
   				break;
			}
		}
	};
	
	
	// START functions only accesible within the scope of this function


	// Checking for all the required functionality to play the game
	function dealBreaker(){

		if(!navigator.geolocation){
			return false;
		};

		//http://mathiasbynens.be/notes/localstorage-pattern

		
	};
	
	
	function errorHandler(str){
		console.log(str);
	};



	function initializeStorage(){
		if (!window.localStorage.getItem('my_plates')){
			setLocalStorageData('my_plates', _mySpots)
		}else {
			_mySpots = getLocalStorageData('my_plates');
		}
	};

	function getLocalStorageData(key){
		var _obj = JSON.parse(localStorage.getItem(key));
		return _obj;

	};

	function setLocalStorageData(key, val){
		localStorage.setItem(key,JSON.stringify(val));
	};

	function initializeLocation(){
		 // makes a single call for location
		 // navigator.geolocation.getCurrentPosition(setLocationHandler, errorHandler);

		 // watches postion
		 _watchPositionId = navigator.geolocation.watchPosition(setLocationHandler, errorHandler, {enableHighAccuracy:false, timeout:6000, maximumAge:5000});

		
	};

	function setLocationHandler(pos){
		_locObj = pos;

		myLocationView(_locObj)

	};


	function templateCall(data, tmpl){
		var _data = data,
			_template = tmpl;

		
		var source   = $(_template).html();
		var template = Handlebars.compile(source);
		var html = template(_data);
		
		return html;

	}

	function reportPlateView(states){
		
		var _html = templateCall(states, '#spot-create-template');
		
		$('#spotFormPanel').append(_html).slideDown('slow');
		//$('#latLonDisplay').html(_locObj.coords.latitude + '  ' +_locObj.coords.longitude );
	};

	function displaySpotsView(){
		
		var _html = templateCall(_mySpots, '#spot-view-template');
		$('#mySpotsPanel').html(_html).slideDown('slow');
	};

	function myLocationView(obj){
		var _html = templateCall(obj, '#location-view-template');
		$('#latLonDisplay').html(_html).show('slow');
	
	};

	
	return _s;
	
}(SPOTTER || {},  jQuery))


var SPOTTER = ( function(_s, $){
	"use strict";

	var _locObj,params = {}, _mySpots = {plates:[]};
	
	// initializer if needed
	_s.init = function(){
		
		if(dealBreaker() !== false) {
			params = params;
	    	initializeLocation();
			initializeStorage();
			reportPlateView(states);
			displaySpotsView();
	    }else{
	    	document.querySelector('body').innerHTML = '<h1>Sorry, upgrade browser to play.</h1><p>You current browser does not support the required HTML5 elements.</p>';
	    }

	};

	// setSpot function available publicly
	_s.setSpot = function(){
		if($('#statePicker').val() !== "Choose State") {
			var _obj = {};
			_obj.state = $('#statePicker').val();
			_obj.yourLocation = _locObj;
			_obj.date = new Date();
			_mySpots.plates.push(_obj);

			setLocalStorageData('my_plates',_mySpots);
			displaySpotsView();

		}else {
			console.log('nothing to set, you chose nothing');
		}
		
	};

	// removeSpot available publically
	_s.removeSpot = function(id){
		var i = 0, len = _mySpots.plates.length;
		for(i; i < len; i = i + 1){
			if(id == _mySpots.plates[i].date){
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
		var validate;

		// can you fix the bug?  It's somewhere in this if statement... :)
		if(!navigator.geolocation){
			validate = false;
		}else if(window.hasOwnProperty('localStorage') && window.localStorage === null){
			console.log('checking localstorage');
			validate =  false;
			
		}else{
			validate = true;
		}

		return validate;
	};
	
	
	function errorHandler(str){
		console.log(str);
	};



	function initializeStorage(){
		if (!window.localStorage.getItem('my_plates')){
			
			localStorage.setItem('my_plates',JSON.stringify(_mySpots));
		}else {

			_mySpots = JSON.parse(localStorage.getItem('my_plates'));

		}
	};

	function initializeLocation(){
		 // makes a single call for location
		 // navigator.geolocation.getCurrentPosition(setCurrentLocation, errorHandler);

		 // watches postion

		
	};

	function setCurrentLocation(pos){

			return _locObj = pos;
	};


	function templateCall(data, tmpl){
  		"use strict";
		var _data = data,
			_template = tmpl;

		
		var source   = $(_template).html();
		var template = Handlebars.compile(source);
		var html = template(_data);
		
		return html;

	}

	

	function getData(type){
		var _obj = {};
			_obj.data = JSON.parse(localStorage.getItem(type));

		return _obj;

	};

	function setLocalStorageData(type, obj){
		localStorage.setItem(type,JSON.stringify(obj));
	};

	function reportPlateView(states){
		
		var _html = templateCall(states, '#spot-create-template');
		
		$('#spotFormPanel').append(_html).slideDown('slow');
		//$('#latLonDisplay').html(_locObj.coords.latitude + '  ' +_locObj.coords.longitude );
	};

	function displaySpotsView(){
		var _html = templateCall(_mySpots, '#spot-view-template');
		$('#mySpotsPanel').html(_html).slideDown('slow');
	};
	
	return _s;
	
}(SPOTTER || {},  jQuery))

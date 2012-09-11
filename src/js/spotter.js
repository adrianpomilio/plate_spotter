
var SPOTTER = (function(_s,window, document, $){
	var _locObj;
	
	var _myspots = [];
		
		
	
	
	// initializer if needed
	_s.init = function(){
	    
	    if(dealBreaker() !== false){
	    	
	    	setEventHandlers();
		
			getLocation();

			//initializeStorage();

	    }else{
	    	document.querySelector('body').innerHTML = '<h1>Sorry, upgrade browser to play.</h1><p>You current browser does not support the required HTML5 elements.</p>';
	    }

	};


	// START private functions that can't be accessed outside of the function


	// Checking for all the required functionality to play the game
	function dealBreaker(){
		if(!navigator.geolocation){
			return false;
		}else if(('localStorage' in window) && window['localStorage'] === null){
			return false;
		}

		return true;
	};
	
	
	function errorHandler(str){
		console.log(str);
		document.querySelector('#workArea').innerHTML = '<h1>Error</h1><p>There was an error.</p>';
	};

	function setEventHandlers(){
		
		$('#spotLink').live('click',function(e){
			_s.reportPlate(states);
		});

		
		$('#submitPick').live('click',function(e){	
			_s.setSpot();
		});

		$('#viewMySpots').live('click',function(e){	
			_s.getMySpots();
		});

	};

	/*function initializeStorage(){
		if (!window.localStorage.getItem('plate_spotter')){
			
			localStorage.setItem('my_plates',JSON.stringify(_mySpots));
		}else {
			_my = JSON.parse(localStorage.getItem('my_plates'));
		}
		
		

	};*/
	
	
	
	function getLocation(){
		
		// getting the intial value once, maybe we need to watch for it?
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(getCurrentLocation, errorHandler);
		  
		} else {
		  errorHandler('geolocation not working');
		}

		function getCurrentLocation(pos){
			return _locObj = pos;
		};
		
	};


	function templateCall(data, tmpl){

		var _data = data;
		var _template = tmpl;

		var source   = $(_template).html();
		var template = Handlebars.compile(source);
		var html = template(_data);
		
		return html;

	};

	function getData(type){
		var _obj = {};
			_obj.data = JSON.parse(localStorage.getItem(type));

		return _obj;

	};

	function setData(type, obj){
		localStorage.setItem(type,JSON.stringify(obj));
	};


	// END private
	
	// START public methods

	_s.reportPlate = function(states){
		
		var _html = templateCall(states, '#spot-create-template');
		
		$('#workArea').html(_html);
		$('#spotCreatePanel').slideDown('slow');
		$('#latLonDisplay').html(_locObj.coords.latitude + '  ' +_locObj.coords.longitude );
	};
	
	_s.setSpot = function(){
		
		var _obj = {};
			_obj.state = $('#statePicker').val();
			_obj.yourLocation = _locObj;
			_obj.date = new Date();
			
			
			_myspots.push(_obj);
			
			setData('my_plates',_myspots);
			
	};
	
	_s.getMySpots = function(){
		
		var _plates = getData('my_plates');
		var _html = templateCall(_plates, '#spot-view-template');
		
		$('#workArea').append(_html);
		$('#mySpotsPanel').slideDown('slow');
	};
	
	_s.getAllSpots = function(){
		
		
	};
	
		
	

	
	// this allows us to create a 'private' like scenario only _s.methods will be available outside of this function
	return _s;
	
}(SPOTTER || {}, window, document, jQuery))

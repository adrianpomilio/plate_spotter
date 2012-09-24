
var SPOTTER = ( function(_s, $){
	"use strict";

	var _mySpots = {plates:[]};

	// setSpot function available publicly
	_s.setSpot = function(){
		if($('#statePicker').val() !== "Choose State") {
			var _obj = {};
			_obj.state = $('#statePicker').val();
			_obj.date = new Date();
	
			_mySpots.plates.push(_obj);

			
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
				
				displaySpotsView();
   				break;
			}
		}
	};
	
	
	// START functions only accesible within the scope of this function

	_s.reportPlateView = function(states){
		var source   = $('#spot-create-template').html();
		var template = Handlebars.compile(source);
		var html = template(states);
		
		$('#spotFormPanel').append(html).slideDown('slow');
		
	};

	function displaySpotsView(){
		var source   = $('#spot-view-template').html();
		var template = Handlebars.compile(source);
		var html = template(_mySpots);
		$('#mySpotsPanel').html(html).slideDown('slow');
	};
	
	return _s;
	
}(SPOTTER || {},  jQuery))

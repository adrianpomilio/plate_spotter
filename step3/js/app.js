


$(document).ready(function(){
		SPOTTER.reportPlateView(states);
		
		$('#statePicker').live('change',function(e){	
			
			SPOTTER.setSpot();
		});

		$('.remove-plate-icon').live('click', function(e){
			console.log(e);
			SPOTTER.removeSpot(e.currentTarget.dataset.plateid);
		})
	
});




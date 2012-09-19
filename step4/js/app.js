


$(document).ready(function(){

SPOTTER.init();

		
		
		$('#statePicker').live('change',function(e){	
			SPOTTER.setSpot();
		});

		

		$('.remove-plate-icon').live('click', function(e){
			
			SPOTTER.removeSpot(e.currentTarget.dataset.plateid);
		})
	
});







$(document).ready(function(){

SPOTTER.init();

		
		
		$('#statePicker').live('change',function(e){	
			if( $('#statePicker').val() !== "Choose State") {
				SPOTTER.setSpot($('#statePicker').val());
			}
		});

		

		$('.remove-plate-icon').live('click', function(e){
			$('#'+e.currentTarget.parentElement.id).hide('slow');
			SPOTTER.removeSpot(e.currentTarget.dataset.plateid);
		})
	
});




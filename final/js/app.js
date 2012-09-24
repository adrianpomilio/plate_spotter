


$(document).ready(function(){

SPOTTER.init();

		
		
		$('#statePicker').live('change',function(e){	
			if( $('#statePicker').val() !== "Choose State") {
				SPOTTER.setSpot($('#statePicker').val());
			}else {
				console.log('nothing to set, you chose nothing');
			}
		});

		

		$('.remove-plate-icon').live('click', function(e){
			
			SPOTTER.removeSpot(e.currentTarget.dataset.plateid);
		})
	
});




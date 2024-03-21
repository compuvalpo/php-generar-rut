$(document).ready(function () {

	GenerarRUT();
});

function SwalMensaje(title, text, icon, url) {
    swal.fire({
	  title: title,
	  text: text,
	  icon: icon,
	  confirmButtonText: 'OK',
	  timer: 1500,
	  timerProgressBar: true
	}).then((result) => {

		//window.location.reload();
	});
}

function GenerarRUT(){

        $.ajax({
            url: './generar_rut.php',
            type: 'post',
            dataType: 'json',
            success: function(data) {
				console.log(data);

				if(data){
					setTimeout(function () {

						$('.card-data').html("");
						let div = '<div class="input-group col-12 mb-1"><span class="btn-primary badge">';
						
						for (var i = 0; i < data.length; i ++){
							let valor = i + 1;
							$('.card-data').append(div +'# '+ valor +'</span><span class="form-control">'+ data[i] +'</span></div>');
						}
					}, 100);
					//SwalMensaje('RUT Generados', 'Se han generado los RUT.', 'success');
				}else{
					SwalMensaje('Error', 'Error al intentar generar los RUT.', 'error');
				}
            },
            error: function(jqXHR, status, error) {
				SwalMensaje('RUT no Generados', 'No se han generado los RUT.', 'error');
            }
        });
	
}
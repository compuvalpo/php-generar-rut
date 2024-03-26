$(document).ready(function () {

	GenerarRUT();
	const clipboard = new ClipboardJS('.btnClip');

	setTimeout(function () {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

		//$('[data-bs-toggle="tooltip"]').tooltip();
	}, 200);

	clipboard.on('success', function(e) {

		const id = '#' + e.trigger.getAttribute('id');
		const tooltip = bootstrap.Tooltip.getInstance(id);
		
		e.trigger.setAttribute('data-bs-original-title','Copiado');
		tooltip.show();
		
	});
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

				if(data){
					setTimeout(function () {

						$('.card-data').html("");
						let div = '<div class="input-group col-12 mb-1"><span class="btn-primary badge d-flex align-items-center">';
						
						for (var i = 0; i < data.length; i ++){
							let valor = i + 1;
							valor = (valor<10) ? '0'+valor : valor;
							$('.card-data').append(
								div +'# '+ valor +'</span>'
								+'<span class="form-control">'+ data[i].rut +'</span>'
								+'<button class="input-group-text btnClip" id="rut'+valor+'" data-clipboard-text="'+ data[i].rut +'" data-bs-toggle="tooltip" data-bs-title="Copiar"><i class="fa-regular fa-copy"></i></button>'
								+'<span class="form-control ms-2">'+ data[i].rutFormat +'</span>'
								+'<button class="input-group-text btnClip" id="rutFormat'+valor+'" data-clipboard-text="'+ data[i].rutFormat +'" data-bs-toggle="tooltip" data-bs-title="Copiar"><i class="fa-regular fa-copy"></i></button>'
								+'</div>');
						}
					}, 100);
					//SwalMensaje('RUT Generados', 'Se han generado los RUT.', 'success');
				}else{
					SwalMensaje('RUT no Generados', 'No se han generado los RUT.', 'error');
				}
            },
            error: function(jqXHR, status, error) {
				SwalMensaje('Error', 'Error al intentar generar los RUT.', 'error');
            }
        });
	
}
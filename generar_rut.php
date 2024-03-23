<?php
	
    function generarRut() {

		$numero = rand(1000000, 22000000);
		$i		= 2;
		$suma	= 0;
		foreach (array_reverse(str_split($numero)) as $v) {
			if ($i == 8) $i = 2;

			$suma += $v * $i;
			++$i;
		}

		$dv = 11 - ($suma % 11);
		if ($dv == 11) $dv = '0';
		if ($dv == 10) $dv = 'K';
	
		$rut		= $numero.'-'.$dv;
		$rutFormat	= number_format($numero, 0, ',', '.').'-'.$dv;

		return array('rut'=>$rut,'rutFormat'=>$rutFormat);
    }
	
	const CANTIDADRUT	= 10;
	$response 			= null;

	for ($i = 0; $i < CANTIDADRUT; $i++) {
		$response[]	= generarRut();
	}

	header('Content-Type: application/json');
	echo(json_encode($response));
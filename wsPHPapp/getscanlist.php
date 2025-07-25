<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

  exit(0);
}

include ('../wsPHP/db.inc.php');


$IDutente=$_GET['IDutente'];



$out2 = [];
$MySql="SELECT  scan , DATE_FORMAT( data , '%H:%i - %d %b %Y') AS datascan  , oggetti.nome, oggetti.descrizione FROM logscan
	LEFT JOIN oggetti ON oggetti.IDoggetto = logscan.IDoggetto
	WHERE IDutente='$IDutente' order by data desc";
$Result=mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out2[] = $res;
}

/**
$out3 = [];
$MySql="SELECT T1.nome as nome1, T2.nome as nome2, data, PD	FROM logpaired
	LEFT JOIN oggetti AS T1 ON T1.IDoggetto = logpaired.IDoggetto1
	LEFT JOIN oggetti AS T2 ON T2.IDoggetto = logpaired.IDoggetto2
	 WHERE IDutente = $IDutente";
$Result=mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out3[] = $res;
}
**/


$MySql="SELECT concat(T1.nome ,  ' + ' , T2.nome ) as nome , DATE_FORMAT( data , '%H:%i - %d %b %Y') AS datascan  , PD	AS descrizione FROM logpaired
	LEFT JOIN oggetti AS T1 ON T1.IDoggetto = logpaired.IDoggetto1
	LEFT JOIN oggetti AS T2 ON T2.IDoggetto = logpaired.IDoggetto2
	 WHERE IDutente = $IDutente";
$Result=mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out2[] = $res;
}


$MySql="SELECT concat('Magia Lanciata: ',DescEstesa) as nome , DATE_FORMAT( data , '%H:%i - %d %b %Y') AS datascan , magie.descrizione as descrizione from logmagia 
	left join magie on magie.IDmagia = logmagia.IDmagia
	WHERE IDutente = $IDutente";
$Result=mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out2[] = $res;
}


$MySql="SELECT concat('Magia Compresa: ',DescEstesa) as nome , DATE_FORMAT( data , '%H:%i - %d %b %Y') AS datascan , magie.descrizione as descrizione from logscanmagia
	left join magie on magie.IDmagia = logscanmagia.IDmagia
	WHERE IDutente = $IDutente and compreso = 'Y'";
$Result=mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out2[] = $res;
}

$MySql="SELECT DATE_FORMAT( data , '%H:%i - %d %b %Y') AS data , testo , url from messaggi
	WHERE destinatario = $IDutente ";
$Result=mysqli_query($db, $MySql);
while ($res=mysqli_fetch_array($Result,MYSQLI_ASSOC) ){
	$out3[] = $res;
}



$out = [
	'scan' => $out2,
	'messaggi' => $out3
];


header("HTTP/1.1 200 OK");
echo json_encode ($out, JSON_UNESCAPED_UNICODE);

?>

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


/*
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$IDutente = $request->IDutente;
$IDprofessione = $request->IDprofessione;
$scan = $request->scan;
*/

$IDutente = $_GET['IDutente'];
$scan = $_GET['scan'];


$deltamiti=0;
$deltasan=0;
$deltapf=0;
$minmiti = 0;
$miti = 0 ;


include ('../wsPHP/db.inc.php');

if ($scan != "" && $IDutente != "") {


  $MySql = "SELECT * FROM magie WHERE scan = '$scan' ";
  $Result = mysql_query($MySql);
  if ( $res = mysql_fetch_array($Result)   ) {

    $IDmagia = $res['IDmagia'];
    $nome = $res['nome'];
    $descrizione = $res['descrizione'];

    $deltasan = $deltasan + $res['basesan'];
    $deltamiti = $deltamiti + $res['basemiti'];
    $deltapf = $deltapf + $res['basepf'];

    $minmiti = $res['minmiti'];


    $MySql2 = "SELECT *  FROM personaggi WHERE  IDutente = $IDutente ";
    $Result2 = mysql_query($MySql2);
    if ( $res2 = mysql_fetch_array($Result2)   ) {
      $miti = $res2['Miti'];
    }

    $newout = [
      "nome" => $nome ,
      "descrizione" => $descrizione ,
      "deltasan" => $deltasan ,
      "deltamiti" => $deltamiti ,
      "deltapf" => $deltapf,
      "minmiti" => $minmiti,
      "mitiPG" => $miti
    ];

      $output = json_encode($newout);
      echo $output;


  } else {
    header("HTTP/1.1 401 Unauthorized");
  }
} else {
    header("HTTP/1.1 401 Unauthorized");
}


?>

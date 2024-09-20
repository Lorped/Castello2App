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
  $Result = mysqli_query($db, $MySql);
  if ( $res = mysqli_fetch_array($Result)   ) {

    $IDmagia = $res['IDmagia'];
    $nome = $res['nome'];
    $descrizione = $res['descrizione'];

    $deltasan = $deltasan + $res['basesan'];
    $deltamiti = $deltamiti + $res['basemiti'];
    $deltapf = $deltapf + $res['basepf'];

    $minmiti = $res['minmiti'];


    $MySql9 = "SELECT * FROM personaggi  WHERE IDutente=$IDutente" ;
    $Result9 = mysqli_query($db, $MySql9);
    $res9 = mysqli_fetch_array($Result9);
    $oldsan = $res9['Sanita'];
    $oldmiti = $res9['Miti'];
    $oldpf = $res9['PF'];
    $IDspecial = $res9['IDspecial'];
    $xspecpg = $res9['xspecpg'];

    $MAXpf = 3;
    if ( $IDspecial == 9 || $xspecpg == 9 ) {  /** forze speciali o studenti con bonus **/
      $MAXpf = 5;
    }


    $MySql2 = "SELECT *  FROM personaggi WHERE  IDutente = $IDutente ";
    $Result2 = mysqli_query($db, $MySql2);
    if ( $res2 = mysqli_fetch_array($Result2)   ) {
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

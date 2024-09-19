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





include ('../wsPHP/db.inc.php');

if ($scan != "" && $IDutente != "") {


  $MySql = "SELECT * FROM magie WHERE scan = '$scan' ";
  $Result = mysql_query($MySql);
  if ( $res = mysql_fetch_array($Result)   ) {

    $IDmagia = $res['IDmagia'];
    $nome = mysql_real_escape_string( $res['nome']);
    $descrizione = $res['descrizione'];

    $deltasan = $res['basesan'];
    $deltamiti =  $res['basemiti'];
    $deltapf = $res['basepf'];

    $MySql2 = "SELECT * FROM personaggi  WHERE IDutente=$IDutente" ;
    $Result2=mysql_query($MySql2);
    $res2=mysql_fetch_array($Result2);
    if (mysql_errno())  die ( mysql_errno().": ".mysql_error()."+". $MySql2 );

    $oldsan=$res2['Sanita'];
    $oldmiti=$res2['Miti'];
    $oldpf=$res2['PF'];
    $IDspecial=$res2['IDspecial'];
    $xspecpg=$res2['xspecpg'];

    if ( $IDspecial == 16 || $xspecpg == 16 )  {    /** professore o studente con abilità**/
      $deltasan = $deltasan-1;
      if ($deltasan < 0) {
        $deltasan = 0 ;
      }
    }
    $MAXpf = 3;
    if ( $IDspecial == 9 || $xspecpg == 9 ) {  /** forze speciali o studente con abilità**/
      $MAXpf = 5;
    }


    $newsan=$oldsan+$deltasan;
    if ($newsan > 10) {$newsan=10; }
    if ($newsan < 0) {$newsan=0; }
    $newmiti=$oldmiti+$deltamiti;
    if ($newmiti > 10) {$newmiti=10; }
    if ($newmiti < 0) {$newmiti=0; }
    if ($newsan> 10-$newmiti) { $newsan=10-$newmiti ;}
    $newpf=$oldpf+$deltapf;
    if ($newpf > $MAXpf) {$newpf=$MAXpf; }
    if ($newpf < 0) {$newpf=0; }

    $MySql9 = "UPDATE personaggi SET Sanita = $newsan  , Miti = $newmiti , pf = $newpf WHERE IDutente=$IDutente" ;
    mysql_query($MySql9);
    if (mysql_errno())  die ( mysql_errno().": ".mysql_error()."+". $MySql9 );

    $MySql3 = "INSERT INTO logmagia (IDmagia, IDutente, DescEstesa ) VALUES ($IDmagia, $IDutente , '$nome') ";
    $Result3 = mysql_query($MySql3);
    if (mysql_errno())  die ( mysql_errno().": ".mysql_error()."+". $MySql3 );

    $output = json_encode("OK");
    echo $output;

  } else {
    header("HTTP/1.1 401 Unauthorized");
  }
} else {
    header("HTTP/1.1 401 Unauthorized");
}


?>

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
$Scan = $_GET['IDoggetto'];
$Risposta = $_GET['Risposta'];





include ('../wsPHP/db.inc.php');


include ('../wsPHP/messaggi.inc.php');

if ($Scan != "" && $IDutente != "") {


    $MySql2 = "SELECT * FROM oggetti  WHERE scan=$Scan" ;
    $Result2=mysqli_query($db, $MySql2);
    $res2=mysqli_fetch_array($Result2);
    if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql2 );
    $IDoggetto = $res2['IDoggetto'];
    $nome = $res2['nome'];



    if ($Risposta == "0") {    // CORRETTA


      $MySql = " INSERT INTO logrisposte2 (IDutente, IDoggetto, Risposta) VALUES ($IDutente, $IDoggetto, 0)";
      mysqli_query($db, $MySql);
      if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

      $output = json_encode("OK");

      $testo = "Ha risposto CORRETTAMENTE all'Enigma $nome";
      user2master ( $IDutente , $testo, $db );


    } else {

      $MySql = " INSERT INTO logrisposte2 (IDutente, IDoggetto, Risposta) VALUES ($IDutente, $IDoggetto, 1)";
      mysqli_query($db, $MySql);
      if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

      $output = json_encode("OK");

      $testo = "Ha superato il limite di risposte ERRATE all'Enigma $nome";
      user2master ( $IDutente , $testo, $db );
          
    }


    $output = json_encode("OK");
    echo $output;

  } else {
    header("HTTP/1.1 401 Unauthorized");
  }


?>

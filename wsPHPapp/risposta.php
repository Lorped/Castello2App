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
$IDoggetto = $_GET['IDoggetto'];
$Risposta = $_GET['Risposta'];





include ('../wsPHP/db.inc.php');

if ($IDoggetto != "" && $IDutente != "") {


    if ($Risposta == "0") {    // NO

      $MySql = " INSERT INTO logrisposte (IDutente, IDoggetto, Risposta) VALUES ($IDutente, $IDoggetto, $Risposta)";
      mysqli_query($db, $MySql);
      if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );

    } else {
          $MySql2 = "SELECT * FROM personaggi  WHERE IDutente=$IDutente" ;
          $Result2=mysqli_query($db, $MySql2);
          $res2=mysqli_fetch_array($Result2);
          if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql2 );

          $oldsan=$res2['Sanita'];
          $oldmiti=$res2['Miti'];
          $oldpf=$res2['PF'];
          $IDspecial=$res2['IDspecial'];
          $xspecpg=$res2['xspecpg'];
          $MAXpf = 3;
          if ( $IDspecial == 9 || $xspecpg == 9 ) {  /** forze speciali o studente con abilità**/
            $MAXpf = 5;
          }



          $MySql2 = "SELECT * FROM oggetti  WHERE IDoggetto=$IDoggetto" ;
          $Result2=mysqli_query($db, $MySql2);
          $res2=mysqli_fetch_array($Result2);
          if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql2 );

          $deltasan = $res['rispsan'];
          $deltamiti =  $res['rispmiti'];
          $deltapf = $res['risppf'];


          $newsan=$oldsan+$deltasan;
          if ($newsan > 10) {$newsan=10; }
          if ($newsan < 0) {$newsan=0; }
          $newmiti=$oldmiti+$deltamiti;
          if ($newmiti > 10) {$newmiti=10; }
          if ($newmiti < 0) {$newmiti=0; }
          if ($newsan > 10-$newmiti) { $newsan=10-$newmiti ;}
          $newpf=$oldpf+$deltapf;
          if ($newpf > $MAXpf) {$newpf=$MAXpf; }
          if ($newpf < 0) {$newpf=0; }

          $MySql9 = "UPDATE personaggi SET Sanita = $newsan  , Miti = $newmiti , pf = $newpf WHERE IDutente=$IDutente" ;
          mysqli_query($db, $MySql9);
          if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql9 );

          $MySql = " INSERT INTO logrisposte (IDutente, IDoggetto, Risposta) VALUES ($IDutente, $IDoggetto, $Risposta)";
          mysqli_query($db, $MySql);
          if (mysqli_errno($db))  die ( mysqli_errno($db).": ".mysqli_error($db)."+". $MySql );
    }

    

 




    $output = json_encode("OK");
    echo $output;

  } else {
    header("HTTP/1.1 401 Unauthorized");
  }


?>

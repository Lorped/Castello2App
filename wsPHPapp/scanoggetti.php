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

// $IDprofessione = $_GET['IDprofessione'];
// $IDspecial = $_GET['IDspecial'];
// $IDbp = $_GET['IDbp'];

/*
$postdata = '1';
$IDutente = 1 ;
$IDprofessione = 1 ;
$scan = 2147483647 ;
*/


//$username = "user";
//$password = "secret";

$deltamiti=0;
$deltasan=0;
$deltapf=0;

$firsttime=0;

if ( $IDutente != "" && $scan !=""  ) {

  include ('../wsPHP/db.inc.php');

  $MySql = "SELECT * from personaggi WHERE IDutente='$IDutente'";
  $Result = mysqli_query($db, $MySql);
  if ( $res = mysqli_fetch_array($Result)   ) {
    $IDprofessione = $res['IDprofessione'];
    $IDspecial = $res['IDspecial'];
    $IDbp = $res['IDbp'];

  }

  $descrizione = '' ;   //BASE
  $descrizione1 = '' ;   //PROFESSIONE
  $descrizione2 = '' ;   //SPECIAL
  $descrizione3 = '' ;   //IDBP
  $descrizione4 = '' ;   //PAIRED


  $MySql = "SELECT * FROM oggetti WHERE scan = $scan ";
  $Result = mysqli_query($db, $MySql);
  if ( $res = mysqli_fetch_array($Result)   ) {

    $IDoggetto = $res['IDoggetto'];
    $nome = $res['nome'];
    $descrizione = $res['descrizione'];

    $MySql2 = "SELECT *  FROM logscan WHERE IDoggetto = $IDoggetto AND IDutente = $IDutente ";
    $Result2 = mysqli_query($db, $MySql2);

    if ( $res2 = mysqli_fetch_array($Result2)   ) {
      //già scannerizzato aggiorno OutOfRangeException
      $MySql3 = "UPDATE logscan SET data = NOW() WHERE IDoggetto = $IDoggetto AND IDutente = $IDutente";
      $Result3 = mysqli_query($db, $MySql3);
    } else {
      // prima volta: inserisco + applico effetti

      $firsttime=1;



      $deltasan = $deltasan + $res['basesan'];
      $deltamiti = $deltamiti + $res['basemiti'];
      $deltapf = $deltapf + $res['basepf'];
    }

    //cerco descrizione estesa basata su IDprofessione

    $MySql4 = "SELECT *  FROM effetti WHERE IDoggetto = $IDoggetto AND IDprofessione = $IDprofessione ";
    $Result4 = mysqli_query($db, $MySql4);

    if ( $res4 = mysqli_fetch_array($Result4) ) {

      $descrizione1 = $res4['descrizione'];

      if ($firsttime==1) {
        $deltasan = $deltasan + $res4['effettosan'];
        $deltamiti = $deltamiti + $res4['effettomiti'];
        $deltapf = $deltapf + $res4['effettopf'];
      }

    }
    //cerco descrizione estesa basata su IDspecial

    $MySql4 = "SELECT *  FROM effetti WHERE IDoggetto = $IDoggetto AND IDspecial = $IDspecial ";
    $Result4 = mysqli_query($db, $MySql4);

    if ( $res4 = mysqli_fetch_array($Result4) ) {

      $descrizione2 =  $res4['descrizione'];

      if ($firsttime==1) {
        $deltasan = $deltasan + $res4['effettosan'];
        $deltamiti = $deltamiti + $res4['effettomiti'];
        $deltapf = $deltapf + $res4['effettopf'];
      }

    }
    //cerco descrizione estesa basata su IDbp

    $MySql4 = "SELECT *  FROM effetti WHERE IDoggetto = $IDoggetto AND IDbp = $IDbp ";
    $Result4 = mysqli_query($db, $MySql4);

    if ( $res4 = mysqli_fetch_array($Result4) ) {

      $descrizione3 = $res4['descrizione'];

      if ($firsttime==1) {
        $deltasan = $deltasan + $res4['effettosan'];
        $deltamiti = $deltamiti + $res4['effettomiti'];
        $deltapf = $deltapf + $res4['effettopf'];
      }

    }



    if ( $firsttime==1 ) {
      $DE = mysqli_real_escape_string($db, $descrizione);
      $MySql3 = "INSERT INTO logscan (IDoggetto, IDutente, DescEstesa ) VALUES ($IDoggetto, $IDutente , '$DE') ";
      $Result3 = mysqli_query($db, $MySql3);
    }

    $MySql5 = "SELECT * FROM paired WHERE IDoggetto1 = $IDoggetto OR IDoggetto2 = $IDoggetto ";
    $Result5 = mysqli_query($db, $MySql5);
    if ( $res5 = mysqli_fetch_array($Result5) ) {

      // esiste un "paired"

      if ( $res5['IDoggetto1'] == $IDoggetto) { $newoggetto = $res5['IDoggetto2'] ; }
      if ( $res5['IDoggetto2'] == $IDoggetto) { $newoggetto = $res5['IDoggetto1'] ; }

      // newoggetto è stato scansionato da poco ?

      $MySql6 = "SELECT * FROM logscan WHERE
        IDoggetto = $newoggetto AND IDutente = $IDutente AND DATE_ADD(logscan.data, INTERVAL 3 MINUTE) > NOW() ";
      $Result6 = mysqli_query($db, $MySql6);
      if ( $res6 = mysqli_fetch_array($Result6) ) {
        // ok paired
        $descrizione4 =  $res5['pdescrizione'];

        $MySql7 = "SELECT * FROM logpaired WHERE IDutente=$IDutente AND
         ( ( IDoggetto1 = $IDoggetto AND IDoggetto2 = $newoggetto) OR
           ( IDoggetto2 = $IDoggetto AND IDoggetto1 = $newoggetto) ) ";
        $Result7 = mysqli_query($db, $MySql7);
        if ( $res7 = mysqli_fetch_array($Result7) ) {
          // ?? faccio qualcosa ?
        } else {
          $PD = mysqli_real_escape_string ($db, $res5['pdescrizione'] );
          $MySql8 = "INSERT INTO logpaired ( IDoggetto1, IDoggetto2, IDutente, PD) VALUES
            ($IDoggetto, $newoggetto, $IDutente, '$PD')";
          $Result8 = mysqli_query($db, $MySql8);

          $deltasan = $deltasan + $res5['effettosan'];
          $deltamiti = $deltamiti + $res5['effettomiti'];
          $deltapf = $deltapf + $res5['effettopf'];
        }
      }

    }

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


    $newsan=$oldsan+$deltasan;
    if ($newsan > 10) {$newsan = 10; }
    if ($newsan < 0) {$newsan = 0; }
    $newmiti=$oldmiti+$deltamiti;
    if ($newmiti > 10) {$newmiti = 10; }
    if ($newmiti < 0) {$newmiti = 0; }
    if ($newsan > 10-$newmiti) { $newsan = 10 - $newmiti ;}
    $newpf=$oldpf+$deltapf;
    if ($newpf > $MAXpf) {$newpf = $MAXpf; }
    if ($newpf < 0) {$newpf=0; }

    $MySql9 = "UPDATE personaggi SET Sanita = $newsan  , Miti = $newmiti , pf = $newpf WHERE IDutente=$IDutente" ;
    mysqli_query($db, $MySql9);

    $newout = [
      "nome" => $nome ,
      "descrizione" => $descrizione ,
      "descrizione1" => $descrizione1 ,
      "descrizione2" => $descrizione2 ,
      "descrizione3" => $descrizione3 ,
      "descrizione4" => $descrizione4 ,
      "deltasan" => $deltasan ,
      "deltamiti" => $deltamiti ,
      "deltapf" => $deltapf,
      "newsan" => $newsan,
      "newmiti" => $newmiti,
      "newpf" => $newpf
    ];

      $output = json_encode($newout);
      echo $output;


  } else {
    $MySql9 = "SELECT * FROM personaggi  WHERE IDutente=$IDutente" ;
    $Result9 = mysqli_query($db, $MySql9);
    $res9 = mysqli_fetch_array($Result9);
    $newout = [
      "nome" => 'Oggetto non valido' ,
      "descrizione" => '' ,
      "descrizione1" => '' ,
      "descrizione2" => '' ,
      "descrizione3" => '' ,
      "descrizione4" => '' ,
      "deltasan" => 0 ,
      "deltamiti" => 0 ,
      "deltapf" => 0,
      "newsan" => $res9['Sanita'],
      "newmiti" => $res9['Miti'],
      "newpf" => $res9['PF'],
    ];
    $output = json_encode($newout);
    echo $output;
  }
} else {
    header("HTTP/1.1 401 Unauthorized");

    /*
    $sent= [
      'IDutente' => $_GET['IDutente'],
      'IDprofessione' => $_GET['IDprofessione'],
      'scan' => $_GET['scan']
    ];
    $output = json_encode($sent);
    echo $output;
    */
}
?>

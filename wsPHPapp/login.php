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



$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $request->email;
$password = $request->password;

//$username = "user";
//$password = "secret";


if (isset($postdata) && $email != "" && $password !="" ) {

  include ('../wsPHP/db.inc.php');


  $MySql = "SELECT IDutente FROM utenti WHERE email = '".addslashes($email)."' AND password = '".addslashes($password)."'";
    $Result = mysql_query($MySql);
  if ( $res = mysql_fetch_array($Result)   ) {

    $IDutente = $res['IDutente'];

    $MySql = "SELECT * FROM personaggi
      LEFT JOIN professioni ON personaggi.IDprofessione = professioni.IDprofessione
      LEFT JOIN specializzazione ON personaggi.IDspecial = specializzazione.IDspecial
      LEFT JOIN bonusprof ON personaggi.IDbp = bonusprof.IDbp
      LEFT JOIN xspec ON personaggi.xspecpg = xspec.IDspecialx
      WHERE IDutente = '$IDutente' ";

    $Result = mysql_query($MySql);
    if ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {

      $newout = [
        "status" => 'success' ,
        "user" => $res
      ];

      $output = json_encode($newout);
      echo $output;
    } else {
        header("HTTP/1.1 404 Not Found");
    }
  } else {
    header("HTTP/1.1 401 Unauthorized");
  }
} else {
    header("HTTP/1.1 401 Unauthorized");
}
?>

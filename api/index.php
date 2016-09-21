<?php

$dbhost = "localhost";
$dbname = "users";
$dbuser = "root";
$dbpswd = "SomePassword";

try {
  $oDB = new PDO("mysql:host=".$dbhost.";dbname=".$dbname,$dbuser,$dbpswd);
  $oDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
  $oDB->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
  $oDB->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND,'SET NAMES UTF8');

} catch (PDOException $e) {
  throw new PDOException("Error  : " .$e->getMessage());
}

$aDummy = new stdclass;
$aDummy->City = json_decode(file_get_contents('city.json'));
$aDummy->Country = json_decode(file_get_contents('country.json'));
$aDummy->FName = json_decode(file_get_contents('fname.json'));
$aDummy->lName = json_decode(file_get_contents('lname.json'));
$aDummy->Street = json_decode(file_get_contents('street.json'));
$aDummy->States = json_decode(file_get_contents('states.json'));

function rStreet(){
  global $aDummy;
  $aItem = array_rand($aDummy->Street, 1);
  $szNum = rand(5, 9999);

  return $szNum." ".$aDummy->Street[$aItem];

}

function rCity(){
  global $aDummy;
  $aItem = array_rand($aDummy->City , 1);
  return $aDummy->City [$aItem];
}

function rFname(){
  global $aDummy;
  $aItem = array_rand($aDummy->FName, 1);
  return $aDummy->FName[$aItem];
}

function rLname(){
  global $aDummy;
  $aItem = array_rand($aDummy->lName, 1);
  return $aDummy->lName[$aItem];
}

function rCountry(){
  global $aDummy;
  $aItem = array_rand($aDummy->Country, 1);
  return $aDummy->Country[$aItem]->name;
}

function rEmail(){
  global $aDummy;
  $aItem1 = array_rand($aDummy->FName, 1);
  $aItem2 = array_rand($aDummy->lName, 1);

  return $aDummy->FName[$aItem1]{1}.$aDummy->lName[$aItem2]."@gmail.com";
}

function rProvince(){
  global $aDummy;
  $aItem = array_rand($aDummy->States, 1);
  return $aDummy->States[$aItem];
}

function rPassword(){

  $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  $pass = array(); //remember to declare $pass as an array
  $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
  for ($i = 0; $i < 8; $i++) {
      $n = rand(0, $alphaLength);
      $pass[] = $alphabet[$n];
  }
  return implode($pass)."!8"; 

}

function rPostal(){

  $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $number = '1234567890';

  $aLen = strlen($alphabet);
  $aNum = strlen($number);

  $szPostal = $alphabet[rand(0, $aLen)]. $number[rand(0, $aNum)].$alphabet[rand(0, $aLen)]." ".$alphabet[rand(0, $aLen)]. $number[rand(0, $aNum)].$alphabet[rand(0, $aLen)];

  return $szPostal;

}

function rDate(){
  global $aDummy;
  $month = rand(1, 12);
  $day = rand(1, 29);
  $year = rand(2000,2016);
  
  return $year."-".$month."-".$day;
}

function rNotes(){
  return file_get_contents("http://loripsum.net/api/1/short/headers/plaintext");
}

// insertRandomData(100,$oDB);

function insertRandomData($iLen,$oDB){

  $szSQL = "DELETE from `users`.`user`";

  $oStmt = $oDB->prepare($szSQL);
  $oStmt->execute();

  for($i=0;$i<$iLen;$i++){

    $szEmail = rEmail();
    $szPassword = rPassword();
    $szStreet = rStreet();
    $szCity = rCity();
    $szPostal = rPostal();
    $szProvince = rProvince();
    $szCountry = rCountry();
    $szFname = rFname();
    $szLname = rLname();
    $szDate = rDate();
    $szNotes = rNotes();
    
    $szSQL = "INSERT INTO `users`.`user` (`username` ,`password` ,`street` ,`city` ,`postal` ,`province` ,`country` ,`fname` ,`lname` ,`date` ,`desc`,`role`,`dept` ) VALUES ('".$szEmail."' ,'".$szPassword."' ,'".$szStreet."' ,'".$szCity."' ,'".$szPostal."' ,'".$szProvince."' ,'".$szCountry."' ,'".$szFname."' , '".$szLname."', '".$szDate."', '".$szNotes."', '', '')";

    $oStmt = $oDB->prepare($szSQL);
    $oStmt->execute();

  }

}

switch($_SERVER['REQUEST_METHOD']){

    case "GET":
      $szSQL = "SELECT * from user";

      if(isset($_GET["rebuild"])){
        insertRandomData(100,$oDB);
      }
      else
      {

        if(isset($_GET["id"]) && !empty($_GET["id"])){
          $szSQL = $szSQL . " Where id = ".$_GET["id"];
        }

        $oStmt = $oDB->prepare($szSQL);
        $oStmt->execute();
        $result = $oStmt->fetchAll(PDO::FETCH_ASSOC);
      
        $oReturn = new stdclass;
        $oReturn->success = true;
        $oReturn->method = $_SERVER['REQUEST_METHOD'];
        $oReturn->data = $result;

        echo json_encode($oReturn);
        

      }

      
    break;
    case "POST":
      switch($_GET["action"]){
        case "add":
          $oJson = json_decode(file_get_contents('php://input'));
          $szSQL = "INSERT INTO `users`.`user` (`username` ,`password` ,`street` ,`city` ,`postal` ,`province` ,`country` ,`fname` ,`lname` ,`date` ,`desc`,`role`,`dept` ) VALUES ('".$oJson->username."' ,'".$oJson->password."' ,'".$oJson->street."' ,'".$oJson->city."' ,'".$oJson->postal."' ,'".$oJson->province."' ,'".$oJson->country."' ,'".$oJson->fname."' , '".$oJson->lname."', '".$oJson->date."', '".$oJson->desc."', '".$oJson->dept."', '".$oJson->role."')";
          error_log($szSQL);
          $oStmt = $oDB->prepare($szSQL);
          $oStmt->execute();
        break;
        case "update":
          $oJson = json_decode(file_get_contents('php://input'));
          if(isset($oJson->id) && !empty($oJson->id)){

          $szSQL = "UPDATE `users`.`user` SET 
            `username` = '".$oJson->username."',
            `password` = '".$oJson->password."',
            `street` = '".$oJson->street."',
            `city` = '".$oJson->city."',
            `postal` = '".$oJson->postal."',
            `province` = '".$oJson->province."',
            `country` = '".$oJson->country."',
            `fname` = '".$oJson->fname."',
            `lname` = '".$oJson->lname."',
            `date` = '".$oJson->date."',
            `dept` = '".$oJson->dept."',
            `role` = '".$oJson->role."',
            `desc` = '".$oJson->desc."' WHERE `user`.`id` =".$oJson->id.";";
            error_log($szSQL);
            $oStmt = $oDB->prepare($szSQL);
            $oStmt->execute();
          }
        break;
        case "delete":
          $oJson = json_decode(file_get_contents('php://input'));
          if(isset($oJson->id) && !empty($oJson->id)){
            $szSQL = "DELETE from user where id = ".$oJson->id;
            error_log($szSQL);
            $oStmt = $oDB->prepare($szSQL);
            $oStmt->execute();
          }
        break;
      }
    break;
}


?>

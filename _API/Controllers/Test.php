<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;

class Test extends API\APIBase{
     function Get()
     {
          $this->Response->Result = $_SESSION["Auth"];
     }

     function GetWith($req)
     {
          $_SESSION["Auth"] = $req;
     }
} 
new Test();
<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;

class Test2 extends API\APIBase{
     function Get()
     {
          $this->Response->Result = $this->Sess_Auth->get();
     }

     function GetWith($req)
     {
          $this->Sess_Auth->clear();
          $this->Response->Result = $this->Sess_Auth->set($req);
     }
} 
new Test2();
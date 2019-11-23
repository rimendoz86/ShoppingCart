<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;

class Product extends API\APIBase{
    function Get(){
        //Validation: Ensure request has required params

        //Logic: call to method in data layer. map to response
        $repository = new Repository\Product();
        $this->Response->Result = $repository->Get();
        //Response: return response

        $this->SendResponse(200);
    }
}
new Product();
?>
<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;

class Order extends API\APIBase{
    function Post($req){
        //die(json_encode($req));
        //Validation: Ensure request has required params
        if(empty($req->UserID)){
             array_push($this->Response->ValidationMessages,"User is not logged in");
             $this->SendResponse(200);
         }

         if(empty($req->CustomerAddress) 
         || empty($req->CustomerName) 
         || empty($req->ShippingType)
         || empty($req->ShippingCost)
         || empty($req->SubTotal)
         || empty($req->Tax)
         || empty($req->Total)){
            array_push($this->Response->ValidationMessages,"Order is missing required information.");
            $this->SendResponse(200);
         }
        //Logic: call to method in data layer. map to response
        $repository = new Repository\Order();
        $this->Response->Result = $repository->Submit($req);

        //Response: return response
        $this->SendResponse(200);
    }
}
new Order();
?>
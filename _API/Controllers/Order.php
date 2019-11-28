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
        $User = $this->Sess_Auth->get();
        $req->UserID = $User->UserID;
        
        if(empty($req->UserID)){
             array_push($this->Response->ValidationMessages,"User is not logged in");
             $this->SendResponse(200);
         }

        if(empty($req->CustomerAddress)) {
            array_push($this->Response->ValidationMessages,"CustomerAddress is Required.");
        }

        if(empty($req->CustomerName)) { 
            array_push($this->Response->ValidationMessages,"CustomerName is Required.");
        }
        
        if(empty($req->ShippingType)) { 
            array_push($this->Response->ValidationMessages,"ShippingType is Required.");
        }

        if(!isset($req->ShippingCost)) { 
            array_push($this->Response->ValidationMessages,"ShippingCost is Required.");
        }

        if(empty($req->SubTotal)) { 
            array_push($this->Response->ValidationMessages,"SubTotal is Required.");
        }

        if( empty($req->Tax)) {
            array_push($this->Response->ValidationMessages,"Tax is Required.");
        }

        if(empty($req->Total) ) {
            array_push($this->Response->ValidationMessages,"Total is Required.");
        }

        if (count($this->Response->ValidationMessages)){
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
<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;

class Login extends API\APIBase{
    function Post($authModel){
        //var_dump($authModel);
        //Validation: Ensure request has required params
        if(empty($authModel->Login) || empty($authModel->Password)){
            array_push($this->Response->ValidationMessages,"Login AND Password are required");
            $this->SendResponse(200);
        }
        //Logic: call to method in data layer. map to response
        $repository = new Repository\Login();
        $this->Response->Result = $repository->CheckLogin($authModel);

        //Response: return response
        $this->SendResponse(200);
    }
}
new Login();
?>
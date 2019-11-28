<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;
class User extends API\APIBase{

    function Get(){
        $repository = new Repository\User();

        $this->Response->Result = $repository->GetAllUsers();
    }

    function GetWith($req) {
        $repository = new Repository\User();

        $this->Response->Result = $repository->GetUser($req->id);

        $this->SendResponse(200);
    }

    function Post($req){
        //var_dump($req);
        //Validation: Ensure request has required params
        if(empty($req->Login) || empty($req->Password)){
            array_push($this->Response->ValidationMessages,"Login AND Password are required");
            $this->SendResponse(200);
        }

        //Logic: call to method in data layer. map to response
        $repository = new Repository\User();
        $isUserExists = $repository->CheckForUser($req);
        if(count($isUserExists) > 0) 
        array_push($this->Response->ValidationMessages,"Login is Taken");

        if(count($this->Response->ValidationMessages) > 0){
            $this->SendResponse(200);
        }
        //Response: return response
        $this->Response->Result = $repository->Register($req);
        $this->SendResponse(200);
    }

    function Put($req){
        $repository = new Repository\User();

        $this->Response->Result = $results = $repository->UpdateUser($req);
        $this->SendResponse(200);
    }

    function Delete($id){
        $repository = new Repository\User();

        $this->Response->Result = $repository->DeleteUser($id);
        $this->SendResponse(200);
    }
}
new User();
?>
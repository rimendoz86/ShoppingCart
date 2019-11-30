<?php
namespace API;
include_once '../APIBase.php';
include_once '../Data/Repository.php';
use API;
use Data\Repository;
class User extends API\APIBase{

    function Get(){
        $user = $this->Sess_Auth->get();
        if(!isset($user) || !$user->IsAdmin){
            $this->SendResponse(200);
        }

        $repository = new Repository\User();
        $this->Response->Result = $repository->GetAllUsers();
    }

    function GetWith($req) {
        $repository = new Repository\User();

        $this->Response->Result = $repository->GetUser($req->id);
    }

    function Post($req){
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
    }

    function Put($req){
        // $this->Response->Result = $req;
        // $this->SendResponse(200);
        $user = $this->Sess_Auth->get();
        if(!isset($user) || !$user->IsAdmin){
            array_push($this->ValidationMessages, "You don't have the rights to do this");
            $this->SendResponse(200);
        }

        if(!isset($req->UserID))
            array_push($this->Response->ValidationMessages, "UserID is Required.");

        if (empty($req->Login))
            array_push($this->Response->ValidationMessages, "Login is Required.");

        if(!isset($req->IsAdmin))
            array_push($this->Response->ValidationMessages, "IsAdmin is Required.");

        if(!isset($req->IsActive))
            array_push($this->Response->ValidationMessages, "IsActive is Required.");

        if(count($this->Response->ValidationMessages) > 0){
            $this->SendResponse(200);
        }
        
        $repository = new Repository\User();
        $this->Response->Result = $results = $repository->UpdateUser($req);
    }

    function Delete($id){
        $repository = new Repository\User();

        $this->Response->Result = $repository->DeleteUser($id);
    }
}
new User();
?>
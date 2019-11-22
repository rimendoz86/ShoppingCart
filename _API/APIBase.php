<?php
namespace API;
if ( session_status() ===  PHP_SESSION_NONE) { 
    session_start();
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

class APIBase {
    public $Response;
    function __construct(){
        $RequestMethod = $_SERVER['REQUEST_METHOD'];
        $RequestObject;

        $this->Response = new \ stdClass();;
        $this->Response->ValidationMessages = null;
        $this->Response->Result = null;
        
        switch ($RequestMethod) {
            case 'GET':
                $RequestObject = (object) $_GET;
                $this->Get($RequestObject);
                break;
            case 'POST':
                $RequestObject = json_decode(file_get_contents('php://input'), true);
                $this->Post($RequestObject);
                break;
            case 'PUT':
                $RequestObject = json_decode(file_get_contents('php://input'), true);
                $this->Put($RequestObject);
            case 'DELETE':
                $RequestObject = json_decode(file_get_contents('php://input'), true);
                $this->Delete($RequestObject);
            break;
            default:
                break;
        }
    }

    function Post($requestObject){
        echo json_encode($this->ResponseMessage);
    }
    function Put($requestObject){
        echo json_encode($this->ResponseMessage);
    }
    function Delete($requestObject){
        echo json_encode($this->ResponseMessage);
    }
    function Get($requestObject){
        echo json_encode($this->ResponseMessage);
    }
    function SendResponse($responseCode){
        http_response_code($responseCode);
        echo json_encode($this->Response);
        die();
    }
}
?>
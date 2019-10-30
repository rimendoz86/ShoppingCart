<?php
namespace API;
include_once '../APIBase.php';
use API;

class Product extends API\APIBase{
    function Get($req){
        //Validation: Ensure request has required params

        //Logic: call to method in data layer. map to response

        //Response: return response
        $result = '[{"ID":0,"Name":"Apple","Description":"An Apple a day keeps the doctor away.","ImageRef":"apple.jpg"},{"ID":1,"Name":"Banana","Description":"Monkeys love bananas but they are good for humans too.","ImageRef":"banana.jpg"},{"ID":2,"Name":"Orange","Description":"Orange is the only food that shares it\'s name with it\'s color","ImageRef":"orange.jpg"}]';
        echo $result;
    }

    function Post($req){
        //Validation: Ensure request has required params

        //Logic: call to method in data layer. map to response

        //Response: return response
        echo json_encode($req);
    }
}
new Product();
?>
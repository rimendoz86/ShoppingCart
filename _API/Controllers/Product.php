<?php
namespace API;
include_once '../APIBase.php';
use API;

class Product extends API\APIBase{
    function Get($req){
        //Validation: Ensure request has required params

        //Logic: call to method in data layer. map to response

        //Response: return response
        $result = '[{"ID":0,"Name":"Apple","Description":"An Apple a day keeps the doctor away.","ImageRef":"apple.jpg","Price":1.99},{"ID":1,"Name":"Banana","Description":"Monkeys love bananas but they are good for humans too.","ImageRef":"banana.jpg","Price":1.99},{"ID":2,"Name":"Orange","Description":"Orange is the only food that shares its name with its color","ImageRef":"orange.jpg","Price":1.99}]';
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
<?php 
namespace Data\Repository;
include 'Connection.php';
use Data;

class Product extends Data\Connection{
    function Get(){
        return $this->dbSelect("
        Select ID, Name, Description, ImageRef, Price
        FROM Product
        Where IsActive = 1");
    }
}

class Login extends Data\Connection{
    function CheckLogin($authModel){
        //var_dump($authModel);
        return $this->dbSelect("
        Select UserID, Login, 'Valid' as Password
        FROM User
        Where Login = '$authModel->Login' 
        && Password = '$authModel->Password' 
        && IsActive = 1");
    }
}

class User extends Data\Connection{
    function Save($userName, $returnKey){
        $stmt = $this->Conn->prepare(
        "INSERT INTO `users` 
        (`ID`,`UserName`,`ReturnKey`,`CreatedOn`,`CreatedBy`,`UpdatedOn`,`UpdatedBy`)
        VALUES 
        (NULL, ?, ?, current_timestamp(),'TestUser', current_timestamp(),'TestUser');");
        
        if($stmt == false){
            var_dump($this->Conn->error_list);
            return "['Statement Failed']";
            
        }
        $stmt->bind_param("ss", $userName, $returnKey);
        $stmt->execute();
        $stmt->close();
        return $this->Conn->insert_id;
    } 
}
?>
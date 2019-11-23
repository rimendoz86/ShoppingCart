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
        Select UserID, Login, Password
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

class Order extends Data\Connection{
    function Submit($order){
        $sqlOrder = "
        INSERT INTO `entity_order`
        (
            UserID, 
            CustomerAddress, 
            CustomerName, 
            ShippingType, 
            ShippingCost, 
            SubTotal, 
            Tax, 
            Total
        )
        Values
        (
            $order->UserID, 
            '$order->CustomerAddress', 
            '$order->CustomerName', 
            '$order->ShippingType', 
            $order->ShippingCost, 
            $order->SubTotal, 
            $order->Tax, 
            $order->Total
        )";
        $orderID = $this->dbInsert($sqlOrder);

        foreach ($order->ProductList as $prod) {
            $sqlOrderProduct = "
            INSERT INTO xref_order_product
                (
                    order_ID,
                    product_ID,
                    product_price,
                    product_quantity) 
                Values
                (   
                    $orderID,
                    $prod->product_ID,
                    $prod->product_price, 
                    $prod->product_quantity)
                    ";
                $this->dbInsert($sqlOrderProduct);
        }       
        return $orderID;
    }
    
    function dbInsert($SQLCommand){
        $stmt = $this->Conn->prepare($SQLCommand);   
        if($stmt == false){
            die(json_encode($this->Conn->error_list));
        }
        $stmt->execute();
        $stmt->close();
        return $this->Conn->insert_id;
    }
}
?>
<?php 
namespace Data;

class Connection {
    public $Servername = "localhost";
    public $Username = "serviceAcct";
    public $Password = "6iUgHc0xxL3dMf4F";
    public $Database = "shoppingcart";
    public $Port = 3306;
    public $Conn;

    function __construct() {
        $conn = new \ mysqli($this->Servername, $this->Username,$this->Password, $this->Database, $this->Port);
        if ($conn->connect_error) {
            die('["Connection Failed"]' . $conn->connect_error);
            return null;
        }
        $this->Conn = $conn;
    }

    function StmtToList($stmt){
        $results = [];
        $res = $stmt->get_result();
        while ($model = $res->fetch_object()) {
            array_push($results, $model);
        };
        return $results;
    }

    function dbSelect($SQLCommand){
        $stmt = $this->Conn->prepare($SQLCommand);   
        if($stmt == false){
            die(json_encode($this->Conn->error_list));
        }
        $stmt->execute();
        $res = $this->StmtToList($stmt);
        $stmt->close();
        return $res;
    }
}
?>
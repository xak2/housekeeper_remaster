<?php

header("Access-Control-Allow-Origin: *");

error_reporting(0);

$data = json_decode(file_get_contents("php://input"), true);

if ($_POST) {
    
    $connect = new mysqli('mysqldb3.ehost-services.com', 'frame_xak2', 'stefan91', 'framehouse_housekeeper');

    if ($connect->connect_errno) {

        $response['error'] = "MySQL connection error: (" . $connect->connect_errno . ") " . $connect->connect_error;

    } else {

        $result = $connect->query("select * from users where id = '{$data['user_id']}'");
        $result = $result->fetch_assoc();
        $response[] = $data;
        if ($result['password'] != md5($data['password'])) {
            $response['error'] = "The password is incorrect. Try again.";
        } else {
            for($i = 0; $i < count($data['customer'][0]); $i++) {
                $result = $connect->query("update customers set removed = 'true' where id = '{$data['customer'][0][$i]}'");
            }
            $response['success'] = true;
        }
        //if ($result->num_rows >= 1) {
        //    $response['error'] = "Customer {$data['name']} alredy exist. ";
        //} else {
        //    $result = $connect->query("insert into customers (name, email) values ('{$data['name']}', '{$data['mail']}')");
        //    $response['success'] = true;
        //}
    }
    $connect->close();

    echo json_encode($response);
}

?>
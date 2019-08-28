<?php

header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"), true);

if ($_POST) {

   // $conn = new mysqli('mysqldb3.ehost-services.com', 'frame_xak2', 'stefan91', 'framehouse_housekeeper');
   // $result = $conn->query("select * from users where login = '{$data['login']}'");
   // $user = $result->fetch_assoc();
   // $conn->close();

    if ($data['login'] == $user['login'] && md5($data['password']) == $user['password']) {
        $response = array(
            'authenticated' => true,
            'id' => $user['id'],
            'name' => $user['name'],
            'type' => $user['type']
        );
    } else {
        $response = array(
            'message' => 'Wrong login or password, try again.',
            'authenticated' => false
        );
    }

    echo json_encode($_POST);
}

?>
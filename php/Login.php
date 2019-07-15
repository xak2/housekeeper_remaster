<?php
header("Access-Control-Allow-Origin: *");
$user = array(
    'login' => 'xak2',
    'password' => 'stefan91',
    'name' => 'Vyacheslav Stefanovich',
    'type' => 'Developer',
    'id' => 123
);
$data = json_decode(file_get_contents("php://input"), true);
if ($_POST) {
    if ($data['login'] == $user['login'] && $data['password'] == $user['password']) {
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
    echo json_encode($response);
}
?>
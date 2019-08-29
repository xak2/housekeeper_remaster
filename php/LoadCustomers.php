<?php

header("Access-Control-Allow-Origin: *");

$connect = new mysqli('mysqldb3.ehost-services.com', 'frame_xak2', 'stefan91', 'framehouse_housekeeper');
$result = $connect->query("select * from customers order by name asc");

while ($row = $result->fetch_assoc()) {
    $response['customers'][] = array(
        'id' => $row['id'],
        'name' => $row['name']
    );
}

$connect->close();

echo json_encode($response);

?>
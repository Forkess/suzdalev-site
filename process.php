<?php
header('Content-type: application/json');
$data = json_decode(file_get_contents('php://input'), true); 

// set sender, recipient and subject
$from = 'noreply@sender.ru';
$to = 'dubaua@gmail.com';
$subject = "Заказ с сайта Суздалев.рф";
$message = '';

foreach ($data as $k => $v) {
	$label = stripcslashes(htmlspecialchars($v[label]));
	$field = stripcslashes(htmlspecialchars($v[data]));
    $message .= '<p>' . $label . ': <strong>' . $field . '</strong></p>';
}

$verify = mail($to,$subject,$message,'Content-type:text/html; Charset=utf-8\r\nFrom:'.$from);
echo $verify;
?>

<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once "../../vendor/autoload.php";
if (isset($_POST['company_name']) && isset($_POST['name']) && isset($_POST['email']) || isset($_POST['inquiry'])) {
    $mail = new PHPMailer();

    try {
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        //$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->Username = 'admin_mail@vn.ids.jp';
        $mail->Password = 'lvezapcnifxgcshk';
        $to = 'giang@ids.co.jp';

        $company = $_POST['company_name'];
        $name = $_POST['name'];
        $from = $_POST['email'];
        $phone = $_POST['phone'];
        $subject = "Contact request from IDS Vietnam Website [$from][$company]";
        $message = $_POST['inquiry'];
        $mail->addAddress($to);

        $mail->Subject = $subject;
        $mail->IsHTML(true);
        $mail->CharSet = 'UTF-8';
        $body= 'Nội dung email gửi từ IDS Vietnam website:<br/>';
        $body.= '===============================================<br/>';
        $body.= 'Tên công ty: ' .  $company . '<br/>';
        $body.= 'Tên người gửi: ' . $name . '<br/>';
        $body.= 'Số điện thoại người gửi: ' . $phone . '<br/>';
        $body.= 'Email người gửi: ' .  $from . '<br/>';
        $body.= 'Tin nhắn: ' . $message . '<br/>';
        $body.= '===============================================<br/>';
        $mail->Body    = $body;
 
        if(!$mail->send()) {
            $response['success'] = false;
            $response['message'] = 'Unable to send email. Please try again. '. $mail->ErrorInfo;
            echo json_encode($response);
            exit;
        }
        
        $response['success'] = true;
        $response['message'] = 'Thank you for your submit';

        echo json_encode($response);
        exit();
    } catch (Exception $e) {
        echo "Error 404";
    }
}
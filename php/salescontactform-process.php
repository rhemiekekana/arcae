<?php
$errorMSG = "";

if (empty($_REQUEST['name'])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_REQUEST['name'];
}

if (empty($_REQUEST['email'])) {
    $errorMSG = "Email is required ";
} else {
    $email = $_REQUEST['email'];
}

if (empty($_REQUEST['phone'])) {
    $errorMSG = "Phone is required ";
} else {
    $phone = $_REQUEST['phone'];
}

if (empty($_REQUEST['message'])) {
    $errorMSG = "Message is required ";
} else {
    $message = $_REQUEST['message'];
}

$singlepage = $_REQUEST['single-pager'];
$multipage = $_REQUEST['multiple-pages'];
$smartstart = $_REQUEST['smart-starter'];
$smartpro = $_REQUEST['smart-professional'];
$smartbus = $_REQUEST['smart-business'];


$EmailTo = "rhemie@arcae.co.za";
$Subject = "New message from Arcae Order Page";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Single Pager: ";
$Body .= $singlepage;
$Body .= "\n";
$Body .= "Multipage: ";
$Body .= $multipage;
$Body .= "\n";
$Body .= "Smart Starter: ";
$Body .= $smartstart;
$Body .= "\n";
$Body .= "Smart Professional: ";
$Body .= $smartpro;
$Body .= "\n";
$Body .= "Smart Business: ";
$Body .= $smartbus;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";


// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$name);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong. Trying givig us a call instead.";
    } else {
        echo $errorMSG;
    }
}
?>
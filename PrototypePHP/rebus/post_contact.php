<?php     session_start();
$errors = [];

if (!array_key_exists('name', $_POST) || $_POST['name'] == ''){
    $errors['name'] = "Vous n'avez pas renseigné votre nom";
}
if (!array_key_exists('email', $_POST) || $_POST['email'] == '' || !filter_var('#[a-z0-9]{1,}[\-\_\.a-z0-9]{0,}@[a-z]{2,}[\-\_\.a-z0-9]{0,}\.[a-z]{2,6}$#', $_POST['email'])){
    $errors['email'] = "Vous n'avez pas renseigné un email valide";
}
if (!array_key_exists('message', $_POST) || $_POST['message'] == '' || !filter_var('#^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\.\_\-\s]{5,500}$#', $_POST['message'])){
    $errors['message'] = "Vous n'avez pas renseigné votre message";
}
if(!empty($errors)){
    $_SESSION ['errors'] = $errors;
    $_SESSION ['inputs'] = $_POST;
}else{
    $_SESSION['success']= 1;
    $message = $_POST['message'];
    $headers = 'FROM: site@local.dev';
    mail('florianchatelot@gmail.com','Formulaire de contact', $message, $headers);
    header('location: contact.php');
    }
    ?>

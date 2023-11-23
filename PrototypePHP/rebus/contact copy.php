<?php session_start();?>
<?php require_once(__DIR__.'/partials/header.php');?> 


<div class="site-content">
    <article>
        <h2>Me contacter</h2>

        <?php if (array_key_exists('errors', $_SESSION)):?>
        <div class="alert alert-danger">
            <?= implode('<br>', $_SESSION['errors']);?>
        </div>
        <?php endif;?>

        <?php if (array_key_exists('success', $_SESSION)):?>
        <div class="alert alert-success">
           <?=  'Votre message a bien été envoyé'?>
        </div>
        <?php endif;?>

    
        <div class="formGroup">
            <form action="post_contact.php" method="post" >
                <label for="inputName">Votre nom:</label>
                    <input type="text" name="name" placeholder="Votre nom" id="inputName" value ="<?= isset($_SESSION ['inputs']['name']) ? $_SESSION ['inputs']['name'] : '';?>"/>
                <label for="inputMail">Votre mail:</label>
                    <input type="email" name="email" placeholder="Votre e-mail" id="inputMail" value ="<?= isset($_SESSION ['inputs']['email']) ? $_SESSION ['inputs']['email'] : '';?>"/>
                <label for="inputMessage">Votre message:</label>
                    <input type="text" name="message" placeholder="Votre message" id="inputMessage" value ="<?= isset($_SESSION ['inputs']['message']) ? $_SESSION ['inputs']['message'] : '';?>"/>
                <button type="submit" name="valider">Envoyer</button>
            </form>
        </div>
    </article>

<?php
/*
//Contrôle des formats des deux paramètres via les expressions régulières
$Format_Email = '#[a-z0-9]{1,}[\-\_\.a-z0-9]{0,}@[a-z]{2,}[\-\_\.a-z0-9]{0,}\.[a-z]{2,6}$#';
$Format_Content = '#^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\.\_\-\s]{5,500}$#';

if(!preg_match($Format_Email, $_POST['email'])){
    echo "Le paramètre email ne correspond pas au format attendu";
}  else if(!preg_match($Format_Content , $_POST['content'])){
    echo "Le paramètre content ne correspond pas au format attendu - limite de 500 caractères";
} else{
    if (isset($_POST['content'])) {
        $entete  = 'MIME-Version: 1.0' . "\r\n";
        $entete .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $entete .= 'From: webmaster@monsite.fr' . "\r\n";
        $entete .= 'Reply-to: ' . $_POST['email'];

        $message = '<h1>Message envoyé depuis la page Contact de SalemBoutil</h1>
        <p><b>Email : </b>' . $_POST['email'] . '<br>
        <b>Message : </b>' . htmlspecialchars($_POST['content']) . '</p>';

        $retour = mail('florianchatelot@gmail.com', 'Envoi depuis page Contact', $message, $entete);
        if($retour)
            echo '<p>Votre message a bien été envoyé.</p>';
    }
}


?>

<?php


    ?>

<?php
https://www.youtube.com/watch?v=Rh7mXaZl1oc&list=PLjwdMgw5TTLVDv-ceONHM_C19dPW1MAMD&index=31 
 https://analyse-innovation-solution.fr/publication/fr/php/formulaire-contact-php
 * */?>
</div>

<?php 
    unset($_SESSION ['inputs']);
    unset($_SESSION ['success']);
    unset($_SESSION ['errors']); 
?>

<?php require_once(__DIR__.'/partials/footer.php'); ?>
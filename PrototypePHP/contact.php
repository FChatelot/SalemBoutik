
<?php include(__DIR__.'/partials/header.php');?> 


<div class="site-contact">
    <article>
        <h2 class="titleContact">Me contacter</h2>

    
        <div class="formGroup">
            <form method="post" action="contact.php">
                <Label>E-mail</Label>
                <input type="email" id="email" name="email" placeholder="Votre e-mail"/>
                <label>Message</label>
                <textarea type="text" id="content" name="content" placeholder="Votre message"size="height:200px"></textarea>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    </article>

    <?php

    //Initialisation de l'objet PDO et ouverture de la connexion pour appel à la base de données
    $Pdo_Object = new PDO("mysql:Localhost=3306;dbname=salemboutik","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION )); 

    try {
    //Contrôle de l'éxistence des deux paramètres email et content
        if(!isset($_POST['email'])) throw new Exception('<div class="conforme">Merci d\'utiliser une adresse valide!</div>');//au cas ou je voudrais ajouter des paramètres plus tard.
        if(!isset($_POST['content'])) throw new Exception('');

    //Contrôle des formats des deux paramètres via les expressions régulières
    $Format_Email = '#[a-z0-9]{1,}[\-\_\.a-z0-9]{0,}@[a-z]{2,}[\-\_\.a-z0-9]{0,}\.[a-z]{2,6}$#';
    $Format_Content = '#^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\.\_\-\s]{5,500}$#';
    if(!preg_match($Format_Email, $_POST['email']))  throw new Exception('<div class="empty">Adresse mail invalide</div>');
    if(!preg_match($Format_Content , $_POST['content']))  throw new Exception('<div class="empty">Limite entre 5 et 500charactères</div>');
    
    //Tableau associatif pour requête d'insertion 
    $Arr_Key_Value = array(
                            'email' => $_POST['email'],
                            'content' => $_POST['content']);
    //Requête d'insertion
    $Sql_Query = "INSERT INTO contact(email,content) VALUES (:email,:content)";
    
    //Préparation de la requête (sécurisation des variables du tableau associatif)
    $Request= $Pdo_Object->prepare($Sql_Query);
    
    //Exécution de la requête 
    $Request->execute($Arr_Key_Value);

    if (isset($_POST['content'])) {
        $entete  = 'MIME-Version: 1.0' . "\r\n";
        $entete .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $entete .= 'From: zeinncontact@gmail.com' . "\r\n";
        $entete .= 'Reply-to: ' . $_POST['email'];

        $message = '<h1>Message envoyé depuis la page Contact de SalemBoutik</h1>
        <p><b>Email : </b>' . ($_POST['email']) . '<br>
        <b>Message : </b>' . ($_POST['content']) . '</p>';

        $retour = mail('florianchatelot@gmail.com', 'Envoi depuis page Contact', $message, $entete);
        if($retour)/*salemboutik81@gmail.com*/
            echo '<p>Votre message a bien été envoyé.</p>';
        }

    } 

    catch (Exception $e) {
    print( $e->getMessage()); 
    }
    finally{
    //Attention le finally ne fonctionne que sur php 5.6 et supérieur 
    //Fermeture de la connexion en détruisant la référence mémoire à l'objet PDO
    $Pdo_Object = null;

    }


    ?>
</div>
<?php include(__DIR__.'/partials/footer.php'); ?>
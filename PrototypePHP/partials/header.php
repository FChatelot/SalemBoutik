
<?php include (__DIR__.'/const.php') ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="Accueil" content="Boutique, SalemBoutik, Bijoux">
    <title>SalemBoutik</title>
    <?php linkRessource("stylesheet","../assets/css/mesNormes.css"); ?>
    <?php linkRessource("stylesheet","../assets/css/main.css");?>
    <?php scriptRessources("text/javascript","../assets/js/general.js");?>
</head>
<body>
    <div class="background">
        <img src="/SVG/background/Skullbull.svg" class="skullbull">
        <img src="/SVG/background/Pentacle.svg" class="pentacle">
    </div>
    <div class="blur"></div>
    <header id="header">
        <div class="siteTitle">
            <div class="skullTitle">
            <img src="/SVG/Skull.svg" alt="skull" >
            </div>
            <h1>SalemBoutik</h1>
        </div> 
    <?php include (__DIR__.'/menu.php') ?>
    </header>

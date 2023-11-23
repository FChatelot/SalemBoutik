<?php
/**
 * fonction d'appel pour mes liens css. problème au niveau de la racine de mes assets qui m'empèchent de les utiliser correctement à chaque fois et devoir les rename des que je veux les utiliser.
 */
    function linkRessource($rel, $href) {
        echo "<link rel='{$rel}' href='{$href}'>";
    };

/**
 * fonction d'appel pour mes liens java. problème au niveau de la racine de mes assets qui m'empèchent de les utiliser correctement à chaque fois et devoir les rename des que je veux les utiliser.
 */   
    function scriptRessources($type, $src){
        echo"<script type='{$type}' src='{$src}' defer></script>";
    };

?>

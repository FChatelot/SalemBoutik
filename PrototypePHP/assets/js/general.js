//-----------------Gestionnaire d'event

//Fonction qui nous permet d'appeler toutes les fonctions 'on'
var addEvent = function (element,type,callback){
    if(element.attachEvent){
        element.attachEvent("on"+type,callback);
        addEvent = function(element,type,callback){
            element.attachEvent("on"+type,callback);
        }
    }else{
        element.addEventListener(type, callback, false);
        addEvent = function (element,type,callback){
            element.addEventListener(type, callback, false);
        }
    }
};

var removeEvent = function (element,type,callback){
    if(element.detachEvent){
        element.detachEvent("on"+type,callback);
        removeEvent = function(element,type,callback){
            element.detachEvent("on"+type,callback);
        }
    }else{
        element.removeEventListener(type, callback, false);
        removeEvent = function (element,type,callback){
            element.removeEventListener(type, callback, false);
        }
    }
};



//--------------Fonction pour éviter de répéter document.getElementById
function docById(un_id){
    return document.getElementById(un_id);
};

//------------------- responsive menu Hamburger

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");
//rendre le menuburger actif
hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});
//Le rendre inactif (le fermer quoi)
document.querySelectorAll(".nav-link").forEach(n=> n.
    addEventListener("click",()=>{
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

//---------index
/*const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('apparition-animation');
      }
    });
  });
  
  observer.observe(document.querySelector('.apparition'));*/
  function reveal() {
    var reveals = document.querySelectorAll(".apparition");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);

//--------------------footer
//Fonction pour positionner le footer de mon document.

function setFooter (){
    docById('footer').style.position='';
    var yMax = document.documentElement.clientHeight || document.clientHeight;
    if(yMax > document.body.offsetHeight){
        docById('footer').style.position ='absolute';
    }
    window.onresize = setFooter;
};


//appel de la fonction du footer
addEvent(window,'load',setFooter);

//Chaudron click event
const toggleShareButton = document.querySelector ('.cauldron');
toggleShareButton.addEventListener('click',() => {
    const shareBtn = document.querySelector('.share');
    shareBtn.classList.toggle('active');
});
/**
 * fonction utilisée pour empêcher l'utilisation du clic droit sur les images pour protéger un minimum la propriété intellectuelle.
*/
document.addEventListener('contextmenu', function(e){
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);


//https://www.youtube.com/watch?v=1hHVvuShsGo à 36.01 pour essayer de corriger le code pour cacher a droite puis a gauche les boutons de scroll

//https://www.youtube.com/watch?v=jk2rFuWImcI pour le clic sur la gallerie.
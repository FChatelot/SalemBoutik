//------------Carousel Index

class Carousel{

    /**
     * @callback moveCallbacks
     * @param {number} index
     * 
     */


    /** 
     * Cette classe contient la majorité des données relatives à notre Carousel.
     * 
     * @param {HTMLElement} element
     * @param {object} options
     * @param {object} [options.slidesToScroll=1] Nombre d'éléments à faire défiler
     * @param {object} [options.slidesVisible=1] Nombre d'éléments visibles dans un slide.
     * @param {boolean} [options.loop=false] Doit-on boucler en fin de slides.
  */

    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll:1,
            slidesVisible:1,
            loop:false // en lien avec les boutons de navigation pour faire disparaitre les fleches en bout de course à utiliser si je veux faire disparaitre mes fleches*/
        }, options);
        let children = [].slice.call(element.children);
        this.isMobile = false;//partie responsive sur mobile
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.moveCallbacks = []//propriété d'instance pour les move callback
        this.items = children.map ((child) => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item;
        });
        //appel des fonctions de notre carousel.
        this.setStyle();
        this.createNavigation();
        this.moveCallbacks.forEach(callback => callback(0));
        this.onWindowResize();
        window.addEventListener('resize',this.onWindowResize.bind(this));
    };
/**
 * Applique les bonnes dimensions aux éléments du carousel.
 */
    setStyle () {
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%");

    };
//notre navigation de carousel pour aller de la première slide a la suivante.
    createNavigation (){
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click',this.next.bind(this));
        prevButton.addEventListener('click',this.prev.bind(this));
//la methode On Move fonctionne avec les loop: false et va permettre de faire disparaitre les boutons de la navigation quand on arrive en bout de course.
        if(this.options.loop === false){
            return 
        };
        this.onMove(index =>{
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible]===undefined && index > this.currentItem)){
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
            });
    };


    next(){
        this.goToItem (this.currentItem + this.slidesToScroll)
    };
    prev(){
        this.goToItem (this.currentItem - this.slidesToScroll)
    };


/** methode goToItem
 * Déplace le carousel vers l'élément ciblé.
 * @param {number} index 
 */
    goToItem (index){
        //Cette condition nous permet de gérer le comportement de nos slides en bout de course(on revient à la première vignette ou la dernière.)
        if (index<0) {
            index = this.items.length - this.slidesVisible;
        } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible]===undefined && index > this.currentItem)) { // Si je veux modifier le comportement de la slide quand on arrive en bout de course et retourner au début de la fleche gauche:  
            index = 0;
        };
        //nous permet de gérer le nombre de slide que l'on va faire venir
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d('+ translateX +'%,0,0)';
        this.currentItem = index;
    };
    
    /**méthode callback
     * 
     * @param {moveCallbacks} callback 
     */

    onMove (callback){
        this.moveCallbacks.push (callback)
    };

    onWindowResize () {
        let mobile = window.innerWidth < 800
        if(mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(callback => callback(this.currentItem))
        };
    };

    /**Méthode pour creer des div
     * Concrètement cette méthode me permet de placer une div ou je le désire sans passer par le html
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass(className){
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
    //partie responsive de notre carousel
    /**
     * 
     * @returns {number}
     */
    get slidesToScroll(){
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    /**
     * 
     * @returns {number}
     */
    get slidesVisible(){
        return this.isMobile ? 1 : this.options.slidesVisible
    }


};

// Si on veut creer d'autres carousel on réutilisera cette fonction.
document.addEventListener ('DOMContentLoaded', function () {
    new Carousel (document.querySelector('#carousel1'), {
        slidesToScroll:1,
        slidesVisible:1, //nombres d'éléments qui sont scroll dans notre carousel 1. On gère le nombre de slides quand on scroll et le nombre de slides visibles ici. 
        loop: false // en lien avec les boutons de navigation pour faire disparaitre les fleches en bout de course.
    })
});

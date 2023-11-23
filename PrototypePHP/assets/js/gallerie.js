//------------------------gallery
//sélection de tout nos éléments.
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = ()=>{ //Une fois que la fenêtre est chargée
    filterItem.onclick = (selectedItem)=>{// quand l'utilisateur clique sur notre item
        if(selectedItem.target.classList.contains("item")){// si il a cliqué sur un élémenty comportant la classe .item
            filterItem.querySelector(".active").classList.remove("active");// alors la classe active est enlevée du premier element qui est par defaut all.
            selectedItem.target.classList.add("active");// On ajoute la classe active lors du clic sur un nouvel élément
            let filterName = selectedItem.target.getAttribute("data-name"); //ici on stock les données de data-name de nos ONGLETS DE NAV dans la variable filterName pour que toutes nos datas soient liées 
            filterImg.forEach((image)=>{
                let filterImages = image.getAttribute("data-name");//ici on stock les données de data-name de nos IMAGES  dans la variable filterName pour que toutes nos datas soient liées
                //avec ce if on s'assure que les data-name des onglets et des images coincident ou soient égal à all.
                if((filterImages == filterName) || filterName == "all"){
                    image.classList.remove("hide");
                    image.classList.add("show");
                }else{
                    image.classList.add("hide");
                    image.classList.remove("show");
                }
            })
        }
    }
    for (let index = 0; index < filterImg.length; index++) {
        filterImg[index].setAttribute("onclick", "preview(this)");// c'est ici que j'ajoute à toutes  les images l'attribut onclick
        
    }
}

//Je selectionne ma preview box pour ma partie click
const previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
categoryName = previewBox.querySelector(".title p"),
closeIcon = previewBox.querySelector(".icon"),// reutiliser pour les card flipflop
shadow = document.querySelector(".shadow");
//fonction fullscreen
function preview(element){
    document.querySelector("body").style.overflow = "hidden";//permet de virer la scrollbar quand on a cliqué sur l'image.
    let selectedPrevImg = element.querySelector("img").src;//ici j'obtiens le preview de l'image cliquée
    let selectedImgCategory = element.getAttribute("data-name");// ici je récupère le type d'image de chaque élément qu'on avait pré-stocké.
    categoryName.textContent = selectedImgCategory;// On passe ici les valeurs de data-name à notre texte.
    previewImg.src = selectedPrevImg;//j'intègre la source de l'image cliquée
    previewBox.classList.add("show");// montre notre preview
    shadow.classList.add("show");//pareil pour notre fond
    closeIcon.onclick = ()=>{// si l'utilisateur clique sur l'icone ça enlève le preview
        previewBox.classList.remove("show");//cache le preview
        shadow.classList.remove("show");//pareil pour notre fond
        document.querySelector("body").style.overflow = "scroll";//permet de remettre la scrollbar quand on a cliqué sur l'image.

    }

}
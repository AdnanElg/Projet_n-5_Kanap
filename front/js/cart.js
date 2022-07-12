
//Commentaire index.html :


/* 
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>


    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
        </div>


       
       
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>



            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>
    2       84,00
    ci est un message d'erreur
*/


//Commentaire Produit n°1 Description :

/* {
    "colors": [
      "Blue",
      "White",
      "Black"
    ],
    
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  }, 
  
*/





    
//LE LOCALE STORAGE :
        
//Déclaration de la variable "localStorageProducts" dans laquelles on met les key et les values qui sont dans le local stockage :
let localStorageProducts = JSON.parse(localStorage.getItem("produits"));    

// Variable pour stocker les id de chaque articles présents dans le panier :

    let arrays = [];

    // Condition de vérification si le panier existe et ou est vide et modification texte :
    if (localStorageProducts == null || localStorageProducts.length == 0) {
        document.querySelector('h1').textContent = '🛒 Le panier est vide 🛒 !';
        document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
    }


    else{
        document.querySelector('h1').textContent = '🛒 Voici votre panier 🛒 ';
    };
    
    
    // Création d'une boucle for of dans laquelle ont injecte notre code grâce à un innerHTML puis récupération des valeurs du local storage qu l'ont injecte à nos produits :
    for (product of localStorageProducts) {

        document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id= ${product.id}  data-color= ${product.colors}>
        <div class="cart__item__img">
            <img src=${product.imageUrl} alt=${product.altTxt}>
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>Couleur du produit : ${product.colors}</p>
                <p>Prix unitaire : ${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p> Qté : ${product.quantity} </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
    
    // Récupération des Id de chaque articles et envoi dans le tableau de la variable arrays[] :    
    arrays.push(product.id);
  
}
    


// le tableau de la quantityTotalCalcul qui contient la quantity de chaque articles qui est dans le local storage :
let quantityTotalCalcul = [];

// le tableau de la priceTotalCalcul qui contient la price de chaque articles qui est dans le local storage :
let priceTotalCalcul = [];  

//Déclaration d'une const avec une fonction TotalPriceQuantity qui vas afficher la quantity et le price total des produits :
const TotalPriceQuantity = () => {
    
    for (let i = 0; i < localStorageProducts.length; i++) {

        //Déclaration de la variable quantityProduitDansLePanier dans laquelle ont vas chercher la quantity de tout les articles et que l'on push dans le tableaux quantityTotalCalcul :
        let quantityProduitDansLePanier = localStorageProducts[i].quantity;
        quantityTotalCalcul.push(quantityProduitDansLePanier);

        //Déclaration de la variable priceProduitDansLePanier dans laquelle ont vas chercher le price de chaque articles :
        let priceProduitDansLePanier = localStorageProducts[i].price * localStorageProducts[i].quantity;
        priceTotalCalcul.push(priceProduitDansLePanier);
        
    }
          
    //Utilisation de la propriété reduce dans laquelle on vas récupérée les tableaux quantityTotal et priceTotal qui vont additioner les valeur dans les tableaux :
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const quantityTotal = quantityTotalCalcul.reduce(reducer, 0);
    const priceTotal = priceTotalCalcul.reduce(reducer, 0);
    
    
    //Affichage des résultat grâce à innerHtml : 
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotal}</span> articles) : <span id="totalPrice">${priceTotal}</span> €</p>`;
}


TotalPriceQuantity()




let inputQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
let pQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity p"));
let pTotalQuantity = document.querySelector('#totalQuantity');
let pPriceTotal = document.querySelector('#totalPrice');

function modifValue () {
    for (let i = 0; i < inputQuantity.length; i++) {

        inputQuantity[i].addEventListener("change", () => {
            let i = pQuantity.textContent = "Qté : " +  inputQuantity.values;
            console.log(i)
        });
    }
}

modifValue()




// Récupération boutons supprimer et transformation en tableau avec Array.from :
let btn_supprimer = Array.from(document.querySelectorAll(".deleteItem"));

// Nouveau tableau pour récupérer le tableau localStorageProducts existant et contrôler les suppression :
let tabDelete = [];

// Fonction de suppression des articles :
function deleteProduct() {

  for (let i = 0; i < btn_supprimer.length; i++) {

    // Écoute d'évènements au click sur le tableau des boutons supprimer
    btn_supprimer[i].addEventListener("click", () => {

      // Suppression de l'article visuellement sur la page
      btn_supprimer[i].style.display = "none";

      // Copie du tableau localStorageProducts dans le tableau tabControlDelete
      tabDelete = localStorageProducts;

      // Array.prototype.splice() supprime un élément à chaque index [i] du tableau écouté
      tabDelete.splice([i], 1);

      // Mise à jour du local storage
      localStorageProducts = localStorage.setItem("produits", JSON.stringify(tabDelete));

      // Rafraîchissement de la page
      window.location.href = "cart.html";

      
    });
  }
}

deleteProduct();




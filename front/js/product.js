
//Commentaire index.html :

/*<img src="../images/logo.png" alt="Photographie d'un canapé">*/
/* Nom du produit*/
/*42*/
/*Dis enim malesuada risus sapien gravida nulla nisl arcu.*/
/*<option value="vert">vert</option>
<option value="blanc">blanc</option>*/


//Commentaire Produit n°1 Description :

/*  {
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



// URLSearchParams : 
let url = new URLSearchParams(document.location.search);
let id = url.get("id");


//Fonction Fetch :
fetch('http://localhost:3000/api/products/' + id)
  .then( (response) => response.json())
  .then( (dataProducts) => scriptDataProducts (dataProducts));



  function scriptDataProducts (Kanap) {

    //Création d'une constante imageUrl, qui vas récupérer l'imageUrl des images :
    const imageUrl = Kanap.imageUrl;

    //Création d'une constante altTxt, qui vas récupérer le altTxt des images :
    const altTxt = Kanap.altTxt;

    //Création d'une constante name, qui vas récupérer le name des images :
    const name = Kanap.name;

    //Création d'une constante price, qui vas récupérer le price des images :
    const price = Kanap.price;

    //Création d'une constante description, qui vas récupérer la description des images :
    const description = Kanap.description;

    //Création d'une constante colors, qui vas récupérer la colors des images :
    const colors = Kanap.colors;


    
    
    //Création d'une constante image, qui vas appelé la fonction makeImageUrl et affectation de imageUrl, altTxt en paramétre:
    const image = makeImageUrl(imageUrl, altTxt);

    //Création d'une constante h1, qui vas appelé la fonction makeName et affectaton du name en paramétre :
    const h1 = makeName(name);

    //Création d'une constante prix, qui vas appelé la fonction makePrice et affectaton du price en paramétre :
    const prix = makePrice(price);    

    //Création d'une constante p, qui vas appelé la fonction makeDescription et affectaton de la description en paramétre :
    const p = makeDescription(description);

    //Création d'une constante select, qui vas appelé la fonction makeColors et affectaton de la colors en paramétre :
    const select = makeColors(colors);

    
    

  function makeImageUrl (imageUrl, altTxt) {
    //Creation de la balise "<img>" avec insertion du imageUrl et du altTxt :
    let img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altTxt;
    let parent = document.querySelector('.item__img');
    parent.append(img);
      
  }



  function makeName (name) {
    //Selection id = #title et affectation du name :
      let h1 = document.querySelector('#title');
      h1.textContent = name; 
    }
  
  
  
  
  function makePrice (price) {
    //Selection de l'id = #price et affectation du price:
    let span = document.querySelector('#price');
    span.textContent = price;
  }
  
  
  

  function makeDescription (description) {
    //Selection l'id = #description et affectation de la description :
    let p = document.querySelector('#description');
    p.textContent = description;
  }
  

  
  function makeColors (colors) {
    //Selection l'id = #colors et creation d'une boucle for pour les colors :
    let select = document.querySelector('#colors');
    
    for (let i = 0; i < colors.length ; i++) {
      let option = document.createElement('option');
        option.value = colors[i];
        option.textContent = colors[i];
        select.append(option);
    }
    
    
    // Selection de l'id du button et appel de la function addEventListener qui écoute l'évènement click sur le bouton ajouter :
    
    const button = document.querySelector("#addToCart");
    button.addEventListener('click', ajouterAuxPanier);

    function ajouterAuxPanier(e) {
      
      e.preventDefault();
      
      //Selection des id = #colors et #quantity :
      let colors = document.querySelector('#colors').value;
      let quantity = document.querySelector('#quantity').value;
      
      
      //SI la colors ne vaut rien, veuillez choisir une couleur :
      if(colors == ''){
            alert('⚠️Veuillez sélectionner une couleur⚠️');
            return;
        }

        //SI NON SI la quantity est inférieur à 1 veuillez choisir une quantités valide : 
        else if (quantity<1){
            alert('⚠️Veuillez sélectionner le nombre d\'articles souhaités⚠️');
            return;
        }

        
        //SI NON SI la quantity est supérieur à 100 veuillez choisir une quantités entre 1 à 100 produits : 
        else if (quantity>100){
          alert('⚠️Vous pouvez seulement sélectionner 1 à 100 produits.⚠️');
          return;
        }
        
        
        //SI NON votre commande a bien ete enregistrée :
        else{
          alert('✅ Votre article ' + name + ' a bien été ajouté au panier ✅');   
        }
        
        
        // Enregistrement des valeurs dans un objet optionProduct :
        const optionProduct = { 
          id: id,
          name: name,
          imageUrl: imageUrl,
          altTxt: altTxt,
          description: description,
          colors: colors,
          quantity: Number(quantity),
          price: Number(price),
          totalPrice: price*quantity,
        }

        
        //LE LOCALE STORAGE :
        
        //Déclaration de la variable "localStorageProducts" dans laquelles on met les key et les values qui sont dans le local stockage :
        let localStorageProducts = JSON.parse(localStorage.getItem("produits"));
        
        
        //Popup confirmation :
        const popupConfirmation = () => {
        
          //SI OUI alors redirection vers = cart.html :
        if (confirm("L'article " + name + " à bien été ajouté au panier, consultez le panier OK ou revenir à la page d'accueil ANNULER")) {
          window.location.href = "cart.html";
        }
        
        //SI NON alors redirection vers = index.html :
        else{
          window.location.href = "index.html";
        }
      }
      
      
      // Si il y a deja des produit dans le locale storage :
      if (localStorageProducts) {
        
        // On rechercher avec la méthode find() si l'id et la couleur d'un article est déjà présent :
        let item = localStorageProducts.find(
          (item) =>
          item.id == optionProduct.id && item.colors == optionProduct.colors
        );
          
          
          
          // Si oui on ajoute juste la nouvelle quantité et la mise à jour du prix à l'article :
          if (item) {
            item.quantity = item.quantity + optionProduct.quantity;
            item.totalPrice = item.price * optionProduct.quantity;
            localStorage.setItem("produits", JSON.stringify(localStorageProducts));
            popupConfirmation();
            return;
        }

        
        // Si l'article n'est pas déjà dans le local storage alors on push le nouvel article sélectionner :
        localStorageProducts.push(optionProduct);
        localStorage.setItem("produits", JSON.stringify(localStorageProducts));
        popupConfirmation();
      } 
      
      else {
        //  S'il n'y a pas de produits dans le locale stockage alors création d'un tableau dans le lequel on push l'objet "optionProduct";
        let newTabLocalStorage = [];
        newTabLocalStorage.push(optionProduct);
        localStorage.setItem("produits", JSON.stringify(newTabLocalStorage));
        popupConfirmation();
      }
    }
  }
}
    
    


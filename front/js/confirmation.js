// URLSearchParams : 

const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
};

const orderId = getProductId ();

//Affichage de l'id du produit :
const idConfirmation = document.querySelector("#orderId");

idConfirmation.textContent = orderId;
  
//Nettoyage du local storage :
localStorage.clear();
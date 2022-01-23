// Gérer URL chercher paramétre id
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

// Récupération des articles de l'API
let start = () => {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            insertProduct(data)

        })
        .catch(err => console.log(err))
}

let insertProduct = (data) => {
    // Insertion de l'image
    let articleImg = document.createElement("img");
    articleImg.src = data.imageUrl;
    articleImg.alt = data.altTxt;
    document.querySelector(".item__img").appendChild(articleImg);

    // Modification du titre
    document.getElementById('title').innerHTML = data.name;
    
    // TODO - nettoyer la variable inutile            
    // Modification du prix
    document.getElementById('price').innerHTML = data.price;

    // TODO - nettoyer la variable inutile
    // Modification de la description
    document.getElementById('description').innerHTML = data.description;

    // Insertion des options de couleurs
    let select = document.querySelector("#colors")
    for (let colors of data.colors) {
        console.log(colors);

        let articleColors = document.createElement("option");
        articleColors.value = colors;
        articleColors.innerHTML = colors;
        select.appendChild(articleColors);
    }

    startListener(data)
}

let startListener = (produit) => {
    document.querySelector('#addToCart').addEventListener("click", (event) => {
        // Récupération de la quantité et couleur choisies
        const colorPicked = document.querySelector("#colors").value
        const quantityPicked = parseInt(document.querySelector("#quantity").value)

        // Test des trucs
        console.log(colorPicked)
        console.log(quantityPicked)

        if(colorPicked == ''){
            alert('Veuillez choisir une couleur')
            return false
        }
        if(quantityPicked == 0){
            alert('Veuiller choisir une quantité')
            return false
        }

      

        // Récupération du localStorage
        let panierStorage = localStorage.getItem('panier')
        console.log(JSON.parse(localStorage.getItem('panier')))
        if(!panierStorage){
            panier = []
        }else{
            panier = JSON.parse(panierStorage)
        }
       
        // Rechercher le produit dans le panier
        // [
        //     0 : {_id, color, quantity, ....}
        //     1 : {_id, color, quantity, ......} 
        // ]
        let index = panier.findIndex(p => p._id == produit._id && p.color == colorPicked)
        console.log(index)

        if(index == -1){
            console.log('ajout nouveau produit')
            produit.color = colorPicked
            produit.quantity = quantityPicked
            
            // Mise en panier
            panier.push(produit)
        }else{            
            console.log('mise à jour de quantité')
            panier[index].quantity = panier[index].quantity + quantityPicked
            // panier[index].quantity += quantityPicked
        }

        console.log(panier)        

        // Sauvegarde du panier dans le localStorage
        localStorage.setItem('panier', JSON.stringify(panier))

        // Suppression du focus du bouton - Hormis chrome sur MacOS ...
        document.getElementById('addToCart').blur()
    })
}

window.addEventListener('load', () => {
    start()
})


/*
ok 1 - Récupération de l'ID
ok 2 - Appel API pour récupérer le produit avec l'ID
ok 3 - Insert des données dans "la page web" (LE DOM)

ok 4 - Ecouter le bouton ajouter au panier
ok 5 - Récupérer les données du produit (couleur et quantité)
ok 6 - Enregistrer dans le panier
ok 6.1 - Attention vérifier si le produit n'est pas déjà dans le panier

ok -> Si le produit et la couleur existe => modifier la quantité
ok -> Si le produit et la couleur n'existe pas => ajouter le produit (c'est un nouveau)

*/

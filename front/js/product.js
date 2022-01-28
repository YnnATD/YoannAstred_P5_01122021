// Gérer URL chercher paramétre id

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

let start = () => {

    // Récupération de l'article dans l'API + id

    fetch("http://localhost:3000/api/products/" + idProduct)
        .then(response => response.json())
        .then(data => {
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

    // Modification du prix

    document.getElementById('price').innerHTML = data.price;

    // Modification de la description

    document.getElementById('description').innerHTML = data.description;

    // Insertion des options de couleurs

    let select = document.querySelector("#colors")
    for (let colors of data.colors) {

        let articleColors = document.createElement("option");
        articleColors.value = colors;
        articleColors.innerHTML = colors;
        select.appendChild(articleColors);
    }

    startListener(data)
}

// écoute du bouton ajouter au panier

let startListener = (produit) => {
    document.querySelector('#addToCart').addEventListener("click", (event) => {

        // Récupération de la quantité et couleur choisies

        const colorPicked = document.querySelector("#colors").value
        const quantityPicked = parseInt(document.querySelector("#quantity").value)

        if (colorPicked == '') {
            alert('Veuillez choisir une couleur')
            return false
        }
        if (quantityPicked == 0) {
            alert('Veuiller choisir une quantité')
            return false
        }

        // création du panier

        let panierStorage = localStorage.getItem('panier')
        if (!panierStorage) {
            panier = []
        } else {
            panier = JSON.parse(panierStorage)
        }

        // Rechercher le produit dans le panier

        let index = panier.findIndex(p => p._id == produit._id && p.color == colorPicked)

        if (index == -1) {
            produit.color = colorPicked
            produit.quantity = quantityPicked

            // Mise en panier

            panier.push(produit)
            alert("Produit ajouté au panier")

        }
        else {

            panier[index].quantity = panier[index].quantity + quantityPicked

        }

        // Sauvegarde du panier dans le localStorage

        localStorage.setItem('panier', JSON.stringify(panier))

        // Suppression du focus du bouton - Hormis chrome sur MacOS ...

        document.getElementById('addToCart').blur()
    })
}

window.addEventListener('load', () => {
    start()
})


let ttp = 0
let ttq = 0
let updateTotal = (quantity, price) => {
    ttq += quantity
    ttp += price
}

let totalPrice = document.querySelector('#totalPrice')
let totalQuantity = document.querySelector('#totalQuantity')
let displayTotal = () => {
    totalPrice.textContent = ttp
    totalQuantity.textContent = ttq
}


let start = () => {

    function getCart() {
        // Récupération du localStorage

        let panierStorage = localStorage.getItem('panier')
        if (!panierStorage) {
            panier = []
        } else {
            panier = JSON.parse(panierStorage)
        }


        let container = document.querySelector('#cart__items')


        for (produit of panier) {

            updateTotal(produit.quantity, (produit.price * produit.quantity))


            container.insertAdjacentHTML('beforeend', `
            <article class="cart__item" data-id="${produit._id}" data-color="${produit.color}">
                <div class="cart__item__img">
                <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                     <div class="cart__item__content__description">
                    <h2>${produit.name}</h2>
                    <p>${produit.color}</p>
                    <p>${produit.price * produit.quantity} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`
            )
        }
    }
    getCart();

    // Mise en place des totaux
    displayTotal()

    function deleteProduct() {

        //ecoute des bouton supprimer

        let btnDelet = document.querySelectorAll('.deleteItem')
        btnDelet.forEach(item => {
            item.addEventListener('click', event => {

                // // remonter parent article
                // let fath = document.querySelector('.cart__item')
                // //parentElement = node.parentElement
                // btnDelet = fath.parentElement

                let fath = event.target.closest('article')

                //   recuperer data-id data-color
                let dataID = fath.dataset.id
                let dataColor = fath.dataset.color

                // ligne 86. product.js pour trouver l'index du produit dans le panier

                let index = panier.findIndex(p => p._id == dataID && p.color == dataColor)

                //Mise à jour du total
                updateTotal(-panier[index].quantity, -(panier[index].quantity * panier[index].price))
                displayTotal()

                // Suppression dans le panier
                panier = panier.splice(index, 1)

                // Suppression dans le dom
                fath.remove()

                // Sauvegarde du panier dans le localStorage
                localStorage.setItem('panier', JSON.stringify(panier))

            })

        })
    }
    deleteProduct();

    function modifyPrice() {
        //ecoute des input

        let boxQuantity = document.querySelectorAll('.itemQuantity')
        boxQuantity.forEach(item => {
            item.addEventListener('change', event => {
                //getitemn    // Récupération du localStorage
                localStorage.getItem('panier')

                // récupérer valeur de input

                let boxPicked = parseInt(item.value)

                // trouver l'index du produit dans le panier

                let fath = event.target.closest('article')

                //   recuperer data-id data-color
                let dataID = fath.dataset.id
                let dataColor = fath.dataset.color

                let index = panier.findIndex(p => p._id == dataID && p.color == dataColor)


                // si la valeur de input est supérieur a la quantité du produit
                // 4 avant 2
                if (boxPicked > panier[index].quantity) {

                    // nouveau 4
                    // ancien 2

                    // Prix 10
                    // Prix total actuel 20
                    let newQuantity = boxPicked - panier[index].quantity //2

                    //              2             2            10
                    updateTotal(newQuantity, (newQuantity * panier[index].price))
                    displayTotal()


                }

                // si la valeur de input est inférieur a la quantité du produit 

                if (boxPicked < panier[index].quantity) {
                    let newQuantity = panier[index].quantity - boxPicked
                    updateTotal(-newQuantity, (-newQuantity * panier[index].price))
                    displayTotal()
                }

                // 10 - 2


                // focus dernier enfant <div cart__item__content__description
                let priceDescription = item.closest('.cart__item__content').firstElementChild.lastElementChild.innerHTML
                descriptionValue = parseInt(priceDescription)

                if (boxPicked > panier[index].quantity) {

                    let newPrice = boxPicked * panier[index].price

                    item.closest('.cart__item__content').firstElementChild.lastElementChild.innerHTML = newPrice + " €"
                    panier[index].quantity = boxPicked
                }
                if (boxPicked < panier[index].quantity) {
                    let newPrice = boxPicked * panier[index].price
                    item.closest('.cart__item__content').firstElementChild.lastElementChild.innerHTML = newPrice + " €"
                    panier[index].quantity = boxPicked
                }

                // Sauvegarde du panier dans le localStorage
                localStorage.setItem('panier', JSON.stringify(panier))
            })

        });
    }
    modifyPrice()

    function form() {
        document.querySelector('#order').addEventListener('click', event => {
            event.preventDefault()

            // expression reguliére
            let regMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            let regName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
            let regAddress = /^[a-z0-9\s'-]+$/i
            let regCity = /^[a-zA-Z',.\s-]{1,25}$/

            //html collection formulaire
            let form = event.target.closest('form').elements

            // flag validation
            let flag = true

            //validation input
            if (!regName.test(form['firstName'].value)) {
                form['firstName'].nextElementSibling.textContent = 'prénom invalide !'
                flag = false
            }
            else {
                form['firstName'].nextElementSibling.textContent = ''
                flag = true
            }
            if (!regName.test(form['lastName'].value)) {
                form['lastName'].nextElementSibling.textContent = 'nom invalide !'
                flag = false
            }
            else {
                form['lastName'].nextElementSibling.textContent = ''
                flag = true
            }
            if (!regAddress.test(form['address'].value)) {
                form['address'].nextElementSibling.textContent = 'address invalide !'
                flag = false
            }
            else {
                form['address'].nextElementSibling.textContent = ''
                flag = true
            }
            if (!regCity.test(form['city'].value)) {
                form['city'].nextElementSibling.textContent = 'Ville invalide !'
                flag = false
            }
            else {
                form['city'].nextElementSibling.textContent = ''
                flag = true
            }
            if (!regMail.test(form['email'].value)) {
                form['email'].nextElementSibling.textContent = 'adresse mail invalide !'
                flag = false
            }
            else {
                form['email'].nextElementSibling.textContent = ''
                flag = true
            }

            //formulaire en erreur
            if (!flag) {
                return false
            }

            // Envoi de la requête POST au back-end 

            let order = {
                contact: form, // objet qui contient les infos de l'acheteur
                products: panier.map(p => p._id) //objet qui sont les produits acheté
            }

            // Création de l'entête de la requête

            let options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }

            // Envoie de la requête 

            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    document.location.href = "confirmation.html";
                })

        })
    }
    form();
}

window.addEventListener('load', () => {
    start()
})
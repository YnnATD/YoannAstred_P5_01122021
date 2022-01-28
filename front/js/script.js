window.addEventListener('load', (e) => {

    // Récupération des articles dans l'API

    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {

            let container = document.querySelector('#items')

            // Boucle pour parcourir les produits

            for (product of products) {

                // Insertion dans le DOM à la position spécifiée

                container.insertAdjacentHTML('beforeend', `
                    <a href="./product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>`
                )
            }
        })
        .catch(err => console.log(err))

})
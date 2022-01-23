window.addEventListener('load', (e) => {
  fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(products => {
          console.log(products)

          let container = document.querySelector('#items')


          for(product of products){    
              console.log(product) 
               
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
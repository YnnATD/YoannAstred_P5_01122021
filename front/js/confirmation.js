let start = () => {

    let str = window.location.href;
    let url = new URL(str);
    let idProduct = url.searchParams.get("id");

    let idNode = document.getElementById("orderId");
    idNode.innerHTML = idProduct
    
    localStorage.removeItem('panier'); // On vide le localStorage pour recommencer plus tard le processus d'achat
}

window.addEventListener('load', () => {
    start()
})
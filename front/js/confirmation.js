let start = () => {

    // Gérer URL chercher paramétre id

    let str = window.location.href;
    let url = new URL(str);
    let idProduct = url.searchParams.get("id");

    let idNode = document.getElementById("orderId");
    idNode.innerHTML = idProduct

    // On vide le localStorage pour recommencer plus tard le processus d'achat

    localStorage.removeItem('panier'); 
}

window.addEventListener('load', () => {
    start()
})
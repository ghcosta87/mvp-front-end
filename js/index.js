const exitButton = document.getElementById("btn-sair");

exitButton.addEventListener("click", () => {
    localStorage.removeItem("usuario_logado");
    document.body.classList.add("animacao-sair-direita");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
});
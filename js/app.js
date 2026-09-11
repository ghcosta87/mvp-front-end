// ########################################
// # FUNÇÕES GLOBAIS
// ########################################
function toastAlert(mensagem, errorMsg) {
    textoMsg.textContent = mensagem

    const tipoClasse = errorMsg ? "erro" : "sucesso"
    toast.classList.add(tipoClasse)

    toast.classList.add("show")

    clearTimeout(toast._timeoutId)
    toast._timeoutId = setTimeout(() => {
        toast.classList.remove("show")
    }, CONSTANTS.JS_CONFIG.TOAST_DURATION)
}

function esconderBarraLateral() {
    if (sidebarEl) {
        const menuLateral = mdb.Offcanvas.getInstance(sidebarEl)
        if (menuLateral) menuLateral.hide()
    }
}

function aplicarTema(tema) {
    document.body.setAttribute("data-theme", tema)
    localStorage.setItem("tema_escolhido", tema)
    esconderBarraLateral()
}

function navegarPara(tela) {

    const loading = document.getElementById("loading-produtos")

    switch (tela) {
        case "login":
            telaCadastro.classList.add("d-none")
            telaLogin.classList.remove("d-none")
            sidebarEl.classList.add("d-none")
            break
        case "painel":
            loading.style.display = "inline-block"
            telaLogin.classList.add("d-none")
            telaPainel.style.display = "block"
            sidebarEl.classList.remove("d-none")
            telaCadastro.classList.add("d-none") // Garante que o cadastro esteja escondido
            break
        case "cadastro":
            telaLogin.classList.add("d-none")
            telaCadastro.classList.remove("d-none")
            telaCadastro.style.display = "flex"
            sidebarEl.classList.add("d-none")
            break
    }
}
const userState = () => {
    // const token = localStorage.getItem("auth_token")
    // if (token) {
    //     // Opcional, mas recomendado: valida o token com o backend antes de confiar nele
    //     verificarToken(token)
    // } else {
    //     navegarPara("login")
    // }
    return localStorage.getItem("usuario_logado")
}

// ########################################
// # INICIALIZAÇÃO
// ########################################
document.addEventListener("DOMContentLoaded", () => {
    botaoLogin.disabled = true
    aplicarTema(localStorage.getItem("tema_escolhido"))
    telaCadastro.classList.add("d-none")
    sidebarEl.classList.add("d-none")
    telaCadastro.classList.add("d-none")

    if (userState()) {
        navegarPara('painel')
        carregarProdutos()
    } else navegarPara('login')

})
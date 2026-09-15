// ########################################
// # FUNÇÕES GLOBAIS
// ########################################
function toastAlert(mensagem, errorMsg) {
    textoMsg.textContent = mensagem

    toast.classList.remove("erro", "sucesso")
    const tipoClasse = errorMsg ? "erro" : "sucesso"
    toast.classList.add(tipoClasse)

    toast.classList.add("show")

    console.debug(`mensagem: ${mensagem}\ntipo de msg:${tipoClasse}`)

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

    if (tema === "claro")
        document.body.removeAttribute("data-theme")
    else document.body.setAttribute("data-theme", tema)

    localStorage.setItem("tema_escolhido", tema)
    toggleTema.checked = (tema === "escuro")
    if (mdb.Offcanvas.getInstance(sidebarEl)) menuLateral.hide()
    toggleTema.addEventListener("change", () => {
        const novoTema = toggleTema.checked ? "escuro" : "claro"
        aplicarTema(novoTema)
    })
}

function navegarPara(tela) {

    const loading = document.getElementById("loading-produtos")

    switch (tela) {
        case "login":
            telaCadastro.classList.add("d-none")
            telaPainel.classList.add("d-none")
            telaLogin.classList.remove("d-none")
            sidebarEl.classList.add("d-none")
            break
        case "painel":
            telaPainel.classList.remove("d-none")
            loading.style.display = "inline-block"
            telaLogin.classList.add("d-none")
            telaPainel.style.display = "block"
            sidebarEl.classList.remove("d-none")
            telaCadastro.classList.add("d-none") // Garante que o cadastro esteja escondido
            break
        case "cadastro":
            telaCadastro.classList.add("d-none")
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

function setUploadLoading(ativo) {
    if (ativo) {
        btnUpload.dataset.iconeOriginal = btnUpload.innerHTML // guarda o ícone original
        btnUpload.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
        btnUpload.classList.add("disabled") // impede novo clique visualmente
        btnUpload.style.pointerEvents = "none" // impede clique de fato (label não tem "disabled" nativo)
        inputComprovante.disabled = true
    } else {
        btnUpload.innerHTML = btnUpload.dataset.iconeOriginal
        btnUpload.classList.remove("disabled")
        btnUpload.style.pointerEvents = "auto"
        inputComprovante.disabled = false
    }
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
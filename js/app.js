// ########################################
// # ELEMENTOS DO HTML
// ########################################
const toast = document.getElementById("toast-container")
const textoMsg = document.getElementById("toast-mensagem")
const btnClaro = document.getElementById("btn-tema-claro")
const btnEscuro = document.getElementById("btn-tema-escuro")
const btnTech = document.getElementById("btn-tema-tech")
const sidebarEl = document.getElementById("sidebarMenu")
const btnMenu = document.getElementById("btn-menu")
const telaLogin = document.getElementById("tela-login")
const telaPainel = document.getElementById("tela-painel")
const telaCadastro = document.getElementById("tela-cadastro")
const btnIrCadastro = document.getElementById("btn-ir-cadastro")
const btnVoltarLogin = document.getElementById("btn-voltar-login")
const btnEncerrarConta = document.getElementById("btn-encerrar-conta")
const btnConfirmarEncerramento = document.getElementById("btn-confirmar-encerramento")
const modalEncerrarEl = document.getElementById("modalEncerrarConta")
const modalEncerrar = modalEncerrarEl ? new mdb.Modal(modalEncerrarEl) : null
const botaoSair = document.getElementById("btn-sair")

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
    if (telaLogin) telaLogin.classList.add("d-none")
    if (telaPainel) telaPainel.style.display = "none"
    if (telaCadastro) telaCadastro.style.display = "none"

    switch (tela) {
        case "login":
            telaLogin.classList.remove("d-none")
            break
        case "painel":
            telaPainel.style.display = "block"
            telaCadastro.classList.add("d-none") // Garante que o cadastro esteja escondido
            break
        case "cadastro":
            telaCadastro.classList.remove("d-none")
            telaCadastro.style.display = "flex"
            break
    }
}

// ########################################
// # INICIALIZAÇÃO
// ########################################
btnClaro.addEventListener("click", () => aplicarTema("claro"))

btnEscuro.addEventListener("click", () => aplicarTema("escuro"))

btnTech.addEventListener("click", () => aplicarTema("tech"))

btnIrCadastro.addEventListener("click", () => navegarPara("cadastro"))

btnVoltarLogin.addEventListener("click", () => navegarPara("login"))

btnMenu.addEventListener("click", () => {
    // Procura se o MDB já conhece esse menu, se não, cria a instância na hora
    const menuLateral = mdb.Offcanvas.getInstance(sidebarEl) || new mdb.Offcanvas(sidebarEl)
    // Comando oficial para deslizar o menu
    menuLateral.show()
})

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuario_logado")
    esconderBarraLateral()
    toastAlert("Você saiu da sua conta.", CONSTANTS.MSG_SUCCESS)
    navegarPara("login")
})

btnEncerrarConta.addEventListener("click", () => {
    document.getElementById("senha-confirmacao").value = "" // Limpa o input
    modalEncerrar.show()
})

btnConfirmarEncerramento.addEventListener("click", async () => {
    const senhaDigitada = document.getElementById("senha-confirmacao").value
    const usuarioLogado = localStorage.getItem("email_logado") || localStorage.getItem("cpf_logado")

    if (!senhaDigitada) {
        toastAlert("Por favor, digite sua senha.", CONSTANTS.MSG_ERROR)
        return
    }

    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/usuario/deletar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identificador: usuarioLogado,
                senha: senhaDigitada
            })
        })

        if (!resposta.ok) {
            const erroData = await resposta.json()
            throw new Error(erroData.error)
        }

        toastAlert("Conta encerrada com sucesso.", CONSTANTS.MSG_SUCCESS)
        modalEncerrar.hide()

        localStorage.clear()
        navegarPara("login")

    } catch (erro) {
        toastAlert(`Falha ao encerrar conta: ${erro.message}`, CONSTANTS.MSG_ERROR)
    }
})

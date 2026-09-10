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
    // if (telaLogin) telaLogin.classList.add("d-none")
    // if (telaPainel) telaPainel.style.display = "none"
    // if (telaCadastro) telaCadastro.style.display = "none"

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

// ########################################
// # INICIALIZAÇÃO
// ########################################
document.addEventListener("DOMContentLoaded", () => {
    console.log("cotet loaded")
    userState = localStorage.getItem("usuario_logado")

    if (localStorage.getItem("usuario_logado")) {
        navegarPara('painel')
        carregarProdutos()
    } else navegarPara('login')

})

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

// ########################################
// # ÁREA DE TESTES
// ########################################

const btnUpload = document.getElementById("btn-upload")
// const inputComprovante = document.getElementById("input-comprovante")

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

function enviarComprovanteComProgresso(arquivo) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append("imagem", arquivo)

        const xhr = new XMLHttpRequest()
        xhr.open("POST", `${CONSTANTS.API_URL}/upload`)

        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const percentual = Math.round((e.loaded / e.total) * 100)
                console.log(`Progresso: ${percentual}%`)
                // aqui você atualizaria uma barra de progresso, ex:
                // barraProgresso.style.width = percentual + "%"
            }
        })

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject(new Error(JSON.parse(xhr.responseText)?.error || "Erro no upload"))
            }
        }

        xhr.onerror = () => reject(new Error("Erro de rede no upload"))

        xhr.send(formData)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("auth_token")

    aplicarTema(localStorage.getItem("tema_escolhido"))
    // if (token) {
    //     // Opcional, mas recomendado: valida o token com o backend antes de confiar nele
    //     verificarToken(token)
    // } else {
    //     navegarPara("login")
    // }
})

async function verificarToken(token) {
    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/verificar-token`, {
            headers: { "Authorization": `Bearer ${token}` }
        })

        // if (resposta.ok) {
        //     navegarPara("painel") // token válido, pula o login
        // } else {
        //     localStorage.removeItem("auth_token")
        //     navegarPara("login")
        // }
    } catch (erro) {
        navegarPara("login")
    }
}
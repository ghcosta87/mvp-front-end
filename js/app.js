// ########################################
// # ELEMENTOS DO HTML
// ########################################
// const toast = document.getElementById("toast-container")
// const textoMsg = document.getElementById("toast-mensagem")
// const btnFechar = document.getElementById("toast-fechar")
const toast = document.getElementById("toast-container")
const textoMsg = document.getElementById("toast-mensagem")

function toastAlert(mensagem, errorMsg) {
    textoMsg.textContent = mensagem

    const tipoClasse = !errorMsg ? "erro" : "sucesso"
    toast.classList.add(tipoClasse)

    toast.classList.add("show")

    clearTimeout(toast._timeoutId)
    toast._timeoutId = setTimeout(() => {
        toast.classList.remove("show")
    }, CONSTANTS.JS_CONFIG.TOAST_DURATION)
}
// const toastEl = document.getElementById("toast-erro")
// const toastMsg = document.getElementById("toast-mensagem")
// const toast = new mdb.Toast(toastEl, {
//     delay: CONSTANTS.JS_CONFIG.TOAST_DURATION,
//     autohide: true
// })

// function toastAlert(mensagem) {
//     toastMsg.textContent = mensagem
//     toast.show()
// }

// btnFechar.addEventListener("click", () => {
//     toast.classList.remove("show")
//     console.log("clicado pelo evento!")
// })

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mapeia os botões do HTML
    const btnClaro = document.getElementById("btn-tema-claro")
    const btnEscuro = document.getElementById("btn-tema-escuro")
    const btnTech = document.getElementById("btn-tema-tech")
    const sidebarEl = document.getElementById("sidebarMenu")

    // 2. Função central para aplicar o tema e fechar o menu
    function aplicarTema(tema) {
        // Aplica o atributo que o CSS reconhece (ex: data-theme="tech")
        if (tema === "claro") {
            document.body.removeAttribute("data-theme") // O claro é o padrão sem atributo
        } else {
            document.body.setAttribute("data-theme", tema)
        }

        // Salva a escolha para não perder ao atualizar a página
        localStorage.setItem("tema_escolhido", tema)

        // Fecha o menu lateral suavemente após a escolha
        if (sidebarEl) {
            const menuLateral = mdb.Offcanvas.getInstance(sidebarEl)
            if (menuLateral) menuLateral.hide()
        }
    }

    // 3. Adiciona os ouvintes de clique nos botões
    if (btnClaro) btnClaro.addEventListener("click", () => aplicarTema("claro"))
    if (btnEscuro) btnEscuro.addEventListener("click", () => aplicarTema("escuro"))
    if (btnTech) btnTech.addEventListener("click", () => aplicarTema("tech"))

    // 4. Carrega o tema salvo automaticamente ao abrir a página
    const temaSalvo = localStorage.getItem("tema_escolhido")
    if (temaSalvo) {
        aplicarTema(temaSalvo)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu")
    const sidebarEl = document.getElementById("sidebarMenu")

    if (btnMenu && sidebarEl) {
        btnMenu.addEventListener("click", () => {
            console.log("Abrindo menu lateral...")

            // Procura se o MDB já conhece esse menu, se não, cria a instância na hora
            const menuLateral = mdb.Offcanvas.getInstance(sidebarEl) || new mdb.Offcanvas(sidebarEl)

            // Comando oficial para deslizar o menu
            menuLateral.show()
        })
    }
})

// Função global para alternar entre as telas da SPA
function navegarPara(tela) {
    const telaLogin = document.getElementById("tela-login")
    const telaPainel = document.getElementById("tela-painel")
    const telaCadastro = document.getElementById("tela-cadastro")

    // Esconde todas primeiro
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

    // // Mostra a solicitada
    //     if (tela === "login") {
    //         if (telaLogin) telaLogin.classList.remove("d-none")
    //     } else if (tela === "painel") {
    //         if (telaPainel) telaPainel.style.display = "block"
    //     } else if (tela === "cadastro") {
    //         if (telaCadastro) telaCadastro.style.display = "flex" // Usa flex para centralizar
    //     }
}

// Ouvintes globais para os botões de transição
document.addEventListener("DOMContentLoaded", () => {
    const btnIrCadastro = document.getElementById("btn-ir-cadastro")
    const btnVoltarLogin = document.getElementById("btn-voltar-login")

    if (btnIrCadastro) {
        btnIrCadastro.addEventListener("click", () => navegarPara("cadastro"))
    }

    if (btnVoltarLogin) {
        btnVoltarLogin.addEventListener("click", () => navegarPara("login"))
    }
})

// 3. LÓGICA DE LOGOUT (Botão Sair)
const botaoSair = document.getElementById("btn-sair")
if (botaoSair) {
    botaoSair.addEventListener("click", () => {
        // Apaga o usuário do navegador
        localStorage.removeItem("usuario_logado")

        // Volta instantaneamente para a tela inicial
        navegarPara("login")
    })
}


document.addEventListener("DOMContentLoaded", () => {
    const btnEncerrarConta = document.getElementById("btn-encerrar-conta")
    const btnConfirmarEncerramento = document.getElementById("btn-confirmar-encerramento")
    const modalEncerrarEl = document.getElementById("modalEncerrarConta")
    const modalEncerrar = modalEncerrarEl ? new mdb.Modal(modalEncerrarEl) : null

    // 1. Abrir o modal ao clicar no botão
    if (btnEncerrarConta && modalEncerrar) {
        btnEncerrarConta.addEventListener("click", () => {
            document.getElementById("senha-confirmacao").value = "" // Limpa o input
            modalEncerrar.show()
        })
    }

    // 2. Enviar a requisição POST ao confirmar ("Sim")
    if (btnConfirmarEncerramento) {
        btnConfirmarEncerramento.addEventListener("click", async () => {
            const senhaDigitada = document.getElementById("senha-confirmacao").value

            // Supondo que você armazena o e-mail ou CPF do usuário logado no localStorage
            const usuarioLogado = localStorage.getItem("email_logado") || localStorage.getItem("cpf_logado")

            if (!senhaDigitada) {
                alert("Por favor, digite sua senha.")
                return
            }

            try {
                const resposta = await fetch("http://127.0.0.1:5000/usuario/deletar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        identificador: usuarioLogado, // Envia o dado do usuário logado
                        senha: senhaDigitada
                    })
                })

                if (!resposta.ok) {
                    const erroData = await resposta.json()
                    throw new Error(erroData.error || "Erro ao encerrar a conta.")
                }

                alert("Conta encerrada com sucesso.")
                modalEncerrar.hide()

                // Limpa a sessão e redireciona para o login
                localStorage.clear()
                navegarPara("login")

            } catch (erro) {
                console.error("Erro:", erro)
                alert("Falha ao encerrar conta: " + erro.message)
            }
        })
    }
})

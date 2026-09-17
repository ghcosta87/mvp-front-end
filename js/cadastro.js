// ########################################
// # EVENTOS LOCAIS
// ########################################
inputCpf.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "") // Remove tudo que não for número
    if (valor.length > 11) valor = valor.slice(0, 11) // Limpa se passar de 11 dígitos

    // Aplica a máscara de pontos e traço (123.456.789-01)
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2")
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    e.target.value = valor
})

buttonBack.addEventListener("submit", async (event) => {
    event.preventDefault()
    navegarPara("login")
})

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault()

    // Salva o texto original, inicia o spinner e impede outro click
    const textoOriginal = buttonCadastrar.innerHTML
    buttonCadastrar.innerHTML = ''
    buttonCadastrar.innerHTML = CONSTANTS.STYLES.SIGNING_UP
    buttonCadastrar.disabled = true

    const formData = new FormData()
    formData.append("nome_completo", document.getElementById("cad-nome").value.trim())
    formData.append("cpf", document.getElementById("cad-cpf").value.trim())
    formData.append("email", document.getElementById("cad-email").value.trim())
    formData.append("nascimento", document.getElementById("cad-nascimento").value || "")
    formData.append("telefone", parseInt(document.getElementById("cad-telefone").value.replace(/\D/g, "")) || 0)
    formData.append("senha", document.getElementById("cad-senha").value)

    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/adicionar_usuario`, {
            method: "POST",
            body: formData
        })

        const dadosResposta = await resposta.json()

        if (!resposta.ok) {
            toastAlert(dadosResposta.message, CONSTANTS.MSG_ERROR)
            buttonCadastrar.innerHTML = textoOriginal
            buttonCadastrar.disabled = false
            return 0
        }

        formCadastro.reset()
        navegarPara("login")
        toastAlert("Cadastro realizado com sucesso! Faça login para continuar.", CONSTANTS.MSG_SUCCESS)

    } catch (err) {
        toastAlert(err, CONSTANTS.MSG_ERROR)
        buttonCadastrar.innerHTML = textoOriginal
        buttonCadastrar.disabled = false
    }
    buttonCadastrar.innerHTML = textoOriginal
    buttonCadastrar.disabled = false
})

btnConfirmarEncerramento.addEventListener("click", async () => {
    const senhaDigitada = document.getElementById("senha-confirmacao").value
    if (!senhaDigitada) {
        toastAlert("Por favor, digite sua senha.", CONSTANTS.MSG_ERROR)
        return
    }

    const formData = new FormData()
    formData.append("email", localStorage.getItem("usuario_logado"))
    formData.append("senha_digitada", senhaDigitada)

    try {
        const dadosRetorno = await deletarUsuario(formData)

        if (dadosRetorno) {
            toastAlert("Conta encerrada com sucesso.", CONSTANTS.MSG_SUCCESS)
            modalEncerrar.hide()

            localStorage.clear()
            navegarPara("login")
        }
    } catch (erro) {
        toastAlert(`Falha ao encerrar conta: ${erro.message}`, CONSTANTS.MSG_ERROR)
    }
})
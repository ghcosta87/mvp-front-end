// ########################################
// # ELEMENTOS DO HTML
// ########################################
const formCadastro = document.getElementById("form-cadastro")
const inputCpf = document.getElementById("cad-cpf")
const inputTelefone = document.getElementById("cad-telefone")
const buttonBack = document.getElementById("btn-voltar-login")

inputTelefone.addEventListener("input", (e) => {
    // adicionar formatação do campo de telefone
})

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

// ao terminar o cadastro tem q acertar a navegação, painel esta aparecendo junto com login
formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault()

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

        if (!resposta.ok) {
            const erroData = await resposta.json()
            console.error("Erro retornado pelo Back-end:", erroData)
            throw new Error(JSON.stringify(erroData.error || erroData))
        }

        formCadastro.reset()
        navegarPara("login")
        toastAlert("Cadastro realizado com sucesso! Faça login para continuar.", CONSTANTS.MSG_SUCCESS)

    } catch (erro) {
        toastAlert(`Falha ao cadastrar: ${erro.message}`, CONSTANTS.MSG_ERROR)
    }
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

    // const usuarioLogado = || localStorage.getItem("cpf_logado")
    console.log(`Tentando encerrar conta do usuário: ${localStorage.getItem("usuario_logado")} e senha digitada: ${senhaDigitada}`)

    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/deletar_usuario`, {
            method: "POST",
            body: formData
        })

        if (!resposta.ok) {
            const erroData = await resposta.json()
            throw new Error(erroData.error) //erro 422 acontece
        }

        toastAlert("Conta encerrada com sucesso.", CONSTANTS.MSG_SUCCESS)
        modalEncerrar.hide()

        localStorage.clear()
        navegarPara("login")

    } catch (erro) {
        toastAlert(`Falha ao encerrar conta: ${erro.message}`, CONSTANTS.MSG_ERROR)
    }
})
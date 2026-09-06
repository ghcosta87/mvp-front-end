// ########################################
// # ELEMENTOS DO HTML
// ########################################
const formCadastro = document.getElementById("form-cadastro")
const inputCpf = document.getElementById("cad-cpf")
const inputTelefone = document.getElementById("cad-telefone")

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

        alert("Cadastro realizado com sucesso! Faça login para continuar.")
        formCadastro.reset()
        navegarPara("login")

    } catch (erro) {
        console.error("Erro no cadastro:", erro)
        alert("Falha no cadastro: " + erro.message)
    }
})

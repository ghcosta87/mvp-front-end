// ########################################
// # ELEMENTOS DO HTML
// ########################################
const formulario = document.getElementById("form-login")
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("senha")
const botaoLogin = document.getElementById("btn-login")

// Adicioar fução pra mostrar q o logi esta em adameto, e melhor a comuicação de erro caso acoteceça

// ########################################
// # FUNÇÔES
// ########################################
function verificarCampos() {
  const emailPreenchido = inputEmail.value.trim() !== ""
  const senhaPreenchida = inputSenha.value.trim() !== ""

  const buttonDisabled = !(emailPreenchido && senhaPreenchida)
  botaoLogin.disabled = buttonDisabled
}

function lerCampos() {
  const pacoteDados = {
    email: inputEmail.value,
    senha_digitada: inputSenha.value
  }
  return pacoteDados
}

// ########################################
// # INICIALIZAÇÃO
// ########################################
botaoLogin.disabled = true

inputEmail.addEventListener("input", verificarCampos)

inputSenha.addEventListener("input", verificarCampos)

formulario.addEventListener("submit", async (event) => {
  event.preventDefault()

  // 1. Salva o texto original e altera o visual do botão
  const textoOriginal = botaoLogin.innerHTML

  // 2. Adiciona o texto e o spinner animado nativo do Bootstrap
  botaoLogin.innerHTML = CONSTANTS.STYLES.SPINNER
  botaoLogin.disabled = true

  // 3. Tentativa de envio da requisição POST para o servidor Flask
  try {
    const resposta = await fetch(`${CONSTANTS.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lerCampos())
    })

    const dadosRetorno = await resposta.json()

    if (resposta.ok) {
      localStorage.setItem("usuario_logado", dadosRetorno.email) // precisa verificar se funciona sem o live server]
      navegarPara("painel")
      toastAlert(`Bem-vindo(a), ${dadosRetorno.email}!`, CONSTANTS.MSG_SUCCESS) // precisa alterar a resposta para receber o nome do usuário, e não o email
      inputEmail.value = ""
      inputSenha.value = ""
      carregarProdutos()
      // No sucesso do login
      // localStorage.setItem("auth_token", dados.token)
      // localStorage.setItem("usuario_logado", dadosRetorno.email) // ou email/nome, o que já usa
    } else {
      toastAlert(dadosRetorno.error, CONSTANTS.MSG_ERROR) // erro de credenciais inválidas ?
    }

  } catch (erro) {
    toastAlert(CONSTANTS.JS_STRINGS.COMM_ERROR, CONSTANTS.MSG_ERROR) // erro de comunicação com o servidor
  }

  // Fim. Restaura o texto original e reabilita o botão
  botaoLogin.innerHTML = textoOriginal
  botaoLogin.disabled = false
})
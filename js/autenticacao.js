// ########################################
// # FUNÇÔES
// ########################################
function verificarCamposDeLogin() {
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
// # EVENTOS LOCAIS
// ########################################

inputEmail.addEventListener("input", verificarCamposDeLogin)

inputSenha.addEventListener("input", verificarCamposDeLogin)

formulario.addEventListener("submit", async (event) => {
  event.preventDefault() // <?> pra que serve ?

  // Salva o texto original, inicia o spinner e impede outro click
  const textoOriginal = botaoLogin.innerHTML
  botaoLogin.innerHTML = CONSTANTS.STYLES.SPINNER
  botaoLogin.disabled = true

  try {
    const resposta = await fetch(`${CONSTANTS.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lerCampos())
    })

    const dadosRetorno = await resposta.json()

    if (!resposta.ok)
      throw new Error(`Erro ${resposta.status}`)

    localStorage.setItem("usuario_logado", dadosRetorno.email) // <?> precisa verificar se funciona sem o live server]

    carregarProdutos()
    navegarPara("painel")
    toastAlert(`Bem-vindo(a), ${dadosRetorno.email}!`, CONSTANTS.MSG_SUCCESS) // precisa alterar a resposta para receber o nome do usuário, e não o email

    inputEmail.value = ""
    inputSenha.value = ""
    botaoLogin.disabled = true
  } catch (err) {
    let msg = err.message
    switch (err.message) {
      case "Erro 404": msg = CONSTANTS.JS_STRINGS.USER_NOT_FOUND
        break
      case "Erro 400": msg = CONSTANTS.JS_STRINGS.USER_NOT_FOUND
        break
    }
    toastAlert(msg, CONSTANTS.MSG_ERROR)
    botaoLogin.innerHTML = textoOriginal
    botaoLogin.disabled = true

  }

  botaoLogin.innerHTML = textoOriginal
  botaoLogin.disabled = false
})

// ########################################
// # EVENTOS LOCAIS
// ########################################
btnIrCadastro.addEventListener("click", () => navegarPara("cadastro"))

buttonBack.addEventListener("click", () => navegarPara("login"))
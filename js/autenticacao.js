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

    const dadosRetorno = await autenticarUsuario()

    if (dadosRetorno) {
      localStorage.setItem("usuario_logado", dadosRetorno.email)

      carregarProdutos()
      navegarPara("painel")
      toastAlert(`Bem-vindo(a), ${dadosRetorno.email}!`, CONSTANTS.MSG_SUCCESS)

      inputEmail.value = ""
      inputSenha.value = ""
      botaoLogin.disabled = true
    }
  } catch (err) {
    console.log(`${err.message} erro ao submeter o login`)
    toastAlert(err, CONSTANTS.MSG_ERROR)
    botaoLogin.innerHTML = textoOriginal
    botaoLogin.disabled = true

  }

  botaoLogin.innerHTML = textoOriginal
  botaoLogin.disabled = false
})

btnIrCadastro.addEventListener("click", () => navegarPara("cadastro"))

buttonBack.addEventListener("click", () => navegarPara("login"))
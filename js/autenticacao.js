// ########################################
// # ELEMENTOS DO HTML
// ########################################
const formulario = document.getElementById("form-login")
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("senha")
const botaoLogin = document.getElementById("btn-login")

// Adicioar fução pra mostrar q o logi esta em adameto, e melhor a comuicação de erro caso acoteceça

botaoLogin.disabled = true

function verificarCampos() {
  const emailPreenchido = inputEmail.value.trim() !== ""
  const senhaPreenchida = inputSenha.value.trim() !== ""

  const buttonDisabled = !(emailPreenchido && senhaPreenchida)
  botaoLogin.disabled = buttonDisabled

  // if (emailPreenchido && senhaPreenchida) {
  //   botaoLogin.disabled = false
  // } else {
  //   botaoLogin.disabled = true
  // }
}

inputEmail.addEventListener("input", verificarCampos)

inputSenha.addEventListener("input", verificarCampos)

formulario.addEventListener("submit", async (event) => {
  event.preventDefault()

  const emailDigitado = inputEmail.value
  const senhaDigitada = inputSenha.value

  const pacoteDados = {
    email: emailDigitado,
    senha_digitada: senhaDigitada
  }

  // 1. Salva o texto original e altera o visual do botão
  const textoOriginal = botaoLogin.innerHTML

  // Adiciona o texto e o spinner animado nativo do Bootstrap
  botaoLogin.innerHTML = CONSTANTS.STYLES.SPINNER
  botaoLogin.disabled = true

  try {
    const resposta = await fetch(`${CONSTANTS.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacoteDados)
    })

    const dadosRetorno = await resposta.json()

    if (resposta.ok) {
      localStorage.setItem("usuario_logado", dadosRetorno.email) // precisa verificar se funciona sem o live server]
      navegarPara("painel")
      toastAlert(`Bem-vindo(a), ${dadosRetorno.email}!`, "sucesso") // precisa alterar a resposta para receber o nome do usuário, e não o email
    } else {
      toastAlert(dadosRetorno.error) // erro de credenciais inválidas ?
    }

  } catch (erro) {
    toastAlert(CONSTANTS.JS_STRINGS.COMM_ERROR) // erro de comunicação com o servidor
  }

  botaoLogin.innerHTML = textoOriginal
  botaoLogin.disabled = false
})
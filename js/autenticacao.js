// 1. Captura os elementos do HTML
const formulario = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const botaoLogin = document.getElementById("btn-login");

// 📡 RADAR DE DIAGNÓSTICO:
console.log("Formulário achou?", formulario !== null);
console.log("Email achou?", inputEmail !== null);
console.log("Senha achou?", inputSenha !== null);
console.log("Botão achou?", botaoLogin !== null);

// Adicioar fução pra mostrar q o logi esta em adameto, e melhor a comuicação de erro caso acoteceça

function verificarCampos() {

  const emailPreenchido = inputEmail.value.trim() !== "";
  const senhaPreenchida = inputSenha.value.trim() !== "";

  if (emailPreenchido && senhaPreenchida) {
    botaoLogin.disabled = false;
  } else {
    botaoLogin.disabled = true;
  }
}

inputEmail.addEventListener("input", verificarCampos);

inputSenha.addEventListener("input", verificarCampos);

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("👉 Botão de Entrar foi clicado!");

  const emailDigitado = inputEmail.value;
  const senhaDigitada = inputSenha.value;

  const pacoteDados = {
    email: emailDigitado,
    senha_digitada: senhaDigitada
  };

  // 1. Salva o texto original e altera o visual do botão
  const textoOriginal = botaoLogin.innerHTML;

  // Adiciona o texto e o spinner animado nativo do Bootstrap
  botaoLogin.innerHTML = `Verificando <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>`;
  botaoLogin.disabled = true; // Bloqueia múltiplos cliques

  try {
    if (emailDigitado.trim() === "" || senhaDigitada.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      throw new Error("Campos de email ou senha estão vazios.");
    }
    // const resposta = await fetch(`${CONSTANTS.API_URL}/login`, {
    const resposta = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacoteDados)
    });

    const dadosRetorno = await resposta.json();

    if (resposta.ok) {
      console.log("✅ Login bem-sucedido:", dadosRetorno);
      localStorage.setItem("usuario_logado", dadosRetorno.email);
      // document.body.classList.add("animacao-sair-esquerda");
      navegarPara("painel");

      // setTimeout(() => {
      //   window.location.href = "index.html";
      // }, 500);
    } else {
      alert("Erro: " + (dadosRetorno.error || "Credenciais inválidas"));
    }

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Erro ao conectar no servidor Flask.");
  }

  // 2. Se falhar, restaura o botão ao estado normal
  botaoLogin.innerHTML = textoOriginal;
  botaoLogin.disabled = false;
});
import { CONSTANTS } from './constants.js';

// 1. Captura os elementos do HTML
const formulario = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const botaoLogin = document.getElementById("btn-login");

// // 📡 TESTE DE RAIO-X: Vamos ver se o JS achou todo mundo
// console.log("Email encontrado?", inputEmail);
// console.log("Senha encontrada?", inputSenha);
// console.log("Botão encontrado?", botaoLogin);

// 2. A Função que vigia os campos
function verificarCampos() {
    // console.log("Teclado funcionando..."); // Tem que aparecer a cada letra digitada
    
    const emailPreenchido = inputEmail.value.trim() !== "";
    const senhaPreenchida = inputSenha.value.trim() !== "";

    if (emailPreenchido && senhaPreenchida) {
        botaoLogin.disabled = false; // Acende o botão
        // console.log("🟢 Botão ACESO!");
    } else {
        botaoLogin.disabled = true; // Apaga o botão
    }
}

// 3. Só liga os vigias se os elementos realmente existirem no HTML
// if (inputEmail && inputSenha && botaoLogin) {
    inputEmail.addEventListener("input", verificarCampos);
    inputSenha.addEventListener("input", verificarCampos);
// } 
// else {
//     console.error("🚨 ERRO: Algum ID está faltando no seu HTML!");
// }
// const loginButton = document.getElementById("btn-login");

// inputFields.addEventListener("input", async (event) => {

//   const emailField = document.getElementById("email").value;
//   const passwordField = document.getElementById("senha").value;

//   try {
//     if (emailField.trim() === "" || passwordField.trim() === "") {
//       alert("Por favor, preencha todos os campos.");
//       throw new Error("Campos de email ou senha estão vazios.");
//     }else{

//     }
//   } catch (e) {
//     console.error("Erro ao verificar campos:", e);
//   }
// });

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailDigitado = document.getElementById("email").value;
  const senhaDigitada = document.getElementById("senha").value;

  const pacoteDados = {
    email: emailDigitado,
    senha_digitada: senhaDigitada
  };

  try {
    if (emailDigitado.trim() === "" || senhaDigitada.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      throw new Error("Campos de email ou senha estão vazios.");
    }
    const resposta = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacoteDados)
    });

    const dadosRetorno = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("usuario_logado", dadosRetorno.email);
      window.location.href = "index.html";
    } else {
      alert("Erro: " + (dadosRetorno.error || "Credenciais inválidas"));
    }

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Erro ao conectar no servidor Flask.");
  }

});
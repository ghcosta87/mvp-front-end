// ARQUIVO: app.js

// 1. A MÁQUINA DE ESTADO DA SPA (Função que troca as telas)
function navegarPara(tela) {
    const telaLogin = document.getElementById("tela-login");
    const telaPainel = document.getElementById("tela-painel");

    if (tela === "painel") {
        // Usa a classe d-none do Bootstrap para forçar o sumiço do Login
        telaLogin.classList.add("d-none"); 
        
        // Revela o Painel
        telaPainel.style.display = "block"; 
    } else if (tela === "login") {
        // Tira o d-none para o Login voltar a aparecer
        telaLogin.classList.remove("d-none"); 
        
        // Esconde o Painel
        telaPainel.style.display = "none";
    }
}

// 2. AUTO-LOGIN (Verifica se já existe um usuário salvo ao abrir a página)
// Se houver, pula direto para o painel!
window.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = localStorage.getItem("usuario_logado");
    if (usuarioLogado) {
        navegarPara("painel");
    } else {
        navegarPara("login");
    }
});

// 3. LÓGICA DE LOGOUT (Botão Sair)
const botaoSair = document.getElementById("btn-sair");
if (botaoSair) {
    botaoSair.addEventListener("click", () => {
        // Apaga o usuário do navegador
        localStorage.removeItem("usuario_logado");
        
        // Volta instantaneamente para a tela inicial
        navegarPara("login"); 
    });
}
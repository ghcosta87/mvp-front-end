// ARQUIVO: app.js

// 1. A MÁQUINA DE ESTADO DA SPA (Função que troca as telas)
// function navegarPara(tela) {
//     const telaLogin = document.getElementById("tela-login");
//     const telaPainel = document.getElementById("tela-painel");

//     if (tela === "painel") {
//         // Usa a classe d-none do Bootstrap para forçar o sumiço do Login
//         telaLogin.classList.add("d-none"); 

//         // Revela o Painel
//         telaPainel.style.display = "block"; 
//     } else if (tela === "login") {
//         // Tira o d-none para o Login voltar a aparecer
//         telaLogin.classList.remove("d-none"); 

//         // Esconde o Painel
//         telaPainel.style.display = "none";
//     }
// }



// // 2. AUTO-LOGIN (Verifica se já existe um usuário salvo ao abrir a página)
// // Se houver, pula direto para o painel!
// window.addEventListener("DOMContentLoaded", () => {
//     const usuarioLogado = localStorage.getItem("usuario_logado");
//     if (usuarioLogado) {
//         navegarPara("painel");
//     } else {
//         navegarPara("login");
//     }
// });

// Função global para alternar entre as telas da SPA
function navegarPara(tela) {
    const telaLogin = document.getElementById("tela-login");
    const telaPainel = document.getElementById("tela-painel");
    const telaCadastro = document.getElementById("tela-cadastro");

    // Esconde todas primeiro
    if (telaLogin) telaLogin.classList.add("d-none");
    if (telaPainel) telaPainel.style.display = "none";
    if (telaCadastro) telaCadastro.style.display = "none";

    switch (tela) {
        case "login":
            telaLogin.classList.remove("d-none");
            break;
        case "painel":
            telaPainel.style.display = "block";
            telaCadastro.classList.add("d-none"); // Garante que o cadastro esteja escondido
            break;
        case "cadastro":
             telaCadastro.classList.remove("d-none"); 
            telaCadastro.style.display = "flex";
            break;
    }

    // // Mostra a solicitada
    //     if (tela === "login") {
    //         if (telaLogin) telaLogin.classList.remove("d-none");
    //     } else if (tela === "painel") {
    //         if (telaPainel) telaPainel.style.display = "block";
    //     } else if (tela === "cadastro") {
    //         if (telaCadastro) telaCadastro.style.display = "flex"; // Usa flex para centralizar
    //     }
    }

    // Ouvintes globais para os botões de transição
    document.addEventListener("DOMContentLoaded", () => {
        const btnIrCadastro = document.getElementById("btn-ir-cadastro");
        const btnVoltarLogin = document.getElementById("btn-voltar-login");

        if (btnIrCadastro) {
            btnIrCadastro.addEventListener("click", () => navegarPara("cadastro"));
        }

        if (btnVoltarLogin) {
            btnVoltarLogin.addEventListener("click", () => navegarPara("login"));
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
// ARQUIVO: cadastro.js

document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("form-cadastro");


    if (formCadastro) {
        formCadastro.addEventListener("submit", async (event) => {
            event.preventDefault();

            // 🔍 CAPTURA DENTRO DO CLIQUE: Garante que pega o que está escrito no input AGORA
            const dadosUsuario = {
                nome_completo: document.getElementById("cad-nome").value.trim(),
                cpf: document.getElementById("cad-cpf").value.trim(),
                email: document.getElementById("cad-email").value.trim(),
                nascimento: document.getElementById("cad-nascimento").value || null,
                telefone: parseInt(document.getElementById("cad-telefone").value) || 0,
                senha: document.getElementById("cad-senha").value
            };

            // Log de depuração para você conferir no F12 exatamente o que está indo para a API
            console.log("Enviando para a API:", dadosUsuario);

            const formData = new FormData();
            formData.append("nome_completo", dadosUsuario.nome_completo);
            formData.append("cpf", dadosUsuario.cpf);
            formData.append("email", dadosUsuario.email);
            formData.append("nascimento", dadosUsuario.nascimento);
            formData.append("telefone", dadosUsuario.telefone);
            formData.append("senha", dadosUsuario.senha);

            try {
                const resposta = await fetch("http://127.0.0.1:5000/adicionar_usuario", {

                    // const resposta = await fetch("http://127.0.0.1:5000/usuario", {
                    method: "POST",
                    // body: formData //,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosUsuario)
                });


                if (!resposta.ok) {
                    const erroData = await resposta.json();
                    console.error("Erro retornado pelo Back-end:", erroData);
                    throw new Error(JSON.stringify(erroData.error || erroData));
                }

                alert("Cadastro realizado com sucesso! Faça login para continuar.");
                formCadastro.reset();
                navegarPara("login");

            } catch (erro) {
                console.error("Erro no cadastro:", erro);
                alert("Falha no cadastro: " + erro.message);
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const btnEncerrarConta = document.getElementById("btn-encerrar-conta");
    const btnConfirmarEncerramento = document.getElementById("btn-confirmar-encerramento");
    const modalEncerrarEl = document.getElementById("modalEncerrarConta");
    const modalEncerrar = modalEncerrarEl ? new mdb.Modal(modalEncerrarEl) : null;

    // 1. Abrir o modal ao clicar no botão
    if (btnEncerrarConta && modalEncerrar) {
        btnEncerrarConta.addEventListener("click", () => {
            document.getElementById("senha-confirmacao").value = ""; // Limpa o input
            modalEncerrar.show();
        });
    }

    // 2. Enviar a requisição POST ao confirmar ("Sim")
    if (btnConfirmarEncerramento) {
        btnConfirmarEncerramento.addEventListener("click", async () => {
            const senhaDigitada = document.getElementById("senha-confirmacao").value;
            
            // Supondo que você armazena o e-mail ou CPF do usuário logado no localStorage
            const usuarioLogado = localStorage.getItem("email_logado") || localStorage.getItem("cpf_logado");

            if (!senhaDigitada) {
                alert("Por favor, digite sua senha.");
                return;
            }

            try {
                const resposta = await fetch("http://127.0.0.1:5000/usuario/deletar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        identificador: usuarioLogado, // Envia o dado do usuário logado
                        senha: senhaDigitada
                    })
                });

                if (!resposta.ok) {
                    const erroData = await resposta.json();
                    throw new Error(erroData.error || "Erro ao encerrar a conta.");
                }

                alert("Conta encerrada com sucesso.");
                modalEncerrar.hide();
                
                // Limpa a sessão e redireciona para o login
                localStorage.clear();
                navegarPara("login");

            } catch (erro) {
                console.error("Erro:", erro);
                alert("Falha ao encerrar conta: " + erro.message);
            }
        });
    }
});
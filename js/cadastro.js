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
                const resposta = await fetch("http://127.0.0.1:5000/usuario", {

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

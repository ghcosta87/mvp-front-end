
// ÁREA DE TESTES

// 🔗 NOVA LÓGICA: Ouvinte do botão de vincular
// document.addEventListener("DOMContentLoaded", () => {
// if (btnVincular) {
//     btnVincular.addEventListener("click", async () => {
//         // Busca todos os checkboxes que estão marcados
//         const marcados = document.querySelectorAll('.produto-cb:checked')

//         // Extrai apenas o valor (nome do produto) de cada checkbox marcado
//         const nomesSelecionados = Array.from(marcados).map(cb => cb.value)

//         if (nomesSelecionados.length < 2) {
//             alert("Selecione pelo menos 2 produtos para criar um vínculo.")
//             return
//         }

//         try {
//             // Envia a lista de nomes para o Back-end
//             const resposta = await fetch("http://127.0.0.1:5000/produtos/vincular", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ nomes: nomesSelecionados })
//             })

//             if (!resposta.ok) {
//                 throw new Error("Erro ao vincular produtos no servidor.")
//             }

//             alert("Produtos vinculados com sucesso!")

//             // Desmarca as caixinhas após o sucesso
//             marcados.forEach(cb => cb.checked = false)

//             // Opcional: Recarrega a lista para atualizar dados
//             carregarProdutos()

//         } catch (erro) {
//             console.error("Erro ao vincular:", erro)
//             alert(erro.message)
//         }
//     })
// }
// })


// ########################################
// # ÁREA DE TESTES
// ########################################

// const btnUpload = document.getElementById("btn-upload")
// // const inputComprovante = document.getElementById("input-comprovante")

// function setUploadLoading(ativo) {
//     if (ativo) {
//         btnUpload.dataset.iconeOriginal = btnUpload.innerHTML // guarda o ícone original
//         btnUpload.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
//         btnUpload.classList.add("disabled") // impede novo clique visualmente
//         btnUpload.style.pointerEvents = "none" // impede clique de fato (label não tem "disabled" nativo)
//         inputComprovante.disabled = true
//     } else {
//         btnUpload.innerHTML = btnUpload.dataset.iconeOriginal
//         btnUpload.classList.remove("disabled")
//         btnUpload.style.pointerEvents = "auto"
//         inputComprovante.disabled = false
//     }
// }

// function enviarComprovanteComProgresso(arquivo) {
//     return new Promise((resolve, reject) => {
//         const formData = new FormData()
//         formData.append("imagem", arquivo)

//         const xhr = new XMLHttpRequest()
//         xhr.open("POST", `${CONSTANTS.API_URL}/upload`)

//         xhr.upload.addEventListener("progress", (e) => {
//             if (e.lengthComputable) {
//                 const percentual = Math.round((e.loaded / e.total) * 100)
//                 console.log(`Progresso: ${percentual}%`)
//                 // aqui você atualizaria uma barra de progresso, ex:
//                 // barraProgresso.style.width = percentual + "%"
//             }
//         })

//         xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 resolve(JSON.parse(xhr.responseText))
//             } else {
//                 reject(new Error(JSON.parse(xhr.responseText)?.error || "Erro no upload"))
//             }
//         }

//         xhr.onerror = () => reject(new Error("Erro de rede no upload"))

//         xhr.send(formData)
//     })
// }

// async function verificarToken(token) {
//     try {
//         const resposta = await fetch(`${CONSTANTS.API_URL}/verificar-token`, {
//             headers: { "Authorization": `Bearer ${token}` }
//         })

//         // if (resposta.ok) {
//         //     navegarPara("painel") // token válido, pula o login
//         // } else {
//         //     localStorage.removeItem("auth_token")
//         //     navegarPara("login")
//         // }
//     } catch (erro) {
//         navegarPara("login")
//     }
// }

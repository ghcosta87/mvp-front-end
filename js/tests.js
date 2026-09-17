// // ########################################
// // # ↓ ↓ ↓ ↓ ↓ ↓ ÁREA DE TESTES ↓ ↓ ↓ ↓ ↓ ↓
// // ########################################
// inputTelefone.addEventListener("input", (e) => {
//     // adicionar formatação do campo de telefone
// })

// const userState = () => {
//     // const token = localStorage.getItem("auth_token")
//     // if (token) {
//     //     // Opcional, mas recomendado: valida o token com o backend antes de confiar nele
//     //     verificarToken(token)
//     // } else {
//     //     navegarPara("login")
//     // }
//     return localStorage.getItem("usuario_logado")
// }

// async function postApi(postType, bodyIn, externalFunction) {
//     let address = `${CONSTANTS.API_URL}/${postType}`
//     // let resposta
//     // console.log(bodyIn)
//     // console.log(postType)
//     // console.log(address)

//     try {
//         const resposta = await fetch(`${address}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(bodyIn)
//         })
//         const output = await resposta.json()

//         if (!resposta.ok) {
//             throw new Error(output.message)
//         }
//         // if (externalFunction)
//         //     externalFunction()
//         // else console.log("externalFunction() no available")

//         // console.log([{ 'status': true, 'object': output }])
//         return { 'status': true, 'object': output }

//         // nao esta passando o erro correto para o toasto 
//     } catch (err) {
//         // console.log("erro coletado no catch to postApi()")
//         // toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
//         // toastAlert(err.message, CONSTANTS.MSG_ERROR)
//         let test = "isso é um teste"
//         console.log(err)
//         // listaHTML.innerHTML = CONSTANTS.JS_STRINGS.HTML_COMM_ERROR
//         return { 'status': false, 'message': `${err}`, 'test': test }

//     }
// }

// async function autenticarUsuarioBeta() {
//     try {
//         const postNow = await postApi('login', lerCampos())
//         if (!postNow.status) {
//             console.log('post not ok')
//             throw new Error(await postNow.json())
//         }
//         else {
//             // const dados = await postNow.json()
//             console.log('post is ok')
//             // console.log(JSON.stringify(await postNow.json()))
//             return postNow.object
//         }
//     } catch (e) {
//         console.log("erro coletado no autenticarUsuario()")
//         console.log(JSON.stringify(e))
//         console.log(e)
//         console.log(JSON.stringify(e.message))
//         console.log(JSON.stringify(e.status))
//     }
// }

// async function postPictureBeta(dataIn, avisoDemora) {
//     // precisa reescrever esse modo
//     try {
//         const postNow = await postApi('upload', dataIn)
//         if (!postNow[0].status)
//             console.log('post not ok')
//         else {
//             // const dados = await postNow.json()
//             console.log('post is ok')
//             console.log(JSON.stringify(postNow[0].object))
//             if (typeof carregarProdutos === "function") {
//                 carregarProdutos()
//             }
//             clearTimeout(avisoDemora) // cancela o aviso se já terminou antes dos 3s
//             setUploadLoading(false)

//         }
//     } catch (err) {
//         toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
//     }
// }

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



            // <!-- Grupo: Temas -->
            // <div>
            //     <small class="text-muted text-uppercase fw-bold px-1" style="font-size: 0.7rem;">Aparência</small>
            //     <div class="d-flex flex-column gap-2 mt-2">
            //         <button id="btn-tema-claro" class="btn btn-outline-secondary text-start w-100">
            //             <i class="fas fa-sun me-2"></i> Claro
            //         </button>
            //         <button id="btn-tema-escuro" class="btn btn-outline-secondary text-start w-100">
            //             <i class="fas fa-moon me-2"></i> Escuro
            //         </button>
            //         <button id="btn-tema-tech" class="btn btn-outline-secondary text-start w-100">
            //             <i class="fas fa-microchip me-2"></i> Tech
            //         </button>
            //     </div>
            // </div>

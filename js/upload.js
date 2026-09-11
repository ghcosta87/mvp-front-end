// ########################################
// # ELEMENTOS DO HTML
// ########################################
const inputComprovante = document.getElementById("input-comprovante")

inputComprovante.addEventListener("change", (e) => {
    const arquivo = e.target.files[0]

    if (!arquivo) return

    console.log("Arquivo selecionado:", arquivo)
    // arquivo.name, arquivo.type, arquivo.size já disponíveis aqui

    enviarComprovante(arquivo)
})

async function postPicture(dataIn, avisoDemora) {
    fetch(`${CONSTANTS.API_URL}/upload`, {
        method: 'POST',
        body: dataIn
    })
        .then(res => res.json())
        .then(data => {
            toastAlert(`Produto capturado com sucesso! ${data}`, CONSTANTS.MSG_SUCCESS)

            if (typeof carregarProdutos === "function") {
                carregarProdutos()
            }

            clearTimeout(avisoDemora) // cancela o aviso se já terminou antes dos 3s
            setUploadLoading(false)
        })
        .catch(err => {
            resultadoDiv.innerText = "Erro ao processar: " + err
            toastAlert("Erro ao processar: " + err, CONSTANTS.MSG_ERROR)
        })
    // ERRO nao esta retornando mensagem, esta retornando mensagem de sucesso.
    //
    // navegarPara("painel") // reload page to main page
    // reload page to main page
}

async function enviarComprovante(arquivo) {
    const formData = new FormData()
    formData.append("imagem", arquivo) // "comprovante" é o nome do campo que o backend vai receber

    // NOVO
    setUploadLoading(true)
    // Se passar de 3s, avisa que está em andamento
    const avisoDemora = setTimeout(() => {
        toastAlert("Upload em andamento, aguarde...", CONSTANTS.MSG_SUCCESS)
    }, 3000)
    // NOVO

    try {
        postPicture(formData, avisoDemora)
    } catch (e) {
        console.log("Erro ao enviar o comprovante:", e)
        toastAlert("Erro ao enviar o comprovante: " + e.message, CONSTANTS.MSG_ERROR)

    }
    // finally {

    //     // clearTimeout(avisoDemora) // cancela o aviso se já terminou antes dos 3s
    //     // setUploadLoading(false)
    // }
    //     const resposta = await fetch(`${CONSTANTS.API_URL}/upload`, {
    //         method: "POST",
    //         body: formData
    //     })

    //     if (!resposta.ok) {
    //         const erroData = await resposta.json()
    //         throw new Error(erroData)
    //     }

    //     const dados = await resposta.json()
    //     toastAlert(`Upload bem-sucedido: ${dados}`, CONSTANTS.MSG_SUCCESS)
    // } catch (er) {
    //     console.log("Erro ao enviar o comprovante:", er)
    //     console.log("Erro detalhado:", er.message)
    //     console.log("Erro detalhado (objeto):", er.error)
    //     console.log("Erro detalhado (objeto):", JSON.stringify(er))
    //     toastAlert(er.error || er.message, CONSTANTS.MSG_ERROR)
    // }
}

// ########################################
// # EVENTOS LOCAIS
// ########################################

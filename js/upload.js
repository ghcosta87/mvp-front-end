// ########################################
// # FUNÇÕES LOCAIS
// ########################################
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
}

// ########################################
// # EVENTOS LOCAIS
// ########################################
inputComprovante.addEventListener("change", (e) => {
    const arquivo = e.target.files[0]

    if (!arquivo) return

    console.log("Arquivo selecionado:", arquivo)
    // arquivo.name, arquivo.type, arquivo.size já disponíveis aqui

    enviarComprovante(arquivo)
})
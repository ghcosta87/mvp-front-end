// ########################################
// # FUNÇÕES GLOBAIS COM O BACKEND
// ########################################

async function carregarProdutos() {
    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/produtos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!resposta.ok)
            throw new Error(`Erro ${resposta.status}: Não foi possível buscar os produtos`)
        const dados = await resposta.json()

        produtosGlobais = dados.produtos || []
        estatisticasGlobais = dados.estatisticas || []
        historicoGlobal = dados.historico || []

        renderizarLista({ produtos: produtosGlobais, estatisticas: estatisticasGlobais })
    } catch (err) {
        toastAlert(err.message, CONSTANTS.MSG_ERROR)
        listaHTML.innerHTML = CONSTANTS.JS_STRINGS.HTML_COMM_ERROR
    }
}

async function autenticarUsuario() {
    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/login`, {
            method: "POST",
            body: lerCampos()
        })

        const dadosResposta = await resposta.json()

        if (!resposta.ok) {
            toastAlert(dadosResposta.message, CONSTANTS.MSG_ERROR)
        } else return dadosResposta
    } catch (err) {
        console.debug(err)
        toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
        return false
    }
}

async function deletarUsuario(dataIn) {
    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/deletar_usuario`, {
            method: "POST",
            body: dataIn
        })

        const dadosResposta = await resposta.json()

        if (!resposta.ok) {
            toastAlert(dadosResposta.message, CONSTANTS.MSG_ERROR)
            return false
        } else return dadosResposta
    } catch (err) {
        toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
        return false
    }
}

async function postPicture(dataIn, avisoDemora) {
    try {
        const resposta = await fetch(`${CONSTANTS.API_URL}/upload`, {
            method: 'POST',
            body: dataIn
        })

        const dadosResposta = await resposta.json()

        if (!resposta.ok)
            toastAlert(dadosResposta.message, CONSTANTS.MSG_ERROR)
        else {
            if (typeof carregarProdutos === "function") {
                carregarProdutos()
                // return dadosResposta
            }
            toastAlert(dadosResposta.message, CONSTANTS.MSG_SUCCESS)
        }

        clearTimeout(avisoDemora) // cancela o aviso se já terminou antes dos 3s
        setUploadLoading(false)

    } catch (err) {
        toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
    }
    finally {
        setUploadLoading(false)
    }
}
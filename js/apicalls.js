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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lerCampos())
        })

        const dadosResposta = await resposta.json()

        if (!resposta.ok) {

            toastAlert(dadosResposta.message, CONSTANTS.MSG_ERROR)
        } else return dadosResposta
    } catch (err) {
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
    // precisa reescrever esse modo
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
        }

        clearTimeout(avisoDemora) // cancela o aviso se já terminou antes dos 3s
        setUploadLoading(false)

    } catch (err) {
        toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
    }
}

// ########################################
// # ÁREA DE TESTES
// ########################################

async function postApi(postType, bodyIn, externalFunction) {
    let address = `${CONSTANTS.API_URL}/${postType}`
    // let resposta
    // console.log(bodyIn)
    // console.log(postType)
    // console.log(address)

    try {
        const resposta = await fetch(`${address}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyIn)
        })
        const output = await resposta.json()

        if (!resposta.ok) {
            throw new Error(output.message)
        }
        // if (externalFunction)
        //     externalFunction()
        // else console.log("externalFunction() no available")

        // console.log([{ 'status': true, 'object': output }])
        return { 'status': true, 'object': output }

        // nao esta passando o erro correto para o toasto 
    } catch (err) {
        // console.log("erro coletado no catch to postApi()")
        // toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
        // toastAlert(err.message, CONSTANTS.MSG_ERROR)
        let test = "isso é um teste"
        console.log(err)
        // listaHTML.innerHTML = CONSTANTS.JS_STRINGS.HTML_COMM_ERROR
        return { 'status': false, 'message': `${err}`, 'test': test }

    }
}

async function autenticarUsuarioBeta() {
    try {
        const postNow = await postApi('login', lerCampos())
        if (!postNow.status) {
            console.log('post not ok')
            throw new Error(await postNow.json())
        }
        else {
            // const dados = await postNow.json()
            console.log('post is ok')
            // console.log(JSON.stringify(await postNow.json()))
            return postNow.object
        }
    } catch (e) {
        console.log("erro coletado no autenticarUsuario()")
        console.log(JSON.stringify(e))
        console.log(e)
        console.log(JSON.stringify(e.message))
        console.log(JSON.stringify(e.status))
    }
}

async function postPictureBeta(dataIn, avisoDemora) {
    // precisa reescrever esse modo
    try {
        const postNow = await postApi('upload', dataIn)
        if (!postNow[0].status)
            console.log('post not ok')
        else {
            // const dados = await postNow.json()
            console.log('post is ok')
            console.log(JSON.stringify(postNow[0].object))
            if (typeof carregarProdutos === "function") {
                carregarProdutos()
            }
            clearTimeout(avisoDemora) // cancela o aviso se já terminou antes dos 3s
            setUploadLoading(false)

        }
    } catch (err) {
        toastAlert(CONSTANTS.JS_STRINGS.OFFLINE_SERVER, CONSTANTS.MSG_ERROR)
    }
}
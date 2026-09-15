// ########################################
// # VÁRIAVEIS LOCAIS
// ########################################
let campoDeBusca
let filtro
let produtosGlobais = []
let estatisticasGlobais = []
let historicoGlobal = []
let graficoAtual = null

// ########################################
// # FUNÇÕES LOCAIS
// ########################################
function renderizarLista({ produtos, estatisticas, historico }) {
    // <?> precisa avaliar a necessidade de ter os outros inputs
    listaHTML.innerHTML = ''

    if (estatisticas.length == 0) {
        listaHTML.innerHTML = CONSTANTS.JS_STRINGS.HTML_PRODUCT_LIST_EMPY
        loading.style.display = "none"
        return
    }

    estatisticas.forEach(item => {
        listaHTML.innerHTML += CONSTANTS.LISTA_HTML.REV1(item.nome, item.preco_medio)
    })

    loading.style.display = "none"
}

const filtrarProdutos = () => {
    if (inputBusca.value !== null || inputBusca.value !== undefined || inputBusca.value !== "") {
        // <?> bloco if esta aki porque em algum lugar estou chamando essa função
        // e estar com o campo em branco quebrou a logica
        // precisa verificar
        const termo = campoDeBusca

        const produtosFiltrados = produtosGlobais.filter(filtro =>
            filtro.nome.toLowerCase().includes(termo)
        )
        // <?> precisa avaliar a necessidade de manter o produto
        // ja que o as estatisticas carregam nome e historico de preços        
        const estatisticasFiltradas = estatisticasGlobais.filter(filtro =>
            filtro.nome.toLowerCase().includes(termo)
        )
        renderizarLista({ produtos: produtosFiltrados, estatisticas: estatisticasFiltradas, historico: historicoGlobal })
        return
    }
    renderizarLista({ produtos: produtosGlobais, estatisticas: estatisticasGlobais, historico: historicoGlobal })
}

// ########################################
// # FUNÇÕES DO POP-UP
// ########################################
function montarGrafico(historico) {
    const labels = historico.map(item => {
        const dataObj = new Date(item.data);
        return dataObj.toLocaleDateString('pt-BR');
    });

    const valores = historico.map(item => item.valor);

    if (graficoAtual) {
        graficoAtual.destroy();
    }

    const ctx = document.getElementById('graficoHistorico');
    graficoAtual = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preço ao longo do tempo',
                data: valores,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adiciona uma corzinha de fundo
                tension: 0.2, // Deixa a linha levemente mais curva e suave
                pointRadius: 4 // Tamanho da bolinha em cada valor
            }]
        },
        // Eixo X
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        autoSkip: true, // Pula legendas automaticamente se faltar espaço
                        maxTicksLimit: 5
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function abrirHistorico(nomeDoProduto) {
    document.getElementById('nomeProdutoModal').innerText = nomeDoProduto

    const meuItem = estatisticasGlobais.find(item => item.nome === nomeDoProduto)

    const dadosHistorico = [
        { data: 'Maior preço', preco: `R$ ${meuItem.maior_preco.toFixed(2)}` },
        { data: 'Menor preço', preco: `R$ ${meuItem.menor_preco.toFixed(2)}` },
        { data: 'Total de compras', preco: meuItem.total_compras }
    ]

    const historicoHTML = document.getElementById('listaHistorico')
    historicoHTML.innerHTML = ''


    dadosHistorico.forEach(item => {
        historicoHTML.innerHTML += CONSTANTS.PRODUCT_BOX_HTML.REV0(item)
    })

    const historico = historicoGlobal[nomeDoProduto] || []

    montarGrafico(historico)
    const modal = new mdb.Modal(document.getElementById('modalHistorico'))
    modal.show()
}

// ########################################
// # EVENTOS LOCAIS
// ########################################
inputBusca.addEventListener('input', (e) => {
    campoDeBusca = e.target.value.toLowerCase().trim()
    filtrarProdutos()
})

btnMenu.addEventListener("click", () => {
    const menuLateral = mdb.Offcanvas.getInstance(sidebarEl) || new mdb.Offcanvas(sidebarEl)
    menuLateral.show()
})
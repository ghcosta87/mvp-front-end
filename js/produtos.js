// ########################################
// # VÁRIAVEIS GLOBAIS
// ########################################
let campoDeBusca
let filtro
let produtosGlobais = []
let estatisticasGlobais = []
let historicoGlobal = []

// ########################################
// # ELEMENTOS DO HTML
// ########################################
const listaHTML = document.getElementById('lista-produtos')
const btnVincular = document.getElementById("btn-vincular")
const inputBusca = document.getElementById('input-busca')
const loading = document.getElementById("loading-produtos")

// ########################################
// # FUÇÕES LOCAIS
// ########################################
async function carregarProdutos() {
    console.log("carregando produtos ...")
    if (listaHTML)
        try {
            const resposta = await fetch(`${CONSTANTS.API_URL}/produtos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            //precisa melhorar esse tratameto de erro
            if (!resposta.ok) throw new Error("Erro ao buscar dados do servidor")
            const dados = await resposta.json()
            // Salva na variável global os produtos vindos do ListagemProdutosSchema
            produtosGlobais = dados.produtos || [] //o q é isso?
            // Chama a função centralizada para desenhar na tela
            estatisticasGlobais = dados.estatisticas || []
            historicoGlobal = dados.historico || []

            renderizarLista({ produtos: produtosGlobais, estatisticas: estatisticasGlobais })
        } catch (erro) {
            console.error("Erro na listagem:", erro)
            listaHTML.innerHTML = `<li class="list-group-item text-center bg-transparent text-danger px-0">Falha ao carregar produtos. O Flask está rodando?</li>`
        }
}

// ########################################
// # EVENTOS LOCAIS
// ########################################

inputBusca.addEventListener('input', (e) => {
    console.log("evento disparado ...")
    campoDeBusca = e.target.value.toLowerCase().trim()
    filtrarProdutos()
})


// o que vem primeiro? faz diferença? essa função é usada acima, não tem q ser declarada primeiro?
// 2. Função centralizada para desenhar os produtos (evita código duplicado)
let graficoAtual = null;

function montarGrafico(historico) {
    // 1. Formata a data para o padrão brasileiro curto (ex: 07/09/2026)
    const labels = historico.map(item => {
        const dataObj = new Date(item.data);
        return dataObj.toLocaleDateString('pt-BR');
        // Se quiser ocultar o ano e deixar só dia/mês, use: 
        // return dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
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
        // 2. Aqui entram as opções para limpar o eixo X
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        autoSkip: true, // Pula legendas automaticamente se faltar espaço
                        maxTicksLimit: 5 // Mostra no máximo 5 datas no eixo, mas mantém TODOS os pontos na linha
                    }
                },
                y: {
                    beginAtZero: false // Como são preços, é melhor não começar do zero para ver bem as variações
                }
            }
        }
    });
}

// 3. Lógica do Modal de Histórico de Preços
function abrirHistorico(nomeDoProduto) {
    document.getElementById('nomeProdutoModal').innerText = nomeDoProduto

    const meuItem = estatisticasGlobais.find(item => item.nome === nomeDoProduto)
    console.log(JSON.stringify(meuItem))

    const dadosHistorico = [
        { data: 'Maior preço', preco: `R$ ${meuItem.maior_preco.toFixed(2)}` },
        { data: 'Menor preço', preco: `R$ ${meuItem.menor_preco.toFixed(2)}` },
        { data: 'Total de compras', preco: meuItem.total_compras }
    ]

    const listaHTML = document.getElementById('listaHistorico')
    listaHTML.innerHTML = ''

    dadosHistorico.forEach(item => {
        listaHTML.innerHTML += `
            <li class="list-group-item d-flex justify-content-between bg-transparent px-0 border-bottom">
                <span style="color: var(--text-muted)">${item.data}</span>
                <span class="fw-bold"> ${item.preco}</span>
            </li>
        `
    })

    console.log("Nome recebido:", nomeDoProduto)
    console.log("Chaves disponíveis em historicoGlobal:", Object.keys(historicoGlobal))

    const historico = historicoGlobal[nomeDoProduto] || []
    console.log("Histórico encontrado:", historico)

    montarGrafico(historico)
    const modal = new mdb.Modal(document.getElementById('modalHistorico'))
    modal.show()
}

const filtrarProdutos = () => {

    console.log(`valor do campo de busca é ${inputBusca.value}`)
    if (inputBusca.value !== null || inputBusca.value !== undefined || inputBusca.value !== "") {
        // inputBusca.addEventListener('input', (e) => {
        const termo = campoDeBusca

        console.log(`campo de busca modificado para: ${termo}`)

        // Filtra os produtos salvos na memória
        const produtosFiltrados = produtosGlobais.filter(filtro =>
            filtro.nome.toLowerCase().includes(termo)
        )
        const estatisticasFiltradas = estatisticasGlobais.filter(filtro =>
            filtro.nome.toLowerCase().includes(termo)
        )
        filtro = true
        renderizarLista({ produtos: produtosFiltrados, estatisticas: estatisticasFiltradas, historico: historicoGlobal })
        return
    }
    filtro = false
    renderizarLista({ produtos: produtosGlobais, estatisticas: estatisticasGlobais, historico: historicoGlobal })
}

// Função centralizada para desenhar os produtos
function renderizarLista({ produtos, estatisticas, historico }) {
    console.log("tentado renderizar a lista com os produtos: ")

    if (!listaHTML) return

    console.log("limpado a lista")
    listaHTML.innerHTML = ''

    // if (produtos !== undefined)
    if (estatisticas.length == 0) {
        console.log("produtos n contem dados")
        listaHTML.innerHTML = `<li class="list-group-item text-center bg-transparent text-muted px-0">Nenhum produto encontrado.</li>`
        loading.style.display = "none"
        return
    } else { console.log("produto cotem dados") }

    estatisticas.forEach(item => {
        // dados do painel
        console.log(item.nome, item.preco_medio)
        listaHTML.innerHTML += CONSTANTS.LISTA_HTML.REV1(item.nome,item.preco_medio)
        //dados do modal


    })


    loading.style.display = "none"
}

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

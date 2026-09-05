// ########################################
// # VÁRIAVEIS GLOBAIS
// ########################################
let produtosGlobais = []

// ########################################
// # VÁRIAVEIS GLOBAIS
// ########################################

// ########################################
// # ELEMENTOS DO HTML
// ########################################
const listaHTML = document.getElementById('lista-produtos')
const btnVincular = document.getElementById("btn-vincular")
const inputBusca = document.getElementById('input-busca');

async function carregarProdutos() {
    if (listaHTML)
        try {
            const resposta = await fetch(`${CONSTANTS.API_URL}/produtos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            //precisa melhorar esse tratameto de erro
            if (!resposta.ok) throw new Error("Erro ao buscar dados do servidor");
            const dados = await resposta.json();
            // Salva na variável global os produtos vindos do ListagemProdutosSchema
            produtosGlobais = dados.produtos || []; //o q é isso?
            // Chama a função centralizada para desenhar na tela
            renderizarLista(produtosGlobais);
        } catch (erro) {
            console.error("Erro na listagem:", erro);
            listaHTML.innerHTML = `<li class="list-group-item text-center bg-transparent text-danger px-0">Falha ao carregar produtos. O Flask está rodando?</li>`;
        }
}

// o que vem primeiro? faz diferença? essa função é usada acima, não tem q ser declarada primeiro?
// 2. Função centralizada para desenhar os produtos (evita código duplicado)
function renderizarLista(produtos) {
    if (!listaHTML) return;

    listaHTML.innerHTML = '';

    if (produtos.length === 0) {
        listaHTML.innerHTML = `<li class="list-group-item text-center bg-transparent text-muted px-0">Nenhum produto encontrado.</li>`;
        return;
    }

    produtos.forEach(produto => {
        listaHTML.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom" 
                onclick="abrirHistorico('${produto.nome}')" 
                style="cursor: pointer;">
                
                <div class="d-flex flex-column">
                    <span class="fw-bold">${produto.nome}</span>
                    <small style="color: var(--text-muted);">Clique para histórico</small> 
                </div>
                <span class="text-price fw-bold fs-5">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
            </li>
        `;
    });
}

// 3. Lógica do Modal de Histórico de Preços
function abrirHistorico(nomeDoProduto) {
    document.getElementById('nomeProdutoModal').innerText = nomeDoProduto;

    // Dados provisórios de histórico (você pode substituir pela nova rota de histórico em seguida)
    const dadosHistorico = [
        { data: 'Ontem', preco: '$ 15,90' },
        { data: 'Semana Passada', preco: '$ 14,50' },
        { data: 'Mês Passado', preco: '$ 12,00' }
    ];

    const listaHTML = document.getElementById('listaHistorico');
    listaHTML.innerHTML = '';

    dadosHistorico.forEach(item => {
        listaHTML.innerHTML += `
            <li class="list-group-item d-flex justify-content-between bg-transparent px-0 border-bottom">
                <span style="color: var(--text-muted);">${item.data}</span>
                <span class="fw-bold">${item.preco}</span>
            </li>
        `;
    });

    const modal = new mdb.Modal(document.getElementById('modalHistorico'));
    modal.show();
}

const filtrarProdutos = () => {
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            console.log('campo de busca modificado!')
            const termo = e.target.value.toLowerCase().trim();

            // Filtra os produtos salvos na memória
            const produtosFiltrados = produtosGlobais.filter(produto =>
                produto.nome.toLowerCase().includes(termo)
            );

            // Atualiza a tela instantaneamente
            renderizarLista(produtosFiltrados);
        });
    }
}

// 4. Inicializadores e Ouvintes ao carregar a página



// Função centralizada para desenhar os produtos
function renderizarLista(produtos) {
    if (!listaHTML) return;

    listaHTML.innerHTML = '';

    if (produtos.length === 0) {
        listaHTML.innerHTML = `<li class="list-group-item text-center bg-transparent text-muted px-0">Nenhum produto encontrado.</li>`;
        return;
    }

    produtos.forEach(produto => {
        // NOVO: Adicionado input checkbox e o event.stopPropagation() para não abrir o modal ao marcar a caixa
        listaHTML.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom">
                
                <div class="d-flex align-items-center gap-3">
                    <input class="form-check-input produto-cb fs-5" type="checkbox" value="${produto.nome}" onclick="event.stopPropagation()">
                    
                    <div class="d-flex flex-column" onclick="abrirHistorico('${produto.nome}')" style="cursor: pointer;">
                        <span class="fw-bold">${produto.nome}</span>
                        <small style="color: var(--text-muted);">Clique para histórico</small> 
                    </div>
                </div>

                <span class="text-price fw-bold fs-5">$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
            </li>
        `;
    });
}

// 🔗 NOVA LÓGICA: Ouvinte do botão de vincular
document.addEventListener("DOMContentLoaded", () => {
    if (btnVincular) {
        btnVincular.addEventListener("click", async () => {
            // Busca todos os checkboxes que estão marcados
            const marcados = document.querySelectorAll('.produto-cb:checked');

            // Extrai apenas o valor (nome do produto) de cada checkbox marcado
            const nomesSelecionados = Array.from(marcados).map(cb => cb.value);

            if (nomesSelecionados.length < 2) {
                alert("Selecione pelo menos 2 produtos para criar um vínculo.");
                return;
            }

            try {
                // Envia a lista de nomes para o Back-end
                const resposta = await fetch("http://127.0.0.1:5000/produtos/vincular", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nomes: nomesSelecionados })
                });

                if (!resposta.ok) {
                    throw new Error("Erro ao vincular produtos no servidor.");
                }

                alert("Produtos vinculados com sucesso!");

                // Desmarca as caixinhas após o sucesso
                marcados.forEach(cb => cb.checked = false);

                // Opcional: Recarrega a lista para atualizar dados
                carregarProdutos();

            } catch (erro) {
                console.error("Erro ao vincular:", erro);
                alert(erro.message);
            }
        });
    }
})


const telaPainel2 = document.getElementById("tela-painel");
telaPainel2.addEventListener("click", () => {
    console.log("evento na tela do painel 2");
    // telaPainel.style.display = "block";
    //o eveto precisa estar relacioado com o style display chage
})

document.addEventListener("DOMContentLoaded", () => {
    // Carrega os produtos se o usuário estiver logado
    userState = localStorage.getItem("usuario_logado")

    if (localStorage.getItem("usuario_logado")) {
        console.log("Usuário está logado...");
        console.log(`{userState}`)
        carregarProdutos();
    } else {
        console.log("Usuário não logado. Redirecionando para login...");
        console.log(`{userState}`)
    }

    if (userState)
        console.log("Usuário logado: " + userState)
    else
        console.log("Usuário não logado.")

    filtrarProdutos()
});
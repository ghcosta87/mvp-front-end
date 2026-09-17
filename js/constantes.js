const CONSTANTS = {
    API_URL: "http://127.0.0.1:5000",
    MSG_ERROR: true,
    MSG_SUCCESS: false,
    STYLES: {
        SPINNER: `Verificando <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>`,
        LOADING: `Carregando <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>`,
        SIGNING_UP: `Cadastrando <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>`
    },
    JS_STRINGS: {
        HTML_COMM_ERROR: `<li class="list-group-item text-center bg-transparent text-danger px-0">Falha ao carregar produtos. O servidor parece que está offline 😢</li>`,
        HTML_PRODUCT_LIST_EMPY: `<li class="list-group-item text-center bg-transparent text-muted px-0">Nenhum produto encontrado.</li>`,
        INVALID_CREDENTIALS: "Credenciais inválidas",
        OFFLINE_SERVER: "O servidor parece que está offline 😢",
        USER_NOT_FOUND: "Usuário não encontrado"
    },
    JS_CONFIG: {
        TOAST_DURATION: 2500 // Duração do toast em milissegundos
    },
    LISTA_HTML: {
        REV0: (nome, preco) => {
            return `
            <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom">
                
                <div class="d-flex align-items-center gap-3">
                    <input class="form-check-input produto-cb fs-5" type="checkbox" value="${nome}" onclick="event.stopPropagation()">
                    
                    <div class="d-flex flex-column" onclick="abrirHistorico('${nome}')" style="cursor: pointer">
                        <span class="fw-bold">${nome}</span>
                        <small style="color: var(--text-muted)">Clique para histórico</small> 
                    </div>
                </div>

                <span class="text-price fw-bold fs-5">R$ ${item.preco_medio.toFixed(2).replace('.', ',')}</span>
            </li>
        `;
        },
        REV1: (nome, preco) => {
            return `
    <li class="list-group-item card-produto-grid" onclick="abrirHistorico('${nome}')">
        <div class="form-check m-0">
            <input type="checkbox" class="form-check-input" onclick="event.stopPropagation()">
        </div>

        <div class="nome-produto-container">
            <h6 class="fw-bold m-0 text-light nome-produto-card">
                ${nome}
            </h6>
        </div>

        <div class="preco-produto-container">
            <span class="fw-bold preco-texto" style="color: #00d2a0;">
                R$ ${preco}
            </span>
        </div>
    </li>
`;
        },
    },
    PRODUCT_BOX_HTML: {
        REV0: (dataIn) => {
            return `
            <li class="list-group-item d-flex justify-content-between bg-transparent px-0 border-bottom">
                <span style="color: var(--text-muted)">${dataIn.data}</span>
                <span class="fw-bold"> ${dataIn.preco}</span>
            </li>
        `}
    }
};
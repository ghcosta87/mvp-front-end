// O Vite/Webpack muda essa variável para "false" quando você gera a versão de Produção
const IS_DEV = true  // import.meta.env.DEV

export const Logger = {
    info: (mensagem, dados) => {
        // Só imprime no painel SE estiver no modo de desenvolvimento
        if (IS_DEV) {
            console.log(`[INFO] ${mensagem}`, dados);
        }
    },
    debug: (mensagem, dados) => {
        // Só imprime no painel SE estiver no modo de desenvolvimento
        if (IS_DEV) {
            console.log(`[DEBUG] ${mensagem}`, dados);
        }
    },
    error: (mensagem, dados) => {
        // Só imprime no painel SE estiver no modo de desenvolvimento
        if (IS_DEV) {
            console.log(`[ERROR] ${mensagem}`, dados);
        }
    },
};
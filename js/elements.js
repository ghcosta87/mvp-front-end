// ########################################
// # ELEMENTOS DO HTML
// ########################################
const telaLogin = document.getElementById("tela-login")
const telaPainel = document.getElementById("tela-painel")
const telaCadastro = document.getElementById("tela-cadastro")

// Página de Login
const formulario = document.getElementById("form-login")
const botaoLogin = document.getElementById("btn-login")
const btnIrCadastro = document.getElementById("btn-ir-cadastro")
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("senha")

// Página de cadastro
// const buttonBack = document.getElementById("btn-voltar-login")
const formCadastro = document.getElementById("form-cadastro")
const inputCpf = document.getElementById("cad-cpf")
const inputTelefone = document.getElementById("cad-telefone")
const buttonBack = document.getElementById("btn-voltar-login")

// Páinel principal
const btnMenu = document.getElementById("btn-menu")
const listaHTML = document.getElementById('lista-produtos')
const btnVincular = document.getElementById("btn-vincular")
const inputBusca = document.getElementById('input-busca')
const loading = document.getElementById("loading-produtos")
const toggleTema = document.getElementById("toggle-tema")

// Sidebar
const sidebarEl = document.getElementById("sidebarMenu")
const btnClaro = document.getElementById("btn-tema-claro")
const btnEscuro = document.getElementById("btn-tema-escuro")
const btnTech = document.getElementById("btn-tema-tech")
const btnEncerrarConta = document.getElementById("btn-encerrar-conta")
const botaoSair = document.getElementById("btn-sair")
const inputComprovante = document.getElementById("input-comprovante")
const btnUpload = document.getElementById("btn-upload")

// Popup de encerramento de conta
const btnConfirmarEncerramento = document.getElementById("btn-confirmar-encerramento")
const modalEncerrarEl = document.getElementById("modalEncerrarConta")
const modalEncerrar = modalEncerrarEl ? new mdb.Modal(modalEncerrarEl) : null

// Popup de histórico
// Outros
const toast = document.getElementById("toast-container")
const textoMsg = document.getElementById("toast-mensagem")
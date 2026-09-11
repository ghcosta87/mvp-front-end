// ########################################
// # EVENTOS
// ########################################
btnClaro.addEventListener("click", () => aplicarTema("claro"))

btnEscuro.addEventListener("click", () => aplicarTema("escuro"))

btnTech.addEventListener("click", () => aplicarTema("tech"))

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuario_logado")
    esconderBarraLateral()
    toastAlert("Você saiu da sua conta.", CONSTANTS.MSG_SUCCESS)
    navegarPara("login")
})

btnEncerrarConta.addEventListener("click", () => {
    document.getElementById("senha-confirmacao").value = "" 
    modalEncerrar.show()
})
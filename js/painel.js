btnMenu.addEventListener("click", () => {
    // Procura se o MDB já conhece esse menu, se não, cria a instância na hora
    const menuLateral = mdb.Offcanvas.getInstance(sidebarEl) || new mdb.Offcanvas(sidebarEl)
    // Comando oficial para deslizar o menu
    menuLateral.show()
})
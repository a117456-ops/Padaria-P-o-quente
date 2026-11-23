document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. NAVEGAÇÃO ENTRE VISTAS ("PÁGINAS" INTERNAS) ---
    const linksVista = document.querySelectorAll(".link-vista");
    const vistas = document.querySelectorAll(".vista-pagina");

    linksVista.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const vistaAlvo = this.getAttribute("data-vista");

            // Esconde todas as vistas e mostra apenas a escolhida
            vistas.forEach(v => v.classList.remove("ativa"));
            document.getElementById(vistaAlvo).classList.add("ativa");

            // Atualiza o destaque no menu lateral
            document.querySelectorAll("nav .link-vista").forEach(navLink => {
                navLink.classList.remove("ativo");
                if (navLink.getAttribute("data-vista") === vistaAlvo) {
                    navLink.classList.add("ativo");
                }
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // --- 2. BOTÃO DE BOAS-VINDAS ---
    const btnMensagem = document.getElementById("btn-mensagem");
    if (btnMensagem) {
        btnMensagem.addEventListener("click", function () {
            alert("Bem-vindo/a à Padaria Pão Quente! Visite-nos em Gondomar para provar os nossos produtos frescos.");
        });
    }

    // --- 3. MOSTRAR OU ESCONDER A HISTÓRIA ---
    const btnSobre = document.getElementById("btn-sobre");
    const textoSobre = document.getElementById("texto-sobre");

    if (btnSobre && textoSobre) {
        btnSobre.addEventListener("click", function () {
            if (textoSobre.style.display === "none") {
                textoSobre.style.display = "block";
                btnSobre.textContent = "Esconder História";
            } else {
                textoSobre.style.display = "none";
                btnSobre.textContent = "Mostrar História";
            }
        });
    }

    // --- 4. MODO ESCURO ---
    const botoesTema = document.querySelectorAll(".btn-alternar-tema");
    botoesTema.forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            botoesTema.forEach(b => b.textContent = isDark ? "Modo Claro" : "Modo Escuro");
        });
    });

    // --- 5. FILTRO DE PRODUTOS NO CATÁLOGO ---
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const itensProdutos = document.querySelectorAll(".grelha-catalogo li");

    botoesFiltro.forEach(function (botao) {
        botao.addEventListener("click", function () {
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            const categoriaEscolhida = botao.getAttribute("data-categoria");

            itensProdutos.forEach(function (item) {
                const categoriaItem = item.getAttribute("data-categoria");
                if (categoriaEscolhida === "todos" || categoriaEscolhida === categoriaItem) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // --- 6. FORMULÁRIO DE ENCOMENDA ---
    const formEncomenda = document.getElementById("form-encomenda");
    const caixaSucesso = document.getElementById("confirmacao-encomenda");

    if (formEncomenda && caixaSucesso) {
        formEncomenda.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const nome = document.getElementById("nome").value;
            const produto = document.getElementById("produto-escolhido").value;
            const detalhes = document.getElementById("detalhes").value;

            caixaSucesso.style.display = "block";
            caixaSucesso.innerHTML = `Obrigado, <strong>${nome}</strong>! O teu pedido de <strong>${produto}</strong> (${detalhes}) foi registado. Entraremos em contacto brevemente.`;
            
            formEncomenda.reset();
        });
    }
});
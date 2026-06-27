async function carregarProdutos(categoria) {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = '<p>A carregar produtos...</p>';

    try {
        // Pede os produtos ao backend
        const res = await fetch('/api/Produtos');
        const todosOsProdutos = await res.json();
        // Filtra os pedidos nas categorias
        const filtrados = todosOsProdutos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
        // Faz o visual com os produtos
        grid.innerHTML = filtrados.map(p => `
            <div class="product-card">
                <a href="produto.html?id=${p.id}">
                    <img src="${p.fotoUrl || '/images/default.jpg'}" alt="${p.nome}">
                    <h3>${p.nome}</h3>
                    <p>${p.preco.toFixed(2)} €</p>
                </a>
            </div>
        `).join('');
    } catch (e) {
        // Erro se nao conseguir carregar produto
        grid.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}
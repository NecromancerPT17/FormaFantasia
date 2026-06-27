async function carregarProdutos(categoria) {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = '<p>A carregar produtos...</p>';

    try {
        const res = await fetch('/api/Produtos');
        const todosOsProdutos = await res.json();
        
        const filtrados = todosOsProdutos.filter(p => 
            p.categoria && p.categoria.nome.toLowerCase() === categoria.toLowerCase()
        );
        
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
        grid.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}
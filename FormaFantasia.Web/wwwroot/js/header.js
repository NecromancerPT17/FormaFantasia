(function () {
  function base() { return window.location.pathname.includes('/pages/') ? '../' : './'; }
  const b = base();
  const p = b + 'pages/';

  /* ── CSS ── */
  const CSS = `
:root{--navy:#1c1c1a;--navy-mid:#2e2e2b;--gold:#5c7a5c;--gold-light:#7a9e7a;--gold-pale:#eef3ee;--cream:#fafaf8;--cream-dark:#f0f0ec;--text-primary:#1c1c1a;--text-secondary:#5c5c58;--text-muted:#9a9a94;--green-cta:#3d6b4f;--green-cta-hover:#2e5440;--white:#ffffff;--border:#e4e4de;--border-light:#ebebf0;--shadow:0 2px 12px rgba(28,28,26,0.08);--shadow-hover:0 6px 24px rgba(28,28,26,0.14)}
header{background:var(--white);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}
.header-top{background:var(--navy);color:var(--white);font-size:12px;text-align:center;padding:7px 1rem;letter-spacing:.04em}
.header-top a{color:var(--gold-light)}
.header-main{display:flex;align-items:center;justify-content:space-between;padding:.75rem 2rem;gap:1rem}
.logo{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:var(--navy);letter-spacing:-.02em;text-decoration:none}
.logo span{color:var(--gold)}
.header-actions{display:flex;align-items:center;gap:.5rem}
.search-wrapper{display:flex;align-items:center;background:var(--cream);border:1px solid var(--border);border-radius:6px;overflow:hidden;transition:border-color .2s}
.search-wrapper:focus-within{border-color:var(--gold)}
.search-wrapper input{border:none;background:none;padding:.4rem .75rem;font-size:14px;width:200px;outline:none;font-family:inherit;color:var(--text-primary)}
.search-wrapper input::placeholder{color:var(--text-muted)}
.search-wrapper button{padding:.4rem .6rem;color:var(--text-secondary);display:flex;align-items:center;border:none;background:none;cursor:pointer;transition:color .2s}
.search-wrapper button:hover{color:var(--gold)}
.icon-btn{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:8px;transition:background .2s;position:relative;color:var(--text-primary);border:none;background:none;cursor:pointer}
.icon-btn:hover{background:var(--cream-dark);color:var(--gold)}
.icon-btn svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.8}
.badge{position:absolute;top:2px;right:2px;background:var(--gold);color:var(--white);font-size:10px;font-weight:600;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 4px;line-height:1}
.wishlist-dropdown{position:absolute;top:calc(100% + 8px);right:0;width:320px;background:var(--white);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow-hover);z-index:300;display:none;padding:1rem}
.wishlist-dropdown.open{display:block}
.wishlist-dropdown h3{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;margin-bottom:.75rem;color:var(--navy)}
.wishlist-item{display:flex;align-items:center;gap:.5rem;padding:.5rem 0;border-bottom:1px solid var(--border-light);font-size:13px}
.wishlist-item:last-child{border-bottom:none}
.wishlist-item-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0}
.wishlist-empty-note{font-size:13px;color:var(--text-muted);text-align:center;padding:.5rem 0}
.cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;opacity:0;pointer-events:none;transition:opacity .3s}
.cart-overlay.open{opacity:1;pointer-events:all}
.cart-drawer{position:fixed;top:0;right:0;width:380px;max-width:100%;height:100%;background:var(--white);z-index:201;transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-4px 0 24px rgba(0,0,0,.12)}
.cart-drawer.open{transform:translateX(0)}
.cart-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)}
.cart-header h2{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:var(--navy)}
.cart-close{width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);transition:all .2s;border:none;background:none;cursor:pointer}
.cart-close:hover{background:var(--cream);color:var(--text-primary)}
.cart-close svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2}
.cart-body{flex:1;overflow-y:auto;padding:1rem 1.5rem}
.cart-empty{text-align:center;padding:3rem 1rem;color:var(--text-muted)}
.cart-empty svg{width:48px;height:48px;stroke:currentColor;fill:none;stroke-width:1.2;margin:0 auto 1rem}
.cart-empty p{font-size:15px}
.cart-item{display:flex;gap:.75rem;padding:.75rem 0;border-bottom:1px solid var(--border-light)}
.cart-item-img-placeholder{width:64px;height:64px;border-radius:6px;background:var(--cream-dark);flex-shrink:0}
.cart-item-info{flex:1;min-width:0}
.cart-item-name{font-size:13px;font-weight:500;line-height:1.4;margin-bottom:4px}
.cart-item-ref{font-size:11px;color:var(--text-muted);margin-bottom:8px}
.cart-item-controls{display:flex;align-items:center;justify-content:space-between}
.qty-control{display:flex;align-items:center;border:1px solid var(--border);border-radius:6px;overflow:hidden}
.qty-control button{width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--text-secondary);border:none;background:none;cursor:pointer}
.qty-control button:hover{background:var(--cream)}
.qty-control span{font-size:13px;font-weight:500;padding:0 8px;min-width:28px;text-align:center}
.cart-item-price{font-size:14px;font-weight:600;color:var(--navy)}
.cart-item-remove{color:var(--text-muted);font-size:11px;cursor:pointer;margin-left:.5rem;border:none;background:none;padding:2px 4px;transition:color .2s}
.cart-item-remove:hover{color:#5c7a5c}
.cart-footer{border-top:1px solid var(--border);padding:1.25rem 1.5rem}
.cart-total-row{display:flex;justify-content:space-between;margin-bottom:1rem}
.cart-total-label{font-size:14px;color:var(--text-secondary)}
.cart-total-note{font-size:11px;color:var(--text-muted);margin-top:2px}
.cart-total-value{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--navy)}
.btn-checkout{display:block;width:100%;padding:.85rem;background:var(--green-cta);color:var(--white);font-size:15px;font-weight:600;text-align:center;border-radius:8px;letter-spacing:.02em;transition:background .2s;margin-bottom:.5rem;text-decoration:none}
.btn-checkout:hover{background:var(--green-cta-hover)}
.btn-continue{display:block;width:100%;padding:.7rem;background:none;color:var(--text-secondary);font-size:13px;text-align:center;border-radius:8px;border:1px solid var(--border);transition:all .2s;cursor:pointer;font-family:inherit}
.btn-continue:hover{border-color:var(--navy);color:var(--navy)}
.notif-toast{position:fixed;bottom:1.5rem;right:1.5rem;background:var(--navy);color:var(--white);padding:.75rem 1.25rem;border-radius:10px;font-size:13px;font-weight:500;box-shadow:var(--shadow-hover);z-index:400;transform:translateY(100px);opacity:0;transition:all .35s cubic-bezier(.4,0,.2,1);pointer-events:none;display:flex;align-items:center;gap:.5rem;max-width:300px}
.notif-toast.show{transform:translateY(0);opacity:1}
.notif-toast svg{width:16px;height:16px;stroke:var(--gold-light);fill:none;stroke-width:2;flex-shrink:0}
.search-toast{position:fixed;top:70px;left:50%;transform:translateX(-50%) translateY(-20px);width:min(560px,90vw);background:var(--white);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow-hover);z-index:150;display:none;padding:1rem}
.search-toast.open{display:block;transform:translateX(-50%) translateY(0)}
.search-toast-title{font-size:12px;color:var(--text-muted);letter-spacing:.05em;margin-bottom:.625rem}
.search-result-item{display:flex;align-items:center;gap:.75rem;padding:.5rem;border-radius:8px;cursor:pointer;transition:background .2s}
.search-result-item:hover{background:var(--cream)}
.search-result-swatch{width:36px;height:36px;border-radius:6px;flex-shrink:0}
.search-result-name{font-size:13px;font-weight:500;color:var(--text-primary)}
.search-result-price{font-size:13px;color:var(--gold);font-weight:600;margin-left:auto}
@media(max-width:768px){.header-main{padding:.75rem 1rem}.search-wrapper input{width:140px}.cart-drawer{width:100%}}
`;

  /* ── HTML ── */
  const HTML = `
<div class="notif-toast" id="notifToast">
  <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
  <span id="notifMsg">Adicionado ao carrinho</span>
</div>

<div class="cart-overlay" id="cartOverlay" onclick="toggleCart()"></div>
<aside class="cart-drawer" id="cartDrawer" role="dialog" aria-label="Carrinho de compras">
  <div class="cart-header">
    <h2>Carrinho</h2>
    <button class="cart-close" onclick="toggleCart()" aria-label="Fechar carrinho">
      <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="cart-body" id="cartBody"></div>
  <div class="cart-footer" id="cartFooter" style="display:none">
    <div class="cart-total-row">
      <div><div class="cart-total-label">Total</div><div class="cart-total-note">IVA incluído</div></div>
      <div class="cart-total-value" id="cartTotal">0,00 €</div>
    </div>
    <a href="${p}checkout.html" class="btn-checkout">Finalizar Encomenda</a>
    <button class="btn-continue" onclick="toggleCart()">Continuar a Comprar</button>
  </div>
</aside>

<header>
  <div class="header-top">
    Envios internacionais disponíveis &mdash; <a href="${p}condicoes.html">Saiba mais</a> &nbsp;|&nbsp; Encomenda online 24/7 &nbsp;|&nbsp; Multibanco e PayPal aceites
  </div>
  <div class="header-main">
    <a href="${b}index.html" class="logo">Forma<span>Fantasia</span></a>
    <nav aria-label="Navegação principal">
      <ul class="nav-primary"></ul>
    </nav>
    <div class="header-actions">
      <div class="search-wrapper">
        <input type="search" placeholder="Buscar..." id="searchInput" autocomplete="off">
        <button aria-label="Pesquisar" id="searchBtn">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/></svg>
        </button>
      </div>
      <div style="position:relative">
        <button class="icon-btn" id="wishBtn" onclick="toggleWishlist()" aria-label="Lista de desejos" title="Lista de desejos">
          <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span class="badge" id="wishBadge" style="display:none">0</span>
        </button>
        <div class="wishlist-dropdown" id="wishlistDropdown">
          <h3>Lista de Desejos</h3>
          <div id="wishlistItems"><p class="wishlist-empty-note">Ainda não adicionou artigos.</p></div>
        </div>
      </div>
      <button class="icon-btn" onclick="toggleCart()" aria-label="Carrinho de compras" title="Carrinho">
        <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 10a4 4 0 01-8 0"/></svg>
        <span class="badge" id="cartBadge" style="display:none">0</span>
      </button>
      <a href="/Identity/Account/Login" class="icon-btn" id="userBtn" aria-label="Conta" title="A minha conta" style="text-decoration:none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </a>
    </div>
  </div>
</header>

<div class="search-toast" id="searchToast">
  <div class="search-toast-title">RESULTADOS DA PESQUISA</div>
  <div id="searchResults"></div>
</div>
`;

  /* ── INJECT CSS ── */
  if (!document.getElementById('ff-header-styles')) {
    const style = document.createElement('style');
    style.id = 'ff-header-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ── INJECT HTML before first existing content in <body> ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('cartDrawer')) return;
    const tmp = document.createElement('div');
    tmp.innerHTML = HTML;
    const body = document.body;
    const firstChild = body.firstChild;
    while (tmp.firstChild) { body.insertBefore(tmp.firstChild, firstChild); }

    /* ── AUTH STATE on user icon ── */
    /* ── AUTH STATE on user icon ── */
    fetch('/api/Utilizadores/auth')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Não autenticado');
      })
      .then(data => {
        const userBtn = document.getElementById('userBtn');
        if (userBtn && data.isAuthenticated) {
          userBtn.title = data.nome || 'A minha conta';
          userBtn.style.color = 'var(--gold)';

          if (data.role === 'Admin') {
            // Se for Admin, vai para o painel de administração
            userBtn.href = p + 'admin.html';
            userBtn.title = 'Painel Admin';
            const dot = document.createElement('span');
            dot.style.cssText = 'position:absolute;top:2px;right:2px;width:8px;height:8px;background:#e74c3c;border-radius:50%;border:2px solid var(--white)';
            userBtn.style.position = 'relative';
            userBtn.appendChild(dot);
          } else {
            // Se for cliente, vai para a página de gestão de conta do Identity
            userBtn.href = '/Identity/Account/Manage';
          }
        }
      })
      .catch(e => {
        // Se der erro (não está logado), mantém o link a apontar para o /Identity/Account/Login
        console.log("Utilizador não autenticado no Identity.");
      });

    /* ── SEARCH ── */
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    if (searchInput) {
      function doSearch() {
        const q = searchInput.value.trim();
        const toast = document.getElementById('searchToast');
        const results = document.getElementById('searchResults');
        if (q.length < 2) { toast.classList.remove('open'); return; }
        const ql = q.toLowerCase();
        const prods = typeof FF_PRODUCTS !== 'undefined' ? FF_PRODUCTS : [];
        const found = prods.filter(pr =>
          pr.name.toLowerCase().includes(ql) ||
          pr.ref.toLowerCase().includes(ql) ||
          pr.category.toLowerCase().includes(ql)
        ).slice(0, 5);
        const patStyles = typeof patternStyles !== 'undefined' ? patternStyles : {};
        if (found.length === 0) {
          results.innerHTML = `<div class="search-result-item" onclick="window.location='${p}catalogo-hub.html?q=${encodeURIComponent(q)}'">
            <div class="search-result-swatch" style="background:var(--cream-dark)"></div>
            <div><div class="search-result-name">Pesquisar &ldquo;${q}&rdquo; no catálogo</div><div style="font-size:11px;color:var(--text-muted)">Ver todos os resultados</div></div>
            <span class="search-result-price" style="color:var(--navy)">→</span>
          </div>`;
        } else {
          results.innerHTML = found.map(pr => `
            <div class="search-result-item" onclick="window.location='${p}produto.html?id=${pr.id}'">
              <div class="search-result-swatch" style="background:${patStyles[pr.pattern] || 'var(--cream-dark)'};background-size:cover"></div>
              <div><div class="search-result-name">${pr.name}</div><div style="font-size:11px;color:var(--text-muted)">Ref. ${pr.ref}</div></div>
              <span class="search-result-price">${Number(pr.price).toFixed(2).replace('.', ',')} €</span>
            </div>`).join('');
        }
        toast.classList.add('open');
      }
      searchInput.addEventListener('input', function () { this.value.length > 1 ? doSearch() : document.getElementById('searchToast').classList.remove('open'); });
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { const q = this.value.trim(); window.location = q ? `${p}catalogo-hub.html?q=${encodeURIComponent(q)}` : `${p}catalogo-hub.html`; }
        if (e.key === 'Escape') document.getElementById('searchToast').classList.remove('open');
      });
      if (searchBtn) searchBtn.addEventListener('click', doSearch);
    }

    /* ── CLOSE DROPDOWNS ON OUTSIDE CLICK ── */
    document.addEventListener('click', function (e) {
      const dd = document.getElementById('wishlistDropdown');
      const btn = document.getElementById('wishBtn');
      if (dd && dd.classList.contains('open') && !dd.contains(e.target) && btn && !btn.contains(e.target)) dd.classList.remove('open');
      const st = document.getElementById('searchToast');
      const si = document.getElementById('searchInput');
      if (st && st.classList.contains('open') && !st.contains(e.target) && si && !si.contains(e.target)) st.classList.remove('open');
    });
  });
})();

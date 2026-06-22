const patternStyles = {
  greek:'repeating-linear-gradient(45deg,#0d1b2a 0,#0d1b2a 5px,#1a2e42 5px,#1a2e42 24px),repeating-linear-gradient(-45deg,#b8973a33 0,#b8973a33 2px,transparent 2px,transparent 24px)',
  floral:'radial-gradient(ellipse at 30% 50%,#b8973a22,transparent 50%),radial-gradient(ellipse at 70% 30%,#b8973a33,transparent 40%),linear-gradient(135deg,#f0ece2,#e8e2d5)',
  marble:'linear-gradient(115deg,#f5f0e8,#e8dece 30%,#f0ebe0 50%,#d4c9b4 70%,#ede8df)',
  berber:'repeating-linear-gradient(0deg,#c9a84c22 0,#c9a84c22 2px,transparent 2px,transparent 16px),repeating-linear-gradient(90deg,#c9a84c22 0,#c9a84c22 2px,transparent 2px,transparent 16px),linear-gradient(135deg,#f5e8c8,#e8d5a0)',
  tropical:'radial-gradient(circle at 20% 80%,#2d5a27 0%,transparent 40%),radial-gradient(circle at 80% 20%,#3a7a32 0%,transparent 40%),linear-gradient(135deg,#1a3d16,#2d5a27)',
  cement:'repeating-linear-gradient(0deg,#8a8a8a22 0,#8a8a8a22 1px,transparent 1px,transparent 20px),repeating-linear-gradient(90deg,#8a8a8a22 0,#8a8a8a22 1px,transparent 1px,transparent 20px),linear-gradient(135deg,#d0cdc8,#b8b5b0)',
  kilim:'repeating-linear-gradient(45deg,#8b1a1a 0,#8b1a1a 4px,#d4a017 4px,#d4a017 8px,#8b1a1a 8px,#8b1a1a 12px,#1a3d8b 12px,#1a3d8b 16px)',
  tool:'linear-gradient(135deg,#e8e2d5,#d0cbc0)',
  plain:'linear-gradient(135deg,#f0ece2,#e8e2d5)',
};

const categoryLabels = {
  papel:'Papel de Parede',
  vinil:'Vinil Decorativo',
  tapecaria:'Tapeçaria',
  paineis:'Painéis Decorativos',
  impressao:'Impressão Digital',
  calhas:'Calhas',
  stockoff:'Stock Off',
  varoes:'Varões',
  tecidos:'Tecidos',
  colas:'Colas',
  acessorios:'Acessório',
};

function categoryLabel(cat){
  return categoryLabels[cat] || cat;
}

function formatPrice(p){
  return Number(p).toFixed(2).replace('.',',') + ' €';
}

let cart = {};
let wishlist = [];

function addToCart(id, productData){
  const allProducts = typeof products !== 'undefined' ? products : (productData ? [productData] : []);
  const p = allProducts.find(x => x.id === id) || productData;
  if(!p) return;
  if(cart[id]){
    cart[id].qty++;
  } else {
    cart[id] = {product:p, qty:1};
  }
  updateCartUI();
  showNotif('Adicionado: ' + p.name.substring(0,35) + (p.name.length > 35 ? '…' : ''));
}

function removeFromCart(id){
  delete cart[id];
  updateCartUI();
}

function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id].qty += delta;
  if(cart[id].qty <= 0) delete cart[id];
  updateCartUI();
}

function updateCartUI(){
  const items = Object.values(cart);
  const totalQty = items.reduce((s,i) => s + i.qty, 0);
  const totalPrice = items.reduce((s,i) => s + i.product.price * i.qty, 0);
  const badge = document.getElementById('cartBadge');
  if(badge){
    badge.style.display = totalQty > 0 ? 'flex' : 'none';
    badge.textContent = totalQty;
  }
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if(!body) return;
  if(items.length === 0){
    body.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg><p>O teu carrinho está vazio.</p></div>';
    if(footer) footer.style.display = 'none';
  } else {
    body.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="cart-item-img-placeholder" style="background:${patternStyles[i.product.pattern]||patternStyles.plain};background-size:cover"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${i.product.name}</div>
          <div class="cart-item-ref">Ref. ${i.product.ref}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button onclick="changeQty(${i.product.id},-1)" aria-label="Diminuir">−</button>
              <span>${i.qty}</span>
              <button onclick="changeQty(${i.product.id},1)" aria-label="Aumentar">+</button>
            </div>
            <div style="display:flex;align-items:center">
              <span class="cart-item-price">${formatPrice(i.product.price * i.qty)}</span>
              <button class="cart-item-remove" onclick="removeFromCart(${i.product.id})">remover</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    if(footer) footer.style.display = 'block';
    const total = document.getElementById('cartTotal');
    if(total) total.textContent = formatPrice(totalPrice);
  }
}

function toggleCart(){
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if(!drawer) return;
  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  if(!isOpen) updateCartUI();
}

function toggleWishItem(id, e, productData){
  if(e) e.preventDefault();
  const allProducts = typeof products !== 'undefined' ? products : (productData ? [productData] : []);
  const p = allProducts.find(x => x.id === id) || productData;
  if(!p) return;
  const idx = wishlist.indexOf(id);
  if(idx > -1){
    wishlist.splice(idx,1);
    showNotif('Removido da lista de desejos');
  } else {
    wishlist.push(id);
    showNotif('Adicionado à lista de desejos ♥');
  }
  updateWishlistUI();
  document.querySelectorAll(`.product-wish[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('liked', wishlist.includes(id));
  });
}

function updateWishlistUI(){
  const badge = document.getElementById('wishBadge');
  if(badge){
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
  const container = document.getElementById('wishlistItems');
  if(!container) return;
  const allProducts = typeof products !== 'undefined' ? products : [];
  if(wishlist.length === 0){
    container.innerHTML = '<p class="wishlist-empty-note">Ainda não adicionou artigos à lista de desejos.</p>';
  } else {
    container.innerHTML = wishlist.map(id => {
      const p = allProducts.find(x => x.id === id);
      return p ? `<div class="wishlist-item"><div class="wishlist-item-dot"></div><span style="flex:1">${p.name.substring(0,30)}${p.name.length>30?'…':''}</span><span style="color:var(--gold);font-size:12px;font-weight:600">${formatPrice(p.price)}</span></div>` : '';
    }).join('');
  }
}

function toggleWishlist(){
  const dd = document.getElementById('wishlistDropdown');
  if(dd) dd.classList.toggle('open');
}

function renderProductCard(p){
  const pattern = patternStyles[p.pattern] || patternStyles.plain;
  const isLiked = wishlist.includes(p.id);
  return `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="product-card-img">
        <div class="product-card-pattern" style="background:${pattern};width:100%;height:100%"></div>
        ${p.tag ? `<span class="product-tag ${p.tag === 'new' ? 'tag-new' : 'tag-promo'}">${p.tag === 'new' ? 'Novo' : 'Promo'}</span>` : ''}
        <button class="product-wish ${isLiked ? 'liked' : ''}" data-id="${p.id}" onclick="toggleWishItem(${p.id},event)" aria-label="Adicionar à lista de desejos">
          <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${categoryLabel(p.category)}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-ref">Ref. ${p.ref}</div>
        <div class="product-card-footer">
          <div>
            <div class="product-card-price">${formatPrice(p.price)} <small>(IVA inc.)</small></div>
          </div>
          <button class="btn-add-cart" onclick="addToCart(${p.id})">
            <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            Adicionar
          </button>
        </div>
      </div>
    </article>
  `;
}

function initSearch(productList){
  const input = document.getElementById('searchInput');
  if(!input) return;
  function doSearch(){
    const q = input.value.trim().toLowerCase();
    const toast = document.getElementById('searchToast');
    const results = document.getElementById('searchResults');
    if(!toast || !results) return;
    if(!q){ toast.classList.remove('open'); return; }
    const found = productList.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.ref.toLowerCase().includes(q) ||
      categoryLabel(p.category).toLowerCase().includes(q)
    );
    if(found.length === 0){
      results.innerHTML = '<p style="font-size:13px;color:var(--text-muted);padding:.25rem 0">Nenhum resultado encontrado para "' + q + '".</p>';
    } else {
      results.innerHTML = found.slice(0,5).map(p => `
        <div class="search-result-item" onclick="addToCart(${p.id})">
          <div class="search-result-swatch" style="background:${patternStyles[p.pattern]||patternStyles.plain};background-size:cover"></div>
          <div>
            <div class="search-result-name">${p.name}</div>
            <div style="font-size:11px;color:var(--text-muted)">Ref. ${p.ref}</div>
          </div>
          <span class="search-result-price">${formatPrice(p.price)}</span>
        </div>
      `).join('');
    }
    toast.classList.add('open');
  }
  input.addEventListener('input', function(){ this.value.length > 1 ? doSearch() : document.getElementById('searchToast').classList.remove('open'); });
  input.addEventListener('keydown', function(e){ if(e.key === 'Enter') doSearch(); if(e.key === 'Escape') document.getElementById('searchToast').classList.remove('open'); });
  document.addEventListener('click', function(e){
    const dd = document.getElementById('wishlistDropdown');
    const btn = document.getElementById('wishBtn');
    if(dd && dd.classList.contains('open') && !dd.contains(e.target) && btn && !btn.contains(e.target)) dd.classList.remove('open');
    const st = document.getElementById('searchToast');
    if(st && st.classList.contains('open') && !st.contains(e.target) && !input.contains(e.target)) st.classList.remove('open');
  });
}

function initNavDropdowns(){
  const ddTimers = new WeakMap();
  document.querySelectorAll('.nav-primary > li').forEach(li => {
    if(!li.querySelector('.nav-dropdown')) return;
    function open(){ clearTimeout(ddTimers.get(li)); li.classList.add('dd-open'); }
    function scheduleClose(){ ddTimers.set(li, setTimeout(() => li.classList.remove('dd-open'), 180)); }
    li.addEventListener('mouseenter', open);
    li.addEventListener('mouseleave', scheduleClose);
  });
}

function subscribeNewsletter(btn){
  const input = btn.parentElement.querySelector('input');
  const val = input.value.trim();
  if(!val || !val.includes('@')){ showNotif('Por favor introduz um email válido.'); return; }
  input.value = '';
  showNotif('Subscrito com sucesso! Obrigado.');
}

let notifTimer;
function showNotif(msg){
  clearTimeout(notifTimer);
  const toast = document.getElementById('notifToast');
  if(!toast) return;
  document.getElementById('notifMsg').textContent = msg;
  toast.classList.add('show');
  notifTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

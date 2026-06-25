const CART_KEY = 'ff_cart';
const WISH_KEY = 'ff_wishlist';

const patternStyles = {
  greek:'repeating-linear-gradient(45deg,#0d1b2a 0,#0d1b2a 5px,#1a2e42 5px,#1a2e42 24px),repeating-linear-gradient(-45deg,#b8973a33 0,#b8973a33 2px,transparent 2px,transparent 24px)',
  floral:'radial-gradient(ellipse at 30% 50%,#b8973a22,transparent 50%),linear-gradient(135deg,#f0ece2,#e8e2d5)',
  marble:'linear-gradient(115deg,#f5f0e8,#e8dece 30%,#f0ebe0 50%,#d4c9b4 70%,#ede8df)',
  berber:'repeating-linear-gradient(0deg,#c9a84c22 0,#c9a84c22 2px,transparent 2px,transparent 16px),linear-gradient(135deg,#f5e8c8,#e8d5a0)',
  tropical:'radial-gradient(circle at 20% 80%,#2d5a27 0%,transparent 40%),linear-gradient(135deg,#1a3d16,#2d5a27)',
  cement:'repeating-linear-gradient(0deg,#8a8a8a22 0,#8a8a8a22 1px,transparent 1px,transparent 20px),linear-gradient(135deg,#d0cdc8,#b8b5b0)',
  kilim:'repeating-linear-gradient(45deg,#8b1a1a 0,#8b1a1a 4px,#d4a017 4px,#d4a017 8px,#1a3d8b 12px,#1a3d8b 16px)',
  plain:'linear-gradient(135deg,#f0ece2,#e8e2d5)',
};

function formatPrice(p){ return Number(p).toFixed(2).replace('.',',') + ' €'; }

function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e){ return {}; }
}

function saveCart(c){
  try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch(e){}
}

function loadWishlist(){
  try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
  catch(e){ return []; }
}

function saveWishlist(w){
  try { localStorage.setItem(WISH_KEY, JSON.stringify(w)); } catch(e){}
}

let cart = loadCart();
let wishlist = loadWishlist();

function addToCart(id, product){
  if(!product) return;
  if(cart[id]){ cart[id].qty++; } else { cart[id] = {product, qty:1}; }
  saveCart(cart);
  updateCartUI();
  showNotif('Adicionado: ' + product.name.substring(0,35) + (product.name.length > 35 ? '…' : ''));
}

function removeFromCart(id){
  delete cart[id];
  saveCart(cart);
  updateCartUI();
}

function changeQty(id, delta){
  if(!cart[id]) return;
  cart[id].qty += delta;
  if(cart[id].qty <= 0) delete cart[id];
  saveCart(cart);
  updateCartUI();
}

function clearCart(){
  cart = {};
  saveCart(cart);
  updateCartUI();
}

function updateCartUI(){
  const items = Object.values(cart);
  const totalQty = items.reduce((s,i) => s + i.qty, 0);
  const totalPrice = items.reduce((s,i) => s + i.product.price * i.qty, 0);
  const badge = document.getElementById('cartBadge');
  if(badge){ badge.style.display = totalQty > 0 ? 'flex' : 'none'; badge.textContent = totalQty; }
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if(!body) return;
  if(items.length === 0){
    body.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg><p>O teu carrinho está vazio.</p></div>';
    if(footer) footer.style.display = 'none';
  } else {
    body.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="cart-item-img-placeholder" style="background:${patternStyles[i.product.pattern]||patternStyles.plain};background-size:cover;width:64px;height:64px;border-radius:6px;flex-shrink:0"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${i.product.name}</div>
          <div class="cart-item-ref">Ref. ${i.product.ref}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button onclick="changeQty(${i.product.id},-1)">−</button>
              <span>${i.qty}</span>
              <button onclick="changeQty(${i.product.id},1)">+</button>
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
  const d = document.getElementById('cartDrawer'), o = document.getElementById('cartOverlay');
  if(!d) return;
  const open = d.classList.contains('open');
  d.classList.toggle('open', !open); o.classList.toggle('open', !open);
  if(!open) updateCartUI();
}

function toggleWishItem(id, product, e){
  if(e){ e.preventDefault(); e.stopPropagation(); }
  const idx = wishlist.findIndex(w => w.id === id);
  if(idx > -1){ wishlist.splice(idx,1); showNotif('Removido da lista de desejos'); }
  else if(product){ wishlist.push(product); showNotif('Adicionado à lista de desejos ♥'); }
  saveWishlist(wishlist);
  updateWishlistUI();
  document.querySelectorAll(`.product-wish[data-wish-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('liked', wishlist.some(w => w.id === id));
  });
}

function toggleWishlist(){
  const dd = document.getElementById('wishlistDropdown');
  if(dd) dd.classList.toggle('open');
}

function updateWishlistUI(){
  const badge = document.getElementById('wishBadge');
  if(badge){ badge.textContent = wishlist.length; badge.style.display = wishlist.length > 0 ? 'flex' : 'none'; }
  const container = document.getElementById('wishlistItems');
  if(!container) return;
  if(wishlist.length === 0){
    container.innerHTML = '<p class="wishlist-empty-note">Ainda não adicionou artigos à lista de desejos.</p>';
  } else {
    container.innerHTML = wishlist.map(item => `
      <div class="wishlist-item">
        <div class="wishlist-item-dot"></div>
        <span style="flex:1">${item.name.substring(0,30)}${item.name.length>30?'…':''}</span>
        <span style="color:var(--gold);font-size:12px;font-weight:600">${formatPrice(item.price)}</span>
      </div>`).join('');
  }
}

function initNavDropdowns(){
  const ddTimers = new WeakMap();
  document.querySelectorAll('.nav-primary > li').forEach(li => {
    if(!li.querySelector('.nav-dropdown')) return;
    function open(){ clearTimeout(ddTimers.get(li)); li.classList.add('dd-open'); }
    function close(){ ddTimers.set(li, setTimeout(() => li.classList.remove('dd-open'), 180)); }
    li.addEventListener('mouseenter', open);
    li.addEventListener('mouseleave', close);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  updateCartUI();
  updateWishlistUI();
  initNavDropdowns();
  document.addEventListener('click', function(e){
    const dd = document.getElementById('wishlistDropdown'), btn = document.getElementById('wishBtn');
    if(dd && dd.classList.contains('open') && !dd.contains(e.target) && btn && !btn.contains(e.target)) dd.classList.remove('open');
  });
});

let _notifTimer;
function showNotif(msg){
  clearTimeout(_notifTimer);
  const t = document.getElementById('notifToast');
  if(!t) return;
  document.getElementById('notifMsg').textContent = msg;
  t.classList.add('show');
  _notifTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

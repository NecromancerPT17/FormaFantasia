(function () {
  // Aplica css ao menu de navegação
  const CSS = `
.nav-primary{display:flex;gap:2rem;list-style:none}
.nav-primary>li{position:relative}
.nav-primary>li>a{font-size:14px;font-weight:500;color:var(--text-primary);letter-spacing:.03em;padding:.25rem 0;border-bottom:2px solid transparent;transition:all .2s;display:flex;align-items:center;gap:.25rem;white-space:nowrap}
.nav-primary>li>a:hover,.nav-primary>li>a.active{color:var(--gold);border-bottom-color:var(--gold)}
.nav-arrow{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2.5;transition:transform .2s;flex-shrink:0}
.nav-primary>li.dd-open>.nav-arrow{transform:rotate(180deg)}
.nav-dropdown{position:absolute;top:calc(100% + 10px);left:0;background:var(--white);border:1px solid var(--border);border-radius:10px;box-shadow:0 8px 32px rgba(13,27,42,.13);min-width:220px;padding:.5rem 0;visibility:hidden;opacity:0;pointer-events:none;transition:opacity .15s,visibility .15s;z-index:500;overflow:visible}
.nav-dropdown::before{content:'';position:absolute;top:-10px;left:0;right:0;height:10px}
.nav-primary>li.dd-open>.nav-dropdown{visibility:visible;opacity:1;pointer-events:all}
.nav-dropdown a{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1rem;font-size:13px;font-weight:400;color:var(--text-primary);transition:all .2s;white-space:nowrap;position:relative}
.nav-dropdown a:hover{background:var(--cream);color:var(--gold)}
.nav-dropdown-section{padding:.4rem 1rem .2rem;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-top:.25rem}
.nav-dropdown hr{border:none;border-top:1px solid var(--border-light);margin:.3rem 0}
.nav-dd-arrow{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;color:var(--text-muted);flex-shrink:0;transition:color .15s}
.nav-has-sub{position:relative}
.nav-sub{position:absolute;top:-6px;left:calc(100% + 1px);background:var(--white);border:1px solid var(--border);border-radius:10px;box-shadow:0 8px 32px rgba(13,27,42,.13);min-width:200px;padding:.5rem 0;visibility:hidden;opacity:0;pointer-events:none;transition:opacity .15s,visibility .15s;z-index:502;overflow:visible}
.nav-sub::before{content:'';position:absolute;top:0;left:-12px;width:12px;height:100%}
.nav-has-sub.sub-open>.nav-sub{visibility:visible;opacity:1;pointer-events:all}
.nav-has-sub.sub-open>a{background:var(--cream);color:var(--gold)}
.nav-has-sub.sub-open>a .nav-dd-arrow{color:var(--gold)}
.nav-sub a{display:flex;align-items:center;padding:.5rem 1rem;font-size:13px;color:var(--text-primary);transition:all .2s;white-space:nowrap}
.nav-sub a:hover{background:var(--cream);color:var(--gold)}
`;
  // Injetar css na página
  const style = document.createElement('style');
  style.id = 'ff-nav-styles';
  style.textContent = CSS;
  document.head.appendChild(style);

  // Icones SVG
  const DD_ARROW = `<svg class="nav-dd-arrow" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>`;
  const NAV_ARROW = `<svg class="nav-arrow" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;

  //Construtor submenu
  function buildSub(items){
    return `<div class="nav-sub">${items.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>`;
  }

  function buildHasSub(label, href, subItems){
    return `<div class="nav-has-sub"><a href="${href}">${label} ${DD_ARROW}</a>${buildSub(subItems)}</div>`;
  }
  // Determinar o caminho base
  function resolveBase(){
    return window.location.pathname.includes('/pages/') ? '../' : './';
  }

  // Estrutura principal do menu
  function buildNav(activeSection){
    const b = resolveBase();
    const p = b + 'pages/';

    const navItems = [
      { label:'Papel', href: p+'catalogo-papel-infantil.html', section:'papel',
        items:`
          <div class="nav-dropdown-section">Papel de Parede</div>
          ${buildHasSub('Infantil', p+'catalogo-papel-infantil.html', [
            ['Ver tudo — Infantil',     p+'catalogo-papel-infantil.html'],
            ['Animais',                 p+'catalogo-papel-infantil.html'],
            ['Fantasias &amp; Contos',  p+'catalogo-papel-infantil.html'],
            ['Desporto &amp; Aventura', p+'catalogo-papel-infantil.html'],
            ['Geométrico Infantil',     p+'catalogo-papel-infantil.html'],
          ])}
          ${buildHasSub('Decoração', p+'catalogo-papel-decoracao.html', [
            ['Ver tudo — Decoração',       p+'catalogo-papel-decoracao.html'],
            ['Clássico &amp; Vintage',     p+'catalogo-papel-decoracao.html'],
            ['Moderno &amp; Minimalista',  p+'catalogo-papel-decoracao.html'],
            ['Tropical &amp; Botânico',    p+'catalogo-papel-decoracao.html'],
            ['Texturas &amp; Efeitos',     p+'catalogo-papel-decoracao.html'],
            ['Coleções de Luxo',           p+'catalogo-papel-decoracao.html'],
          ])}
          <a href="${p}catalogo-papel-economico.html">Económico</a>
          <a href="${p}catalogo-papel-cozinha.html">Cozinha &amp; WC</a>`,
      },
      { label:'Vinil', href: p+'catalogo-vinil.html', section:'vinil',
        items:`
          <div class="nav-dropdown-section">Vinil Decorativo</div>
          ${buildHasSub('Vinil Decorativo', p+'catalogo-vinil.html', [
            ['Ver tudo — Vinil',  p+'catalogo-vinil.html'],
            ['Liso e Texturado', p+'catalogo-vinil.html'],
            ['Efeitos Especiais', p+'catalogo-vinil.html'],
            ['Efeito Mármore',   p+'catalogo-vinil.html'],
            ['Efeito Cimento',   p+'catalogo-vinil.html'],
          ])}
          <a href="${p}catalogo-impressao.html">Impressão Digital</a>
          <hr>
          <a href="${p}aplicar-vinil.html">Como Aplicar Vinil</a>`,
      },
      { label:'Tapeçarias', href: p+'catalogo-tapecarias.html', section:'tapecarias',
        items:`
          <div class="nav-dropdown-section">Tapeçarias</div>
          ${buildHasSub('Tapeçarias', p+'catalogo-tapecarias.html', [
            ['Ver tudo — Tapeçarias', p+'catalogo-tapecarias.html'],
            ['Clássicas',             p+'catalogo-tapecarias.html'],
            ['Modernas',              p+'catalogo-tapecarias.html'],
            ['Kilim &amp; Berber',   p+'catalogo-tapecarias.html'],
            ['À Medida',              p+'catalogo-tapecarias.html'],
          ])}
          <a href="${p}catalogo-tecidos.html">Tecidos</a>`,
      },
      { label:'Outros', href: p+'catalogo-hub.html', section:'outros',
        items:`
          <div class="nav-dropdown-section">Categorias</div>
          <a href="${p}catalogo-paineis.html">Painéis Decorativos</a>
          <a href="${p}catalogo-impressao.html">Impressão Digital</a>
          <a href="${p}catalogo-calhas.html">Calhas</a>
          <a href="${p}catalogo-stockoff.html">Stock Off</a>
          <a href="${p}catalogo-varoes.html">Varões</a>
          <a href="${p}catalogo-tecidos.html">Tecidos</a>
          <a href="${p}catalogo-colas.html">Colas</a>`,
      },
    ];

    return '<ul class="nav-primary">' + navItems.map(item => `
      <li>
        <a href="${item.href}"${item.section === activeSection ? ' class="active"' : ''}>
          ${item.label} ${NAV_ARROW}
        </a>
        <div class="nav-dropdown">${item.items}</div>
      </li>`).join('') + '</ul>';
  }

  // Destacar menu ativo
  function getActiveSection(){
    const path = window.location.pathname;
    if(path.includes('vinil')) return 'vinil';
    if(path.includes('tapecaria') || path.includes('tecidos')) return 'tapecarias';
    if(path.includes('catalogo-papel') || path.includes('produto')) return 'papel';
    return '';
  }

  // Controlar tempo de menus suspensos
  function initNav(){
    const ddTimers = new WeakMap();
    const subTimers = new WeakMap();

    // Menus principais
    document.querySelectorAll('.nav-primary > li').forEach(li => {
      if(!li.querySelector('.nav-dropdown')) return;
      li.addEventListener('mouseenter', () => {
        clearTimeout(ddTimers.get(li));
        li.classList.add('dd-open');
      });
      li.addEventListener('mouseleave', () => {
        ddTimers.set(li, setTimeout(() => li.classList.remove('dd-open'), 180));
      });
    });

    // Submenus
    document.querySelectorAll('.nav-has-sub').forEach(el => {
      el.addEventListener('mouseenter', () => {
        clearTimeout(subTimers.get(el));
        // Close any sibling sub-menus first
        el.closest('.nav-dropdown').querySelectorAll('.nav-has-sub.sub-open').forEach(sib => {
          if(sib !== el) sib.classList.remove('sub-open');
        });
        el.classList.add('sub-open');
      });
      el.addEventListener('mouseleave', () => {
        subTimers.set(el, setTimeout(() => el.classList.remove('sub-open'), 180));
      });
    });
  }

  // Injetar menu quando pagina carregar
  document.addEventListener('DOMContentLoaded', function(){
    const navEl = document.querySelector('nav[aria-label="Navegação principal"]');
    if(!navEl) return;
    navEl.innerHTML = buildNav(getActiveSection());
    initNav();
  });
})();

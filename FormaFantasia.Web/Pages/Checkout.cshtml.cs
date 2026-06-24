using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using FormaFantasia.Web.Hubs;

namespace FormaFantasia.Web.Pages;

[Authorize]
public class CheckoutModel : PageModel
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<Utilizador> _userManager;
    private readonly IHubContext<EncomendaHub> _hubContext;

    public CheckoutModel(ApplicationDbContext context, UserManager<Utilizador> userManager, IHubContext<EncomendaHub> hubContext)
    {
        _context = context;
        _userManager = userManager;
        _hubContext = hubContext;
    }

    [BindProperty]
    public string MoradaEntrega { get; set; } = string.Empty;

    [BindProperty]
    public string ItensJson { get; set; } = string.Empty;

    public decimal Total { get; set; }

    public void OnGet() { }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid || string.IsNullOrEmpty(ItensJson))
            return Page();

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // Deserializar itens do carrinho vindos do frontend
        var itens = JsonSerializer.Deserialize<List<CarrinhoItemDto>>(ItensJson, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        if (itens == null || itens.Count == 0) return Page();

        // Criar encomenda
        var encomenda = new Encomenda
        {
            Data = DateTime.Now,
            Estado = "Pendente",
            UtilizadorId = user.Id
        };
        _context.Encomendas.Add(encomenda);
        await _context.SaveChangesAsync();

        // Criar itens da encomenda
        foreach (var item in itens)
        {
            var produto = await _context.Produtos.FindAsync(item.ProdutoId);
            if (produto == null) continue;

            _context.ItensEncomenda.Add(new ItemEncomenda
            {
                EncomendaId = encomenda.Id,
                ProdutoId = item.ProdutoId,
                Quantidade = item.Quantidade,
                PrecoUnitario = produto.Preco
            });
        }

        await _context.SaveChangesAsync();

        // Notificar Admin em tempo real
        await _hubContext.Clients.All.SendAsync("NovaEncomenda", new
        {
            encomendaId = encomenda.Id,
            utilizadorEmail = user.Email,
            total = encomenda.ItensEncomenda.Sum(i => i.Quantidade * i.PrecoUnitario)
        });

        return RedirectToPage("/EncomendaConfirmada", new { id = encomenda.Id });
    }
}

public class CarrinhoItemDto
{
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
}
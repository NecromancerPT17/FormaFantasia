using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FormaFantasia.Web.Pages;

[Authorize]
public class ContaModel : PageModel
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<Utilizador> _userManager;

    public ContaModel(ApplicationDbContext context, UserManager<Utilizador> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public Utilizador? UtilizadorAtual { get; set; }
    public List<Encomenda> Encomendas { get; set; } = new();

    public async Task OnGetAsync()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        UtilizadorAtual = await _userManager.FindByIdAsync(userId!);
        
        Encomendas = await _context.Encomendas
            .Include(e => e.ItensEncomenda)
            .ThenInclude(i => i.Produto)
            .Where(e => e.UtilizadorId == userId)
            .OrderByDescending(e => e.Data)
            .ToListAsync();
    }
}
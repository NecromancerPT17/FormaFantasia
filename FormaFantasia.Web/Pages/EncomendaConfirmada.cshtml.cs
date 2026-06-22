using FormaFantasia.Web.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace FormaFantasia.Web.Pages;

[Authorize]
public class EncomendaConfirmadaModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public EncomendaConfirmadaModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public Models.Encomenda? Encomenda { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Encomenda = await _context.Encomendas
            .Include(e => e.ItensEncomenda)
            .ThenInclude(i => i.Produto)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (Encomenda == null) return NotFound();

        return Page();
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Pages.ItensEncomenda
{
    [Authorize(Roles = "Admin")]
    public class CreateModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public CreateModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
        ViewData["EncomendaId"] = new SelectList(_context.Encomendas, "Id", "Id");
        ViewData["ProdutoId"] = new SelectList(_context.Produtos, "Id", "Id");
            return Page();
        }

        [BindProperty]
        public ItemEncomenda ItemEncomenda { get; set; } = default!;

        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.ItensEncomenda.Add(ItemEncomenda);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}

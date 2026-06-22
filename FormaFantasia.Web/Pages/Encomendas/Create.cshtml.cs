using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Pages.Encomendas
{
    public class CreateModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public CreateModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
        ViewData["UtilizadorId"] = new SelectList(_context.Users, "Id", "Id");
            return Page();
        }

        [BindProperty]
        public Encomenda Encomenda { get; set; } = default!;

        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Encomendas.Add(Encomenda);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}

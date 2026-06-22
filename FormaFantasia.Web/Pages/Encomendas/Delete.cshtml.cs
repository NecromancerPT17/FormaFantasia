using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Pages.Encomendas
{
    public class DeleteModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public DeleteModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Encomenda Encomenda { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var encomenda = await _context.Encomendas.FirstOrDefaultAsync(m => m.Id == id);

            if (encomenda is not null)
            {
                Encomenda = encomenda;

                return Page();
            }

            return NotFound();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var encomenda = await _context.Encomendas.FindAsync(id);
            if (encomenda != null)
            {
                Encomenda = encomenda;
                _context.Encomendas.Remove(Encomenda);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}

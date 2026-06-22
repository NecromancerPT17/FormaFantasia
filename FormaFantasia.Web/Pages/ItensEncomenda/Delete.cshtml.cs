using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Pages.ItensEncomenda
{
    [Authorize(Roles = "Admin")]
    public class DeleteModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public DeleteModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public ItemEncomenda ItemEncomenda { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var itemencomenda = await _context.ItensEncomenda.FirstOrDefaultAsync(m => m.Id == id);

            if (itemencomenda is not null)
            {
                ItemEncomenda = itemencomenda;

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

            var itemencomenda = await _context.ItensEncomenda.FindAsync(id);
            if (itemencomenda != null)
            {
                ItemEncomenda = itemencomenda;
                _context.ItensEncomenda.Remove(ItemEncomenda);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}

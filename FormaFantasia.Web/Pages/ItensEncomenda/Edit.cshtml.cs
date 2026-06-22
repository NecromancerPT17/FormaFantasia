using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Pages.ItensEncomenda
{
    [Authorize(Roles = "Admin")]
    public class EditModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public EditModel(FormaFantasia.Web.Data.ApplicationDbContext context)
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

            var itemencomenda =  await _context.ItensEncomenda.FirstOrDefaultAsync(m => m.Id == id);
            if (itemencomenda == null)
            {
                return NotFound();
            }
            ItemEncomenda = itemencomenda;
           ViewData["EncomendaId"] = new SelectList(_context.Encomendas, "Id", "Id");
           ViewData["ProdutoId"] = new SelectList(_context.Produtos, "Id", "Id");
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(ItemEncomenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemEncomendaExists(ItemEncomenda.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool ItemEncomendaExists(int id)
        {
            return _context.ItensEncomenda.Any(e => e.Id == id);
        }
    }
}

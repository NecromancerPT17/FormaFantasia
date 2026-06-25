using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Authorization;

namespace FormaFantasia.Web.Pages.Categorias
{
    [Authorize(Roles = "Admin")]
    public class DetailsModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public DetailsModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public Categoria Categoria { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var categoria = await _context.Categorias.FirstOrDefaultAsync(m => m.Id == id);

            if (categoria is not null)
            {
                Categoria = categoria;

                return Page();
            }

            return NotFound();
        }
    }
}

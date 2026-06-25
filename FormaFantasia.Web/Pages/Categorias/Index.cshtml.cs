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
    public class IndexModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public IndexModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Categoria> Categoria { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Categoria = await _context.Categorias.ToListAsync();
        }
    }
}

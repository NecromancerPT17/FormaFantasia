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

namespace FormaFantasia.Web.Pages.Produtos
{
    [Authorize(Roles = "Admin")]
    public class IndexModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public IndexModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Produto> Produto { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Produto = await _context.Produtos
                .Include(p => p.Categoria)
                .ToListAsync();
        }
    }
}

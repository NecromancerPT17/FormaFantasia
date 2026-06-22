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
    public class IndexModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public IndexModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Encomenda> Encomenda { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Encomenda = await _context.Encomendas
                .Include(e => e.Utilizador).ToListAsync();
        }
    }
}

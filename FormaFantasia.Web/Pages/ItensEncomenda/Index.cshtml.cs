using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Pages.ItensEncomenda
{
    public class IndexModel : PageModel
    {
        private readonly FormaFantasia.Web.Data.ApplicationDbContext _context;

        public IndexModel(FormaFantasia.Web.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<ItemEncomenda> ItemEncomenda { get;set; } = default!;

        public async Task OnGetAsync()
        {
            ItemEncomenda = await _context.ItensEncomenda
                .Include(i => i.Encomenda)
                .Include(i => i.Produto).ToListAsync();
        }
    }
}

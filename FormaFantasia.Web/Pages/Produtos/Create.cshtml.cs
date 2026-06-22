using FormaFantasia.Web.Data;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FormaFantasia.Web.Pages.Produtos;


[Authorize(Roles = "Admin")]
public class CreateModel : PageModel
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _env;

    public SelectList Categorias { get; set; } = null!;
    
    public CreateModel(ApplicationDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [BindProperty]
    public Produto Produto { get; set; } = new();

    [BindProperty]
    public List<IFormFile> Fotos { get; set; } = new();

    [BindProperty]
    public int FotoPrincipalIndex { get; set; } = 0;

    public IActionResult OnGet()
    {
        Categorias = new SelectList(_context.Categorias, "Id", "Nome");
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            Categorias = new SelectList(_context.Categorias, "Id", "Nome");
            return Page();
        }
        _context.Produtos.Add(Produto);
        await _context.SaveChangesAsync();

        // Guardar fotos
        for (int i = 0; i < Fotos.Count; i++)
        {
            var foto = Fotos[i];
            if (foto.Length > 0)
            {
                var nomeUnico = $"{Guid.NewGuid()}{Path.GetExtension(foto.FileName)}";
                var caminho = Path.Combine(_env.WebRootPath, "uploads", "produtos", nomeUnico);

                using var stream = new FileStream(caminho, FileMode.Create);
                await foto.CopyToAsync(stream);

                _context.FotosProduto.Add(new FotoProduto
                {
                    ProdutoId = Produto.Id,
                    CaminhoFicheiro = $"/uploads/produtos/{nomeUnico}",
                    Principal = (i == FotoPrincipalIndex)
                });
            }
        }

        await _context.SaveChangesAsync();
        return RedirectToPage("./Index");
    }
}
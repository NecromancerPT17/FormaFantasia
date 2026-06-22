using System.Runtime.Versioning;
using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ProdutosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProdutosController(ApplicationDbContext context)
    {
        _context = context;
    }

    //GET /api/produtos
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Produtos.Include(p=>p.Categoria).ToList());
    }


    //GET /api/produtos/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var produto = _context.Produtos
            .Include(p => p.Categoria)
            .FirstOrDefault(p=>p.Id == id);
        
        if(produto == null)
        {
            return NotFound();
        }

        return Ok(produto);
    }
}
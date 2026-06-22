using System.Runtime.Versioning;
using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoriasController : ControllerBase
{
    private readonly ApplicationDbContext  _context;

    public CategoriasController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Categorias.ToList());
    }


    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var categoria = _context.Categorias
            .FirstOrDefault(p=>p.Id==id);
        
        if(categoria == null)
        {
            return NotFound();
        }

        return Ok(categoria);
    }
}
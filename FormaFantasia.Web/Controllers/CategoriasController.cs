using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET /api/Categorias
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Categorias.ToList());
    }

    // GET /api/Categorias/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var categoria = _context.Categorias.FirstOrDefault(c => c.Id == id);
        if (categoria == null) return NotFound();
        return Ok(categoria);
    }

    // POST /api/Categorias
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CategoriaDto dto)
    {
        var categoria = new FormaFantasia.Web.Models.Categoria
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao
        };
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = categoria.Id }, categoria);
    }

    // PUT /api/Categorias/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoriaDto dto)
    {
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return NotFound();

        categoria.Nome = dto.Nome;
        categoria.Descricao = dto.Descricao;

        await _context.SaveChangesAsync();
        return Ok(categoria);
    }

    // DELETE /api/Categorias/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return NotFound();
        _context.Categorias.Remove(categoria);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

public class CategoriaDto
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
}
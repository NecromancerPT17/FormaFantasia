using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EncomendasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EncomendasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET /api/Encomendas — todas (admin)
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult Get()
    {
        return Ok(_context.Encomendas
            .Include(e => e.ItensEncomenda).ThenInclude(i => i.Produto)
            .Include(e => e.Utilizador)
            .OrderByDescending(e => e.Data)
            .ToList());
    }

    // GET /api/Encomendas/5
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult Get(int id)
    {
        var encomenda = _context.Encomendas
            .Include(e => e.ItensEncomenda).ThenInclude(i => i.Produto)
            .Include(e => e.Utilizador)
            .FirstOrDefault(e => e.Id == id);
        if (encomenda == null) return NotFound();
        return Ok(encomenda);
    }

    // GET /api/Encomendas/minhas — encomendas do utilizador autenticado
    [HttpGet("minhas")]
    [Authorize]
    public async Task<IActionResult> GetMinhas()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var encomendas = await _context.Encomendas
            .Include(e => e.ItensEncomenda).ThenInclude(i => i.Produto)
            .Where(e => e.UtilizadorId == userId)
            .OrderByDescending(e => e.Data)
            .ToListAsync();

        return Ok(encomendas);
    }

    // PUT /api/Encomendas/5/estado — atualizar estado (admin)
    [HttpPut("{id}/estado")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateEstado(int id, [FromBody] EstadoDto dto)
    {
        var encomenda = await _context.Encomendas.FindAsync(id);
        if (encomenda == null) return NotFound();
        encomenda.Estado = dto.Estado;
        await _context.SaveChangesAsync();
        return Ok(encomenda);
    }

    // DELETE /api/Encomendas/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var encomenda = await _context.Encomendas
            .Include(e => e.ItensEncomenda)
            .FirstOrDefaultAsync(e => e.Id == id);
        if (encomenda == null) return NotFound();
        _context.ItensEncomenda.RemoveRange(encomenda.ItensEncomenda);
        _context.Encomendas.Remove(encomenda);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

public class EstadoDto
{
    public string Estado { get; set; } = string.Empty;
}
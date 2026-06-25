using System.Runtime.Versioning;
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

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Encomendas
            .Include(e => e.ItensEncomenda)
            .ThenInclude(i => i.Produto)
            .ToList());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var encomenda = _context.Encomendas
            .Include(e => e.ItensEncomenda)
            .ThenInclude(i => i.Produto)
            .FirstOrDefault(e => e.Id == id);
        if (encomenda == null)
        {
            return NotFound();
        }
        return Ok(encomenda);
    }

    [HttpGet("minhas")]
    [Authorize]
    public async Task<IActionResult> GetMinhas()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if(userId == null) return Unauthorized();

        var encomendas = await _context.Encomendas
            .Include(e => e.ItensEncomenda)
            .ThenInclude(i => i.Produto)
            .Where(e => e.UtilizadorId == userId)
            .OrderByDescending(e => e.Data)
            .ToListAsync();

        return Ok(encomendas);
        
    }
}
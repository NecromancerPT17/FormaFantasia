using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Identity;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UtilizadoresController : ControllerBase
{
    private readonly UserManager<Utilizador> _userManager;

    public UtilizadoresController(UserManager<Utilizador> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public IActionResult Get()
{
    var utilizadores = _userManager.Users.Select(u => new
    {
        u.Id,
        u.Email,
        u.Morada,
        u.NIF
    }).ToList();

    return Ok(utilizadores);
}

    [HttpGet("{id}")]
    public IActionResult Get(string id)
    {
        var u = _userManager.Users.FirstOrDefault(u => u.Id == id);
        if (u == null) return NotFound();

        return Ok(new { u.Id, u.Email, u.Morada, u.NIF });
    }

    // GET /api/Utilizadores/auth
    [HttpGet("auth")]
    public IActionResult GetAuthStatus()
    {
        return Ok(new { isAuthenticated = User.Identity?.IsAuthenticated ?? false });
    }
}
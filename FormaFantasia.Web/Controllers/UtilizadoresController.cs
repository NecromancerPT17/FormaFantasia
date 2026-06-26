using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

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

    // GET /api/Utilizadores
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult Get()
    {
        var utilizadores = _userManager.Users.Select(u => new
        {
            u.Id, u.Email, u.Nome, u.Apelido, u.Morada, u.NIF
        }).ToList();
        return Ok(utilizadores);
    }

    // GET /api/Utilizadores/{id}
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Get(string id)
    {
        var u = _userManager.Users.FirstOrDefault(u => u.Id == id);
        if (u == null) return NotFound();
        return Ok(new { u.Id, u.Email, u.Nome, u.Apelido, u.Morada, u.NIF });
    }

    // GET /api/Utilizadores/me
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMe()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        return Ok(new {
            user.Id, user.Email, user.UserName,
            user.PhoneNumber, user.Morada, user.NIF,
            user.Nome, user.Apelido
        });
    }

    // PUT /api/Utilizadores/me
    [HttpPut("me")]
    [Authorize]
    public async Task<IActionResult> UpdateMe([FromBody] UpdateMeDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        if (dto.PhoneNumber != null) user.PhoneNumber = dto.PhoneNumber;
        if (dto.Morada != null) user.Morada = dto.Morada;
        if (dto.NIF != null) user.NIF = dto.NIF;
        if (dto.Nome != null) user.Nome = dto.Nome;
        if (dto.Apelido != null) user.Apelido = dto.Apelido;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded) return BadRequest(result.Errors);

        return Ok(new {
            user.Id, user.Email, user.UserName,
            user.PhoneNumber, user.Morada, user.NIF,
            user.Nome, user.Apelido
        });
    }

    // PUT /api/Utilizadores/{id}/role
    [HttpPut("{id}/role")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateRole(string id, [FromBody] RoleDto dto)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        var currentRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, currentRoles);
        await _userManager.AddToRoleAsync(user, dto.Role);

        return Ok(new { user.Id, user.Email, role = dto.Role });
    }

    // GET /api/Utilizadores/auth
    [HttpGet("auth")]
    public async Task<IActionResult> GetAuthStatus()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            var user = await _userManager.GetUserAsync(User);
            var role = User.IsInRole("Admin") ? "Admin" : "Cliente";
            return Ok(new {
                isAuthenticated = true,
                role,
                nome = user?.Nome ?? "",
                apelido = user?.Apelido ?? "",
                email = user?.Email ?? ""
            });
        }
        return Ok(new { isAuthenticated = false, role = "", nome = "", apelido = "", email = "" });
    }
}

public class UpdateMeDto
{
    public string? PhoneNumber { get; set; }
    public string? Morada { get; set; }
    public string? NIF { get; set; }
    public string? Nome { get; set; }
    public string? Apelido { get; set; }
}

public class RoleDto
{
    public string Role { get; set; } = string.Empty;
}
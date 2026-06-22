using FormaFantasia.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FormaFantasia.Web.Pages.Admin;

[Authorize(Roles = "Admin")]
public class UtilizadoresModel : PageModel
{
    private readonly UserManager<Utilizador> _userManager;

    public UtilizadoresModel(UserManager<Utilizador> userManager)
    {
        _userManager = userManager;
    }

    public List<UtilizadorViewModel> Utilizadores { get; set; } = new();

    public async Task OnGetAsync()
    {
        var users = _userManager.Users.ToList();
        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            Utilizadores.Add(new UtilizadorViewModel
            {
                Id = user.Id,
                Email = user.Email ?? "",
                Morada = user.Morada,
                NIF = user.NIF,
                Role = roles.FirstOrDefault() ?? "Sem role"
            });
        }
    }

    public async Task<IActionResult> OnPostAlterarRoleAsync(string userId, string novoRole)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound();

        var rolesAtuais = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, rolesAtuais);
        await _userManager.AddToRoleAsync(user, novoRole);

        return RedirectToPage();
    }
}

public class UtilizadorViewModel
{
    public string Id { get; set; } = "";
    public string Email { get; set; } = "";
    public string Morada { get; set; } = "";
    public string NIF { get; set; } = "";
    public string Role { get; set; } = "";
}
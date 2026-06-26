using Microsoft.AspNetCore.Identity;

namespace FormaFantasia.Web.Models;

public class Utilizador : IdentityUser
{
    public string Morada { get; set; } = string.Empty;
    public string NIF { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Apelido { get; set; } = string.Empty;
}
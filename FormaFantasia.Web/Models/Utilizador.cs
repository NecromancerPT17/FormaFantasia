using Microsoft.AspNetCore.Identity;

namespace FormaFantasia.Web.Models;

public class Utilizador : IdentityUser
{
    public string Morada { get; set;}
    public string NIF { get; set;}
}
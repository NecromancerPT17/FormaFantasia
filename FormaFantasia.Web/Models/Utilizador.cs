using Microsoft.AspNetCore.Identity;

namespace FormaFantasia.Web.Models;

// Herda da classe base "IdentityUser" para aproveitar o sistema de autenticação da Microsoft (Email, Passwords seguras, etc.)
// e expande a tabela na base de dados com as informações de faturação/entrega necessárias para a loja.
public class Utilizador : IdentityUser
{
    public string Morada { get; set; } = string.Empty;
    public string NIF { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Apelido { get; set; } = string.Empty;
}
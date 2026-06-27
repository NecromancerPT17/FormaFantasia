using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Data;
// Configuração da BD com suporte para contas de utilizador
public class ApplicationDbContext : IdentityDbContext<Utilizador>
{
    // Construtor para ligar a BD
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    // Definir tabelas de BD
    public DbSet<Categoria> Categorias { get; set;}
    public DbSet<Produto> Produtos { get; set;}
    public DbSet<FotoProduto> FotosProduto { get; set;}
    public DbSet<Encomenda> Encomendas { get; set;}
    public DbSet<ItemEncomenda> ItensEncomenda { get; set;}
}
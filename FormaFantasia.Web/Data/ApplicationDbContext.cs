using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Data;

public class ApplicationDbContext : IdentityDbContext<Utilizador>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Categoria> Categorias { get; set;}
    public DbSet<Produto> Produtos { get; set;}
    public DbSet<FotoProduto> FotosProduto { get; set;}
    public DbSet<Encomenda> Encomendas { get; set;}
    public DbSet<ItemEncomenda> ItensEncomenda { get; set;}
}
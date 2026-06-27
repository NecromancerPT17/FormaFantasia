namespace FormaFantasia.Web.Models;

public class Encomenda
{
    public int Id { get; set;}
    public DateTime Data {get; set;}
    public string Estado {get; set;} = string.Empty;
    //Chave Estrangeira, liga a encomenda ao utilizador que a fez
    public string UtilizadorId { get; set;} = string.Empty;
    public Utilizador Utilizador {get; set;}
    // Relação 1:N com ItensEncomenda, uma encomenda pode ter vários itens
    public ICollection<ItemEncomenda> ItensEncomenda { get; set; } = new List<ItemEncomenda>();
}
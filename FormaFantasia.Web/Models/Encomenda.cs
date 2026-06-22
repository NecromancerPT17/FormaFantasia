namespace FormaFantasia.Web.Models;

public class Encomenda
{
    public int Id { get; set;}
    public DateTime Data {get; set;}
    public string Estado {get; set;} = string.Empty;
    public string UtilizadorId { get; set;} = string.Empty;
    public Utilizador Utilizador {get; set;}

    public ICollection<ItemEncomenda> ItensEncomenda { get; set; } = new List<ItemEncomenda>();
}
namespace FormaFantasia.Web.Models;

public class Encomenda
{
    public int Id { get; set;}
    public DateTime Data {get; set;}
    public string Estado {get; set;}
    public string UtilizadorId { get; set;}
    public Utilizador Utilizador {get; set;}
}
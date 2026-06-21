namespace FormaFantasia.Web.Models;

public class FotoProduto
{
    public int Id { get; set;}
    public string CaminhoFicheiro { get; set;}
    public bool Principal { get; set;}
    public int ProdutoId { get; set;}
    public Produto Produto {get; set;}
}
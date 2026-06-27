namespace FormaFantasia.Web.Models;

public class ItemEncomenda
{
    public int Id { get; set;}
    //Chave Estrangeira: Associa a linha atual de compra a uma Encomenda "Pai"
    public int EncomendaId { get; set;}
    public Encomenda Encomenda { get; set;}
    // Chave Estrangeira: Associa a linha de compra ao Produto que está a ser comprado
    public int ProdutoId { get; set;}
    public Produto Produto { get; set;}
    public int Quantidade { get; set;}
    public decimal PrecoUnitario { get; set;}
}
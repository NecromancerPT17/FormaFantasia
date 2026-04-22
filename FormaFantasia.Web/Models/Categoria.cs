using System.ComponentModel.DataAnnotations;

namespace FormaFantasia.Web.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da categoria é obrigatório.")]
        [StringLength(100)]
        public string Nome { get; set; }

        public string? Descricao { get; set; }

        public ICollection<Produto>? Produtos { get; set; }
    }
}

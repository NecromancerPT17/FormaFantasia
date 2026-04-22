using System.ComponentModel.DataAnnotations;

namespace FormaFantasia.Web.Models
{
    public class Encomenda
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime DataEncomenda { get; set; } = DateTime.Now;

        [Required]
        [StringLength(100)]
        public string NomeCliente { get; set; }

        public string? Estado { get; set; } = "Pendente";

        public ICollection<Produto>? Produtos { get; set; }
    }
}

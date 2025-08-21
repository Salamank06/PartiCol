using System.ComponentModel.DataAnnotations;

namespace PartiCol.Models
{
    public class Politico
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre del político es obligatorio.")]
        [StringLength(100)]
        public string Nombre { get; set; }

        [StringLength(100)]
        public string CargoActual { get; set; }
        public string PerfilIdeologico { get; set; } = null!;

        [StringLength(50)]
        public string? Twitter { get; set; }

        public int PartidoId { get; set; }

        public Partido Partido { get; set; }
    }
}
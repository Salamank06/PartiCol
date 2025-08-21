using System.ComponentModel.DataAnnotations;

namespace PartiCol.Models
{
    public class Partido
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre del partido es obligatorio.")]
        [StringLength(100)]
        public string Nombre { get; set; }

        [StringLength(100)]
        public string Ideologia { get; set; }
        public DateTime Fundacion { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        public string Descripcion { get; set; }

        public List<Politico> Politicos { get; set; }
    }
}

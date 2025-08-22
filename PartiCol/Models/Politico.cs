namespace PartiCol.Models
{
    public class Politico
    {
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string CargoActual { get; set; }
        [Required]
        public string PerfilIdeologico { get; set; } = null!;
        public string? Twitter { get; set; }
        public string? Foto { get; set; }

        [Required]
        public int PartidoId { get; set; }

        public Partido? Partido { get; set; }
    }
}

namespace PartiCol.Models
{
    public class Politico
    {
        public int Id { get; set; }
        
        public string Nombre { get; set; }
        
        public string CargoActual { get; set; }
        
        public string PerfilIdeologico { get; set; } = null!;
        public string? Twitter { get; set; }
        public string? Foto { get; set; }

        
        public int PartidoId { get; set; }

        public Partido? Partido { get; set; }
    }
}

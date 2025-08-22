namespace PartiCol.Models
{
    public class Partido
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Ideologia { get; set; }
        public DateTime Fundacion { get; set; }
        public string Descripcion { get; set; }
        public string? LogoUrl { get; set; }
        public string? Twitter { get; set; }

        public List<Politico>? Politicos { get; set; }
    }
}

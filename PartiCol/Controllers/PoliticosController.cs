using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartiCol.Data; // ⬅️ si tu namespace es otro, cámbialo

namespace PartiCol.Controllers // ⬅️ igual aquí si tu namespace es otro
{
    [ApiController]
    [Route("api/[controller]")]
    public class PoliticosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PoliticosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Politicos/con-partido
        [HttpGet("con-partido")]
        public async Task<IActionResult> GetPoliticosConPartido()
        {
            var data = await _context.Politicos
                .Include(p => p.Partido) // JOIN con Partidos
                .Select(p => new
                {
                    p.Nombre,
                    p.CargoActual,
                    PerfilIdeologico = p.PerfilIdeologico ?? "",
                    Twitter = p.Twitter ?? "",
                    Partido = p.Partido.Nombre,
                    IdeologiaPartido = p.Partido.Ideologia
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}

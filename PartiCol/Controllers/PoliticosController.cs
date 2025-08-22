using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartiCol.Data;
using PartiCol.Models; // Added missing using directive

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
                    p.Id,
                    p.Nombre,
                    p.CargoActual,
                    PerfilIdeologico = p.PerfilIdeologico ?? "",
                    Twitter = p.Twitter ?? "",
                    Foto = p.Foto ?? "",
                    Partido = p.Partido.Nombre,
                    IdeologiaPartido = p.Partido.Ideologia
                })
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/Politicos
        // Lista todos los políticos
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Politico>>> GetPoliticos()
        {
            return await _context.Politicos.ToListAsync();
        }

        // GET: api/Politicos/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Politico>> GetPolitico(int id)
        {
            var politico = await _context.Politicos.Include(p => p.Partido).FirstOrDefaultAsync(p => p.Id == id);

            if (politico == null)
            {
                return NotFound();
            }

            return politico;
        }

        // POST: api/Politicos
        [HttpPost("")]
        public async Task<ActionResult<Politico>> PostPolitico(Politico politico)
        {
            // Check if the PartidoId exists
            var partidoExists = await _context.Partidos.AnyAsync(p => p.Id == politico.PartidoId);
            if (!partidoExists)
            {
                return BadRequest("El PartidoId proporcionado no existe.");
            }

            _context.Politicos.Add(politico);
            await _context.SaveChangesAsync();

            // Load the Partido navigation property for the CreatedAtAction response
            await _context.Entry(politico).Reference(p => p.Partido).LoadAsync();

            return CreatedAtAction(nameof(GetPolitico), new { id = politico.Id }, politico);
        }

        // PUT: api/Politicos/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutPolitico(int id, Politico politico)
        {
            if (id != politico.Id)
            {
                return BadRequest();
            }

            var existingPolitico = await _context.Politicos.FindAsync(id);
            if (existingPolitico == null)
            {
                return NotFound();
            }

            // Update properties
            existingPolitico.Nombre = politico.Nombre;
            existingPolitico.CargoActual = politico.CargoActual;
            existingPolitico.PerfilIdeologico = politico.PerfilIdeologico;
            existingPolitico.Twitter = politico.Twitter;
            existingPolitico.PartidoId = politico.PartidoId;
            existingPolitico.Foto = politico.Foto; // Update the Foto property

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Politicos.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Politicos/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePolitico(int id)
        {
            var politico = await _context.Politicos.FindAsync(id);
            if (politico == null)
            {
                return NotFound();
            }

            _context.Politicos.Remove(politico);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartiCol.Data;
using PartiCol.Models;

namespace PartiCol.Controllers
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

        // GET: api/Politicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Politico>>> GetPoliticos()
        {
            return await _context.Politicos.ToListAsync();
        }

        // GET: api/Politicos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Politico>> GetPolitico(int id)
        {
            var politico = await _context.Politicos.FindAsync(id);

            if (politico == null)
            {
                return NotFound();
            }

            return politico;
        }

        // GET: api/Politicos/con-partido
        [HttpGet("con-partido")]
        public async Task<IActionResult> GetPoliticosConPartido()
        {
            var data = await _context.Politicos
                .Include(p => p.Partido) // JOIN con Partidos
                .Select(p => new PoliticoDto
                {
                    Nombre = p.Nombre,
                    CargoActual = p.CargoActual,
                    PerfilIdeologico = p.PerfilIdeologico ?? "",
                    Twitter = p.Twitter ?? "",
                    Partido = p.Partido.Nombre,
                    IdeologiaPartido = p.Partido.Ideologia
                })
                .ToListAsync();

            return Ok(data);
        }

        // PUT: api/Politicos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolitico(int id, Politico politico)
        {
            if (id != politico.Id)
            {
                return BadRequest();
            }

            _context.Entry(politico).State = EntityState.Modified;

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

        // POST: api/Politicos
        [HttpPost]
        public async Task<ActionResult<Politico>> PostPolitico(Politico politico)
        {
            _context.Politicos.Add(politico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPolitico), new { id = politico.Id }, politico);
        }

        // DELETE: api/Politicos/5
        [HttpDelete("{id}")]
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

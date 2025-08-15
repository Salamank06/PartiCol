using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartiCol.Data;
using PartiCol.Models;

namespace PartiCol.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PartidosController : ControllerBase
{
    private readonly AppDbContext _context;
    public PartidosController(AppDbContext context) => _context = context;

    // GET: /api/Partidos
    // Lista partidos (sin incluir políticos)
    [HttpGet]
    public async Task<IActionResult> GetPartidos()
    {
        var data = await _context.Partidos
            .AsNoTracking()
            .ToListAsync();

        return Ok(data);
    }

    // GET: /api/Partidos/con-politicos
    // Lista partidos e incluye sus políticos
    [HttpGet("con-politicos")]
    public async Task<IActionResult> GetPartidosConPoliticos()
    {
        var data = await _context.Partidos
            .Include(p => p.Politicos)
            .AsNoTracking()
            .ToListAsync();

        return Ok(data);
    }

    // GET: /api/Partidos/5
    // Un partido por Id, incluyendo sus políticos
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Partido>> GetPartido(int id)
    {
        var partido = await _context.Partidos
            .Include(p => p.Politicos)
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        return partido is null ? NotFound() : Ok(partido);
    }

    // POST: api/Partidos
    [HttpPost]
    public async Task<ActionResult<Partido>> PostPartido(Partido partido)
    {
        _context.Partidos.Add(partido);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPartido), new { id = partido.Id }, partido);
    }

    // PUT: api/Partidos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPartido(int id, Partido partido)
    {
        if (id != partido.Id)
        {
            return BadRequest();
        }

        _context.Entry(partido).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Partidos.Any(e => e.Id == id))
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

    // DELETE: api/Partidos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePartido(int id)
    {
        var partido = await _context.Partidos.FindAsync(id);
        if (partido == null)
        {
            return NotFound();
        }

        _context.Partidos.Remove(partido);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
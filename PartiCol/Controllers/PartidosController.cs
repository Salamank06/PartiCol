using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartiCol.Data;
using PartiCol.Models; // Added missing using directive
using PartiCol.DTOs; // Added DTOs using directive

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
    public async Task<IActionResult> GetPartido(int id)
    {
        var partido = await _context.Partidos
            .Include(p => p.Politicos)
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        return partido is null ? NotFound() : Ok(partido);
    }

    // POST: api/Partidos
    // Crea un nuevo partido
    [HttpPost]
    public async Task<ActionResult<Partido>> PostPartido(PartidoCreationDto partidoDto)
    {
        var partido = new Partido
        {
            Nombre = partidoDto.Nombre,
            Ideologia = partidoDto.Ideologia,
            Fundacion = partidoDto.Fundacion,
            Descripcion = partidoDto.Descripcion,
            Politicos = new List<Politico>() // Ensure Politicos list is empty for new Partido
        };

        _context.Partidos.Add(partido);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPartido), new { id = partido.Id }, partido);
    }

    // PUT: api/Partidos/5
    // Actualiza un partido existente
    [HttpPut("{id:int}")]
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
    // Elimina un partido
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletePartido(int id)
    {
        var partido = await _context.Partidos
            .Include(p => p.Politicos) // Include Politicos to delete them
            .FirstOrDefaultAsync(p => p.Id == id);

        if (partido == null)
        {
            return NotFound();
        }

        // Remove associated Politicos first
        if (partido.Politicos != null && partido.Politicos.Any())
        {
            _context.Politicos.RemoveRange(partido.Politicos);
        }

        _context.Partidos.Remove(partido);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

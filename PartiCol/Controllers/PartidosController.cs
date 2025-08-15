using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartiCol.Data;

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
}

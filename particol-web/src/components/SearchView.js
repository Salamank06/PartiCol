import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, useTheme } from '@mui/material';

function SearchView() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [partyFilter, setPartyFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    console.log('Party Filter:', partyFilter);
    console.log('Region Filter:', regionFilter);
    // Here you would typically make an API call with these filters
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Búsqueda Avanzada
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          borderRadius: '12px',
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TextField
          label="Buscar político o partido..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
          <InputLabel>Partido</InputLabel>
          <Select
            value={partyFilter}
            onChange={(e) => setPartyFilter(e.target.value)}
            label="Partido"
          >
            <MenuItem value=""><em>Ninguno</em></MenuItem>
            <MenuItem value="Partido A">Partido A</MenuItem>
            <MenuItem value="Partido B">Partido B</MenuItem>
            <MenuItem value="Partido C">Partido C</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
          <InputLabel>Región</InputLabel>
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            label="Región"
          >
            <MenuItem value=""><em>Ninguna</em></MenuItem>
            <MenuItem value="Bogotá">Bogotá</MenuItem>
            <MenuItem value="Antioquia">Antioquia</MenuItem>
            <MenuItem value="Valle del Cauca">Valle del Cauca</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSearch} sx={{ borderRadius: '8px' }}>
          Aplicar Filtros
        </Button>
      </Paper>
      <Typography variant="body1" sx={{ mt: 3, color: theme.palette.text.secondary }}>
        La comprensión de lenguaje natural para búsquedas más complejas se integraría principalmente en el backend de la API.
      </Typography>
    </Box>
  );
}

export default SearchView;
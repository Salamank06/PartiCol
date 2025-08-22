import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Alert, Paper, useTheme } from '@mui/material';

function PoliticianForm({ onClose, politicianToEdit }) {
  console.log('PoliticianForm rendering');
  const theme = useTheme();
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    cargoActual: '',
    perfilIdeologico: '',
    twitter: '',
    partidoId: '',
    foto: '',
  });
  const [parties, setParties] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log('PoliticianForm useEffect [politicianToEdit] called');
    if (politicianToEdit) {
      console.log('politicianToEdit.partidoId', politicianToEdit.partidoId, typeof politicianToEdit.partidoId);
      setFormData({
        id: politicianToEdit.id,
        nombre: politicianToEdit.nombre || '',
        cargoActual: politicianToEdit.cargoActual || '',
        perfilIdeologico: politicianToEdit.perfilIdeologico || '',
        twitter: politicianToEdit.twitter || '',
        partidoId: Number(politicianToEdit.partidoId) || '',
        foto: politicianToEdit.foto || '',
      });
    } else {
      setFormData({
        nombre: '',
        cargoActual: '',
        perfilIdeologico: '',
        twitter: '',
        partidoId: '',
        foto: '',
      });
    }
  }, [politicianToEdit]);

  useEffect(() => {
    console.log('PoliticianForm useEffect [] called');
    const fetchParties = async () => {
      console.log('fetchParties called');
      try {
        const response = await fetch('https://localhost:7037/api/Partidos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Parties fetched:', data);
        setParties(data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchParties();
  }, []);

  const handleChange = (e) => {
    console.log('handleChange called', e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit called');
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const url = politicianToEdit
      ? `https://localhost:7037/api/Politicos/${politicianToEdit.id}`
      : 'https://localhost:7037/api/Politicos';
    const method = politicianToEdit ? 'PUT' : 'POST';

    console.log('Submitting formData:', formData);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSuccess(true);
      setFormData({
        nombre: '',
        cargoActual: '',
        perfilIdeologico: '',
        twitter: '',
        partidoId: '',
      });
      onClose(); // Close modal and refresh list
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        mt: 2,
        background: theme.palette.background.paper, // Use sober paper background
        borderRadius: '12px',
        boxShadow: theme.palette.mode === 'light' ? '0 4px 10px rgba(0,0,0,0.05)' : '0 4px 10px rgba(0,0,0,0.2)', // Subtle shadow
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Político creado con éxito!</Alert>}
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />
      <TextField
        label="Cargo Actual"
        name="cargoActual"
        value={formData.cargoActual}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />
      <TextField
        label="Perfil Ideológico"
        name="perfilIdeologico"
        value={formData.perfilIdeologico}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />
      <TextField
        label="Twitter (URL)"
        name="twitter"
        value={formData.twitter}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />
      <FormControl fullWidth margin="normal" required variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
        <InputLabel>Partido</InputLabel>
        <Select
          name="partidoId"
          value={formData.partidoId}
          onChange={handleChange}
          label="Partido"
        >
          {parties.map((party) => (
            <MenuItem key={party.id} value={party.id}>
              {party.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Paper>
  );
}

export default PoliticianForm;
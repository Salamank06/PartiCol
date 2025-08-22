import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert, Paper } from '@mui/material';

function PartyForm({ onClose, partyToEdit }) {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    ideologia: '',
    fundacion: '',
    descripcion: '',
    logoUrl: '',
    twitter: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (partyToEdit) {
      setFormData({
        id: partyToEdit.id,
        nombre: partyToEdit.nombre || '',
        ideologia: partyToEdit.ideologia || '',
        fundacion: partyToEdit.fundacion.split('T')[0] || '', // Format date for input
        descripcion: partyToEdit.descripcion || '',
        logoUrl: partyToEdit.logoUrl || '',
        twitter: partyToEdit.twitter || '',
      });
    } else {
      setFormData({
        id: 0,
        nombre: '',
        ideologia: '',
        fundacion: '',
        descripcion: '',
        logoUrl: '',
        twitter: '',
      });
    }
  }, [partyToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const url = partyToEdit
      ? `https://localhost:7037/api/Partidos/${partyToEdit.id}`
      : 'https://localhost:7037/api/Partidos';
    const method = partyToEdit ? 'PUT' : 'POST';

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
      onClose();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2 }}
    >
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{partyToEdit ? 'Partido actualizado con éxito!' : 'Partido creado con éxito!'}</Alert>}
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Ideología"
        name="ideologia"
        value={formData.ideologia}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Fecha de Fundación"
        name="fundacion"
        type="date"
        value={formData.fundacion}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        variant="outlined"
        inputProps={{ maxLength: 250 }}
      />
      <TextField
        label="URL del Logo"
        name="logoUrl"
        value={formData.logoUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Twitter (URL)"
        name="twitter"
        value={formData.twitter}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </Box>
    </Box>
  );
}

export default PartyForm;
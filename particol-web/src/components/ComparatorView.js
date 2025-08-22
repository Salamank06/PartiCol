import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from '@mui/material';

function ComparatorView() {
  const [politicians, setPoliticians] = useState([]);
  const [selectedPolitician1, setSelectedPolitician1] = useState('');
  const [selectedPolitician2, setSelectedPolitician2] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await fetch('https://localhost:7037/api/Politicos/con-partido');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPoliticians(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPoliticians();
  }, []);

  const politician1 = politicians.find(p => p.id === selectedPolitician1);
  const politician2 = politicians.find(p => p.id === selectedPolitician2);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
        Comparador
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Político 1</InputLabel>
            <Select
              value={selectedPolitician1}
              label="Político 1"
              onChange={(e) => setSelectedPolitician1(e.target.value)}
            >
              {politicians.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Político 2</InputLabel>
            <Select
              value={selectedPolitician2}
              label="Político 2"
              onChange={(e) => setSelectedPolitician2(e.target.value)}
            >
              {politicians.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12} md={5}>
          {politician1 ? (
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{politician1.nombre}</Typography>
              <Typography variant="body1" color="text.secondary">Partido: {politician1.partido}</Typography>
              <Typography variant="body1" color="text.secondary">Cargo Actual: {politician1.cargoActual}</Typography>
              <Typography variant="body1" color="text.secondary">Perfil Ideológico: {politician1.perfilIdeologico}</Typography>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' }}>
              <Typography variant="h6" color="text.secondary">Seleccione un político</Typography>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }} color="primary">VS</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          {politician2 ? (
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{politician2.nombre}</Typography>
              <Typography variant="body1" color="text.secondary">Partido: {politician2.partido}</Typography>
              <Typography variant="body1" color="text.secondary">Cargo Actual: {politician2.cargoActual}</Typography>
              <Typography variant="body1" color="text.secondary">Perfil Ideológico: {politician2.perfilIdeologico}</Typography>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' }}>
              <Typography variant="h6" color="text.secondary">Seleccione un político</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ComparatorView;
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Button, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade } from '@mui/material';
import PoliticianCard from './PoliticianCard';
import PoliticianForm from './PoliticianForm';

function PoliticiansView() {
  console.log('PoliticiansView rendering');
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [politicianToDelete, setPoliticianToDelete] = useState(null);
  const [politicianToEdit, setPoliticianToEdit] = useState(null);

  const fetchPoliticians = async () => {
    console.log('fetchPoliticians called');
    try {
      const response = await fetch('https://localhost:7037/api/Politicos/con-partido');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Politicians data from API:', data);
      setPoliticians(data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        cargoActual: p.cargoActual,
        perfilIdeologico: p.perfilIdeologico,
        twitter: p.twitter,
        partidoId: p.partidoId,
        party: p.partido,
        photo: p.Foto || 'https://via.placeholder.com/150',
        facebook: p.facebook,
        instagram: p.instagram,
      })));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoliticians();
  }, []);

  const handleOpenForm = () => {
    setPoliticianToEdit(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setPoliticianToEdit(null);
    fetchPoliticians();
  };

  const handleEditClick = (politicianId) => {
    const politician = politicians.find(p => p.id === politicianId);
    if (politician) {
      setPoliticianToEdit(politician);
      setOpenForm(true);
    }
  };

  const handleDeleteClick = (politicianId) => {
    setPoliticianToDelete(politicianId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);
    if (politicianToDelete) {
      try {
        const response = await fetch(`https://localhost:7037/api/Politicos/${politicianToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setPoliticians(politicians.filter(p => p.id !== politicianToDelete));
      } catch (e) {
        setError(e.message);
      }
    }
    setPoliticianToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setPoliticianToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Error al cargar los políticos: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Políticos
        </Typography>
        <Button variant="contained" onClick={handleOpenForm}>
          Crear Político
        </Button>
      </Box>
      <Grid container spacing={3}>
        {politicians.map((politician) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={politician.id}>
            <PoliticianCard politician={politician} onEdit={handleEditClick} onDelete={handleDeleteClick} />
          </Grid>
        ))}
      </Grid>

      <Modal
        open={openForm}
        onClose={handleCloseForm}
        closeAfterTransition
      >
        <Fade in={openForm}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              {politicianToEdit ? 'Editar Político' : 'Crear Nuevo Político'}
            </Typography>
            <PoliticianForm onClose={handleCloseForm} politicianToEdit={politicianToEdit} />
          </Box>
        </Fade>
      </Modal>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este político?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PoliticiansView;
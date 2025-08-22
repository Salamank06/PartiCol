import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Card, CardContent, CardMedia, Fade, Button, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PartyForm from './PartyForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';

function PartiesView() {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [partyToEdit, setPartyToEdit] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [partyToDelete, setPartyToDelete] = useState(null);

  const fetchParties = async () => {
    try {
      const response = await fetch('https://localhost:7037/api/Partidos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setParties(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleOpenForm = () => {
    setPartyToEdit(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setPartyToEdit(null);
    fetchParties();
  };

  const handleEditClick = (partyId) => {
    const party = parties.find(p => p.id === partyId);
    if (party) {
      setPartyToEdit(party);
      setOpenForm(true);
    }
  };

  const handleDeleteClick = (partyId) => {
    setPartyToDelete(partyId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);
    if (partyToDelete) {
      try {
        const response = await fetch(`https://localhost:7037/api/Partidos/${partyToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setParties(parties.filter(p => p.id !== partyToDelete));
      } catch (e) {
        setError(e.message);
      }
    }
    setPartyToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setPartyToDelete(null);
  };

  return (
    <Fade in={true}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Partidos Políticos
          </Typography>
          <Button variant="contained" onClick={handleOpenForm}>
            Crear Partido
          </Button>
        </Box>
        <Grid container spacing={3}>
          {parties.map((party) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={party.id}>
              <Card sx={{ height: 300, display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="70%"
                  image={party.logoUrl || "https://via.placeholder.com/300x210/1DA1F2/FFFFFF?text=X"}
                  alt="Party Image"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {party.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ideología: {party.ideologia}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fundación: {new Date(party.fundacion).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Descripción: {party.descripcion.length > 100 ? party.descripcion.substring(0, 100) + '...' : party.descripcion}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    {party.twitter && (
                      <IconButton aria-label="twitter" size="small" href={party.twitter} target="_blank" rel="noopener">
                        <TwitterIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(party.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(party.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
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
                {partyToEdit ? 'Editar Partido' : 'Crear Nuevo Partido'}
              </Typography>
              <PartyForm onClose={handleCloseForm} partyToEdit={partyToEdit} />
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
              ¿Estás seguro de que quieres eliminar este partido?
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
    </Fade>
  );
}

export default PartiesView;